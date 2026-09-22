export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      // Admin endpoints authenticate with an HttpOnly session cookie.
      credentials: "same-origin",
      cache: "no-store",
      ...init,
      headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    });
  } catch {
    throw new ApiError("Cannot reach the server. Check your connection and try again.", 0);
  }

  const data = await response.json().catch(() => ({}) as Record<string, unknown>);
  if (!response.ok) {
    const body = data as { error?: string; code?: string };
    throw new ApiError(body?.error || `Request failed (${response.status}).`, response.status, body?.code);
  }
  return data as T;
}
