# JetClicks - React + Vite + TypeScript

JetClicks is a photography site with a server-backed inquiry/booking flow, a website assistant
(chatbot) with human handoff, and a password-protected studio operations console.

## Run locally

```bash
npm install
cp .env.example .env   # then set ADMIN_PASSWORD at minimum
npm run dev
```

`npm run dev` also serves the `api/` functions through a Vite middleware, so the chat widget,
the booking form and the studio console all work locally exactly as they do on Vercel.

## Production build

```bash
npm run build
npm run preview   # static preview only - no API
npm run typecheck
```

## Studio console (admin)

The console is unlinked from the public navigation, sent `noindex, nofollow`, disallowed in
`robots.txt`, and protected by a password:

```text
/studio-console
```

- Set `ADMIN_PASSWORD`. **Until it is set, the console shows a "not configured" screen and
  every `/api/admin` request is refused with 503** - there is no open state.
- Sign-in issues an HMAC-signed, HttpOnly, SameSite=Strict session cookie valid for 8 hours.
  Set `ADMIN_SESSION_SECRET` to sign cookies with a value independent of the password
  (rotating it signs everyone out).
- Login attempts are rate limited to 8 per 10 minutes per IP, per function instance.
- Set `VITE_ADMIN_PATH` at build time to move the console off the default route. Treat the URL
  as obscurity only - the password is the security boundary. If you change it, update
  `public/robots.txt` and the `X-Robots-Tag` rule in `vercel.json` to match.

The console has six tabs:

| Tab | What it does |
| --- | --- |
| dashboard | Booking counts, unread chats, and everything waiting on a human |
| inbox | Everyone who used the chatbot, their transcript, and the reply box |
| bookings | Status, flag, private notes, optional "email client" on a status change |
| logs | Activity audit trail |
| agreement | Replace the waiver/agreement PDF (requires Google Drive) |
| system | Storage/SMTP configuration and a live SMTP test |

### Chatbot inbox

Every visitor conversation is recorded with name, email (both optional), source, first contact,
last activity, visitor message count, and an unread marker. Replies typed in the console appear
in the visitor's chat window within about 5 seconds, and are also emailed to the visitor when an
address is on file. "Talk to JetClicks" flags the conversation as `needs-human` and, when SMTP
and `ADMIN_EMAIL` are configured, emails the studio.

`Close & delete` removes the active conversation record after an inline confirmation. The audit
log keeps a closure entry without the transcript.

## SMTP setup

```env
SMTP_HOST='smtp.example.com'
SMTP_PORT='587'
SMTP_SECURE='false'      # 'true' = implicit TLS on 465, 'false' = STARTTLS
SMTP_USER='...'
SMTP_PASS='...'
MAIL_FROM='JetClicks <no-reply@example.com>'
ADMIN_EMAIL='studio@example.com'
```

Mail is sent with nodemailer over STARTTLS (or implicit TLS on 465) with TLS 1.2 as the floor and
timeouts kept under the serverless function budget. **Mail failures never fail the underlying
action** - a booking is still stored if the confirmation email bounces, and the response reports
what was sent.

Use the console's **system** tab to test: it opens a connection, authenticates, and optionally
sends a test message to `ADMIN_EMAIL` or any address you type. Connection problems and send
problems are reported separately so you can tell a bad password from a rejected recipient.

Mail is sent on: a new inquiry (client confirmation + studio alert), a chatbot handoff (studio
alert), an admin chat reply (copy to the visitor), and an opt-in booking status change.

## Google Sheets / Drive setup

Create one spreadsheet and share it with the service-account email as Editor:

```env
GOOGLE_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}'
GOOGLE_SHEET_ID='...'
GOOGLE_DRIVE_FOLDER_ID='...'
GOOGLE_DRIVE_PUBLIC='true'
```

Tabs `Bookings`, `Conversations`, `Logs` and `Settings` are created on first access, and their
header rows are repaired automatically when the schema gains a column. Access tokens are cached
per scope.

**Without Google Sheets the app falls back to a JSON file.** Locally that is `.data/state.json`.
On Vercel it is a file in the function's temp directory, which is wiped whenever the instance
recycles - the console shows a warning banner in that mode. Configure Sheets before launch.

The agreement uploader is capped at 3MB, admin-only, and validates the `%PDF-` header.

## Vercel

Import the repository. Framework preset: Vite. Build command `npm run build`, output `dist`.
Set every environment variable above in the Vercel project settings (`ADMIN_PASSWORD` included -
without it the console cannot be opened).

## Operational notes

- Public endpoints are rate limited per instance: 40 chat messages/minute and 6 inquiries/10
  minutes per IP.
- API responses are sent with `Cache-Control: no-store`.
- `/api/agreement` is public for reading the current agreement and admin-only for uploading.
- The supplied agreement PDF is a placeholder and must be replaced with the studio-approved
  legal document before accepting real bookings.
- Replace the sample portfolio images and contact details before launch.
