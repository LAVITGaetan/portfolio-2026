"use client";

import { useState } from "react";
import { EXPERIENCE_CHAPTERS } from "../../data/experience";
import SectionHeading from "../SectionHeading";
import ExperienceCard from "../experience/ExperienceCard";
import { ArrowIcon } from "../projects/ProjectIcons";
import "../projects/projects.css";
import "../experience/experience.css";

const formatIndex = (value: number) => String(value).padStart(2, "0");

export default function ExperienceSection() {
    const [chapterIndex, setChapterIndex] = useState(EXPERIENCE_CHAPTERS.length - 1);
    // Null until the first move, so nothing plays on load.
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);
    const chapter = EXPERIENCE_CHAPTERS[chapterIndex];
    const railStyle = {
        "--count": EXPERIENCE_CHAPTERS.length,
        "--progress": chapterIndex / (EXPERIENCE_CHAPTERS.length - 1),
    } as React.CSSProperties;

    function goTo(index: number) {
        if (index === chapterIndex) return;
        setPreviousIndex(chapterIndex);
        setChapterIndex(index);
    }

    function stepClassName(index: number): string {
        if (index === chapterIndex) return previousIndex === null ? " active" : " active is-arriving";
        if (index === previousIndex) return index < chapterIndex ? " is-done is-leaving" : " is-leaving";
        return index < chapterIndex ? " is-done" : "";
    }

    return (
        <section className="exp-section" id="parcours">
            <SectionHeading index="02" command="cat ~/parcours" title="Parcours" />

            <div className="exp-layout">
                <div className="exp-track" style={railStyle}>
                    <span className="exp-rail" aria-hidden="true">
                        <span className="exp-rail-fill" />
                    </span>

                    <ol className="exp-steps">
                        {EXPERIENCE_CHAPTERS.map((item, index) => (
                            <li key={item.title}>
                                <button
                                    className={`exp-step${stepClassName(index)}`}
                                    onClick={() => goTo(index)}
                                    aria-pressed={index === chapterIndex}
                                >
                                    <span className="exp-step-level">{item.level}</span>
                                    <span className="exp-step-years">{item.years}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="exp-chapter" key={chapterIndex}>
                    <header className="exp-chapter-head">
                        <span className="exp-chapter-index">
                            Chapitre {formatIndex(chapterIndex + 1)} / {formatIndex(EXPERIENCE_CHAPTERS.length)}
                        </span>
                        <h3 className="exp-chapter-title">{chapter.title}</h3>
                        <div className="exp-nav">
                            <button
                                className="arr-skew"
                                onClick={() => goTo(chapterIndex - 1)}
                                disabled={chapterIndex === 0}
                                aria-label="Chapitre précédent"
                            >
                                <ArrowIcon size={14} direction="left" />
                            </button>
                            <button
                                className="arr-skew"
                                onClick={() => goTo(chapterIndex + 1)}
                                disabled={chapterIndex === EXPERIENCE_CHAPTERS.length - 1}
                                aria-label="Chapitre suivant"
                            >
                                <ArrowIcon size={14} />
                            </button>
                        </div>
                    </header>

                    <div className="exp-pair">
                        {chapter.entries.map((entry) => (
                            <ExperienceCard key={entry.id} entry={entry} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
