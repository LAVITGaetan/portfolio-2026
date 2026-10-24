import { useEffect, useRef, useState, useTransition } from "react";
import { sendContact } from "../../actions/send-contact";
import { revealContact, type RevealedContact } from "../../actions/reveal-contact";
import type { PrivateContactId } from "../../data/contact";

const COPIED_DURATION = 1800;
const NETWORK_ERROR = "Connexion impossible. Vérifiez votre réseau et réessayez.";

export function useContactSend() {
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSending, startTransition] = useTransition();

    function send(formData: FormData) {
        setError(null);
        startTransition(async () => {
            try {
                const result = await sendContact(formData);
                if (result.isSent) setIsSent(true);
                else setError(result.error);
            } catch {
                setError(NETWORK_ERROR);
            }
        });
    }

    return { isSent, isSending, error, send, reset: () => setIsSent(false) };
}

/** Asks the server for a private value on demand, so it never sits in the page for scrapers. */
export function useRevealContact(id: PrivateContactId) {
    const [revealed, setRevealed] = useState<RevealedContact | null>(null);
    const [hasFailed, setHasFailed] = useState(false);
    const [isRevealing, startTransition] = useTransition();
    const linkRef = useRef<HTMLAnchorElement>(null);

    // The reveal button is replaced by the link: hand the focus over so keyboard users keep their place.
    useEffect(() => {
        if (revealed) linkRef.current?.focus();
    }, [revealed]);

    function reveal() {
        setHasFailed(false);
        startTransition(async () => {
            try {
                const result = await revealContact(id);
                if (result) setRevealed(result);
                else setHasFailed(true);
            } catch {
                setHasFailed(true);
            }
        });
    }

    return { revealed, isRevealing, hasFailed, reveal, linkRef };
}

export function useCopy(text: string) {
    const [isCopied, setIsCopied] = useState(false);

    async function copy() {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), COPIED_DURATION);
    }

    return { isCopied, copy };
}
