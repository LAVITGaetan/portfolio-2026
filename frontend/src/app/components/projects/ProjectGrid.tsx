import type { Project } from "../../data/projects";
import ProjectThumb from "./ProjectThumb";
import { ProjectLinks, StackTags, StatusBadge } from "./ProjectBits";
import { ArrowIcon } from "./ProjectIcons";
import "./projects.css";

type Props = {
    projects: Project[];
    onOpen: (index: number) => void;
};

/** Responsive card grid. */
export default function ProjectGrid({ projects, onOpen }: Props) {
    return (
        <ul className="pg-grid">
            {projects.map((project, index) => (
                <li key={project.slug} className="pg-card" style={{ animationDelay: `${index * 70}ms` }}>
                    <div className="pg-card-media">
                        <ProjectThumb project={project} />
                        <div className="pg-card-overlay">
                            <StatusBadge status={project.status} />
                            <span className="pg-card-year">{project.year}</span>
                        </div>
                    </div>

                    <div className="pg-card-body">
                        <span className="pg-card-role">{project.role}</span>
                        <h3 className="pg-card-title">{project.title}</h3>
                        <p className="pg-card-desc">{project.description}</p>
                        <StackTags stack={project.stack} max={3} />
                    </div>

                    <div className="pg-card-footer">
                        <button className="btn-skew pg-card-cta" onClick={() => onOpen(index)}>
                            <div className="btn-skew-shadow" />
                            <div className="btn-skew-main">
                                <span className="btn-skew-inner proj-btn-inner">
                                    Détails <ArrowIcon size={12} />
                                </span>
                            </div>
                        </button>
                        <ProjectLinks project={project} />
                    </div>
                </li>
            ))}
        </ul>
    );
}
