# Atelier Photography — React + Vite + TypeScript

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Vercel
Import the project/repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

For SPA routing, add a `vercel.json` rewrite if your deployment returns 404 when refreshing nested routes.

## Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```
Choose `dist` as the public directory and configure it as a single-page app.

## Important before launch
- Replace the sample Unsplash image URLs in `src/data/portfolio.ts` with the company's own optimized images.
- Replace the contact details in `src/pages/Contact.tsx`.
- Connect `InquiryForm.tsx` to Firebase/Supabase/an email/API endpoint. The included submission is intentionally frontend-only.
- Change the studio name in `Navbar.tsx`, `Footer.tsx`, and `index.html`.
