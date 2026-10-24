"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import MeerkatLogo from "./MeerkatLogo";
import { SECTION_LINKS } from "../data/site";
import { useActiveSection } from "./use-active-section";
import MobileMenu from "./MobileMenu";

const SECTION_IDS = SECTION_LINKS.map((link) => link.href.slice(1));

export default function Navbar() {
  const activeId = useActiveSection(SECTION_IDS);
  const menuRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({ opacity: 0 });

  // The indicator spans the active link's number and label, measured so it can slide between links.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    function placeIndicator() {
      const activeLink = menu!.querySelector(".navbar-link.active");
      const number = activeLink?.firstElementChild as HTMLElement | undefined;
      const label = activeLink?.lastElementChild as HTMLElement | undefined;
      if (!number || !label) return setIndicatorStyle((style) => ({ ...style, opacity: 0 }));

      const left = number.offsetLeft;
      setIndicatorStyle({ opacity: 1, width: label.offsetLeft + label.offsetWidth - left, transform: `translateX(${left}px) skewX(-12deg)` });
    }

    placeIndicator();
    const observer = new ResizeObserver(placeIndicator);
    observer.observe(menu);
    return () => observer.disconnect();
  }, [activeId]);

  return (
    <nav className="navbar">
      <MeerkatLogo />

      <div className="navbar-menu" ref={menuRef}>
        <ul className="navbar-links">
          {SECTION_LINKS.map((link) => {
            const isActive = link.href === `#${activeId}`;

            return (
              <li key={link.href}>
                <a className={`navbar-link${isActive ? " active" : ""}`} href={link.href} aria-current={isActive ? "true" : undefined}>
                  <span className="navbar-link-num">{link.index}</span>
                  <span className="navbar-link-txt">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <span className="navbar-indicator" style={indicatorStyle} aria-hidden="true" />
      </div>

      <div className="navbar-action">
        <a href="#contact" className="btn-skew">
          <div className="btn-skew-shadow" />
          <div className="btn-skew-main">
            <span className="btn-skew-inner">Me contacter</span>
          </div>
        </a>
      </div>

      <MobileMenu activeId={activeId} />
    </nav>
  );
}
