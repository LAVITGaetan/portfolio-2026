"use client";

import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import ProjectDeck from "../hero/ProjectDeck";

const ROLES = [
    { text: "Développeur Full Stack", wip: false },
    { text: "Architecte Systèmes d'Information", wip: false },
    { text: "Cybersécurité", wip: true },
    { text: "UI/UX Designer", wip: false },
    { text: "Game Developer", wip: true },
];

const TYPING_SPEED = 55;
const DELETING_SPEED = 30;
const PAUSE_DURATION = 2200;
const WIP_SUFFIX = " [ en cours... ]";
/** Typing waits for the intro animation to settle. */
const TYPING_START_DELAY = 1400;

/** Each word rises on its own; the accent comes last. */
const TITLE_WORDS = ["Je", "transforme", "des", "idées", "en"];

function TitleWord({ word, index, className }: { word: string; index: number; className?: string }) {
    return (
        <span className="hero-word">
            <span className={className} style={{ "--word-index": index } as CSSProperties}>{word}</span>
        </span>
    );
}

export default function HeroSection() {
    const typedRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let timer: ReturnType<typeof setTimeout>;

        function getDisplay(role: (typeof ROLES)[0], chars: number): string {
            const base = role.text.slice(0, chars);
            return role.wip && chars === role.text.length ? base + WIP_SUFFIX : base;
        }

        function tick() {
            const role = ROLES[roleIndex];

            if (!deleting) {
                charIndex++;
                if (typedRef.current) {
                    typedRef.current.textContent = getDisplay(role, charIndex);
                }
                if (charIndex >= role.text.length) {
                    timer = setTimeout(() => {
                        deleting = true;
                        tick();
                    }, PAUSE_DURATION);
                    return;
                }
                timer = setTimeout(tick, TYPING_SPEED);
            } else {
                charIndex--;
                if (typedRef.current) {
                    typedRef.current.textContent = role.text.slice(0, charIndex);
                }
                if (charIndex <= 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % ROLES.length;
                    timer = setTimeout(tick, 400);
                } else {
                    timer = setTimeout(tick, DELETING_SPEED);
                }
            }
        }

        timer = setTimeout(tick, TYPING_START_DELAY);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="hero-left">
                    <div className="hero-surtitle">
                        <span className="hero-surtitle-prompt">❯</span>
                        <span className="hero-surtitle-typed" ref={typedRef} />
                        <span className="hero-surtitle-cursor">▋</span>
                    </div>
                    <h1 className="hero-title">
                        {TITLE_WORDS.map((word, index) => (
                            <Fragment key={word}>
                                <TitleWord word={word} index={index} />{" "}
                            </Fragment>
                        ))}
                        <TitleWord word="applications." index={TITLE_WORDS.length} className="hero-accent" />
                    </h1>
                    <p className="hero-text">
                        Développeur full stack passionné par les interfaces soignées
                        et le code qui tient la route.
                    </p>
                    <a href="#projets" className="btn-skew">
                        <div className="btn-skew-shadow" />
                        <div className="btn-skew-main">
                            <span className="btn-skew-inner">Voir mes projets</span>
                        </div>
                    </a>
                </div>
                <ProjectDeck />
            </div>
        </section>
    );
}