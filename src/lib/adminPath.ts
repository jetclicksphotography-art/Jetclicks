/**
 * The studio console lives on an unlinked route. Set VITE_ADMIN_PATH at build
 * time to move it somewhere less guessable; the URL is obscurity only - the
 * real boundary is the ADMIN_PASSWORD check in /api/auth.
 */
const configured = (import.meta.env.VITE_ADMIN_PATH || "/studio-console").trim();

export const ADMIN_PATH = configured.startsWith("/") ? configured : `/${configured}`;
