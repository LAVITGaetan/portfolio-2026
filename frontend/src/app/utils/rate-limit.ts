import { headers } from "next/headers";

const hitsByKey = new Map<string, number[]>();

/** Reliable behind a proxy that sets x-forwarded-for (e.g. Vercel), spoofable without one. */
export async function getClientIp(): Promise<string> {
    return (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

/**
 * Sliding window kept in memory: enough for a low-traffic form, but each server instance
 * has its own counter, so it slows abuse down rather than blocking it for sure.
 */
export function isRateLimited(key: string, maxHits: number, windowMs: number): boolean {
    const now = Date.now();
    const recentHits = (hitsByKey.get(key) ?? []).filter((time) => now - time < windowMs);

    if (recentHits.length >= maxHits) {
        hitsByKey.set(key, recentHits);
        return true;
    }

    hitsByKey.set(key, [...recentHits, now]);
    return false;
}
