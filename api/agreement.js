import { addLog, getSettings, setSetting } from './_lib/store.js';
import { driveEnabled, uploadPdfToDrive } from './_lib/google.js';
import { requireAdmin } from './_lib/auth.js';
import { cleanText, json, now, parseBody } from './_lib/util.js';

export default async function handler(req, res) {
  try {
    // The current agreement link is public: the booking form has to show it.
    if (req.method === 'GET') {
      const settings = await getSettings();
      return json(res, 200, { name: settings.agreementName, url: settings.agreementUrl });
    }
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
    if (!requireAdmin(req, res, json)) return;

    if (!driveEnabled()) {
      return json(res, 503, { error: 'Google Drive is not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_DRIVE_FOLDER_ID to upload a new agreement.' });
    }

    const body = await parseBody(req);
    const name = cleanText(body.name, 150) || 'JetClicks Booking Waiver & Agreement.pdf';
    const base64 = cleanText(body.base64, 7_500_000);
    if (!base64) return json(res, 400, { error: 'PDF data is required' });
    if (!/^JVBERi0/.test(base64)) return json(res, 400, { error: 'Only PDF files are accepted.' });

    const buffer = Buffer.from(base64, 'base64');
    if (buffer.length > 3_000_000) return json(res, 400, { error: 'PDF must be 3MB or smaller.' });
    if (buffer.subarray(0, 5).toString('latin1') !== '%PDF-') return json(res, 400, { error: 'That file is not a valid PDF.' });

    const uploaded = await uploadPdfToDrive({ name, buffer });
    if (!uploaded) return json(res, 503, { error: 'Google Drive upload failed.' });

    const url = uploaded.publicUrl || uploaded.webViewLink;
    await setSetting('agreementUrl', url);
    await setSetting('agreementName', name);
    await setSetting('agreementId', uploaded.id || '');
    await addLog({
      timestamp: now(), actor: 'admin', action: 'agreement.updated', entityType: 'agreement', entityId: uploaded.id || '',
      metadataJson: JSON.stringify({ name, url })
    });
    return json(res, 200, { ok: true, name, url, id: uploaded.id });
  } catch (error) {
    console.error('agreement', error);
    return json(res, 500, { error: 'Agreement upload failed: ' + (error?.message || 'unknown error') });
  }
}
