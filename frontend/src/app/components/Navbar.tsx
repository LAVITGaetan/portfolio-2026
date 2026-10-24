"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import MeerkatLogo from "./MeerkatLogo";
import { SECTION_LINKS } from "../data/site";
import { useActiveSection } from "./use-active-section";
import { useMeerkatLaunch } from "./use-meerkat-launch";
import MobileMenu from "./MobileMenu";

const SECTION_IDS = SECTION_LINKS.map((link) => link.href.slice(1));
/** Distance from the menu's bottom edge to the middle of the underline. */
const INDICATOR_OFFSET = 13;

/** Span of a link's number and label, relative to the menu. */
function measureLink(link: HTMLElement) {
  const number = link.firstElementChild as HTMLElement;
  const label = link.lastElementChild as HTMLElement;
  return { left: number.offsetLeft, width: label.offsetLeft + label.offsetWidth - number.offsetLeft };
}

export default function Navbar() {
  const activeId = useActiveSection(SECTION_IDS);
  const navbarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const meerkatRef = useRef<SVGSVGElement>(null);
  const projectileRef = useRef<SVGSVGElement>(null);
  // Lags behind activeId: a link only lights up once the meerkat's shuriken sticks under it.
  const [litId, setLitId] = useState<string | null>(null);
  const [landingCount, setLandingCount] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({ opacity: 0 });
  const launch = useMeerkatLaunch({ navbarRef, meerkatRef, projectileRef });

  useEffect(() => {
    const navbar = navbarRef.current;
    const menu = menuRef.current;
    const link = menu?.querySelector<HTMLElement>(`a[href="#${activeId}"]`);

    function aimAtLink() {
      setLitId(null);
      if (!navbar || !menu || !link) return;
      // Below the desktop breakpoint the links live in the burger menu: nothing to aim at.
      if (menu.offsetParent === null) return setLitId(activeId);

      const { left, width } = measureLink(link);
      const menuRect = menu.getBoundingClientRect();
      const navbarRect = navbar.getBoundingClientRect();
      const target = { x: menuRect.left - navbarRect.left + left + width / 2, y: menuRect.bottom - navbarRect.top + INDICATOR_OFFSET };

      launch(target).then((hasLanded) => {
        if (!hasLanded) return;
        setLitId(activeId);
        setLandingCount((count) => count + 1);
      });
    }

    aimAtLink();
  }, [activeId, launch]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    function placeIndicator() {
      const link = litId ? menu!.querySelector<HTMLElement>(`a[href="#${litId}"]`) : null;
      if (!link) return setIndicatorStyle((style) => ({ ...style, opacity: 0 }));

      const { left, width } = measureLink(link);
      setIndicatorStyle({ opacity: 1, width, transform: `translateX(${left}px) skewX(-12deg)` });
    }

    placeIndicator();
    const observer = new ResizeObserver(placeIndicator);
    observer.observe(menu);
    return () => observer.disconnect();
  }, [litId]);

  return (
    <nav className="navbar" ref={navbarRef}>
      <MeerkatLogo ref={meerkatRef} />

      <div className="navbar-menu" ref={menuRef}>
        <ul className="navbar-links">
          {SECTION_LINKS.map((link) => (
            <li key={link.href}>
              <a
                className={`navbar-link${link.href === `#${litId}` ? " active" : ""}`}
                href={link.href}
                aria-current={link.href === `#${activeId}` ? "true" : undefined}
              >
                <span className="navbar-link-num">{link.index}</span>
                <span className="navbar-link-txt">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <span className="navbar-indicator" style={indicatorStyle} aria-hidden="true">
          <span key={landingCount} className="navbar-indicator-bar" />
        </span>
      </div>

      <div className="navbar-action">
        <a href="#contact" className="btn-skew">
          <div className="btn-skew-shadow" />
          <div className="btn-skew-main">
            <span className="btn-skew-inner">Me contacter</span>
          </div>
        </a>
      </div>

      <svg className="navbar-projectile" ref={projectileRef} viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 0l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
      </svg>
      <MobileMenu activeId={activeId} />
    </nav>
  );
}
