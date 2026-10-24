export type PrivateContactId = "email" | "phone";

/** Private channels only ship their masked form; the real value comes from the reveal action. */
export type ContactLink =
    | { id: "linkedin" | "github"; label: string; value: string; href: string }
    | { id: PrivateContactId; label: string; masked: string };

export type ContactSubject = {
    id: string;
    label: string;
};

export const CONTACT_LINKS: ContactLink[] = [
    { id: "email", label: "Email", masked: "g*******@gmail.com" },
    { id: "phone", label: "Téléphone", masked: "06 93 ** ** **" },
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
