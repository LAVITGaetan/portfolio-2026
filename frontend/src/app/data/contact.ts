export type ContactLink = {
    id: "email" | "linkedin" | "github";
    label: string;
    value: string;
    href: string;
};

export type ContactSubject = {
    id: string;
    label: string;
};

export const CONTACT_EMAIL = "g.lavitdh@gmail.com";

export const CONTACT_LINKS: ContactLink[] = [
    { id: "email", label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { id: "linkedin", label: "LinkedIn", value: "in/gaetan-lavit", href: "https://re.linkedin.com/in/gaetan-lavit-d-hautefort" },
    { id: "github", label: "GitHub", value: "@LAVITGaetan", href: "https://github.com/LAVITGaetan" },
];

export const CONTACT_SUBJECTS: ContactSubject[] = [
    { id: "freelance", label: "Projet perso" },
    { id: "job", label: "CDI / CDD" },
    { id: "collab", label: "Collaboration" },
    { id: "hello", label: "Autre" },
];

export const AVAILABILITY = "Disponible";

export const LOCATION = "France - Réunion 974";

/** Shared by the form inputs and the server validation. */
export const CONTACT_FIELD_LIMITS = {
    nameMax: 100,
    emailMax: 254,
    messageMin: 10,
    messageMax: 5000,
};
