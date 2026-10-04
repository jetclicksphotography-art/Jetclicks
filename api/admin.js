import { addLog, addPortfolioItem, deleteConversation, deletePortfolioItem, getPortfolio, getState, setSetting, storageMode, updateBooking, updateConversation } from './_lib/store.js';
import { sendMail, smtpConfigured, smtpSettings, verifySmtp } from './_lib/smtp.js';
import { deleteFileAsUser, driveEnabled, driveUploadEnabled, uploadFileAsUser } from './_lib/google.js';
import { requireAdmin } from './_lib/auth.js';
import { cleanText, id, isEmail, json, now, parseBody } from './_lib/util.js';
import { homeMessageResponse, parseHomeMessageConfig } from './_lib/home-messages.js';

const BOOKING_STATUSES = ['new', 'confirmed', 'ongoing', 'finished', 'cancelled'];
const PORTFOLIO_CATEGORIES = ['Wedding', 'Prenup', 'Proposal', 'Birthdays', 'Portrait', 'Island tour', 'Family', 'Drones', 'Corporate', 'Ceremony'];

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
        homeMessage: homeMessageResponse(state.settings),
        system: {
          storage: storageMode(),
          drive: driveEnabled(),
          driveUpload: driveUploadEnabled(),
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

    if (action === 'home-message.update') {
      const mode = cleanText(body.mode, 20);
      const templateId = cleanText(body.templateId, 40);
      const customText = cleanText(body.customText, 1400);

      if (!['default', 'template', 'custom'].includes(mode)) {
        return json(res, 400, { error: 'Choose a valid Home message mode.' });
      }

      if (mode === 'template' && !templateId) {
        return json(res, 400, { error: 'Choose a Home message template.' });
      }
      if (mode === 'custom' && !customText) {
        return json(res, 400, { error: 'Write a Home page paragraph or choose a template.' });
      }

      const template = homeMessageResponse({}).templates.find((item) => item.id === templateId);
      if (mode === 'template' && !template) {
        return json(res, 400, { error: 'That Home message template is not available.' });
      }

      const config = parseHomeMessageConfig({
        homeMessageConfig: JSON.stringify({ mode, templateId: templateId || 'message-1', customText })
      });
      await setSetting('homeMessageConfig', JSON.stringify({
        mode: config.mode,
        templateId: config.templateId,
        customText: config.customText
      }));
      await addLog({
        timestamp: now(),
        actor: 'admin',
        action: 'home-message.updated',
        entityType: 'settings',
        entityId: 'home-message',
        metadataJson: JSON.stringify({ mode: config.mode, templateId: config.templateId, hasCustomText: Boolean(config.customText) })
      });
      return json(res, 200, { ok: true, homeMessage: homeMessageResponse({ homeMessageConfig: JSON.stringify({ mode: config.mode, templateId: config.templateId, customText: config.customText }) }) });
    }

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


    if (action === 'portfolio.add') {
      if (!driveUploadEnabled()) {
        return json(res, 503, { error: 'Photo uploads need the studio Google account connected. Set GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET and GOOGLE_OAUTH_REFRESH_TOKEN (see SECURITY.md / setup).' });
      }
      const category = cleanText(body.category, 30);
      if (!PORTFOLIO_CATEGORIES.includes(category)) return json(res, 400, { error: 'Choose a valid category.' });
      const caption = cleanText(body.caption, 120);
      const alt = cleanText(body.alt, 300) || caption;
      const base64 = cleanText(body.base64, 1_700_000);
      if (!base64) return json(res, 400, { error: 'Image data is required.' });
      // Accept the compact formats produced by current and older clients.
      const buffer = Buffer.from(base64, 'base64');
      const isWebp = buffer.length > 12 &&
        buffer.subarray(0, 4).toString('latin1') === 'RIFF' &&
        buffer.subarray(8, 12).toString('latin1') === 'WEBP';
      const isJpeg = buffer.length > 3 &&
        buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
      if (!isWebp && !isJpeg) return json(res, 400, { error: 'Image must be a JPEG or WebP file.' });
      if (buffer.length > 900_000) return json(res, 400, { error: 'Image must be 900KB or smaller after conversion.' });

      const itemId = id('photo');
      const mimeType = isJpeg ? 'image/jpeg' : 'image/webp';
      const uploaded = await uploadFileAsUser({ name: `${itemId}.${isJpeg ? 'jpg' : 'webp'}`, buffer, mimeType });
      if (!uploaded?.id) return json(res, 503, { error: 'Drive upload failed.' });

      const existing = await getPortfolio();
      const item = {
        id: itemId,
        createdAt: now(),
        category,
        caption,
        alt,
        driveId: uploaded.id,
        order: String(existing.length + 1),
      };
      await addPortfolioItem(item);
      await addLog({
        timestamp: now(), actor: 'admin', action: 'portfolio.added', entityType: 'portfolio', entityId: itemId,
        metadataJson: JSON.stringify({ category, caption, driveId: uploaded.id })
      });
      return json(res, 200, { ok: true, item });
    }

    if (action === 'portfolio.delete') {
      const targetId = cleanText(body.id, 100);
      const item = (await getPortfolio()).find((x) => x.id === targetId);
      if (!item) return json(res, 404, { error: 'Photo not found.' });
      await deletePortfolioItem(targetId);
      await deleteFileAsUser(item.driveId);
      await addLog({
        timestamp: now(), actor: 'admin', action: 'portfolio.deleted', entityType: 'portfolio', entityId: targetId,
        metadataJson: JSON.stringify({ category: item.category, driveId: item.driveId })
      });
      return json(res, 200, { ok: true });
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
      if (typeof body.archived === 'boolean') booking.archived = body.archived;
      if (body.notes !== undefined) booking.notes = cleanText(body.notes, 2000);
      await updateBooking(booking);
      await addLog({
        timestamp: now(), actor: 'admin', action: 'booking.updated', entityType: 'booking', entityId: booking.bookingId,
        metadataJson: JSON.stringify({ status: booking.status, flagged: booking.flagged, archived: booking.archived })
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
