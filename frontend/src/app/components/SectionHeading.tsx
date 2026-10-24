type Props = {
    index: string;
    /** Terminal-style surtitle, e.g. "ls ~/projets". */
    command: string;
    title: string;
    /** Rendered next to the title (e.g. view switcher). */
    actions?: React.ReactNode;
    children?: React.ReactNode;
};

export default function SectionHeading({ index, command, title, actions, children }: Props) {
    return (
        <header className="section-heading">
            <div className="section-heading-surtitle">
                <span className="hero-surtitle-prompt">❯</span>
                <span>{index} — {command}</span>
            </div>
            <div className="section-heading-row">
                <h2 className="section-heading-title">{title}</h2>
                {actions}
            </div>
            {children}
        </header>
    );
}
