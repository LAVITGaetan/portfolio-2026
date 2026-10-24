import "server-only";
import type { PrivateContactId } from "./contact";

/** Kept out of the browser bundle: these only leave the server through the reveal action. */
export const PRIVATE_CONTACTS: Record<PrivateContactId, { value: string; href: string }> = {
    email: { value: "g.lavitdh@gmail.com", href: "mailto:g.lavitdh@gmail.com" },
    phone: { value: "06 93 83 28 21", href: "tel:+262693832821" },
};
