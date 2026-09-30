import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { now } from './util.js';
import { sheetHeaders } from './schema.js';
import { sheetsEnabled, ensureSheets, appendSheetRows, readSheetRows, updateSheetRow, deleteSheetRow } from './google.js';

const root = path.dirname(fileURLToPath(import.meta.url));
// Serverless filesystems are read-only apart from the temp directory, so the
// local fallback writes there when deployed. That storage is ephemeral by
// design - a real deployment must configure Google Sheets.
const dataFile = process.env.VERCEL
  ? path.join(os.tmpdir(), 'jetclicks-state.json')
  : path.join(root, '../../.data/state.json');

const emptyState = {
  bookings: [],
  conversations: [],
  logs: [],
  portfolio: [],
  settings: {
    agreementUrl: '/agreements/jetclicks-booking-waiver-placeholder.pdf',
    agreementName: 'JetClicks Booking Waiver & Agreement (Placeholder)'
  }
};

export function storageMode() {
  if (sheetsEnabled()) return 'google-sheets';
  return process.env.VERCEL ? 'ephemeral-tmp' : 'local-file';
}

async function readLocal() {
  try {
    const parsed = JSON.parse(await fs.readFile(dataFile, 'utf8'));
    return {
      ...structuredClone(emptyState),
      ...parsed,
      settings: { ...emptyState.settings, ...(parsed.settings || {}) }
    };
  } catch {
    await writeLocal(emptyState);
    return structuredClone(emptyState);
  }
}

async function writeLocal(state) {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(state, null, 2));
}

function localToRow(kind, item) {
  return sheetHeaders[kind].map((key) => {
    const value = item[key];
    if (value === undefined || value === null) return '';
    if (typeof value === 'boolean') return value ? 'true' : 'false';
    return value;
  });
}

function rowTo(kind, row) {
  const out = {};
  sheetHeaders[kind].forEach((key, index) => { out[key] = row[index] ?? ''; });
  return out;
}

function safeJson(value, fallback) {
  try { return JSON.parse(value); } catch { return fallback; }
}

function truthy(value) {
  return value === true || /^(true|yes|1)$/i.test(String(value ?? ''));
}

function byNewest(key) {
  return (a, b) => String(b?.[key] || '').localeCompare(String(a?.[key] || ''));
}

function normalizeBooking(booking) {
  return { ...booking, flagged: truthy(booking.flagged), agreementAccepted: truthy(booking.agreementAccepted), archived: truthy(booking.archived) };
}

function normalizeConversation(conversation) {
  const parsed = Array.isArray(conversation.messages)
    ? conversation.messages
    : safeJson(conversation.messagesJson, []);
  const copy = { ...conversation };
  delete copy.messagesJson;
  return { ...copy, name: String(conversation.name || ''), email: String(conversation.email || ''), phone: String(conversation.phone || ''), unread: truthy(conversation.unread), messages: Array.isArray(parsed) ? parsed : [] };
}

export async function getState() {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    return {
      bookings: state.bookings.map(normalizeBooking).sort(byNewest('createdAt')),
      conversations: state.conversations.map(normalizeConversation).sort(byNewest('updatedAt')),
      logs: [...state.logs].sort(byNewest('timestamp')),
      settings: state.settings
    };
  }
  await ensureSheets();
  const [bookings, conversations, logs, settings] = await Promise.all([
    readSheetRows('Bookings'),
    readSheetRows('Conversations'),
    readSheetRows('Logs'),
    readSheetRows('Settings')
  ]);
  return {
    bookings: bookings.filter((r) => r[0]).map((r) => normalizeBooking(rowTo('Bookings', r))).sort(byNewest('createdAt')),
    conversations: conversations.filter((r) => r[0]).map((r) => normalizeConversation(rowTo('Conversations', r))).sort(byNewest('updatedAt')),
    logs: logs.filter((r) => r[0]).map((r) => rowTo('Logs', r)).sort(byNewest('timestamp')),
    settings: { ...emptyState.settings, ...Object.fromEntries(settings.filter((r) => r[0]).map((r) => [r[0], r[1]])) }
  };
}

export async function addBooking(booking) {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    state.bookings.unshift(booking);
    await writeLocal(state);
    return booking;
  }
  await appendSheetRows('Bookings', [localToRow('Bookings', booking)]);
  return booking;
}

export async function updateBooking(booking) {
  booking.updatedAt = now();
  if (!sheetsEnabled()) {
    const state = await readLocal();
    const index = state.bookings.findIndex((x) => x.bookingId === booking.bookingId);
    if (index >= 0) state.bookings[index] = booking;
    else state.bookings.unshift(booking);
    await writeLocal(state);
    return booking;
  }
  const rows = await readSheetRows('Bookings');
  const index = rows.findIndex((r) => r[0] === booking.bookingId);
  if (index >= 0) await updateSheetRow('Bookings', index + 2, localToRow('Bookings', booking));
  return booking;
}

function conversationRow(conversation) {
  return localToRow('Conversations', { ...conversation, messagesJson: JSON.stringify(conversation.messages || []) });
}

export async function addConversation(conversation) {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    state.conversations.unshift(conversation);
    await writeLocal(state);
    return conversation;
  }
  await appendSheetRows('Conversations', [conversationRow(conversation)]);
  return conversation;
}

export async function updateConversation(conversation) {
  conversation.updatedAt = now();
  if (!sheetsEnabled()) {
    const state = await readLocal();
    const index = state.conversations.findIndex((x) => x.conversationId === conversation.conversationId);
    if (index >= 0) state.conversations[index] = conversation;
    else state.conversations.unshift(conversation);
    await writeLocal(state);
    return conversation;
  }
  const rows = await readSheetRows('Conversations');
  const index = rows.findIndex((r) => r[0] === conversation.conversationId);
  if (index < 0) await addConversation(conversation);
  else await updateSheetRow('Conversations', index + 2, conversationRow(conversation));
  return conversation;
}

export async function getConversation(conversationId) {
  if (!conversationId) return null;
  if (!sheetsEnabled()) {
    const state = await readLocal();
    const found = state.conversations.find((x) => x.conversationId === conversationId);
    return found ? normalizeConversation(found) : null;
  }
  await ensureSheets();
  const rows = await readSheetRows('Conversations');
  const row = rows.find((r) => r[0] === conversationId);
  return row ? normalizeConversation(rowTo('Conversations', row)) : null;
}

export async function deleteConversation(conversationId) {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    state.conversations = state.conversations.filter((x) => x.conversationId !== conversationId);
    await writeLocal(state);
    return;
  }
  const rows = await readSheetRows('Conversations');
  const index = rows.findIndex((r) => r[0] === conversationId);
  if (index >= 0) await deleteSheetRow('Conversations', index + 2);
}

export async function addLog(log) {
  try {
    if (!sheetsEnabled()) {
      const state = await readLocal();
      state.logs.unshift(log);
      state.logs = state.logs.slice(0, 1000);
      await writeLocal(state);
      return;
    }
    await appendSheetRows('Logs', [localToRow('Logs', log)]);
  } catch (error) {
    // Audit logging must never break the user-facing action.
    console.error('addLog failed:', error?.message || error);
  }
}

export async function getPortfolio() {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    return [...(state.portfolio || [])].sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  }
  await ensureSheets();
  const rows = await readSheetRows('Portfolio');
  return rows
    .filter((r) => r[0])
    .map((r) => rowTo('Portfolio', r))
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
}

export async function addPortfolioItem(item) {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    state.portfolio = state.portfolio || [];
    state.portfolio.push(item);
    await writeLocal(state);
    return item;
  }
  await appendSheetRows('Portfolio', [localToRow('Portfolio', item)]);
  return item;
}

export async function deletePortfolioItem(id) {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    state.portfolio = (state.portfolio || []).filter((x) => x.id !== id);
    await writeLocal(state);
    return;
  }
  const rows = await readSheetRows('Portfolio');
  const index = rows.findIndex((r) => r[0] === id);
  if (index >= 0) await deleteSheetRow('Portfolio', index + 2);
}

export async function getSettings() {
  if (!sheetsEnabled()) return (await readLocal()).settings;
  await ensureSheets();
  const rows = await readSheetRows('Settings');
  if (!rows.length) {
    await appendSheetRows('Settings', [
      ['agreementUrl', emptyState.settings.agreementUrl],
      ['agreementName', emptyState.settings.agreementName]
    ]);
    return { ...emptyState.settings };
  }
  return { ...emptyState.settings, ...Object.fromEntries(rows.filter((r) => r[0]).map((r) => [r[0], r[1]])) };
}

export async function setSetting(key, value) {
  if (!sheetsEnabled()) {
    const state = await readLocal();
    state.settings[key] = value;
    await writeLocal(state);
    return;
  }
  const rows = await readSheetRows('Settings');
  const index = rows.findIndex((r) => r[0] === key);
  if (index >= 0) await updateSheetRow('Settings', index + 2, [key, value]);
  else await appendSheetRows('Settings', [[key, value]]);
}
