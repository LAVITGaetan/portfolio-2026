"use client";

import type { ContactLink, PrivateContactId } from "../../data/contact";
import { ChannelIcon, CheckIcon, CopyIcon, EyeIcon } from "./ContactIcons";
import { useCopy, useRevealContact } from "./contact-hooks";
import ScrambleText from "./ScrambleText";

function ChannelBody({ id, label, children }: { id: ContactLink["id"]; label: string; children: React.ReactNode }) {
    return (
        <>
            <ChannelIcon id={id} size={18} />
            <span className="ct-channel-text">
                <span className="ct-channel-label">{label}</span>
                <span className="ct-channel-value">{children}</span>
            </span>
        </>
    );
}

function PrivateChannel({ id, label, masked }: { id: PrivateContactId; label: string; masked: string }) {
    const { revealed, isRevealing, hasFailed, reveal, linkRef } = useRevealContact(id);
    const { isCopied, copy } = useCopy(revealed?.value ?? "");

    if (!revealed) {
        return (
            <li className="ct-channel">
                <button
                    type="button"
                    className={`ct-channel-link ct-reveal${isRevealing ? " is-revealing" : ""}`}
                    onClick={reveal}
                    disabled={isRevealing}
                    aria-label={`Afficher : ${label}`}
                >
                    <ChannelBody id={id} label={label}>
                        <span className="ct-masked">{masked}</span>
                    </ChannelBody>
                    <span className="ct-reveal-hint">
                        <EyeIcon size={14} />
                        {hasFailed ? "Réessayer" : "Afficher"}
                    </span>
                </button>
            </li>
        );
    }

    return (
        <li className="ct-channel">
            <a className="ct-channel-link" href={revealed.href} ref={linkRef} aria-label={`${label} : ${revealed.value}`}>
                <ChannelBody id={id} label={label}>
                    <ScrambleText text={revealed.value} />
                </ChannelBody>
            </a>
            <button
                type="button"
                className={`proj-icon-link ct-copy${isCopied ? " is-copied" : ""}`}
                onClick={copy}
                aria-label={`Copier : ${label}`}
                title={isCopied ? "Copié !" : "Copier"}
            >
                {isCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            </button>
        </li>
    );
}

/** Public channels link straight away; private ones stay masked until the visitor asks. */
export default function ContactChannel({ link }: { link: ContactLink }) {
    if ("masked" in link) return <PrivateChannel id={link.id} label={link.label} masked={link.masked} />;

    return (
        <li className="ct-channel">
            <a className="ct-channel-link" href={link.href} target="_blank" rel="noreferrer">
                <ChannelBody id={link.id} label={link.label}>{link.value}</ChannelBody>
            </a>
        </li>
    );
}
