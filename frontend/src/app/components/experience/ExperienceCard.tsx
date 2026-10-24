import { EXPERIENCE_KIND_LABELS, type ExperienceEntry } from "../../data/experience";

function formatPeriod(entry: ExperienceEntry): string {
    return entry.duration ? `${entry.start} · ${entry.duration}` : `${entry.start} — ${entry.end}`;
}

export default function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
    return (
        <article className="exp-card">
            <div className="exp-card-top">
                <span className="exp-card-kind">{EXPERIENCE_KIND_LABELS[entry.kind]}</span>
                {entry.end === null ? (
                    <span className="proj-status is-live">
                        <span className="proj-status-dot" />
                        En cours
                    </span>
                ) : (
                    <span className="exp-card-period">{formatPeriod(entry)}</span>
                )}
            </div>
            <h4 className="exp-card-title">{entry.organization}</h4>
            <p className="exp-card-role">{entry.title}</p>
            <p className="exp-card-summary">{entry.summary}</p>
            <ul className="exp-card-list">
                {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                ))}
            </ul>
        </article>
    );
}
