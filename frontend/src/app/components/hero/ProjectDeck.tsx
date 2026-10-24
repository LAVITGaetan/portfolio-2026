"use client";

import { useEffect, useState, type CSSProperties } from "react";
import ProjectThumb from "../projects/ProjectThumb";
import { StatusBadge } from "../projects/ProjectBits";
import { ArrowIcon } from "../projects/ProjectIcons";
import { PROJECTS } from "../../data/projects";
import "../projects/projects.css";

const AUTOPLAY_DELAY = 3500;
const PROJECT_COUNT = PROJECTS.length;

/** Stacked project cards that cycle on their own, paused on hover. */
export default function ProjectDeck() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => setActiveIndex((index) => (index + 1) % PROJECT_COUNT), AUTOPLAY_DELAY);
        return () => clearInterval(timer);
    }, [isPaused]);

    const active = PROJECTS[activeIndex];
    const goTo = (offset: number) => setActiveIndex((activeIndex + offset + PROJECT_COUNT) % PROJECT_COUNT);

    return (
        <div
            className="hero-right hero-deck"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="hero-deck-stack">
                {PROJECTS.map((project, index) => {
                    const position = (index - activeIndex + PROJECT_COUNT) % PROJECT_COUNT;
                    return (
                        <button
                            key={project.slug}
                            type="button"
                            className="hero-deck-card"
                            style={{ "--position": position } as CSSProperties}
                            onClick={() => goTo(1)}
                            tabIndex={position === 0 ? 0 : -1}
                            aria-hidden={position !== 0}
                            aria-label="Projet suivant"
                        >
                            <ProjectThumb project={project} />
                        </button>
                    );
                })}
            </div>

            {/* The wrapper plays the intro once; the keyed caption fades on every change. */}
            <div className="hero-deck-footer">
                <div className="hero-deck-caption" key={active.slug}>
                    <div className="hero-deck-text">
                        <StatusBadge status={active.status} />
                        <p className="hero-deck-title">{active.title}</p>
                        <p className="hero-deck-tagline">{active.tagline}</p>
                    </div>
                    <div className="hero-deck-controls">
                        <span className="hero-deck-count">
                            {String(activeIndex + 1).padStart(2, "0")} <span>/ {String(PROJECT_COUNT).padStart(2, "0")}</span>
                        </span>
                        <button type="button" className="arr-skew" onClick={() => goTo(-1)} aria-label="Projet précédent">
                            <ArrowIcon size={12} direction="left" />
                        </button>
                        <button type="button" className="arr-skew" onClick={() => goTo(1)} aria-label="Projet suivant">
                            <ArrowIcon size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
