import { json } from './_lib/util.js';
import { sheetsEnabled, driveEnabled } from './_lib/google.js';
import { smtpConfigured } from './_lib/smtp.js';
import { adminConfigured } from './_lib/auth.js';

export default function handler(req, res) {
  json(res, 200, {
    ok: true,
    storage: sheetsEnabled() ? 'google-sheets' : (process.env.VERCEL ? 'ephemeral-tmp' : 'local-file'),
    drive: driveEnabled() ? 'google-drive' : 'disabled',
    smtp: smtpConfigured(),
    adminConfigured: adminConfigured(),
    timestamp: new Date().toISOString()
  });
}
