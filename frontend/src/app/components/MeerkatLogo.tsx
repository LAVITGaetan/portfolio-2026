export default function MeerkatLogo() {
    return (
        <svg className="navbar-logo meerkat" viewBox="0 0 64 64" role="img" aria-label="Logo suricate">
            <path className="meerkat-ground" d="M18 60.5h28" />

            <g className="meerkat-lines">
                <path pathLength={1} d="M39 54c5 2 8 5 13 4.5 2-.2 3.5-1.5 4-3.5" />
                <path pathLength={1} d="M28.5 25.5c-3 3-4 7.5-4 13.5 0 8 1 14 2.5 18.5-1.5 1-3 1.3-4.5 1.3" />
                <path pathLength={1} d="M35.5 25.5c3 3 4 7.5 4 13.5 0 8-1 14-2.5 18.5 1.5 1 3 1.3 4.5 1.3" />
                <path pathLength={1} d="M29.5 58.5c.5-3 4.5-3 5 0" />
                <path pathLength={1} d="M26 30.5c1 3.5 2.5 5 4.5 5.3.7.2.8 1.4.1 2.2" />
                <path pathLength={1} d="M38 30.5c-1 3.5-2.5 5-4.5 5.3-.7.2-.8 1.4-.1 2.2" />
            </g>

            <g className="meerkat-head">
                <g className="meerkat-lines">
                    <path pathLength={1} d="M32 6c6 0 10 4 10 9 0 4-4 8-7.5 10L32 26l-2.5-1C26 23 22 19 22 15c0-5 4-9 10-9z" />
                    <path pathLength={1} d="M22.5 12c-2-1-2.5 1.5-.5 2.5M41.5 12c2-1 2.5 1.5.5 2.5" />
                    <ellipse pathLength={1} className="meerkat-patch" cx="27.6" cy="15.5" rx="2.8" ry="2.1" transform="rotate(25 27.6 15.5)" />
                    <ellipse pathLength={1} className="meerkat-patch" cx="36.4" cy="15.5" rx="2.8" ry="2.1" transform="rotate(-25 36.4 15.5)" />
                </g>
                <g className="meerkat-eyes">
                    <g className="meerkat-pupils">
                        <circle cx="27.8" cy="15.6" r="1.1" />
                        <circle cx="36.2" cy="15.6" r="1.1" />
                    </g>
                </g>
                <path className="meerkat-nose" d="M30.8 21.8h2.4L32 23.3z" />
            </g>
        </svg>
    );
}
