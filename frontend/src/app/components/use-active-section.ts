import { useEffect, useState } from "react";

/** A section becomes active once its top passes this share of the viewport. */
const ACTIVATION_RATIO = 0.4;
/** No scroll event for this long: the smooth scroll to a clicked section is over. */
const SCROLL_IDLE_DELAY = 150;

/** Returns the id of the section being read, or null above the first one (hero). */
export function useActiveSection(sectionIds: string[]): string | null {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        let frame = 0;
        // Set by an in-page link: the sections crossed while gliding to it are ignored.
        let lockedId: string | null = null;
        let unlockTimer = 0;

        function update() {
            frame = 0;
            if (lockedId) return;
            // The last section can be too short to ever reach the threshold.
            const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
            const passedIds = sectionIds.filter((id) => {
                const section = document.getElementById(id);
                return section !== null && section.getBoundingClientRect().top <= window.innerHeight * ACTIVATION_RATIO;
            });
            setActiveId(isAtBottom ? sectionIds[sectionIds.length - 1] : passedIds[passedIds.length - 1] ?? null);
        }

        function scheduleUnlock() {
            clearTimeout(unlockTimer);
            unlockTimer = window.setTimeout(() => {
                lockedId = null;
                update();
            }, SCROLL_IDLE_DELAY);
        }

        function scheduleUpdate() {
            if (lockedId) return scheduleUnlock();
            if (!frame) frame = requestAnimationFrame(update);
        }

        function lockOnLinkClick(event: MouseEvent) {
            const link = (event.target as Element).closest("a[href^='#']");
            const id = link?.getAttribute("href")?.slice(1);
            if (!id || !sectionIds.includes(id)) return;
            lockedId = id;
            setActiveId(id);
            // Also releases the lock when the section is already in place and nothing scrolls.
            scheduleUnlock();
        }

        update();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        document.addEventListener("click", lockOnLinkClick);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(unlockTimer);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            document.removeEventListener("click", lockOnLinkClick);
        };
    }, [sectionIds]);

    return activeId;
}
