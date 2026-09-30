import type { ReactNode } from "react";

const PACKAGE_LINK = /(https?:\/\/(?:www\.)?jetclicks\.photography\/packages(?:[/?#][^\s<]*)?|(?<![\w./-])\/packages(?:[/?#][^\s<]*)?)/gi;

function trimTrailingPunctuation(value: string) {
  let token = value;
  let trailing = "";
  while (/[.,!?;:)]$/.test(token)) {
    trailing = token.slice(-1) + trailing;
    token = token.slice(0, -1);
  }
  return { token, trailing };
}

/**
 * Render only the JetClicks Packages URL as a real link. Keeping the matcher
 * intentionally narrow avoids turning arbitrary visitor text into clickable
 * destinations while still allowing the studio to send `/packages` or the
 * public packages URL directly from the inbox.
 */
export function ChatMessageText({ text }: { text: string }) {
  const value = String(text || "");
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of value.matchAll(PACKAGE_LINK)) {
    const index = match.index ?? 0;
    const raw = match[0];
    const { token, trailing } = trimTrailingPunctuation(raw);

    if (index > cursor) nodes.push(value.slice(cursor, index));

    const href = token.startsWith("/")
      ? token
      : `https://${token.replace(/^https?:\/\//i, "")}`;

    nodes.push(
      <a
        key={`${index}-${token}`}
        className="chat-message-link"
        href={href}
      >
        {token}
      </a>,
    );
    if (trailing) nodes.push(trailing);
    cursor = index + raw.length;
  }

  if (!nodes.length) return <>{value}</>;
  if (cursor < value.length) nodes.push(value.slice(cursor));
  return <>{nodes}</>;
}
