import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Flag, LogOut, Mail, MessageSquare, RefreshCw, Send, Trash2, Upload } from "lucide-react";
import type { AdminLog, BookingRecord, Conversation } from "../types";
import { ApiError, api } from "../lib/api";

const bookingStatuses: BookingRecord["status"][] = ["new", "confirmed", "ongoing", "finished", "cancelled"];
const tabs = ["dashboard", "inbox", "bookings", "logs", "agreement", "system"] as const;
type Tab = (typeof tabs)[number];

interface SystemInfo {
  storage: string;
  drive: boolean;
  smtpConfigured: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  mailFrom: string;
  adminEmail: string;
  serverTime: string;
}

interface AdminResponse {
  bookings: BookingRecord[];
  conversations: Conversation[];
  logs: AdminLog[];
  settings: { agreementName: string; agreementUrl: string };
  system: SystemInfo;
}

interface SmtpTestResult {
  ok: boolean;
  stage: string;
  error?: string;
  note?: string;
  to?: string;
  reason?: string;
}

function when(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function sinceLabel(value?: string) {
  if (!value) return "";
  const diff = Date.now() - new Date(value).getTime();
  if (Number.isNaN(diff)) return "";
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function AdminConsole() {
  const [gate, setGate] = useState<"checking" | "locked" | "unconfigured" | "open">("checking");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const [data, setData] = useState<AdminResponse | null>(null);
  const [activeConversation, setActiveConversation] = useState("");
  const [reply, setReply] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmClose, setConfirmClose] = useState(false);
  const threadRef = useRef<HTMLDivElement | null>(null);

  // Studio consoles are private by definition - keep them out of search results.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = "Studio console";
    return () => {
      meta.remove();
      document.title = previousTitle;
    };
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setData(await api<AdminResponse>("/api/admin"));
      setMessage("");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setGate("locked");
        setData(null);
        return;
      }
      if (error instanceof ApiError && error.code === "not-configured") {
        setGate("unconfigured");
        return;
      }
      setMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    api<{ configured: boolean; authenticated: boolean }>("/api/auth")
      .then((status) => {
        if (cancelled) return;
        if (!status.configured) setGate("unconfigured");
        else setGate(status.authenticated ? "open" : "locked");
      })
      .catch(() => !cancelled && setGate("locked"));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (gate !== "open") return;
    void refresh();
    const timer = window.setInterval(() => void refresh(), 10000);
    return () => window.clearInterval(timer);
  }, [gate, refresh]);

  const selected = useMemo(
    () => data?.conversations.find((x) => x.conversationId === activeConversation) || null,
    [data?.conversations, activeConversation],
  );

  useEffect(() => {
    if (!activeConversation && data?.conversations.length) {
      setActiveConversation(data.conversations[0].conversationId);
    }
  }, [activeConversation, data?.conversations]);

  useEffect(() => {
    setConfirmClose(false);
  }, [activeConversation]);

  useEffect(() => {
    // Keep the newest message in view as replies arrive.
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [selected?.messages.length, activeConversation]);

  // Opening a thread clears its unread marker for the whole studio.
  useEffect(() => {
    if (gate !== "open" || tab !== "inbox" || !selected?.unread) return;
    void api("/api/admin", {
      method: "POST",
      body: JSON.stringify({ action: "conversation.read", conversationId: selected.conversationId }),
    }).catch(() => undefined);
  }, [gate, tab, selected?.conversationId, selected?.unread]);

  const counts = useMemo(() => {
    const bookings = data?.bookings || [];
    const conversations = data?.conversations || [];
    return {
      newCount: bookings.filter((x) => x.status === "new").length,
      ongoing: bookings.filter((x) => x.status === "ongoing").length,
      finished: bookings.filter((x) => x.status === "finished").length,
      openChats: conversations.length,
      unread: conversations.filter((x) => x.unread).length,
      waiting: conversations.filter((x) => x.status === "needs-human").length,
      flagged: bookings.filter((x) => x.flagged).length,
    };
  }, [data]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    setSigningIn(true);
    setAuthError("");
    try {
      await api("/api/auth", { method: "POST", body: JSON.stringify({ action: "login", password }) });
      setPassword("");
      setGate("open");
    } catch (error) {
      setAuthError((error as Error).message);
    } finally {
      setSigningIn(false);
    }
  }

  async function signOut() {
    await api("/api/auth", { method: "POST", body: JSON.stringify({ action: "logout" }) }).catch(() => undefined);
    setData(null);
    setActiveConversation("");
    setGate("locked");
  }

  async function mutate(payload: object) {
    try {
      await api("/api/admin", { method: "POST", body: JSON.stringify(payload) });
      await refresh();
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) setGate("locked");
      setMessage((error as Error).message);
      return false;
    }
  }

  async function sendReply() {
    if (!selected || !reply.trim()) return;
    const conversationId = selected.conversationId;
    const ok = await mutate({ action: "conversation.reply", conversationId, text: reply });
    if (ok) {
      setReply("");
      setActiveConversation(conversationId);
    }
  }

  async function closeConversation() {
    if (!selected) return;
    await mutate({ action: "conversation.close", conversationId: selected.conversationId });
    setActiveConversation("");
    setConfirmClose(false);
  }

  async function uploadAgreement(file?: File) {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setMessage("Please upload a PDF file.");
      return;
    }
    if (file.size > 3_000_000) {
      setMessage("PDF must be 3MB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setMessage("Could not read that file.");
    reader.onload = async () => {
      try {
        const base64 = String(reader.result).split(",")[1] || "";
        await api("/api/agreement", { method: "POST", body: JSON.stringify({ name: file.name, base64 }) });
        setMessage("Agreement updated.");
        await refresh();
      } catch (error) {
        setMessage((error as Error).message);
      }
    };
    reader.readAsDataURL(file);
  }

  if (gate === "checking") {
    return <main className="admin-shell"><div className="admin-loading">Checking studio access...</div></main>;
  }

  if (gate === "unconfigured") {
    return (
      <main className="admin-shell">
        <div className="admin-gate">
          <span className="eyebrow">Studio console</span>
          <h1>Access is not configured.</h1>
          <p>
            Set an <code>ADMIN_PASSWORD</code> environment variable on the deployment (and in a local
            <code> .env</code> file for development), then reload this page. Until it is set the console
            stays closed and the admin API refuses every request.
          </p>
        </div>
      </main>
    );
  }

  if (gate === "locked") {
    return (
      <main className="admin-shell">
        <form className="admin-gate" onSubmit={signIn}>
          <span className="eyebrow">Private studio console</span>
          <h1>Sign in.</h1>
          <label>
            Console password
            <input
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter the studio password"
            />
          </label>
          {authError && <div className="form-error" role="alert">{authError}</div>}
          <button className="button button-solid" type="submit" disabled={signingIn || !password}>
            {signingIn ? "Signing in..." : "Enter console"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <div className="admin-topbar">
        <div>
          <span className="eyebrow">Private studio console</span>
          <h1>JetClicks operations.</h1>
        </div>
        <div className="admin-topbar-actions">
          <button className="admin-refresh" onClick={() => void refresh()} disabled={loading}>
            <RefreshCw size={15} /> {loading ? "Refreshing" : "Refresh"}
          </button>
          <button className="admin-refresh" onClick={() => void signOut()}><LogOut size={15} /> Sign out</button>
        </div>
      </div>

      {message && (
        <div className="admin-notice">
          {message}
          <button onClick={() => setMessage("")}>Dismiss</button>
        </div>
      )}

      {data?.system && data.system.storage !== "google-sheets" && (
        <div className="admin-notice warn">
          Storage is running in <strong>{data.system.storage}</strong> mode. Configure Google Sheets before launch -
          {data.system.storage === "ephemeral-tmp" ? " deployed data here is wiped whenever the function restarts." : " data stays on this machine only."}
        </div>
      )}

      <div className="admin-tabs">
        {tabs.map((item) => (
          <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
            {item}
            {item === "inbox" && counts.unread > 0 && <span className="tab-badge">{counts.unread}</span>}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <>
          <section className="admin-stats">
            <Stat label="New inquiries" value={counts.newCount} />
            <Stat label="Ongoing" value={counts.ongoing} />
            <Stat label="Finished" value={counts.finished} />
            <Stat label="Chat threads" value={counts.openChats} />
            <Stat label="Unread chats" value={counts.unread} />
            <Stat label="Flagged" value={counts.flagged} />
          </section>
          <section className="admin-dashboard-grid">
            <AdminPanel title="Latest bookings">
              <BookingTable bookings={(data?.bookings || []).slice(0, 6)} compact onUpdate={mutate} />
            </AdminPanel>
            <AdminPanel title={`Waiting for the studio (${counts.waiting})`}>
              <ConversationList
                conversations={(data?.conversations || []).filter((x) => x.status === "needs-human")}
                active={activeConversation}
                onPick={(id) => {
                  setActiveConversation(id);
                  setTab("inbox");
                }}
              />
            </AdminPanel>
          </section>
        </>
      )}

      {tab === "inbox" && (
        <section className="admin-inbox">
          <aside>
            <div className="admin-section-title">
              <MessageSquare size={16} /> Who chatted with the assistant
            </div>
            <ConversationList
              conversations={data?.conversations || []}
              active={selected?.conversationId || ""}
              onPick={setActiveConversation}
            />
          </aside>
          <div className="admin-chat-view">
            {selected ? (
              <>
                <div className="admin-chat-head">
                  <div>
                    <strong>{selected.name || "Website visitor"}</strong>
                    <span>
                      {selected.email || "No email provided"} · {selected.status === "needs-human" ? "waiting for the studio" : "assistant handled"}
                    </span>
                    <small>
                      First contact {when(selected.createdAt)} · last activity {when(selected.lastMessageAt || selected.updatedAt)} ·{" "}
                      {selected.clientMessageCount ?? 0} visitor message{(selected.clientMessageCount ?? 0) === 1 ? "" : "s"} · source {selected.source || "website-chat"}
                    </small>
                  </div>
                  {confirmClose ? (
                    <div className="confirm-row">
                      <span>Delete this transcript?</span>
                      <button className="danger-button" onClick={() => void closeConversation()}>Yes, delete</button>
                      <button onClick={() => setConfirmClose(false)}>Cancel</button>
                    </div>
                  ) : (
                    <button className="danger-button" onClick={() => setConfirmClose(true)}>
                      <Trash2 size={15} /> Close &amp; delete
                    </button>
                  )}
                </div>
                <div className="admin-message-thread" ref={threadRef}>
                  {selected.messages.map((m) => (
                    <div key={m.id} className={`admin-thread-bubble ${m.from}`}>
                      <span>{m.from === "client" ? selected.name || "visitor" : m.from} · {when(m.at)}</span>
                      <p>{m.text}</p>
                    </div>
                  ))}
                  {!selected.messages.length && <p className="admin-empty">No messages in this thread yet.</p>}
                </div>
                <div className="admin-reply">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void sendReply();
                    }}
                    placeholder={
                      selected.email
                        ? `Reply to ${selected.name || "this visitor"} - a copy is emailed to ${selected.email}`
                        : "Reply appears in the visitor's chat window (no email on file)"
                    }
                    rows={3}
                  />
                  <button onClick={() => void sendReply()} disabled={!reply.trim()}>
                    <Send size={15} /> Send
                  </button>
                </div>
              </>
            ) : (
              <div className="admin-empty">Select a conversation to read the transcript and reply.</div>
            )}
          </div>
        </section>
      )}

      {tab === "bookings" && (
        <AdminPanel title={`Booking queue (${data?.bookings.length || 0})`}>
          <BookingTable bookings={data?.bookings || []} onUpdate={mutate} />
        </AdminPanel>
      )}

      {tab === "logs" && (
        <AdminPanel title="Activity logs">
          <div className="logs-table">
            {(data?.logs || []).map((log, index) => (
              <div className="log-row" key={`${log.timestamp}_${index}`}>
                <time>{when(log.timestamp)}</time>
                <strong>{log.action}</strong>
                <span>{log.actor} · {log.entityId}</span>
              </div>
            ))}
            {!data?.logs.length && <p className="admin-empty">No activity recorded yet.</p>}
          </div>
        </AdminPanel>
      )}

      {tab === "agreement" && (
        <AdminPanel title="Booking waiver / agreement">
          <div className="agreement-admin">
            <div>
              <span className="eyebrow">Current document</span>
              <h2>{data?.settings.agreementName}</h2>
              <a href={data?.settings.agreementUrl} target="_blank" rel="noreferrer">Open agreement PDF ↗</a>
            </div>
            <label className="upload-card">
              <Upload size={18} />
              <span>Replace PDF</span>
              <small>{data?.system.drive ? "PDF only · up to 3MB" : "Google Drive is not configured"}</small>
              <input type="file" accept="application/pdf" disabled={!data?.system.drive} onChange={(e) => void uploadAgreement(e.target.files?.[0])} />
            </label>
          </div>
        </AdminPanel>
      )}

      {tab === "system" && <SystemPanel system={data?.system} onMessage={setMessage} />}
    </main>
  );
}

function SystemPanel({ system, onMessage }: { system?: SystemInfo; onMessage: (value: string) => void }) {
  const [recipient, setRecipient] = useState("");
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<SmtpTestResult | null>(null);

  async function runTest() {
    setTesting(true);
    setResult(null);
    try {
      const response = await api<SmtpTestResult>("/api/admin", {
        method: "POST",
        body: JSON.stringify({ action: "smtp.test", to: recipient }),
      });
      setResult(response);
    } catch (error) {
      onMessage((error as Error).message);
    } finally {
      setTesting(false);
    }
  }

  return (
    <AdminPanel title="System &amp; email">
      <div className="system-grid">
        <div className="system-row"><span>Storage</span><strong>{system?.storage || "-"}</strong></div>
        <div className="system-row"><span>Google Drive</span><strong>{system?.drive ? "configured" : "not configured"}</strong></div>
        <div className="system-row"><span>SMTP host</span><strong>{system?.smtpConfigured ? `${system.smtpHost}:${system.smtpPort}` : "not configured"}</strong></div>
        <div className="system-row"><span>TLS mode</span><strong>{system?.smtpSecure ? "implicit TLS (465)" : "STARTTLS"}</strong></div>
        <div className="system-row"><span>Mail from</span><strong>{system?.mailFrom || "not set"}</strong></div>
        <div className="system-row"><span>Studio inbox</span><strong>{system?.adminEmail || "ADMIN_EMAIL not set"}</strong></div>
      </div>

      <div className="smtp-test">
        <label>
          Send a test email to
          <input
            type="email"
            value={recipient}
            placeholder={system?.adminEmail || "you@example.com"}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </label>
        <button className="button button-solid" onClick={() => void runTest()} disabled={testing || !system?.smtpConfigured}>
          <Mail size={15} /> {testing ? "Testing..." : "Test SMTP"}
        </button>
      </div>

      {result && (
        <div className={`smtp-result ${result.ok ? "ok" : "bad"}`}>
          {result.ok
            ? result.stage === "send"
              ? `Connected, authenticated, and sent a test message to ${result.to}.`
              : result.note || "Connected and authenticated."
            : `${result.stage === "connection" ? "Connection or login failed" : "Sending failed"}: ${result.error || result.reason || "unknown error"}`}
        </div>
      )}
      {!system?.smtpConfigured && <p className="admin-empty">Set SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_FROM to enable outgoing mail.</p>}
    </AdminPanel>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="admin-stat"><span>{label}</span><strong>{value}</strong></div>;
}

function AdminPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-head"><span className="eyebrow">{title}</span></div>
      {children}
    </section>
  );
}

function ConversationList({
  conversations,
  active,
  onPick,
}: {
  conversations: Conversation[];
  active: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="conversation-list">
      {conversations.map((conversation) => (
        <button
          key={conversation.conversationId}
          className={`${active === conversation.conversationId ? "active" : ""} ${conversation.unread ? "unread" : ""}`}
          onClick={() => onPick(conversation.conversationId)}
        >
          <strong>
            {conversation.name || "Website visitor"}
            {conversation.unread && <i className="dot" aria-label="unread" />}
          </strong>
          <span>{conversation.email || "No email"}</span>
          <em>{conversation.lastMessagePreview || "No messages yet"}</em>
          <small>
            {conversation.status === "needs-human" ? "waiting for studio" : "assistant"} ·{" "}
            {sinceLabel(conversation.lastMessageAt || conversation.updatedAt)}
          </small>
        </button>
      ))}
      {!conversations.length && <p className="admin-empty">No conversations.</p>}
    </div>
  );
}

function BookingTable({
  bookings,
  onUpdate,
  compact = false,
}: {
  bookings: BookingRecord[];
  onUpdate: (payload: object) => Promise<boolean>;
  compact?: boolean;
}) {
  return (
    <div className="booking-table">
      {bookings.map((booking) => (
        <BookingRow key={booking.bookingId} booking={booking} onUpdate={onUpdate} compact={compact} />
      ))}
      {!bookings.length && <p className="admin-empty">No bookings yet.</p>}
    </div>
  );
}

function BookingRow({
  booking,
  onUpdate,
  compact,
}: {
  booking: BookingRecord;
  onUpdate: (payload: object) => Promise<boolean>;
  compact: boolean;
}) {
  const [notes, setNotes] = useState(booking.notes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  // Opt-in: a status change only emails the client when the studio asks for it.
  const [notifyClient, setNotifyClient] = useState(false);

  useEffect(() => {
    setNotes(booking.notes || "");
  }, [booking.notes]);

  return (
    <div className="booking-row">
      <div>
        <strong>{booking.name}</strong>
        <span>{booking.service} · {booking.date} · {booking.location}</span>
        {!compact && <small>{booking.email} · {booking.phone || "no phone"} · {booking.coverage || "coverage TBD"} · ref {booking.bookingId}</small>}
      </div>
      <div className="booking-row-actions">
        <button
          className={booking.flagged ? "flag active" : "flag"}
          onClick={() => void onUpdate({ action: "booking.update", bookingId: booking.bookingId, flagged: !booking.flagged })}
          aria-label={booking.flagged ? "Remove flag" : "Flag booking"}
          title={booking.flagged ? "Remove flag" : "Flag booking"}
        >
          <Flag size={14} />
        </button>
        <select
          value={booking.status}
          onChange={(event) => void onUpdate({ action: "booking.update", bookingId: booking.bookingId, status: event.target.value, notifyClient })}
          aria-label="Booking status"
        >
          {bookingStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        {!compact && (
          <label className="notify-toggle" title="Email the client when the status changes">
            <input type="checkbox" checked={notifyClient} onChange={(event) => setNotifyClient(event.target.checked)} />
            <span>email client</span>
          </label>
        )}
      </div>
      {!compact && (
        <>
          <p>{booking.message || "No additional notes from the client."}</p>
          <div className="booking-notes">
            <textarea
              rows={2}
              value={notes}
              placeholder="Private studio notes..."
              onChange={(event) => setNotes(event.target.value)}
            />
            <button
              disabled={savingNotes || notes === (booking.notes || "")}
              onClick={async () => {
                setSavingNotes(true);
                await onUpdate({ action: "booking.update", bookingId: booking.bookingId, notes });
                setSavingNotes(false);
              }}
            >
              {savingNotes ? "Saving..." : "Save note"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
