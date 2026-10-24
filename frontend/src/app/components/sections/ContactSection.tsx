"use client";

import { useState, type FormEvent } from "react";
import SectionHeading from "../SectionHeading";
import { AVAILABILITY, CONTACT_FIELD_LIMITS, CONTACT_LINKS, CONTACT_SUBJECTS, LOCATION } from "../../data/contact";
import { CheckIcon } from "../contact/ContactIcons";
import ContactChannel from "../contact/ContactChannel";
import { useContactSend } from "../contact/contact-hooks";
import "../projects/projects.css";
import "../contact/contact.css";

export default function ContactSection() {
    const [subjectId, setSubjectId] = useState(CONTACT_SUBJECTS[0].id);
    const { isSent, isSending, error, send, reset } = useContactSend();

    // No form `action`: React would clear the fields, and they must survive a failed send.
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        send(new FormData(event.currentTarget));
    }

    return (
        <section className="ct-section" id="contact">
            <SectionHeading index="04" command="ping gaetan" title="Me contacter" />

            <div className="ct-layout">
                <div className="ct-info">
                    <p className="ct-pitch">
                        Une idée de projet ? Contactez-moi.
                    </p>
                    <span className="proj-status is-live">
                        <span className="proj-status-dot" />
                        {AVAILABILITY}
                    </span>

                    <ul className="ct-channels">
                        {CONTACT_LINKS.map((link) => (
                            <ContactChannel key={link.id} link={link} />
                        ))}
                    </ul>

                    <p className="ct-location">
                        <span className="hero-surtitle-prompt">❯</span> {LOCATION}
                    </p>
                </div>

                <form className="ct-form" onSubmit={handleSubmit}>
                    {isSent ? (
                        <div className="ct-sent" role="status">
                            <span className="ct-sent-icon"><CheckIcon size={22} /></span>
                            <h3>Message envoyé</h3>
                            <p>Merci ! Je reviens vers vous sous 48h.</p>
                            <button type="button" className="proj-btn-ghost ct-ghost" onClick={reset}>
                                Écrire un autre message
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="ct-row">
                                <label className="ct-field">
                                    <span className="ct-label">Nom</span>
                                    <input className="ct-input" name="name" required maxLength={CONTACT_FIELD_LIMITS.nameMax} autoComplete="name" placeholder="Batman" />
                                </label>
                                <label className="ct-field">
                                    <span className="ct-label">Email</span>
                                    <input className="ct-input" name="email" type="email" required maxLength={CONTACT_FIELD_LIMITS.emailMax} autoComplete="email" placeholder="batman@gotham.com" />
                                </label>
                            </div>

                            <input type="hidden" name="subject" value={subjectId} />
                            {/* Honeypot: invisible to people, ticked by bots. A checkbox, because autofill fills text fields even when hidden. */}
                            <input className="ct-honeypot" type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" />

                            <fieldset className="ct-field">
                                <legend className="ct-label">Sujet</legend>
                                <div className="stack-filters ct-subjects">
                                    {CONTACT_SUBJECTS.map((subject) => (
                                        <button
                                            key={subject.id}
                                            type="button"
                                            className={`stack-filter${subject.id === subjectId ? " active" : ""}`}
                                            onClick={() => setSubjectId(subject.id)}
                                            aria-pressed={subject.id === subjectId}
                                        >
                                            {subject.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <label className="ct-field">
                                <span className="ct-label">Message</span>
                                <textarea
                                    className="ct-input ct-textarea"
                                    name="message"
                                    rows={6}
                                    required
                                    minLength={CONTACT_FIELD_LIMITS.messageMin}
                                    maxLength={CONTACT_FIELD_LIMITS.messageMax}
                                    placeholder="Parlez-moi de votre projet…"
                                />
                            </label>

                            <div className="ct-footer">
                                {error ? (
                                    <span className="ct-hint ct-error" role="alert">{error}</span>
                                ) : (
                                    <span className="ct-hint">Pas de spam, pas de newsletter.</span>
                                )}
                                <button type="submit" className="btn-skew ct-submit" disabled={isSending}>
                                    <span className="btn-skew-shadow" />
                                    <span className="btn-skew-main">
                                        <span className="btn-skew-inner">
                                            {isSending ? "Envoi…" : "Envoyer le message"}
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </section>
    );
}
