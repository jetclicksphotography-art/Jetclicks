import nodemailer from 'nodemailer';

export function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST);
}

export function smtpSettings() {
  const port = Number(process.env.SMTP_PORT || (process.env.SMTP_SECURE === 'true' ? 465 : 587));
  return {
    host: process.env.SMTP_HOST || '',
    port,
    // Implicit TLS on 465, STARTTLS upgrade otherwise.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    user: process.env.SMTP_USER || '',
    hasPassword: Boolean(process.env.SMTP_PASS),
    from: process.env.MAIL_FROM || process.env.SMTP_USER || '',
    adminEmail: process.env.ADMIN_EMAIL || ''
  };
}

let cached = null;
let cachedKey = '';

function transporter() {
  const s = smtpSettings();
  const key = JSON.stringify([s.host, s.port, s.secure, s.user, s.hasPassword]);
  if (cached && cachedKey === key) return cached;
  cachedKey = key;
  cached = nodemailer.createTransport({
    host: s.host,
    port: s.port,
    secure: s.secure,
    requireTLS: !s.secure,
    auth: s.user && process.env.SMTP_PASS ? { user: s.user, pass: process.env.SMTP_PASS } : undefined,
    // Kept under the default 10s serverless function budget so a dead SMTP
    // host produces a reported error rather than a platform timeout.
    connectionTimeout: 7_000,
    greetingTimeout: 7_000,
    socketTimeout: 9_000,
    tls: { minVersion: 'TLSv1.2', rejectUnauthorized: process.env.SMTP_ALLOW_SELF_SIGNED !== 'true' }
  });
  return cached;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
}

/**
 * Never throws: mail failures must not fail a booking or an admin reply.
 * Returns { sent } | { skipped, reason } | { failed, error }.
 */
export async function sendMail({ to, subject, text, html, replyTo, attachments }) {
  if (!smtpConfigured()) return { skipped: true, reason: 'SMTP_HOST is not set' };
  if (!isEmail(to)) return { skipped: true, reason: 'No valid recipient' };
  const s = smtpSettings();
  if (!s.from) return { skipped: true, reason: 'MAIL_FROM / SMTP_USER is not set' };
  try {
    const info = await transporter().sendMail({
      from: s.from,
      to: String(to).trim(),
      subject,
      text,
      ...(html ? { html } : {}),
      ...(replyTo && isEmail(replyTo) ? { replyTo } : {}),
      ...(attachments?.length ? { attachments } : {})
    });
    return { sent: true, messageId: info.messageId, accepted: info.accepted, rejected: info.rejected };
  } catch (error) {
    console.error('sendMail failed:', error?.message || error);
    return { failed: true, error: String(error?.message || error) };
  }
}

/** Opens a connection and authenticates without sending anything. */
export async function verifySmtp() {
  if (!smtpConfigured()) return { ok: false, error: 'SMTP_HOST is not set.' };
  const s = smtpSettings();
  if (!s.from) return { ok: false, error: 'MAIL_FROM (or SMTP_USER) is not set.' };
  try {
    await transporter().verify();
    return { ok: true, settings: { host: s.host, port: s.port, secure: s.secure, user: s.user, from: s.from } };
  } catch (error) {
    return { ok: false, error: String(error?.message || error), settings: { host: s.host, port: s.port, secure: s.secure, user: s.user, from: s.from } };
  }
}
