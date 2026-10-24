"use server";

import type { PrivateContactId } from "../data/contact";
import { PRIVATE_CONTACTS } from "../data/private-contact";
import { getClientIp, isRateLimited } from "../utils/rate-limit";

export type RevealedContact = { value: string; href: string };

// Generous for people clicking around, tight enough to slow a scraper looping on the action.
const MAX_REVEALS_PER_WINDOW = 20;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;

/** Returns null for an unknown id or once the visitor hits the limit. */
export async function revealContact(id: PrivateContactId): Promise<RevealedContact | null> {
    // The id comes from the client: only accept the known keys, not inherited ones.
    if (!Object.hasOwn(PRIVATE_CONTACTS, id)) return null;
    if (isRateLimited(`reveal:${await getClientIp()}`, MAX_REVEALS_PER_WINDOW, RATE_LIMIT_WINDOW)) return null;

    return PRIVATE_CONTACTS[id];
}
