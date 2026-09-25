import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Archive, ArchiveRestore, Flag, LogOut, Mail, MessageSquare, RefreshCw, Send, Trash2, Upload } from "lucide-react";
import type { AdminLog, BookingRecord, Conversation } from "../types";
import { ApiError, api } from "../lib/api";

const bookingStatuses: BookingRecord["status"][] = ["new", "confirmed", "ongoing", "finished", "cancelled"];
const tabs = ["dashboard", "inbox", "bookings", "portfolio", "logs", "agreement", "system"] as const;
const portfolioCategories = ["Wedding", "Prenup", "Proposal", "Birthdays", "Portrait", "Island tour", "Family", "Drones", "Corporate", "Ceremony"] as const;
type Tab = (typeof tabs)[number];

interface SystemInfo {
  storage: string;
  drive: boolean;
  driveUpload?: boolean;
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
    // 20s keeps the console live without hammering the Sheets read quota.
    const timer = window.setInterval(() => void refresh(), 20000);
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
    // Archived bookings drop out of every active tally.
    const bookings = (data?.bookings || []).filter((x) => !x.archived);
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
              <BookingTable bookings={(data?.bookings || []).filter((x) => !x.archived).slice(0, 6)} compact onUpdate={mutate} />
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
        <BookingsTab bookings={data?.bookings || []} onUpdate={mutate} />
      )}

      {tab === "portfolio" && (
        <PortfolioManager driveReady={Boolean(data?.system.driveUpload)} onMessage={setMessage} />
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
              <small>{data?.system.driveUpload ? "PDF only · up to 3MB" : "Connect the studio Google account first"}</small>
              <input type="file" accept="application/pdf" disabled={!data?.system.driveUpload} onChange={(e) => void uploadAgreement(e.target.files?.[0])} />
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

interface PortfolioAdminItem {
  id: string;
  category: string;
  title: string;
  alt: string;
  image: string;
  thumb: string;
}

/**
 * Convert the selected photo to a compact JPEG before sending it to the API.
 *
 * JPEG is intentional here: iPhone/iPad Safari and especially embedded
 * WebViews (such as the browser opened from Messenger) are much more
 * predictable with canvas JPEG encoding than with canvas WebP encoding.
 * Keeping the binary image under 1MB also leaves ample headroom for the
 * base64/JSON request overhead and Vercel's request-size limit.
 */
const MAX_UPLOAD_IMAGE_BYTES = 900_000;
const MAX_UPLOAD_DIMENSION = 1600;

/**
 * Decode an image in a way that works across Chrome/Firefox/Safari.
 *
 * Safari/WebViews do not all implement createImageBitmap consistently, so an
 * HTMLImageElement object-URL fallback is retained. The upload is ultimately
 * re-encoded as JPEG, which is widely supported by iOS browsers.
 */
async function decodeImage(file: File): Promise<{ source: CanvasImageSource; width: number; height: number; close?: () => void }> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close(),
      };
    } catch {
      // Fall through to the object-URL <img> decoder for older Safari/WebViews.
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("This photo format is not supported by this browser. Please choose a JPEG or PNG photo."));
      element.src = url;
    });
    return {
      source: image,
      width: image.naturalWidth,
      height: image.naturalHeight,
      close: () => URL.revokeObjectURL(url),
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (value) => {
        if (!value) {
          reject(new Error("JPEG conversion failed in this browser."));
          return;
        }
        // Some older WebViews can ignore the requested MIME type. Never send
        // a non-JPEG blob to the API by mistake.
        if (value.type && value.type !== "image/jpeg") {
          reject(new Error("This browser could not create a JPEG upload. Please try Safari or choose another photo."));
          return;
        }
        resolve(value);
      },
      "image/jpeg",
      quality,
    );
  });
}

async function fileToUploadImage(file: File): Promise<Blob> {
  const decoded = await decodeImage(file);
  let width = decoded.width;
  let height = decoded.height;

  if (!width || !height) {
    decoded.close?.();
    throw new Error("The selected photo could not be decoded.");
  }

  const scale = Math.min(1, MAX_UPLOAD_DIMENSION / Math.max(width, height));
  width = Math.max(1, Math.round(width * scale));
  height = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) {
    decoded.close?.();
    throw new Error("Canvas is not supported in this browser.");
  }

  try {
    // Try increasingly smaller quality settings first. If a very detailed
    // phone photo is still large, also reduce dimensions between passes.
    const qualities = [0.82, 0.74, 0.66, 0.58, 0.50, 0.42, 0.34, 0.28];
    for (let pass = 0; pass < 5; pass += 1) {
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(decoded.source, 0, 0, width, height);

      for (const quality of qualities) {
        const blob = await canvasToJpeg(canvas, quality);
        if (blob.size <= MAX_UPLOAD_IMAGE_BYTES) {
          return blob;
        }
      }

      // Still too large: shrink the longest edge and try the quality ladder
      // again. This is more reliable than relying on quality alone for photos
      // exported by iPhones, which can contain very high detail.
      const nextLongest = Math.max(640, Math.round(Math.max(width, height) * 0.78));
      const nextScale = nextLongest / Math.max(width, height);
      width = Math.max(1, Math.round(width * nextScale));
      height = Math.max(1, Math.round(height * nextScale));
    }
  } finally {
    decoded.close?.();
  }

  throw new Error("This photo could not be compressed enough for upload. Please choose another photo.");
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the image."));
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.readAsDataURL(blob);
  });
}

function PortfolioManager({
  driveReady,
  onMessage,
}: {
  driveReady: boolean;
  onMessage: (text: string) => void;
}) {
  const [items, setItems] = useState<PortfolioAdminItem[]>([]);
  const [category, setCategory] = useState<(typeof portfolioCategories)[number]>("Wedding");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api<{ portfolio: PortfolioAdminItem[] }>("/api/portfolio")
      .then((res) => setItems(res.portfolio || []))
      .catch(() => setItems([]));
  }, []);
  useEffect(() => load(), [load]);

  // Local object URL for the chosen file's preview; revoked on change/unmount.
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function upload() {
    if (!file) return;
    setBusy(true);
    onMessage("");
    try {
      const encoded = await fileToUploadImage(file);
      if (encoded.size > MAX_UPLOAD_IMAGE_BYTES) {
        throw new Error("Photo could not be compressed below the safe upload size. Please choose another photo.");
      }
      const base64 = await blobToBase64(encoded);
      // Base64 is ~33% larger than the binary image. This leaves comfortable
      // headroom below the serverless request-body limit.
      if (base64.length > 1_250_000) {
        throw new Error("Photo upload is still too large. Please choose another photo.");
      }
      await api("/api/admin", {
        method: "POST",
        body: JSON.stringify({
          action: "portfolio.add",
          category,
          caption: caption.trim(),
          alt: caption.trim(),
          base64,
        }),
      });
      const savedKb = Math.max(0, Math.round((file.size - encoded.size) / 1024));
      onMessage(`Photo added to ${category}. Saved ~${savedKb}KB as JPEG.`);
      setFile(null);
      setCaption("");
      load();
    } catch (error) {
      onMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setBusy(true);
    try {
      await api("/api/admin", { method: "POST", body: JSON.stringify({ action: "portfolio.delete", id }) });
      onMessage("Photo removed.");
      setItems((list) => list.filter((x) => x.id !== id));
    } catch (error) {
      onMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AdminPanel title="Add a portfolio photo">
        <div className="portfolio-upload">
          <label className="upload-card">
            {preview ? (
              <img src={preview} alt="Selected photo preview" className="upload-preview" />
            ) : (
              <>
                <Upload size={18} />
                <span>Choose a photo</span>
                <small>{driveReady ? "JPG, PNG, or WebP · automatically converted for upload" : "Google Drive is not configured"}</small>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={!driveReady || busy}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
          <div className="portfolio-fields">
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)}>
                {portfolioCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Caption
              <input
                type="text"
                value={caption}
                maxLength={120}
                placeholder="e.g. Beach vows at golden hour"
                onChange={(e) => setCaption(e.target.value)}
              />
            </label>
            <button
              className="button button-solid"
              disabled={!file || !driveReady || busy}
              onClick={() => void upload()}
            >
              {busy ? "Uploading…" : "Upload photo"}
            </button>
          </div>
        </div>
      </AdminPanel>
      <AdminPanel title={`Uploaded photos (${items.length})`}>
        {items.length ? (
          <div className="portfolio-manage-grid">
            {items.map((item) => (
              <figure key={item.id} className="portfolio-manage-card">
                <img src={item.thumb} alt={item.alt} loading="lazy" />
                <figcaption>
                  <span className="portfolio-manage-cat">{item.category}</span>
                  <strong>{item.title || "(no caption)"}</strong>
                </figcaption>
                <button
                  className="portfolio-manage-del"
                  disabled={busy}
                  onClick={() => void remove(item.id)}
                  aria-label="Delete photo"
                  title="Delete photo"
                >
                  <Trash2 size={14} />
                </button>
              </figure>
            ))}
          </div>
        ) : (
          <p className="admin-empty">No uploaded photos yet. The curated set still shows on the site.</p>
        )}
      </AdminPanel>
    </>
  );
}

function BookingsTab({
  bookings,
  onUpdate,
}: {
  bookings: BookingRecord[];
  onUpdate: (payload: object) => Promise<boolean>;
}) {
  const [showArchive, setShowArchive] = useState(false);
  const active = bookings.filter((x) => !x.archived);
  const archived = bookings.filter((x) => x.archived);

  return (
    <>
      <AdminPanel title={`Booking queue (${active.length})`}>
        <BookingTable bookings={active} onUpdate={onUpdate} />
      </AdminPanel>
      <div className="archive-panel">
        <button
          className="archive-toggle"
          onClick={() => setShowArchive((v) => !v)}
          aria-expanded={showArchive}
        >
          <Archive size={15} />
          Archived bookings ({archived.length})
          <span>{showArchive ? "Hide" : "Show"}</span>
        </button>
        {showArchive && (
          <div className="archive-body">
            <BookingTable bookings={archived} onUpdate={onUpdate} />
          </div>
        )}
      </div>
    </>
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
        {!compact && (
          <button
            className="flag"
            onClick={() => void onUpdate({ action: "booking.update", bookingId: booking.bookingId, archived: !booking.archived })}
            aria-label={booking.archived ? "Restore booking" : "Archive booking"}
            title={booking.archived ? "Restore from archive" : "Archive booking"}
          >
            {booking.archived ? <ArchiveRestore size={14} /> : <Archive size={14} />}
          </button>
        )}
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
