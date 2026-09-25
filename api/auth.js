import { json, parseBody, cleanText, now } from './_lib/util.js';
import { adminConfigured, checkPassword, clearSessionCookie, clientIp, createToken, isAdminRequest, rateLimit, setSessionCookie } from './_lib/auth.js';
import { sendMail, smtpConfigured } from './_lib/smtp.js';

/**
 * A successful sign-in is the one console event worth interrupting the owner for:
 * if this email arrives and it was not them, the password is compromised and they
 * can rotate it immediately. Best-effort - never blocks or fails the login.
 */
async function alertSignIn(req) {
  if (!smtpConfigured() || !process.env.ADMIN_EMAIL) return;
  const ip = clientIp(req);
  const agent = String(req.headers?.['user-agent'] || 'unknown').slice(0, 300);
  try {
    await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: 'JetClicks studio console - new sign-in',
      text: [
        'The studio console was just accessed.',
        '',
        `Time:   ${now()}`,
        `IP:     ${ip}`,
        `Device: ${agent}`,
        '',
        'If this was not you, change ADMIN_PASSWORD immediately (in your host and .env) and redeploy.'
      ].join('\n')
    });
  } catch (error) {
    console.error('sign-in alert failed:', error?.message || error);
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return json(res, 200, { configured: adminConfigured(), authenticated: isAdminRequest(req) });
    }
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

    const body = await parseBody(req);
    if (body.action === 'logout') {
      clearSessionCookie(res);
      return json(res, 200, { ok: true, authenticated: false });
    }
    if (!adminConfigured()) {
      return json(res, 503, { error: 'Admin access is not configured. Set ADMIN_PASSWORD.', code: 'not-configured' });
    }

    // Tighter than a public endpoint: 5 tries per 15 min per IP. Note this counter
    // is per serverless instance; a durable store (Vercel KV) is the real fix for
    // distributed guessing - see SECURITY.md.
    const limit = rateLimit(`login:${clientIp(req)}`, 5, 15 * 60_000);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfter));
      return json(res, 429, { error: `Too many attempts. Try again in ${limit.retryAfter}s.` });
    }

    if (!checkPassword(cleanText(body.password, 200))) {
      return json(res, 401, { error: 'Incorrect password.' });
    }
    setSessionCookie(res, createToken());
    // Awaited: a serverless instance can be frozen the moment the response is sent.
    await alertSignIn(req);
    return json(res, 200, { ok: true, authenticated: true });
  } catch (error) {
    console.error('auth', error);
    return json(res, 500, { error: 'Sign-in failed.' });
  }
}
