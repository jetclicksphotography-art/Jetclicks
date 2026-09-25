import { addConversation, addLog, getConversation, updateConversation } from './_lib/store.js';
import { cleanText, id, isEmail, json, now, parseBody, queryParam } from './_lib/util.js';
import { clientIp, rateLimit } from './_lib/auth.js';
import { sendMail, smtpConfigured } from './_lib/smtp.js';

const DEFAULT_SUGGESTIONS = ['Check availability', 'Ask about packages', 'How booking works', 'Talk to JetClicks'];

const RULES = [
  {
    match: /price|pricing|cost|rate|quote|package|budget|how much|magkano/i,
    reply: 'Packages are built around coverage hours and the type of shoot. Portrait sessions start at the short-coverage tier, while weddings and debuts are quoted per day. Tell me the type of shoot, the date, and roughly how many hours you need, and the studio can send exact pricing.',
    suggestions: ['Wedding coverage', 'Portrait session', 'Get a custom quote', 'Talk to JetClicks']
  },
  {
    match: /avail|free|open|slot|schedule|calendar|date/i,
    reply: 'Availability is confirmed per date by the studio. The quickest way is the inquiry form - share your date and location and it goes straight into the booking queue, usually answered within one business day.',
    suggestions: ['Start an inquiry', 'How booking works', 'Talk to JetClicks']
  },
  {
    match: /book|reserve|deposit|process|steps|how do i/i,
    reply: 'Booking runs in four steps: 1) send the inquiry form, 2) the studio confirms the date and the package, 3) you read and accept the waiver / agreement PDF, 4) the schedule is locked in. No payment is taken on the website.',
    suggestions: ['Start an inquiry', 'Ask about packages', 'Talk to JetClicks']
  },
  {
    match: /wedding|debut|engagement|prenup/i,
    reply: 'Weddings and debuts are the studio\'s main coverage. A typical day runs from preparation through the reception, with a lead photographer plus support. Share the date, venue, and the hours you need and the studio will map out the coverage.',
    suggestions: ['Wedding coverage', 'Check availability', 'Start an inquiry']
  },
  {
    match: /portrait|headshot|graduation|family|solo/i,
    reply: 'Portrait and headshot sessions are short-form coverage, usually one to two hours at a studio or outdoor location, with edited images delivered after selection.',
    suggestions: ['Portrait session', 'Ask about packages', 'Start an inquiry']
  },
  {
    match: /corporate|event|product|commercial|brand|catalog/i,
    reply: 'Corporate, event, and product work is quoted per scope - number of setups, hours on site, and how the images will be used. Tell me the scope and the studio can prepare a quote.',
    suggestions: ['Get a custom quote', 'Start an inquiry', 'Talk to JetClicks']
  },
  {
    match: /deliver|turnaround|how long|edit|raw|album|file|gallery/i,
    reply: 'Edited galleries are delivered online after post-processing. Turnaround depends on coverage size, and the studio confirms the exact delivery window when the booking is set.',
    suggestions: ['How booking works', 'Talk to JetClicks']
  },
  {
    match: /where|located|location|travel|venue|address|area/i,
    reply: 'The studio travels for shoots. Share the venue or city in your inquiry and the team will confirm coverage and any travel considerations for that location.',
    suggestions: ['Start an inquiry', 'Check availability']
  },
  {
    match: /cancel|resched|refund|move the date|postpone/i,
    reply: 'Rescheduling and cancellation terms are written in the waiver / agreement PDF linked on the booking page. For a specific case it is best to talk to the studio directly.',
    suggestions: ['Talk to JetClicks', 'How booking works']
  },
  {
    match: /human|person|staff|team|agent|someone|talk to|real/i,
    reply: 'I can hand this to the studio team. Tap "Talk to JetClicks" and this conversation moves into the private studio inbox - leave your email so they can reach you if you close the page.',
    suggestions: ['Talk to JetClicks', 'Keep chatting']
  },
  {
    match: /^(hi|hello|hey|good (morning|afternoon|evening)|kumusta|kamusta)\b/i,
    reply: 'Hello! I can help with availability, packages, the booking process, and delivery questions. What are you planning?',
    suggestions: DEFAULT_SUGGESTIONS
  },
  {
    match: /thank|salamat|thanks|ty\b/i,
    reply: 'Happy to help. If you would like the studio to follow up, start an inquiry or tap "Talk to JetClicks".',
    suggestions: ['Start an inquiry', 'Talk to JetClicks']
  }
];

export function botReply(text = '', context = {}) {
  const value = String(text || '').trim();
  for (const rule of RULES) {
    if (rule.match.test(value)) return { text: rule.reply, suggestions: rule.suggestions };
  }
  if (context.service) {
    return {
      text: `For ${context.service}, the studio mainly needs your date, location, coverage hours, and a little context about the day. Share those and I can pass them along.`,
      suggestions: ['Start an inquiry', 'Ask about packages', 'Talk to JetClicks']
    };
  }
  return {
    text: 'I can help with availability, packages, the booking steps, and delivery. If you would rather speak to a person, tap "Talk to JetClicks" and the studio team picks it up from here.',
    suggestions: DEFAULT_SUGGESTIONS
  };
}

function publicView(conversation) {
  return {
    conversationId: conversation.conversationId,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    status: conversation.status,
    name: conversation.name,
    email: conversation.email,
    messages: conversation.messages || []
  };
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const conversationId = cleanText(queryParam(req, 'conversationId'), 100);
      if (!conversationId) return json(res, 200, { conversation: null });
      const conversation = await getConversation(conversationId);
      return json(res, 200, { conversation: conversation ? publicView(conversation) : null });
    }
    if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

    const limit = rateLimit(`chat:${clientIp(req)}`, 40, 60_000);
    if (!limit.allowed) {
      res.setHeader('Retry-After', String(limit.retryAfter));
      return json(res, 429, { error: 'You are sending messages too quickly. Please wait a moment.' });
    }

    const body = await parseBody(req);
    const text = cleanText(body.text, 2000);
    if (!text) return json(res, 400, { error: 'Message is required' });

    const handoff = body.handoff === true;
    const requestedId = cleanText(body.conversationId, 100);
    let conversation = requestedId ? await getConversation(requestedId) : null;
    const isNew = !conversation;
    if (!conversation) {
      conversation = {
        conversationId: id('chat'),
        createdAt: now(),
        updatedAt: now(),
        status: 'open',
        name: '',
        email: '',
        source: 'website-chat',
        unread: true,
        messages: []
      };
    }

    const name = cleanText(body.name, 120);
    const email = cleanText(body.email, 160);
    if (name) conversation.name = name;
    if (email && isEmail(email)) conversation.email = email;

    conversation.messages = (conversation.messages || []).slice(-100);
    conversation.messages.push({ id: id('msg'), at: now(), from: 'client', text });

    // Once a studio member has answered, the visitor is talking to a person.
    // The bot stays quiet rather than interleaving canned replies with a real
    // conversation - the same applies while a handoff is pending.
    const studioHasReplied = (conversation.messages || []).some((m) => m.from === 'admin');
    const liveWithStudio = studioHasReplied || conversation.status === 'needs-human';

    const reply = handoff
      ? {
          text: 'Thanks - this conversation is now flagged for the JetClicks studio team. A team member can reply right here, and if you left an email they can reach you there too.',
          suggestions: ['Keep chatting', 'Start an inquiry']
        }
      : liveWithStudio
        ? { text: '', suggestions: ['Start an inquiry'], live: true }
        : botReply(text, { service: cleanText(body.service, 100) });

    if (reply.text) {
      conversation.messages.push({ id: id('msg'), at: now(), from: 'bot', text: reply.text });
    }
    if (handoff) conversation.status = 'needs-human';
    // Anything the visitor sends is unread for the studio until an admin replies.
    conversation.unread = true;

    if (isNew) await addConversation(conversation);
    else await updateConversation(conversation);

    await addLog({
      timestamp: now(),
      actor: 'client',
      action: handoff ? 'conversation.handoff' : 'conversation.message',
      entityType: 'conversation',
      entityId: conversation.conversationId,
      metadataJson: JSON.stringify({ name: conversation.name, email: conversation.email, handoff })
    });

    // A handoff is the one chat event worth interrupting the studio for.
    if (handoff && smtpConfigured() && process.env.ADMIN_EMAIL) {
      // Awaited: a serverless instance can be frozen the moment the response is sent.
      await sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: 'JetClicks - a visitor asked for the studio team',
        replyTo: conversation.email || undefined,
        text: [
          'A website visitor asked to talk to the studio team.',
          '',
          `Name: ${conversation.name || 'Not provided'}`,
          `Email: ${conversation.email || 'Not provided'}`,
          `Conversation: ${conversation.conversationId}`,
          '',
          'Last message:',
          text,
          '',
          'Open the studio console to reply.'
        ].join('\n')
      });
    }

    return json(res, 200, { ok: true, conversation: publicView(conversation), reply });
  } catch (error) {
    console.error('chat', error);
    return json(res, 500, { error: 'Chat service unavailable.' });
  }
}
