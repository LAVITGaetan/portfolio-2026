"use client";

import { useRef, useState, type MouseEvent } from "react";
import type { Project } from "../../data/projects";
import ProjectThumb from "./ProjectThumb";
import { ProjectLinks, StackTags, StatusBadge } from "./ProjectBits";
import { ArrowIcon } from "./ProjectIcons";
import "./projects.css";

type Props = {
    projects: Project[];
    onOpen: (index: number) => void;
};

/**
 * Editorial layout: a featured project echoing the hero split, then a
 * numbered index whose thumbnail follows the cursor on hover.
 */
export default function ProjectShowcase({ projects, onOpen }: Props) {
    const [hovered, setHovered] = useState<number | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const [featured, ...others] = projects;
    if (!featured) return null;

    const onMove = (event: MouseEvent<HTMLDivElement>) => {
        const list = listRef.current;
        if (!list) return;
        const rect = list.getBoundingClientRect();
        list.style.setProperty("--x", `${event.clientX - rect.left}px`);
        list.style.setProperty("--y", `${event.clientY - rect.top}px`);
    };

    return (
        <>
            <article className="ps-featured">
                <button className="ps-featured-media" onClick={() => onOpen(0)} aria-label={`Ouvrir ${featured.title}`}>
                    <ProjectThumb project={featured} />
                    <span className="ps-featured-label">★ Projet phare</span>
                </button>

                <div className="ps-featured-body">
                    <div className="ps-featured-meta">
                        <StatusBadge status={featured.status} />
                        <span>{featured.year} · {featured.role}</span>
                    </div>
                    <h3 className="ps-featured-title">{featured.title}</h3>
                    <p className="ps-featured-tagline">{featured.tagline}</p>
                    <p className="hero-text">{featured.description}</p>
                    <StackTags stack={featured.stack} />
                    <div className="ps-featured-actions">
                        <button className="btn-skew proj-btn-reset" onClick={() => onOpen(0)}>
                            <div className="btn-skew-shadow" />
                            <div className="btn-skew-main">
                                <span className="btn-skew-inner proj-btn-inner">
                                    Découvrir le projet <ArrowIcon size={12} />
                                </span>
                            </div>
                        </button>
                        <ProjectLinks project={featured} />
                    </div>
                </div>
            </article>

            {others.length > 0 && (
                <div
                    className={`ps-list-wrap${hovered !== null ? " is-hovering" : ""}`}
                    ref={listRef}
                    onMouseMove={onMove}
                    onMouseLeave={() => setHovered(null)}
                >
                    <ol className="ps-list">
                        {others.map((project, i) => {
                            const index = i + 1;
                            return (
                                <li key={project.slug}>
                                    <button
                                        className="ps-row"
                                        onClick={() => onOpen(index)}
                                        onMouseEnter={() => setHovered(index)}
                                        onFocus={() => setHovered(null)}
                                    >
                                        <span className="ps-row-num">{String(index + 1).padStart(2, "0")}</span>
                                        <span className="ps-row-main">
                                            <span className="ps-row-title">{project.title}</span>
                                            <span className="ps-row-tagline">{project.tagline}</span>
                                        </span>
                                        <span className="ps-row-stack">{project.stack.slice(0, 3).join(" · ")}</span>
                                        <span className="ps-row-year">{project.year}</span>
                                        <span className="ps-row-arrow"><ArrowIcon size={18} /></span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>

                    {/* Floating preview — fine pointers only, hidden via CSS elsewhere. */}
                    <div className="ps-preview" aria-hidden="true">
                        {others.map((project, i) => (
                            <div key={project.slug} className={`ps-preview-item${hovered === i + 1 ? " is-active" : ""}`}>
                                <ProjectThumb project={project} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
