import { cleanText, id, isEmail, json, now, parseBody } from './_lib/util.js';
import { addBooking, addLog, getSettings } from './_lib/store.js';
import { clientIp, rateLimit } from './_lib/auth.js';
import { sendMail } from './_lib/smtp.js';
import { emailLayout, logoAttachment } from './_lib/email-template.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  try {
    const limit = rateLimit(`inquiry:${clientIp(req)}`, 6, 10 * 60_000);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfter));
      return json(res, 429, { error: 'Too many inquiries from this connection. Please try again shortly.' });
    }

    const body = await parseBody(req);
    for (const key of ['date', 'location', 'name', 'email']) {
      if (!cleanText(body[key])) return json(res, 400, { error: `${key} is required` });
    }
    if (!isEmail(body.email)) return json(res, 400, { error: 'Please enter a valid email address.' });
    if (body.agreementAccepted !== true) return json(res, 400, { error: 'Agreement must be accepted before submitting.' });

    const settings = await getSettings();
    if (cleanText(body.agreementId, 300) !== cleanText(settings.agreementUrl, 300)) {
      return json(res, 400, { error: 'Please refresh the page and accept the current agreement PDF before submitting.' });
    }

    const booking = {
      bookingId: id('book'),
      createdAt: now(),
      updatedAt: now(),
      status: 'new',
      flagged: false,
      service: cleanText(body.service, 100),
      date: cleanText(body.date, 30),
      location: cleanText(body.location, 300),
      coverage: cleanText(body.coverage, 60),
      guests: cleanText(body.guests, 50),
      name: cleanText(body.name, 120),
      email: cleanText(body.email, 160),
      phone: cleanText(body.phone, 80),
      message: cleanText(body.message, 4000),
      agreementAccepted: true,
      agreementId: cleanText(body.agreementId, 300),
      notes: '',
      archived: false
    };

    await addBooking(booking);
    await addLog({
      timestamp: now(), actor: 'client', action: 'booking.created', entityType: 'booking', entityId: booking.bookingId,
      metadataJson: JSON.stringify({ service: booking.service, date: booking.date, email: booking.email })
    });

    const clientMail = sendMail({
      to: booking.email,
      subject: 'We received your inquiry - JetClicks Photography',
      text: [
        `Hi ${booking.name},`,
        '',
        `Thank you for your inquiry. We received your request for ${booking.date} and the studio will`,
        'review availability and follow up within one business day with coverage options and pricing.',
        '',
        `Reference: ${booking.bookingId}`,
        `Service: ${booking.service}`,
        `Date: ${booking.date}`,
        `Location: ${booking.location}`,
        `Coverage: ${booking.coverage}`,
        '',
        'You can reply directly to this email if anything needs correcting.',
        '',
        'Warm regards,',
        'JetClicks Photography'
      ].join('\n'),
      html: emailLayout({
        preheader: `Your inquiry for ${booking.date} is with the studio.`,
        heading: 'Thank you for your inquiry',
        paragraphs: [
          `Hi ${booking.name},`,
          'We have received your request. The studio will review availability and follow up within one business day with coverage options and pricing.',
          'Here is what we have on file:'
        ],
        rows: [
          ['Reference', booking.bookingId],
          ['Service', booking.service],
          ['Date', booking.date],
          ['Location', booking.location],
          ['Coverage', booking.coverage],
          ['Guests', booking.guests]
        ],
        footerNote: 'You are receiving this because an inquiry was submitted on the JetClicks website. Reply to this email if anything needs correcting.'
      }),
      attachments: [logoAttachment()]
    });

    const studioMail = process.env.ADMIN_EMAIL
      ? sendMail({
          to: process.env.ADMIN_EMAIL,
          replyTo: booking.email,
          subject: `New JetClicks booking inquiry - ${booking.name}`,
          text: [
            'New booking inquiry',
            '',
            `Reference: ${booking.bookingId}`,
            `Name: ${booking.name}`,
            `Email: ${booking.email}`,
            `Phone: ${booking.phone || 'Not provided'}`,
            `Service: ${booking.service}`,
            `Date: ${booking.date}`,
            `Location: ${booking.location}`,
            `Coverage: ${booking.coverage}`,
            `Guests: ${booking.guests || 'Not provided'}`,
            '',
            'Message:',
            booking.message || '(none)',
            '',
            'Agreement accepted: yes',
            `Agreement: ${settings.agreementName}`
          ].join('\n'),
          html: emailLayout({
            preheader: `${booking.service} on ${booking.date} - ${booking.location}`,
            heading: 'New booking inquiry',
            paragraphs: [`${booking.name} submitted an inquiry through the website.`],
            rows: [
              ['Reference', booking.bookingId],
              ['Name', booking.name],
              ['Email', booking.email],
              ['Phone', booking.phone || 'Not provided'],
              ['Service', booking.service],
              ['Date', booking.date],
              ['Location', booking.location],
              ['Coverage', booking.coverage],
              ['Guests', booking.guests || 'Not provided'],
              ['Message', booking.message || '(none)'],
              ['Agreement', settings.agreementName]
            ],
            footerNote: 'Sent automatically by the JetClicks website. Reply to this email to answer the client directly.'
          }),
          attachments: [logoAttachment()]
        })
      : Promise.resolve({ skipped: true, reason: 'ADMIN_EMAIL is not set' });

    const [client, studio] = await Promise.all([clientMail, studioMail]);
    return json(res, 201, {
      ok: true,
      booking,
      mail: { client: Boolean(client?.sent), studio: Boolean(studio?.sent) }
    });
  } catch (error) {
    console.error('inquiries', error);
    return json(res, 500, { error: 'Unable to submit the inquiry right now.' });
  }
}
