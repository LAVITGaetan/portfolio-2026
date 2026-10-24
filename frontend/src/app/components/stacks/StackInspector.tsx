import type { CSSProperties } from "react";
import { STACKS_BY_LEVEL, LEVEL_LABELS, projectsUsing, type Stack } from "../../data/stacks";
import { StackIcon, StackLevel } from "./StackBits";

type Props = {
    stack: Stack;
    onSelect: (name: string) => void;
};

/** Right-hand panel: level, related projects and same-domain stacks of the active stack. */
export default function StackInspector({ stack, onSelect }: Props) {
    const used = projectsUsing(stack.name);
    const siblings = STACKS_BY_LEVEL.filter((item) => item.category === stack.category && item.name !== stack.name);

    return (
        <aside className="sm-inspector" aria-live="polite" style={{ "--stack-color": stack.color } as CSSProperties}>
            <p className="sm-inspector-cmd">
                <span className="hero-surtitle-prompt">❯</span> stack --info {stack.name.toLowerCase()}
            </p>

            <div className="sm-inspector-head" key={stack.name}>
                <StackIcon stack={stack} size={72} />
                <div>
                    <span className="sm-inspector-category">{stack.category}</span>
                    <h3 className="sm-inspector-title">{stack.name}</h3>
                </div>
            </div>

            <div className="sm-inspector-block">
                <span className="sm-inspector-label">Niveau</span>
                <div className="sm-inspector-level">
                    <StackLevel level={stack.level} large />
                    <span>{LEVEL_LABELS[stack.level]}</span>
                </div>
            </div>

            <div className="sm-inspector-block">
                <span className="sm-inspector-label">Utilisé dans</span>
                {used.length > 0 ? (
                    <ul className="sm-inspector-projects">
                        {used.map((project) => (
                            <li key={project.slug}>
                                <a href="#projets">{project.title}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="sm-inspector-empty">Pas encore dans un projet public.</p>
                )}
            </div>

            {siblings.length > 0 && (
                <div className="sm-inspector-block">
                    <span className="sm-inspector-label">Même domaine</span>
                    <div className="sm-inspector-siblings">
                        {siblings.map((item) => (
                            <button key={item.name} className="sm-sibling" onClick={() => onSelect(item.name)}>
                                {item.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}
