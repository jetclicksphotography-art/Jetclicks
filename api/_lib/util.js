import { randomUUID } from 'node:crypto';

export const now = () => new Date().toISOString();
export const id = (prefix) => `${prefix}_${randomUUID().replaceAll('-', '').slice(0, 18)}`;

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  // API responses are per-request state; never let a CDN or browser cache them.
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.end(JSON.stringify(body));
}

export function parseBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    if (typeof req.body === 'string' && req.body) {
      try { return resolve(JSON.parse(req.body)); } catch (error) { return reject(error); }
    }
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 15_000_000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try { resolve(JSON.parse(raw)); }
      catch (error) { reject(error); }
    });
    req.on('error', reject);
  });
}

// Strips control characters while keeping tabs and newlines in long text.
const CONTROL_CHARS = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;

export function cleanText(value, max = 4000) {
  if (value === undefined || value === null) return '';
  return String(value).replace(CONTROL_CHARS, '').trim().slice(0, max);
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
}

/** Vercel populates req.query; the local dev bridge may not. */
export function queryParam(req, key) {
  if (req.query && req.query[key] !== undefined) {
    const value = req.query[key];
    return Array.isArray(value) ? String(value[0] ?? '') : String(value);
  }
  try {
    return new URL(req.url, 'http://localhost').searchParams.get(key) || '';
  } catch {
    return '';
  }
}
