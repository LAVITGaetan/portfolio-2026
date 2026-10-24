import { useEffect, useState } from "react";

/** A section becomes active once its top passes this share of the viewport. */
const ACTIVATION_RATIO = 0.4;

/** Returns the id of the section being read, or null above the first one (hero). */
export function useActiveSection(sectionIds: string[]): string | null {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        let frame = 0;

        function update() {
            frame = 0;
            // The last section can be too short to ever reach the threshold.
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            const passedIds = sectionIds.filter((id) => {
                const section = document.getElementById(id);
                return section !== null && section.getBoundingClientRect().top <= window.innerHeight * ACTIVATION_RATIO;
            });
            setActiveId(isAtBottom ? sectionIds[sectionIds.length - 1] : passedIds[passedIds.length - 1] ?? null);
        }

        function scheduleUpdate() {
            if (!frame) frame = requestAnimationFrame(update);
        }

        update();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
        };
    }, [sectionIds]);

    return activeId;
}
