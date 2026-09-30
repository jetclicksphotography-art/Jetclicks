import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage } from "../../types";
import { api } from "../../lib/api";
import { ChatMessageText } from "./ChatMessageText";

const defaultSuggestions = ["Check availability", "Ask about packages", "How booking works", "Talk to JetClicks"];

const WELCOME: ChatMessage = {
  id: "welcome",
  at: new Date(0).toISOString(),
  from: "bot",
  text: "Hi - I'm the JetClicks Assistant. I can help with availability, packages, booking steps, and delivery. If you'd rather speak to a person, tap \"Talk to JetClicks\".",
};

interface ChatResponse {
  conversation: { conversationId: string; status: string; name?: string; email?: string; phone?: string; messages: ChatMessage[] } | null;
  reply?: { text: string; suggestions: string[] };
}

function readStorage(key: string) {
  try {
    return localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function writeStorage(key: string, value: string) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    /* private browsing - the chat still works for this session */
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState(() => readStorage("jetclicks-chat-name"));
  const [email, setEmail] = useState(() => readStorage("jetclicks-chat-email"));
  const [phone, setPhone] = useState(() => readStorage("jetclicks-chat-phone"));
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState(defaultSuggestions);
  const [offline, setOffline] = useState(false);
  const [unseen, setUnseen] = useState(0);
  const [conversationId, setConversationId] = useState(() => readStorage("jetclicks-chat-id"));
  const [handedOff, setHandedOff] = useState(false);
  const threadRef = useRef<HTMLDivElement | null>(null);
  const seenCount = useRef(0);

  const visibleMessages = useMemo(() => {
    const thread = messages.slice(-60);
    return thread.length ? thread : [WELCOME];
  }, [messages]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleMessages.length, open]);

  const applyConversation = useCallback((conversation: ChatResponse["conversation"]) => {
    if (!conversation) return;
    setMessages(conversation.messages || []);
    setHandedOff(conversation.status === "needs-human");
  }, []);

  // Poll while the conversation exists so studio replies arrive even if the
  // panel is closed - the launcher then shows an unread count.
  useEffect(() => {
    if (!conversationId) return;
    let stopped = false;

    const poll = async () => {
      try {
        const result = await api<ChatResponse>(`/api/chat?conversationId=${encodeURIComponent(conversationId)}`);
        if (stopped) return;
        setOffline(false);
        if (result.conversation) {
          applyConversation(result.conversation);
        } else {
          // The studio closed and deleted the thread; start clean.
          writeStorage("jetclicks-chat-id", "");
          setConversationId("");
          setMessages([]);
        }
      } catch {
        if (!stopped) setOffline(true);
      }
    };

    void poll();
    const timer = window.setInterval(() => void poll(), open ? 5000 : 20000);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [conversationId, open, applyConversation]);

  // Track studio/bot messages the visitor has not looked at yet.
  useEffect(() => {
    if (open) {
      seenCount.current = messages.length;
      setUnseen(0);
      return;
    }
    const fresh = messages.slice(seenCount.current).filter((m) => m.from !== "client").length;
    setUnseen(fresh);
  }, [messages, open]);

  async function send(rawText = text, handoff = false) {
    const value = rawText.trim();
    if (!value || busy) return;
    setBusy(true);
    setText("");
    const optimistic: ChatMessage = {
      id: `local_${Date.now()}`,
      at: new Date().toISOString(),
      from: "client",
      text: value,
    };
    setMessages((items) => [...items, optimistic]);

    try {
      writeStorage("jetclicks-chat-name", name.trim());
      writeStorage("jetclicks-chat-email", email.trim());
      writeStorage("jetclicks-chat-phone", phone.trim());
      const result = await api<ChatResponse>("/api/chat", {
        method: "POST",
        body: JSON.stringify({ conversationId, text: value, name: name.trim(), email: email.trim(), phone: phone.trim(), handoff }),
      });
      setOffline(false);
      if (result.conversation) {
        setConversationId(result.conversation.conversationId);
        writeStorage("jetclicks-chat-id", result.conversation.conversationId);
        applyConversation(result.conversation);
      }
      setSuggestions(result.reply?.suggestions?.length ? result.reply.suggestions : defaultSuggestions);
    } catch (error) {
      setOffline(true);
      setMessages((items) => [
        ...items,
        {
          id: `fallback_${Date.now()}`,
          at: new Date().toISOString(),
          from: "bot",
          text: `${(error as Error).message} You can also use the inquiry form and the studio will pick it up there.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`chat-widget ${open ? "is-open" : ""}`}>
      {open && (
        <section className="chat-panel" aria-label="JetClicks Assistant">
          <header className="chat-header">
            <div>
              <span className="eyebrow">JetClicks</span>
              <strong>Assistant</strong>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </header>

          {handedOff && (
            <div className="chat-banner">
              This conversation is with the studio team now. Replies appear here{email ? ` and at ${email}` : ""}.
            </div>
          )}
          {offline && <div className="chat-banner warn">Connection problem - messages may not be reaching the studio.</div>}

          <div className="chat-profile">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              autoComplete="name"
              maxLength={120}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              type="email"
              autoComplete="email"
              maxLength={160}
            />
            <input
              className="chat-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
            />
          </div>

          <div className="chat-messages" ref={threadRef} aria-live="polite">
            {visibleMessages.map((message) => (
              <div className={`chat-bubble ${message.from}`} key={message.id}>
                {message.from === "admin" && <span className="chat-from">JetClicks studio</span>}
                <ChatMessageText text={message.text} />
              </div>
            ))}
            {busy && <div className="chat-bubble bot typing"><span /><span /><span /></div>}
          </div>

          <div className="chat-suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                disabled={busy}
                onClick={() => void send(suggestion, suggestion === "Talk to JetClicks")}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="chat-compose">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Ask something..."
              aria-label="Message"
            />
            <button onClick={() => void send()} disabled={busy || !text.trim()} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>

          <button
            className="chat-handoff"
            onClick={() => void send("Please connect me with the JetClicks studio team.", true)}
            disabled={busy || handedOff}
          >
            {handedOff ? "The studio has this conversation" : "Talk to JetClicks"}
          </button>
        </section>
      )}

      <button className="chat-launcher" onClick={() => setOpen((x) => !x)} aria-label="Open JetClicks Assistant">
        <MessageCircle size={20} /> <span>{open ? "Close" : "Chat"}</span>
        {!open && unseen > 0 && <i className="chat-badge">{unseen}</i>}
      </button>
    </div>
  );
}
