"use client";

import type { ContactLink, PrivateContactId } from "../../data/contact";
import { ChannelIcon, EyeIcon } from "./ContactIcons";
import { useRevealContact } from "./contact-hooks";
import ScrambleText from "./ScrambleText";

function PrivateFooterLink({ id, label, masked }: { id: PrivateContactId; label: string; masked: string }) {
    const { revealed, isRevealing, reveal, linkRef } = useRevealContact(id);

    if (!revealed) {
        return (
            <button
                type="button"
                className={`footer-link footer-reveal${isRevealing ? " is-revealing" : ""}`}
                onClick={reveal}
                disabled={isRevealing}
                aria-label={`Afficher : ${label}`}
            >
                <ChannelIcon id={id} size={14} />
                <span className="ct-masked">{masked}</span>
                <EyeIcon size={12} />
            </button>
        );
    }

    return (
        <a className="footer-link" href={revealed.href} ref={linkRef} aria-label={`${label} : ${revealed.value}`}>
            <ChannelIcon id={id} size={14} />
            <ScrambleText text={revealed.value} />
        </a>
    );
}

export default function FooterContactLink({ link }: { link: ContactLink }) {
    return (
        <li>
            {"masked" in link ? (
                <PrivateFooterLink id={link.id} label={link.label} masked={link.masked} />
            ) : (
                <a className="footer-link" href={link.href} target="_blank" rel="noreferrer">
                    <ChannelIcon id={link.id} size={14} />
                    {link.value}
                </a>
            )}
        </li>
    );
}
