/**
 * One-time helper: gets a Google Drive refresh token for the studio account, so
 * the site can upload portfolio photos to Drive (service accounts can't - they
 * have no storage quota).
 *
 * Setup:
 *   1. Google Cloud Console -> APIs & Services -> Credentials
 *      -> Create Credentials -> OAuth client ID
 *      -> Application type: "Web application".
 *   2. Under "Authorized redirect URIs" add EXACTLY (no trailing slash):
 *        http://localhost:4180
 *      (This exact match is what prevents "Error 400: redirect_uri_mismatch".)
 *   3. Copy the Client ID and Client secret into .env as:
 *        GOOGLE_OAUTH_CLIENT_ID='...'
 *        GOOGLE_OAUTH_CLIENT_SECRET='...'
 *   4. OAuth consent screen: add jetclicksphotography@gmail.com as a Test user,
 *      then Publish the app (Publishing status -> In production) so the refresh
 *      token does not expire after 7 days.
 *   5. Run:  node scripts/get-drive-token.mjs
 *   6. A browser opens; sign in as the studio account. On the "Google hasn't
 *      verified this app" screen, click Advanced -> Go to JetClicks (unsafe),
 *      then Allow. (Safe - it is your own app.)
 *   7. This prints GOOGLE_OAUTH_REFRESH_TOKEN - paste it into .env (and Vercel).
 */
import http from 'node:http';
import { readFileSync } from 'node:fs';
import { exec } from 'node:child_process';

// Load client id/secret from .env
const env = {};
try {
  for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) v = v.slice(1, -1);
    env[m[1]] = v;
  }
} catch { /* no .env */ }

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID || env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET || env.GOOGLE_OAUTH_CLIENT_SECRET;
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET in .env. See the header of this file.');
  process.exit(1);
}

const PORT = 4180;
const REDIRECT = `http://localhost:${PORT}`;
const SCOPE = 'https://www.googleapis.com/auth/drive';

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline',
    prompt: 'consent',
  }).toString();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get('code');
  if (!code) {
    res.writeHead(400).end('No code received.');
    return;
  }
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT,
        grant_type: 'authorization_code',
      }),
    });
    const data = await tokenRes.json();
    if (!data.refresh_token) {
      res.writeHead(500).end('No refresh token returned. Revoke the app at myaccount.google.com/permissions and retry.');
      console.error('\nNo refresh_token in response:', data);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' }).end('<h2>Done. You can close this tab and return to the terminal.</h2>');
      console.log('\n=== SUCCESS ===');
      console.log("Add this to .env (and Vercel):\n");
      console.log(`GOOGLE_OAUTH_REFRESH_TOKEN='${data.refresh_token}'`);
      console.log('\n(GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET must be set in the same places.)');
    }
  } catch (error) {
    res.writeHead(500).end('Token exchange failed: ' + (error?.message || error));
  } finally {
    setTimeout(() => server.close(() => process.exit(0)), 500);
  }
});

server.listen(PORT, () => {
  console.log('Opening the Google consent screen in your browser...');
  console.log('If it does not open, paste this URL:\n\n' + authUrl + '\n');
  const opener = process.platform === 'win32' ? 'start ""' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${opener} "${authUrl}"`);
});
