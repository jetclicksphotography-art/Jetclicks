import { json, parseBody, cleanText } from './_lib/util.js';
import { adminConfigured, checkPassword, clearSessionCookie, clientIp, createToken, isAdminRequest, rateLimit, setSessionCookie } from './_lib/auth.js';

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

    const limit = rateLimit(`login:${clientIp(req)}`, 8, 10 * 60_000);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfter));
      return json(res, 429, { error: `Too many attempts. Try again in ${limit.retryAfter}s.` });
    }

    if (!checkPassword(cleanText(body.password, 200))) {
      return json(res, 401, { error: 'Incorrect password.' });
    }
    setSessionCookie(res, createToken());
    return json(res, 200, { ok: true, authenticated: true });
  } catch (error) {
    console.error('auth', error);
    return json(res, 500, { error: 'Sign-in failed.' });
  }
}
