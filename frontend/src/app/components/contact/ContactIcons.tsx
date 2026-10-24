import type { ContactLink } from "../../data/contact";
import { GithubIcon } from "../projects/ProjectIcons";

type IconProps = { size?: number };

export function MailIcon({ size = 16 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
            <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
        </svg>
    );
}

export function LinkedinIcon({ size = 16 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
    );
}

export function CopyIcon({ size = 16 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
            <path d="M8 8h12v12H8zM4 16V4h12" />
        </svg>
    );
}

export function CheckIcon({ size = 16 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
            <path d="M4 12l5 5L20 6" />
        </svg>
    );
}

export function ChannelIcon({ id, size = 16 }: IconProps & { id: ContactLink["id"] }) {
    if (id === "email") return <MailIcon size={size} />;
    if (id === "linkedin") return <LinkedinIcon size={size} />;
    return <GithubIcon size={size} />;
}
