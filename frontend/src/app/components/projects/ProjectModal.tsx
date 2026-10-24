"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../../data/projects";
import ProjectThumb from "./ProjectThumb";
import { StackTags, StatusBadge } from "./ProjectBits";
import { ArrowIcon, CloseIcon, ExternalIcon, GithubIcon } from "./ProjectIcons";
import "./projects.css";

type Props = {
    projects: Project[];
    /** Index of the open project, or null when the modal is closed. */
    index: number | null;
    onClose: () => void;
    onNavigate: (index: number) => void;
};

const CLOSE_DURATION = 220;

export default function ProjectModal({ projects, index, onClose, onNavigate }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [closing, setClosing] = useState(false);

    const project = index !== null ? projects[index] : null;

    const requestClose = useCallback(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            onClose();
            return;
        }
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, CLOSE_DURATION);
    }, [onClose]);

    const go = useCallback(
        (step: number) => {
            if (index === null) return;
            onNavigate((index + step + projects.length) % projects.length);
        },
        [index, onNavigate, projects.length]
    );

    // Open / close the native dialog (gives us focus trapping + top layer for free).
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (index !== null && !dialog.open) {
            dialog.showModal();
            document.body.style.overflow = "hidden";
        }
        if (index === null && dialog.open) {
            dialog.close();
            document.body.style.overflow = "";
        }
    }, [index]);

    useEffect(() => () => {
        document.body.style.overflow = "";
    }, []);

    // Back to the top when switching project.
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [index]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const onCancel = (event: Event) => {
            event.preventDefault();
            requestClose();
        };
        // The browser can force-close the dialog (e.g. Esc pressed twice), keep state in sync.
        const onNativeClose = () => {
            document.body.style.overflow = "";
            onClose();
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "ArrowRight") go(1);
            if (event.key === "ArrowLeft") go(-1);
        };

        dialog.addEventListener("cancel", onCancel);
        dialog.addEventListener("close", onNativeClose);
        dialog.addEventListener("keydown", onKey);
        return () => {
            dialog.removeEventListener("cancel", onCancel);
            dialog.removeEventListener("close", onNativeClose);
            dialog.removeEventListener("keydown", onKey);
        };
    }, [requestClose, go, onClose]);

    const position = index !== null ? String(index + 1).padStart(2, "0") : "00";
    const total = String(projects.length).padStart(2, "0");

    return (
        <dialog
            ref={dialogRef}
            className={`proj-modal${closing ? " is-closing" : ""}`}
            aria-labelledby="proj-modal-title"
        >
            {project && (
                <div className="proj-modal-scroll" ref={scrollRef}>
                    <div className="proj-modal-topbar">
                        <div className="proj-modal-path">
                            <span className="hero-surtitle-prompt">❯</span>
                            <span>~/projets/</span>
                            <span className="proj-modal-path-slug">{project.slug}</span>
                        </div>

                        <div className="proj-modal-controls">
                            <span className="proj-modal-count">
                                {position} <span>/ {total}</span>
                            </span>
                            <button className="arr-skew" onClick={() => go(-1)} aria-label="Projet précédent">
                                <ArrowIcon size={14} direction="left" />
                            </button>
                            <button className="arr-skew" onClick={() => go(1)} aria-label="Projet suivant">
                                <ArrowIcon size={14} />
                            </button>
                            <button className="proj-modal-close" onClick={requestClose} autoFocus>
                                <span className="proj-modal-close-hint">Échap</span>
                                <CloseIcon size={14} />
                                <span className="sr-only">Fermer</span>
                            </button>
                        </div>
                    </div>

                    <div className="proj-modal-content" key={project.slug}>
                        <ProjectThumb project={project} className="proj-modal-thumb" />

                        <div className="proj-modal-grid">
                            <div className="proj-modal-main">
                                <StatusBadge status={project.status} />
                                <h2 id="proj-modal-title" className="proj-modal-title">{project.title}</h2>
                                <p className="proj-modal-tagline">{project.tagline}</p>
                                <p className="proj-modal-desc">{project.description}</p>

                                <h3 className="proj-modal-subtitle">Points clés</h3>
                                <ul className="proj-modal-details">
                                    {project.details.map((detail) => (
                                        <li key={detail}>{detail}</li>
                                    ))}
                                </ul>
                            </div>

                            <aside className="proj-modal-aside">
                                <dl className="proj-modal-meta">
                                    <div>
                                        <dt>Année</dt>
                                        <dd>{project.year}</dd>
                                    </div>
                                    <div>
                                        <dt>Rôle</dt>
                                        <dd>{project.role}</dd>
                                    </div>
                                    <div>
                                        <dt>Stack</dt>
                                        <dd><StackTags stack={project.stack} /></dd>
                                    </div>
                                </dl>

                                <div className="proj-modal-actions">
                                    {project.links.live && (
                                        <a className="btn-skew" href={project.links.live} target="_blank" rel="noopener noreferrer">
                                            <div className="btn-skew-shadow" />
                                            <div className="btn-skew-main">
                                                <span className="btn-skew-inner proj-btn-inner">
                                                    Voir en ligne <ExternalIcon size={12} />
                                                </span>
                                            </div>
                                        </a>
                                    )}
                                    {project.links.github && (
                                        <a className="proj-btn-ghost" href={project.links.github} target="_blank" rel="noopener noreferrer">
                                            <GithubIcon size={14} /> Code source
                                        </a>
                                    )}
                                    {!project.links.live && !project.links.github && (
                                        <p className="proj-modal-private">Projet client — code et démo privés.</p>
                                    )}
                                </div>
                            </aside>
                        </div>

                        <nav className="proj-modal-next" aria-label="Navigation entre projets">
                            <button onClick={() => go(-1)}>
                                <ArrowIcon size={14} direction="left" />
                                <span>
                                    <small>Précédent</small>
                                    {projects[(index! - 1 + projects.length) % projects.length].title}
                                </span>
                            </button>
                            <button onClick={() => go(1)} className="is-next">
                                <span>
                                    <small>Suivant</small>
                                    {projects[(index! + 1) % projects.length].title}
                                </span>
                                <ArrowIcon size={14} />
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </dialog>
    );
}
