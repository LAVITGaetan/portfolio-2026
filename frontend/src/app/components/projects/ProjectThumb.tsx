"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import type { Project } from "../../data/projects";
import { CollaboratorStack } from "./ProjectCollaborators";

type Props = {
    project: Project;
    className?: string;
};

/** Stable hue (0-360) derived from the slug, so each placeholder gets its own tint. */
function hueFromSlug(slug: string) {
    let hash = 0;
    for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 360;
    return hash;
}

/**
 * Shows `project.thumbnail`. Falls back to a generated placeholder when no
 * image is set or when the file fails to load.
 */
export default function ProjectThumb({ project, className = "" }: Props) {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);

    if (project.thumbnail && failedSrc !== project.thumbnail) {
        return (
            <div className={`proj-thumb ${className}`}>
                <Image
                    className="proj-thumb-img"
                    src={project.thumbnail}
                    alt={`Aperçu de ${project.title}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    onError={() => setFailedSrc(project.thumbnail ?? null)}
                />
                <ThumbCollaborators project={project} />
            </div>
        );
    }

    return <ThumbPlaceholder project={project} className={className} />;
}

function ThumbCollaborators({ project }: { project: Project }) {
    if (!project.collaborators?.length) return null;
    return <CollaboratorStack collaborators={project.collaborators} size={32} className="proj-thumb-collabs" />;
}

function ThumbPlaceholder({ project, className }: Props) {
    const initials = project.title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className={`proj-thumb proj-thumb-generated ${className}`}
            style={{ "--hue": hueFromSlug(project.slug) } as CSSProperties}
            role="img"
            aria-label={`Aperçu de ${project.title}`}
        >
            <div className="proj-thumb-grid" />
            <div className="proj-thumb-window">
                <div className="proj-thumb-bar">
                    <i /><i /><i />
                </div>
                <div className="proj-thumb-body">
                    <div className="proj-thumb-side" />
                    <div className="proj-thumb-main">
                        <div className="proj-thumb-line w-60" />
                        <div className="proj-thumb-line w-40" />
                        <div className="proj-thumb-blocks">
                            <div /><div /><div />
                        </div>
                    </div>
                </div>
            </div>
            <span className="proj-thumb-initials">{initials}</span>
            <ThumbCollaborators project={project} />
        </div>
    );
}
