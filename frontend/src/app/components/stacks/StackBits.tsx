import type { CSSProperties } from "react";
import { LEVEL_LABELS, type Stack } from "../../data/stacks";

type IconProps = {
    stack: Stack;
    size?: number;
};

/** Shows `stack.icon` as a mask so CSS can recolor it, or a monogram tinted with the brand color. */
export function StackIcon({ stack, size = 40 }: IconProps) {
    const style = { "--stack-color": stack.color, "--stack-size": `${size}px` } as CSSProperties;

    if (stack.icon) {
        return (
            <span className="stk-icon" style={style} aria-hidden="true">
                <span className="stk-logo" style={{ maskImage: `url(${stack.icon})` }} />
            </span>
        );
    }

    return (
        <span className="stk-icon is-monogram" style={style} aria-hidden="true">
            {stack.short}
        </span>
    );
}

const STAR_PATH = "M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z";

/** 5 stars, filled up to `level` and outlined after. */
export function StackLevel({ level, large = false }: { level: number; large?: boolean }) {
    return (
        <span className={`stk-level${large ? " is-large" : ""}`}>
            <span className="stk-stars" role="img" aria-label={`Niveau ${level} sur 5 — ${LEVEL_LABELS[level]}`}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <svg key={index} className={`stk-star${index >= level ? " off" : ""}`} viewBox="0 0 24 24" aria-hidden="true">
                        <path d={STAR_PATH} />
                    </svg>
                ))}
            </span>
        </span>
    );
}
