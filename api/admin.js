import { addLog, deleteConversation, getState, storageMode, updateBooking, updateConversation } from './_lib/store.js';
import { sendMail, smtpConfigured, smtpSettings, verifySmtp } from './_lib/smtp.js';
import { driveEnabled } from './_lib/google.js';
import { requireAdmin } from './_lib/auth.js';
import { cleanText, id, isEmail, json, now, parseBody } from './_lib/util.js';

const BOOKING_STATUSES = ['new', 'confirmed', 'ongoing', 'finished', 'cancelled'];

/** Per-conversation summary the inbox list is built from. */
function summarize(conversation) {
  const messages = conversation.messages || [];
  const last = messages[messages.length - 1];
  const lastClient = [...messages].reverse().find((m) => m.from === 'client');
  return {
    ...conversation,
    messageCount: messages.length,
    clientMessageCount: messages.filter((m) => m.from === 'client').length,
    lastMessageAt: last?.at || conversation.updatedAt,
    lastMessageFrom: last?.from || '',
    lastMessagePreview: cleanText(last?.text || '', 140),
    lastClientMessageAt: lastClient?.at || ''
  };
}

export default async function handler(req, res) {
  try {
    if (!requireAdmin(req, res, json)) return;

    if (req.method === 'GET') {
      const state = await getState();
      const smtp = smtpSettings();
      return json(res, 200, {
        bookings: state.bookings,
        conversations: state.conversations.map(summarize),
        logs: state.logs.slice(0, 200),
        settings: state.settings,
        system: {
          storage: storageMode(),
          drive: driveEnabled(),
          smtpConfigured: smtpConfigured(),
          smtpHost: smtp.host,
          smtpPort: smtp.port,
          smtpSecure: smtp.secure,
          mailFrom: smtp.from,
          adminEmail: smtp.adminEmail,
          serverTime: now()
        }
      });
    }

    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
    const body = await parseBody(req);
    const action = cleanText(body.action, 40);

    if (action === 'smtp.test') {
      const verification = await verifySmtp();
      if (!verification.ok) return json(res, 200, { ok: false, stage: 'connection', ...verification });
      const target = cleanText(body.to, 160) || smtpSettings().adminEmail;
      if (!target || !isEmail(target)) {
        return json(res, 200, { ok: true, stage: 'connection', verified: true, note: 'Connection and login succeeded. Set ADMIN_EMAIL or pass a test recipient to send a test message.', settings: verification.settings });
      }
      const result = await sendMail({
        to: target,
        subject: 'JetClicks - SMTP test',
        text: `This is a JetClicks SMTP test message sent at ${now()}.\n\nIf you are reading this, outgoing studio mail is working.`
      });
      await addLog({ timestamp: now(), actor: 'admin', action: 'smtp.test', entityType: 'system', entityId: target, metadataJson: JSON.stringify({ sent: Boolean(result.sent), error: result.error || '' }) });
      return json(res, 200, { ok: Boolean(result.sent), stage: 'send', verified: true, to: target, settings: verification.settings, ...result });
    }

    const state = await getState();

    if (action === 'booking.update') {
      const booking = state.bookings.find((x) => x.bookingId === cleanText(body.bookingId, 100));
      if (!booking) return json(res, 404, { error: 'Booking not found' });
      const previousStatus = booking.status;
      if (body.status !== undefined) {
        const status = cleanText(body.status, 30);
        if (!BOOKING_STATUSES.includes(status)) return json(res, 400, { error: 'Unknown booking status.' });
        booking.status = status;
      }
      if (typeof body.flagged === 'boolean') booking.flagged = body.flagged;
      if (body.notes !== undefined) booking.notes = cleanText(body.notes, 2000);
      await updateBooking(booking);
      await addLog({
        timestamp: now(), actor: 'admin', action: 'booking.updated', entityType: 'booking', entityId: booking.bookingId,
        metadataJson: JSON.stringify({ status: booking.status, flagged: booking.flagged })
      });

      // Status changes are what the client actually cares about.
      if (body.notifyClient === true && booking.status !== previousStatus && booking.email) {
        await sendMail({
          to: booking.email,
          subject: `JetClicks - your booking is now ${booking.status}`,
          text: `Hi ${booking.name || 'there'},\n\nYour JetClicks booking request (${booking.bookingId}) for ${booking.date || 'your requested date'} is now marked "${booking.status}".\n\n${cleanText(body.notes, 1000) || ''}\n\nThank you,\nJetClicks`
        });
      }
      return json(res, 200, { ok: true, booking });
    }

    if (action === 'conversation.reply') {
      const conversation = state.conversations.find((x) => x.conversationId === cleanText(body.conversationId, 100));
      if (!conversation) return json(res, 404, { error: 'Conversation not found' });
      const text = cleanText(body.text, 4000);
      if (!text) return json(res, 400, { error: 'Reply is required' });

      conversation.messages = conversation.messages || [];
      conversation.messages.push({ id: id('admin'), at: now(), from: 'admin', text });
      conversation.status = 'open';
      conversation.unread = false;
      await updateConversation(conversation);
      await addLog({
        timestamp: now(), actor: 'admin', action: 'conversation.reply', entityType: 'conversation', entityId: conversation.conversationId,
        metadataJson: JSON.stringify({ email: conversation.email })
      });

      let mail = { skipped: true, reason: 'No email on file for this visitor.' };
      if (conversation.email && body.emailCopy !== false) {
        mail = await sendMail({
          to: conversation.email,
          subject: 'JetClicks - message from the studio',
          text: `Hi ${conversation.name || 'there'},\n\nThe JetClicks studio replied to your conversation:\n\n${text}\n\nYou can continue the conversation in the chat window on our website.\n\nJetClicks`
        });
      }
      return json(res, 200, { ok: true, conversation: summarize(conversation), mail });
    }

    if (action === 'conversation.read') {
      const conversation = state.conversations.find((x) => x.conversationId === cleanText(body.conversationId, 100));
      if (!conversation) return json(res, 404, { error: 'Conversation not found' });
      if (conversation.unread) {
        conversation.unread = false;
        await updateConversation(conversation);
      }
      return json(res, 200, { ok: true });
    }

    if (action === 'conversation.close') {
      const conversation = state.conversations.find((x) => x.conversationId === cleanText(body.conversationId, 100));
      if (!conversation) return json(res, 404, { error: 'Conversation not found' });
      await deleteConversation(conversation.conversationId);
      await addLog({
        timestamp: now(), actor: 'admin', action: 'conversation.closed_and_deleted', entityType: 'conversation', entityId: conversation.conversationId,
        metadataJson: JSON.stringify({ messageCount: conversation.messages?.length || 0, name: conversation.name, email: conversation.email })
      });
      return json(res, 200, { ok: true });
    }

    return json(res, 400, { error: 'Unknown action' });
  } catch (error) {
    console.error('admin', error);
    return json(res, 500, { error: 'Admin action failed: ' + (error?.message || 'unknown error') });
  }
}
