import { useEffect, useRef, useState } from "react";

/** About one row of stack cards. */
const SCROLL_STEP = 160;

/**
 * Tracks whether a scroll container still has content below, and scrolls it down a notch.
 * `contentKey` resets the scroll to the top when the content changes (e.g. a new filter).
 */
export function useScrollMore<T extends HTMLElement>(contentKey: string) {
    const ref = useRef<T>(null);
    const [canScrollDown, setCanScrollDown] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const update = () => setCanScrollDown(element.scrollTop + element.clientHeight < element.scrollHeight - 1);
        element.scrollTop = 0;

        // Also fires once right away, which sets the initial state.
        const observer = new ResizeObserver(update);
        observer.observe(element);
        element.addEventListener("scroll", update, { passive: true });

        return () => {
            observer.disconnect();
            element.removeEventListener("scroll", update);
        };
    }, [contentKey]);

    const scrollDown = () => ref.current?.scrollBy({ top: SCROLL_STEP, behavior: "smooth" });

    return { ref, canScrollDown, scrollDown };
}
