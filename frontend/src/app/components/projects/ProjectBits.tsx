import type { Project, ProjectStatus } from "../../data/projects";
import { ExternalIcon, GithubIcon } from "./ProjectIcons";

const STATUS_CLASS: Record<ProjectStatus, string> = {
    "En ligne": "is-live",
    "En cours": "is-wip",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
    return (
        <span className={`proj-status ${STATUS_CLASS[status]}`}>
            <span className="proj-status-dot" />
            {status}
        </span>
    );
}

export function StackTags({ stack, max }: { stack: string[]; max?: number }) {
    const shown = max ? stack.slice(0, max) : stack;
    const rest = stack.length - shown.length;

    return (
        <ul className="proj-tags">
            {shown.map((tech) => (
                <li key={tech} className="proj-tag">{tech}</li>
            ))}
            {rest > 0 && <li className="proj-tag is-more">+{rest}</li>}
        </ul>
    );
}

export function ProjectLinks({ project }: { project: Project }) {
    const { live, github } = project.links;
    if (!live && !github) return null;

    return (
        <div className="proj-links">
            {github && (
                <a
                    className="proj-icon-link"
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Code source de ${project.title} sur GitHub`}
                >
                    <GithubIcon />
                </a>
            )}
            {live && (
                <a
                    className="proj-icon-link"
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir ${project.title} en ligne`}
                >
                    <ExternalIcon />
                </a>
            )}
        </div>
    );
}
