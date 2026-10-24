import { useState, useTransition } from "react";
import { sendContact } from "../../actions/send-contact";

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

export function useCopy(text: string) {
    const [isCopied, setIsCopied] = useState(false);

    async function copy() {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), COPIED_DURATION);
    }

    return { isCopied, copy };
}
