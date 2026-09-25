import { LOGO_BASE64 } from './logo.js';

/**
 * Branded HTML wrapper for studio mail. Table-based and inline-styled because
 * Outlook and most webmail strip <style> blocks and ignore flex/grid.
 */

const INK = '#171715';
const MUTED = '#6d6a63';
const LINE = '#d9d5cc';
const PAPER = '#f5f3ef';
const ACCENT = '#b15c3e';
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Arial, 'Helvetica Neue', Helvetica, sans-serif";

export const LOGO_CID = 'jetclicks-logo';

/** Attach once per message; referenced by the layout as cid:jetclicks-logo. */
export function logoAttachment() {
  return {
    filename: 'jetclicks-logo.png',
    content: Buffer.from(LOGO_BASE64, 'base64'),
    contentType: 'image/png',
    cid: LOGO_CID
  };
}

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** Label/value pairs rendered as a bordered detail table. */
function detailRows(rows = []) {
  if (!rows.length) return '';
  const cells = rows
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid ${LINE};font-family:${SANS};font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};white-space:nowrap;vertical-align:top;width:38%">${esc(label)}</td>
          <td style="padding:11px 0 11px 16px;border-bottom:1px solid ${LINE};font-family:${SANS};font-size:14px;color:${INK};vertical-align:top">${esc(value)}</td>
        </tr>`
    )
    .join('');
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:22px 0 4px">${cells}</table>`;
}

/**
 * @param {object} o
 * @param {string} o.preheader Inbox preview line; hidden in the body.
 * @param {string} o.heading   Serif headline.
 * @param {string[]} o.paragraphs
 * @param {[string, string][]} [o.rows]
 * @param {{label:string,url:string}} [o.cta]
 * @param {string} [o.footerNote]
 */
export function emailLayout({ preheader = '', heading, paragraphs = [], rows = [], cta, footerNote = '' }) {
  const body = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 15px;font-family:${SANS};font-size:15px;line-height:1.7;color:${INK}">${p}</p>`
    )
    .join('');

  const button = cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 6px">
         <tr><td style="background:${INK}">
           <a href="${esc(cta.url)}" style="display:inline-block;padding:14px 22px;font-family:${SANS};font-size:13px;letter-spacing:.04em;color:#ffffff;text-decoration:none">${esc(cta.label)}</a>
         </td></tr>
       </table>`
    : '';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};-webkit-font-smoothing:antialiased">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${PAPER}">${esc(preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${PAPER}">
    <tr>
      <td align="center" style="padding:32px 16px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${LINE}">
          <tr>
            <td style="padding:34px 40px 0" align="left">
              <img src="cid:${LOGO_CID}" width="118" alt="JetClicks Photography" style="display:block;width:118px;height:auto;border:0;outline:none">
            </td>
          </tr>
          <tr>
            <td style="padding:26px 40px 0">
              <h1 style="margin:0 0 18px;font-family:${SERIF};font-size:27px;line-height:1.25;font-weight:normal;color:${INK}">${esc(heading)}</h1>
              ${body}
              ${detailRows(rows)}
              ${button}
            </td>
          </tr>
          <tr>
            <td style="padding:30px 40px 34px">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${LINE}">
                <tr><td style="padding-top:18px;font-family:${SANS};font-size:13px;font-weight:bold;color:${INK}">JetClicks Photography</td></tr>
                <tr><td style="padding-top:4px;font-family:${SANS};font-size:12px;color:${MUTED}">Weddings, prenup, proposals and celebrations &middot; Philippines</td></tr>
                <tr><td style="padding-top:4px;font-family:${SANS};font-size:12px">
                  <a href="mailto:jetclicksphotography@gmail.com" style="color:${ACCENT};text-decoration:none">jetclicksphotography@gmail.com</a>
                </td></tr>
                ${footerNote ? `<tr><td style="padding-top:14px;font-family:${SANS};font-size:11px;line-height:1.6;color:${MUTED}">${esc(footerNote)}</td></tr>` : ''}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
