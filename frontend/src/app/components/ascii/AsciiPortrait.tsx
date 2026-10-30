"use client";

import { useEffect, useState } from "react";
import { renderScanFrame, sampleBrightness, type BrightnessGrid } from "./ascii-render";
import "./ascii.css";

const FRAME_INTERVAL = 1000 / 15;

type AsciiPortraitProps = {
    src: string;
    alt: string;
    columns?: number;
    threshold?: number;
};

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Turns `src` into animated ASCII art, sampled once in the browser then redrawn every frame. */
export default function AsciiPortrait({ src, alt, columns = 110, threshold = 0.85 }: AsciiPortraitProps) {
    const [grid, setGrid] = useState<BrightnessGrid>([]);
    const [frame, setFrame] = useState("");

    useEffect(() => {
        const image = new Image();
        image.onload = () => setGrid(sampleBrightness(image, columns, threshold));
        image.src = src;
    }, [src, columns, threshold]);

    useEffect(() => {
        if (grid.length === 0) return;

        const isStill = prefersReducedMotion();
        let animationFrame = 0;
        let lastDraw = -Infinity;

        function tick(now: number) {
            if (now - lastDraw >= FRAME_INTERVAL) {
                lastDraw = now;
                setFrame(renderScanFrame(grid, isStill ? 0 : now));
            }
            if (!isStill) animationFrame = requestAnimationFrame(tick);
        }

        animationFrame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationFrame);
    }, [grid]);

    return (
        <figure className="ascii-portrait">
            <span className="sr-only">{alt}</span>
            <pre aria-hidden="true">{frame}</pre>
        </figure>
    );
}
