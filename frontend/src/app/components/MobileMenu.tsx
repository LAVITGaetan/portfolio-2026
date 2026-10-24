"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { SECTION_LINKS } from "../data/site";

/** Matches the CSS breakpoint above which the desktop links are shown. */
const DESKTOP_QUERY = "(min-width: 901px)";

export default function MobileMenu({ activeId }: { activeId: string | null }) {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    useEffect(() => {
        if (!isOpen) return;

        const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsOpen(false);
        // Otherwise the page would stay locked after resizing to desktop with the menu open.
        const desktopQuery = window.matchMedia(DESKTOP_QUERY);
        const closeOnDesktop = (event: MediaQueryListEvent) => event.matches && setIsOpen(false);

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", closeOnEscape);
        desktopQuery.addEventListener("change", closeOnDesktop);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", closeOnEscape);
            desktopQuery.removeEventListener("change", closeOnDesktop);
        };
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                className={`navbar-burger${isOpen ? " is-open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
                <span />
                <span />
                <span />
            </button>

            {/* The backdrop closes the menu; clicks inside the panel don't reach it. */}
            <div
                id="mobile-menu"
                className={`mobile-menu${isOpen ? " is-open" : ""}`}
                onClick={(event) => event.target === event.currentTarget && close()}
                inert={!isOpen}
            >
                <div className="mobile-menu-panel">
                    <ul className="mobile-menu-links">
                        {SECTION_LINKS.map((link, index) => {
                            const isActive = link.href === `#${activeId}`;

                            return (
                                <li key={link.href} style={{ "--index": index } as CSSProperties}>
                                    <a
                                        className={`mobile-menu-link${isActive ? " active" : ""}`}
                                        href={link.href}
                                        onClick={close}
                                        aria-current={isActive ? "true" : undefined}
                                    >
                                        <span className="mobile-menu-num">{link.index}</span>
                                        <span className="mobile-menu-txt">{link.label}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <a href="#contact" className="btn-skew mobile-menu-cta" onClick={close}>
                        <div className="btn-skew-shadow" />
                        <div className="btn-skew-main">
                            <span className="btn-skew-inner">Me contacter</span>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}
