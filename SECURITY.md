# Security

Notes on the JetClicks site's security posture and the hardening applied.

## Threat model

The admin console (`/studio-console`) and `/api/admin` are the crown jewels: they
expose every booking, every client conversation (names, emails, phones), and the
ability to upload the agreement PDF served to clients. Everything else is public
by design.

The console path is compiled into the public JS bundle (it comes from the
`VITE_ADMIN_PATH` build variable), so **treat the path as public**. The real
boundary is the password check in `/api/auth`, not the URL.

## Applied

- **Dependencies** – `nodemailer` upgraded to v10 (v6 carried a high-severity
  advisory chain, incl. a DoS in address parsing reachable from user-submitted
  emails). `npm audit` clean.
- **Security headers** (`vercel.json`) – Content-Security-Policy with
  `script-src 'self'` (no `unsafe-inline`), scoped `frame-src` for the
  YouTube/Vimeo film embeds, plus `frame-ancestors 'none'`, `object-src 'none'`,
  `base-uri 'self'`, `form-action 'self'`, `upgrade-insecure-requests`. A
  Permissions-Policy switches off camera/mic/geolocation/payment/usb.
- **Login limiter** tightened to 5 attempts / 15 min / IP (`api/auth.js`).
- **Sign-in alerting** – every successful console login emails `ADMIN_EMAIL` with
  the time, IP, and device. If it arrives and it was not you, the password is
  compromised: rotate it now.
- **Already sound** (verified, not changed): admin routes gated on every branch;
  cookies `HttpOnly; Secure; SameSite=Strict`; constant-time password compare
  (HMAC-both-sides, no length/timing leak); Sheets writes use `RAW` mode
  (no formula injection); email fields HTML-escaped; no `dangerouslySetInnerHTML`
  or `eval`; secrets never committed to git.

## Owner actions (cannot be done in code)

1. **Rotate `ADMIN_PASSWORD` to a random value.** This is the single most
   important step. The old password was the brand name + year — the #1 guess in
   any targeted wordlist. Generate and set a strong one:
   ```
   node -e "console.log(require('crypto').randomBytes(18).toString('base64url'))"
   ```
   Set it in `.env` AND in the host (Vercel env vars), then redeploy. Env changes
   only bind to new deployments.

2. **Reconcile `.env.local`.** It defines its own `ADMIN_PASSWORD`, and Vite loads
   `.env.local` after `.env`, so it wins locally. Keep one source of truth or the
   local and deployed passwords will drift.

3. **Consider a second factor** for the console — a magic-link to the studio inbox
   (SMTP is already wired) or TOTP. Makes a guessed/leaked password useless alone.

## Known limitation

The login limiter is an in-memory Map, per serverless instance. It stops casual
guessing but not a distributed attack spread across warm instances. The durable
fix is a shared store (Vercel KV / Upstash Redis) keyed by IP with exponential
backoff. Lower priority once the password is strong, but the right long-term fix.
