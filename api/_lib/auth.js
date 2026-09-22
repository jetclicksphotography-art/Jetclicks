import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE = 'jc_admin';
const SESSION_HOURS = 8;
const attempts = new Map();

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

function sign(payload) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function createToken() {
  const payload = `${Date.now() + SESSION_HOURS * 3600_000}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token) {
  if (!token || !adminConfigured()) return false;
  const [payload, signature] = String(token).split('.');
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;
  return Number(payload) > Date.now();
}

export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

/** Fixed-window limiter shared by login and public endpoints. Per-instance only. */
export function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    if (attempts.size > 5000) for (const [k, v] of attempts) if (now > v.resetAt) attempts.delete(k);
    return { allowed: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > max) return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  return { allowed: true, retryAfter: 0 };
}

export function checkPassword(candidate) {
  if (!adminConfigured()) return false;
  return safeEqual(
    createHmac('sha256', 'jetclicks-pw').update(String(candidate)).digest('hex'),
    createHmac('sha256', 'jetclicks-pw').update(String(process.env.ADMIN_PASSWORD)).digest('hex')
  );
}

export function readCookies(req) {
  const header = req.headers?.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const index = part.indexOf('=');
    if (index < 0) continue;
    out[part.slice(0, index).trim()] = decodeURIComponent(part.slice(index + 1).trim());
  }
  return out;
}

export function setSessionCookie(res, token) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}${secure}`);
}

export function clearSessionCookie(res) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0${secure}`);
}

export function isAdminRequest(req) {
  if (!adminConfigured()) return false;
  const header = req.headers?.authorization || '';
  if (header.startsWith('Bearer ') && verifyToken(header.slice(7))) return true;
  return verifyToken(readCookies(req)[COOKIE]);
}

/** Writes the failure response itself; returns true when the caller may continue. */
export function requireAdmin(req, res, json) {
  if (!adminConfigured()) {
    json(res, 503, { error: 'Admin access is not configured. Set ADMIN_PASSWORD.', code: 'not-configured' });
    return false;
  }
  if (!isAdminRequest(req)) {
    json(res, 401, { error: 'Sign in required.', code: 'unauthorized' });
    return false;
  }
  return true;
}
