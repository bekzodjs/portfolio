// Brute-force protection for the admin login. Counters live in memory, so they
// reset when the app restarts; that is enough to make password guessing useless.

const WINDOW_MS = 15 * 60 * 1000; // failed attempts are counted over 15 minutes
const MAX_PER_IP = 5; // wrong passwords allowed from one address
const MAX_TOTAL = 40; // wrong passwords allowed from all addresses together
const MAX_TRACKED = 5000; // cap on remembered addresses

type Entry = { count: number; resetAt: number };

const byIp = new Map<string, Entry>();
let total: Entry = { count: 0, resetAt: 0 };

function fresh(entry: Entry | undefined, now: number): Entry {
  return entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + WINDOW_MS };
}

/** The visitor's address as reported by the web server in front of the app (nginx on Plesk). */
export function clientIp(req: Request): string {
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real;
  // The proxy appends the real address last; earlier entries can be forged by the client.
  const forwarded = req.headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  return forwarded || "unknown";
}

/** Seconds the caller still has to wait, or 0 when another attempt is allowed. */
export function loginBlockedFor(ip: string, now = Date.now()): number {
  const mine = fresh(byIp.get(ip), now);
  const all = fresh(total, now);
  const until = Math.max(
    mine.count >= MAX_PER_IP ? mine.resetAt : 0,
    all.count >= MAX_TOTAL ? all.resetAt : 0,
  );
  return until > now ? Math.ceil((until - now) / 1000) : 0;
}

export function recordLoginFailure(ip: string, now = Date.now()): void {
  if (byIp.size >= MAX_TRACKED) {
    for (const [key, entry] of byIp) if (entry.resetAt <= now) byIp.delete(key);
    if (byIp.size >= MAX_TRACKED) byIp.clear();
  }
  const mine = fresh(byIp.get(ip), now);
  mine.count += 1;
  byIp.set(ip, mine);
  total = fresh(total, now);
  total.count += 1;
}

export function recordLoginSuccess(ip: string): void {
  byIp.delete(ip);
}
