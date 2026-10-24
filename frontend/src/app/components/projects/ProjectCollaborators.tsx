"use client";

import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import Image from "next/image";
import type { Collaborator } from "../../data/projects";
import { ExternalIcon, GithubIcon } from "./ProjectIcons";

const STACK_MAX = 3;

type Tab = "overview" | "collaborators";

/** GitHub profile picture, or the GitHub mark when it can't load. */
function CollaboratorAvatar({ collaborator, size }: { collaborator: Collaborator; size: number }) {
    const [hasFailed, setHasFailed] = useState(false);

    return (
        <span className="collab-avatar" style={{ width: size, height: size }}>
            {hasFailed ? (
                <GithubIcon size={Math.round(size * 0.55)} />
            ) : (
                <Image
                    src={`https://avatars.githubusercontent.com/${collaborator.github}`}
                    alt=""
                    width={size}
                    height={size}
                    onError={() => setHasFailed(true)}
                />
            )}
        </span>
    );
}

/** Overlapping avatars, the first one in front; hovering one shows who it is. */
export function CollaboratorStack({ collaborators, size, className = "" }: { collaborators: Collaborator[]; size: number; className?: string }) {
    const shown = collaborators.slice(0, STACK_MAX);
    const rest = collaborators.length - shown.length;

    return (
        <span
            className={`collab-stack ${className}`}
            role="img"
            aria-label={`Avec ${collaborators.map((collaborator) => collaborator.name).join(", ")}`}
        >
            {shown.map((collaborator, index) => (
                <span key={collaborator.github} style={{ "--layer": shown.length - index } as CSSProperties}>
                    <CollaboratorAvatar collaborator={collaborator} size={size} />
                    <span className="collab-tooltip" aria-hidden="true">
                        {collaborator.name}
                        {collaborator.nickname && <span className="collab-tooltip-nickname">{collaborator.nickname}</span>}
                    </span>
                </span>
            ))}
            {rest > 0 && <span className="collab-avatar collab-more" style={{ width: size, height: size }}>+{rest}</span>}
        </span>
    );
}

function CollaboratorList({ collaborators }: { collaborators: Collaborator[] }) {
    return (
        <ul className="collab-list">
            {collaborators.map((collaborator) => (
                <li key={collaborator.github}>
                    <a className="collab-card" href={`https://github.com/${collaborator.github}`} target="_blank" rel="noopener noreferrer">
                        <CollaboratorAvatar collaborator={collaborator} size={56} />
                        <span className="collab-card-text">
                            <span className="collab-card-name">
                                {collaborator.name}
                                {collaborator.nickname && <span className="collab-nickname">{collaborator.nickname}</span>}
                            </span>
                            <span className="collab-card-github">
                                <GithubIcon size={12} /> @{collaborator.github}
                            </span>
                        </span>
                        <ExternalIcon size={14} />
                    </a>
                </li>
            ))}
        </ul>
    );
}

/** "Aperçu" / "Collaborateurs" tabs of the project modal. */
export function CollaboratorTabs({ collaborators, overview }: { collaborators: Collaborator[]; overview: ReactNode }) {
    const [tab, setTab] = useState<Tab>("overview");

    // Arrow keys switch tabs; stopPropagation keeps the modal from switching project.
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.stopPropagation();
        const nextTab = tab === "overview" ? "collaborators" : "overview";
        setTab(nextTab);
        document.getElementById(`proj-tab-${nextTab}`)?.focus();
    };

    const tabProps = (id: Tab) => ({
        id: `proj-tab-${id}`,
        role: "tab",
        "aria-selected": tab === id,
        "aria-controls": `proj-panel-${id}`,
        tabIndex: tab === id ? 0 : -1,
        className: `proj-tab${tab === id ? " is-active" : ""}`,
        onClick: () => setTab(id),
    });

    return (
        <>
            <div className="proj-tabs" role="tablist" aria-label="Contenu du projet" onKeyDown={onKeyDown}>
                <button {...tabProps("overview")}>Aperçu</button>
                <button {...tabProps("collaborators")}>
                    Collaborateurs
                    <span className="proj-tab-count">{collaborators.length}</span>
                    <CollaboratorStack collaborators={collaborators} size={22} />
                </button>
            </div>

            <div className="proj-tab-panel" id={`proj-panel-${tab}`} role="tabpanel" aria-labelledby={`proj-tab-${tab}`} key={tab}>
                {tab === "overview" ? overview : <CollaboratorList collaborators={collaborators} />}
            </div>
        </>
    );
}
