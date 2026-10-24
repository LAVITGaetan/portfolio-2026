"use client";

import MeerkatLogo from "./MeerkatLogo";
import { ArrowIcon } from "./projects/ProjectIcons";
import FooterContactLink from "./contact/FooterContactLink";
import { AVAILABILITY, CONTACT_LINKS, LOCATION } from "../data/contact";
import { OWNER_NAME, OWNER_ROLE, SECTION_LINKS } from "../data/site";
import "./projects/projects.css";
import "./contact/contact.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="footer-brand-head">
                        <MeerkatLogo />
                        <div>
                            <p className="footer-name">{OWNER_NAME}</p>
                            <p className="footer-role">{OWNER_ROLE}</p>
                        </div>
                    </div>
                    <span className="proj-status is-live">
                        <span className="proj-status-dot" />
                        {AVAILABILITY}
                    </span>
                </div>

                <nav className="footer-col" aria-label="Plan du site">
                    <p className="footer-col-title">Navigation</p>
                    <ul>
                        {SECTION_LINKS.map((link) => (
                            <li key={link.href}>
                                <a className="footer-link" href={link.href}>
                                    <span className="footer-link-num">{link.index}</span>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="footer-col">
                    <p className="footer-col-title">Contact</p>
                    <ul>
                        {CONTACT_LINKS.map((link) => (
                            <FooterContactLink key={link.id} link={link} />
                        ))}
                    </ul>
                </div>

                <div className="footer-col">
                    <p className="footer-col-title">A propos</p>
                    <p className="footer-text">Conçu et codé avec Next.js.</p>
                    <p className="footer-text">
                        <span className="hero-surtitle-prompt">❯</span> {LOCATION}
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} {OWNER_NAME} — Tous droits réservés</span>
                <button type="button" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    Haut de page
                    <span className="arr-skew" aria-hidden="true">
                        <ArrowIcon size={12} />
                    </span>
                </button>
            </div>
        </footer>
    );
}
