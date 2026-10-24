"use client";

import { useState } from "react";
import { PROJECTS, type ProjectStatus } from "../../data/projects";
import ProjectGrid from "../projects/ProjectGrid";
import ProjectShowcase from "../projects/ProjectShowcase";
import ProjectModal from "../projects/ProjectModal";
import SectionHeading from "../SectionHeading";
import { GridIcon, ShowcaseIcon } from "../projects/ProjectIcons";
import "../projects/projects.css";

type Filter = "Tous" | ProjectStatus;
type View = "grid" | "showcase";

const FILTERS: Filter[] = ["Tous", "En ligne", "En cours"];

const VIEWS = [
    { id: "grid", label: "Affichage en cartes", Icon: GridIcon },
    { id: "showcase", label: "Affichage showcase", Icon: ShowcaseIcon },
] as const;

export default function ProjectSection() {
    const [view, setView] = useState<View>("grid");
    const [filter, setFilter] = useState<Filter>("Tous");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const projects = PROJECTS.filter((project) => filter === "Tous" || project.status === filter);

    const viewSwitch = (
        <div className="proj-view-switch" role="group" aria-label="Mode d'affichage">
            {VIEWS.map(({ id, label, Icon }) => (
                <button
                    key={id}
                    className={`proj-view-btn${view === id ? " active" : ""}`}
                    onClick={() => setView(id)}
                    aria-pressed={view === id}
                    aria-label={label}
                    title={label}
                >
                    <Icon size={14} />
                </button>
            ))}
        </div>
    );

    return (
        <section className="proj-section" id="projets">
            <SectionHeading index="01" command="ls ~/projets" title="Projets & Réalisations" actions={viewSwitch}>
                <div className="stack-filters proj-filters" role="group" aria-label="Filtrer par statut">
                    {FILTERS.map((item) => (
                        <button
                            key={item}
                            className={`stack-filter${filter === item ? " active" : ""}`}
                            onClick={() => setFilter(item)}
                            aria-pressed={filter === item}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </SectionHeading>

            <div className="proj-view" key={`${view}-${filter}`}>
                {projects.length === 0 ? (
                    <p className="proj-empty">Aucun projet pour ce filtre.</p>
                ) : view === "grid" ? (
                    <ProjectGrid projects={projects} onOpen={setOpenIndex} />
                ) : (
                    <ProjectShowcase projects={projects} onOpen={setOpenIndex} />
                )}
            </div>

            <ProjectModal
                projects={projects}
                index={openIndex}
                onClose={() => setOpenIndex(null)}
                onNavigate={setOpenIndex}
            />
        </section>
    );
}
