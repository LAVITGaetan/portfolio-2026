"use server";

import { headers } from "next/headers";
import { CONTACT_EMAIL } from "../data/contact";
import { parseContactForm } from "../utils/contact-form";
import { isRateLimited } from "../utils/rate-limit";

export type SendContactResult = { isSent: true } | { isSent: false; error: string };

const RESEND_ENDPOINT = "https://api.resend.com/emails";
// Resend's shared sender only delivers to the account owner, which is all a contact form needs.
const SENDER = "Portfolio <onboarding@resend.dev>";
const REQUEST_TIMEOUT = 10_000;
const MAX_SENDS_PER_WINDOW = 3;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;

const GENERIC_ERROR = "L'envoi a échoué. Réessayez ou écrivez-moi directement  : g.lavitdh@gmail.com.";

export async function sendContact(formData: FormData): Promise<SendContactResult> {
    // Only bots tick the hidden checkbox: pretend it worked so they don't retry.
    if (formData.get("botcheck")) return { isSent: true };

    const contact = parseContactForm(formData);
    if (!contact) return { isSent: false, error: "Vérifiez les champs du formulaire." };

    const clientIp = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (isRateLimited(clientIp, MAX_SENDS_PER_WINDOW, RATE_LIMIT_WINDOW)) {
        return { isSent: false, error: "Trop de messages d'un coup. Réessayez dans quelques minutes." };
    }

    // No NEXT_PUBLIC_ prefix: Next would inline the key into browser bundles.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("[contact] RESEND_API_KEY is not set");
        return { isSent: false, error: GENERIC_ERROR };
    }

    try {
        const response = await fetch(RESEND_ENDPOINT, {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from: SENDER,
                to: [CONTACT_EMAIL],
                reply_to: contact.email,
                subject: `[Portfolio] ${contact.subject} · ${contact.name}`,
                // Plain text only: nothing the visitor typed can be rendered as HTML.
                text: `Nom : ${contact.name}\nEmail : ${contact.email}\nSujet : ${contact.subject}\n\n${contact.message}`,
            }),
            signal: AbortSignal.timeout(REQUEST_TIMEOUT),
        });

        if (!response.ok) {
            console.error("[contact] Resend refused the email", response.status, await response.text());
            return { isSent: false, error: GENERIC_ERROR };
        }

        return { isSent: true };
    } catch (error) {
        console.error("[contact] Resend request failed", error);
        return { isSent: false, error: GENERIC_ERROR };
    }
}
