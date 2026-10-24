"use client";

import { useEffect, useState } from "react";

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&*";
const DURATION = 700;
/** Kept in place while the rest scrambles, so the shape of the value shows early. */
const SEPARATORS = new Set([" ", "@", ".", "-"]);

function scramble(text: string): string {
    return [...text].map((char) => (SEPARATORS.has(char) ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join("");
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Decodes `text` from left to right, terminal style. Only mounted on the client, after a click. */
export default function ScrambleText({ text }: { text: string }) {
    const [settledCount, setSettledCount] = useState(() => (prefersReducedMotion() ? text.length : 0));
    const [noise, setNoise] = useState(() => scramble(text));

    useEffect(() => {
        if (prefersReducedMotion()) return;

        let frame = 0;
        const start = performance.now();

        function tick(now: number) {
            const settled = Math.floor(Math.min((now - start) / DURATION, 1) * text.length);
            setSettledCount(settled);
            setNoise(scramble(text.slice(settled)));
            if (settled < text.length) frame = requestAnimationFrame(tick);
        }

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [text]);

    return (
        <span className="scramble" aria-hidden="true">
            {text.slice(0, settledCount)}
            {settledCount < text.length && <span className="scramble-noise">{noise}</span>}
        </span>
    );
}
