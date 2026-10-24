"use client";

import { useState } from "react";
import { STACK_CATEGORIES, STACKS_BY_LEVEL, type StackCategory } from "../../data/stacks";
import SectionHeading from "../SectionHeading";
import StackInspector from "../stacks/StackInspector";
import { StackIcon, StackLevel } from "../stacks/StackBits";
import { ArrowIcon } from "../projects/ProjectIcons";
import { useScrollMore } from "../stacks/use-scroll-more";
import "../stacks/stacks.css";

type Filter = "Tous" | StackCategory;

const FILTERS: Filter[] = ["Tous", ...STACK_CATEGORIES];

export default function StackSection() {
    const [filter, setFilter] = useState<Filter>("Tous");
    const [activeName, setActiveName] = useState(STACKS_BY_LEVEL[0].name);

    const active = STACKS_BY_LEVEL.find((stack) => stack.name === activeName) ?? STACKS_BY_LEVEL[0];
    const stacks = STACKS_BY_LEVEL.filter((stack) => filter === "Tous" || stack.category === filter);
    const { ref: scrollRef, canScrollDown, scrollDown } = useScrollMore<HTMLDivElement>(filter);

    const countFor = (item: Filter) =>
        item === "Tous" ? STACKS_BY_LEVEL.length : STACKS_BY_LEVEL.filter((stack) => stack.category === item).length;

    return (
        <section className="stk-section" id="technologies">
            <SectionHeading index="03" command="ls ~/stack" title="Technologies" />

            <div className="stk-layout">
                <div className="stk-left">
                    <div className="stack-filters stk-filters" role="group" aria-label="Filtrer par domaine">
                        {FILTERS.map((item) => (
                            <button
                                key={item}
                                className={`stack-filter${filter === item ? " active" : ""}`}
                                onClick={() => setFilter(item)}
                                aria-pressed={filter === item}
                            >
                                {item} <span className="stk-filter-count">{countFor(item)}</span>
                            </button>
                        ))}
                    </div>

                    <div className="stk-scroll-area">
                        <div className="stk-scroll" ref={scrollRef}>
                            <ul className="stk-grid" key={filter}>
                                {stacks.map((stack, index) => (
                                    <li key={stack.name}>
                                        <button
                                            className={`stack-card stk-card${stack.name === active.name ? " active" : ""}`}
                                            onClick={() => setActiveName(stack.name)}
                                            onFocus={() => setActiveName(stack.name)}
                                            aria-pressed={stack.name === active.name}
                                            style={{ animationDelay: `${index * 30}ms` }}
                                        >
                                            <span className="stk-card-top">
                                                <StackIcon stack={stack} />
                                                <span className="stk-card-category">{stack.category}</span>
                                            </span>
                                            <span className="stack-name">{stack.name}</span>
                                            <StackLevel level={stack.level} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {canScrollDown && (
                            <button
                                type="button"
                                className="arr-skew stk-scroll-more"
                                onClick={scrollDown}
                                aria-label="Afficher plus de technologies"
                            >
                                <ArrowIcon size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <StackInspector stack={active} onSelect={setActiveName} />
            </div>
        </section>
    );
}
