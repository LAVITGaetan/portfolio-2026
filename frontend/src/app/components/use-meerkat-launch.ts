import { useCallback, useRef, type RefObject } from "react";

type Point = { x: number; y: number };

/** The paw is already cocked: the shuriken leaves at the snap, ~16% into the 0.5s throw keyframes. */
const RELEASE_DELAY = 80;
const THROW_DURATION = 500;
/** The held shuriken once the arm has snapped forward, in the logo's 64×64 viewBox. */
const RELEASE_POINT = { x: 52, y: 34 };
/** Nearly flat: a shuriken flies straight. */
const ARC_HEIGHT = 8;
const FLIGHT_DURATION = 300;
const FLIGHT_SPIN = 1080;
const IMPACT_DURATION = 150;
const FLIGHT_STEPS = 12;

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));
const place = ({ x, y }: Point, rotation: number) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

/** Quadratic curve from `from` to `to`, spinning all the way. */
function flightKeyframes(from: Point, to: Point): Keyframe[] {
    const control = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - ARC_HEIGHT };

    return Array.from({ length: FLIGHT_STEPS + 1 }, (_, step) => {
        const progress = step / FLIGHT_STEPS;
        const remaining = 1 - progress;
        const point = {
            x: remaining ** 2 * from.x + 2 * remaining * progress * control.x + progress ** 2 * to.x,
            y: remaining ** 2 * from.y + 2 * remaining * progress * control.y + progress ** 2 * to.y,
        };
        return { opacity: 1, transform: place(point, progress * FLIGHT_SPIN) };
    });
}

/** Stuck in place, quivering from the hit. */
function impactKeyframes(at: Point): Keyframe[] {
    return [-2, 2, -1, 1, 0].map((offset) => ({
        opacity: 1,
        transform: place({ x: at.x + offset, y: at.y }, FLIGHT_SPIN + offset * 4),
    }));
}

type Refs = {
    navbarRef: RefObject<HTMLElement | null>;
    meerkatRef: RefObject<SVGSVGElement | null>;
    projectileRef: RefObject<SVGSVGElement | null>;
};

/** The meerkat throws a shuriken that sticks at `target` (navbar coordinates). */
export function useMeerkatLaunch({ navbarRef, meerkatRef, projectileRef }: Refs) {
    const launchIdRef = useRef(0);

    /** Resolves true once stuck, false when a newer throw took over. */
    return useCallback(async (target: Point): Promise<boolean> => {
        const launchId = ++launchIdRef.current;
        const navbar = navbarRef.current;
        const meerkat = meerkatRef.current;
        const projectile = projectileRef.current;
        if (!navbar || !meerkat || !projectile) return false;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

        const isCurrent = () => launchId === launchIdRef.current;
        projectile.getAnimations().forEach((animation) => animation.cancel());

        // Re-adding the class restarts the throw even mid-animation; removing it brings back the idle glint.
        meerkat.classList.remove("is-throwing");
        void meerkat.getBoundingClientRect();
        meerkat.classList.add("is-throwing");
        setTimeout(() => isCurrent() && meerkat.classList.remove("is-throwing"), THROW_DURATION);

        await wait(RELEASE_DELAY);
        if (!isCurrent()) return false;

        const logoRect = meerkat.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        const start = {
            x: logoRect.left - navbarRect.left + (RELEASE_POINT.x / 64) * logoRect.width,
            y: logoRect.top - navbarRect.top + (RELEASE_POINT.y / 64) * logoRect.height,
        };

        // A cancelled animation rejects `finished`: treat it as superseded.
        const play = (keyframes: Keyframe[], options: KeyframeAnimationOptions) =>
            projectile.animate(keyframes, options).finished.then(() => true, () => false);

        const hasLanded = await play(flightKeyframes(start, target), { duration: FLIGHT_DURATION, easing: "cubic-bezier(0.2, 0.6, 0.4, 1)" });
        if (!hasLanded || !isCurrent()) return false;

        const hasStuck = await play(impactKeyframes(target), { duration: IMPACT_DURATION });
        return hasStuck && isCurrent();
    }, [navbarRef, meerkatRef, projectileRef]);
}
