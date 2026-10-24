export type ExperienceKind = "formation" | "alternance" | "stage";

export type ExperienceEntry = {
    id: string;
    kind: ExperienceKind;
    title: string;
    organization: string;
    start: number;
    /** null while ongoing. */
    end: number | null;
    /** Shown instead of the end year for short periods. */
    duration?: string;
    summary: string;
    highlights: string[];
};

export type ExperienceChapter = {
    years: string;
    title: string;
    level: string;
    entries: ExperienceEntry[];
};

export const EXPERIENCE_KIND_LABELS: Record<ExperienceKind, string> = {
    formation: "Formation",
    alternance: "Alternance",
    stage: "Stage",
};

/** Chronological order; each chapter pairs the school with the company. */
export const EXPERIENCE_CHAPTERS: ExperienceChapter[] = [
    {
        years: "2020 — 2021",
        title: "Les bases",
        level: "Bac+2",
        entries: [
            {
                id: "simplon-web",
                kind: "formation",
                title: "Développeur web",
                organization: "RSMA-R × Simplon",
                start: 2020,
                end: 2021,
                summary: "Formation au développement web au Régiment du service militaire adapté de La Réunion, en partenariat avec Simplon.",
                highlights: ["Encadrement militaire", "Développer un site web/ web mobile", "Certification Opquast niveau avancé (qualité web)", "Méthodes agiles", "Travail d'équipe"],
            },
            {
                id: "cpme-internship",
                kind: "stage",
                title: "Stage développeur web",
                organization: "CPME Réunion",
                start: 2021,
                end: 2021,
                duration: "15 jours",
                summary: "Première immersion en entreprise, au syndicat des entreprises de La Réunion.",
                highlights: ["Découverte du terrain avant l'alternance"],
            },
        ],
    },
    {
        years: "2021 — 2022",
        title: "Première alternance et licence",
        level: "Bac+3",
        entries: [
            {
                id: "simplon-bachelor",
                kind: "formation",
                title: "Licence développeur, en alternance",
                organization: "Simplon",
                start: 2021,
                end: 2022,
                summary: "Cursus Bac+3 en alternance, en rythme école / entreprise avec la CPME Réunion.",
                highlights: ["Accompagner, Défendre et Représenter les TPE/PME", "Design patterns", "Applications mobile et bureau", "Rythme école / entreprise", "Diplôme Bac+3"]
            },
            {
                id: "cpme-apprenticeship",
                kind: "alternance",
                title: "Développeur web en alternance",
                organization: "CPME Réunion",
                start: 2021,
                end: 2022,
                summary: "Le syndicat des entreprises de La Réunion : des missions variées, du design aux données.",
                highlights: ["Refonte graphique", "Nettoyage et structuration de fichiers Excel", "Contenu pour l'application mobile"],
            },
        ],
    },
    {
        years: "2025 — 2028",
        title: "Master & Free",
        level: "Bac+5",
        entries: [
            {
                id: "epitech-msc",
                kind: "formation",
                title: "Master of Science",
                organization: "Epitech",
                start: 2025,
                end: null,
                summary: "Master of Science en alternance à Epitech Réunion.",
                highlights: ["Cyber-Sécurité", "Dev-ops", "Développement de jeux-vidéos", "Hackhathons", "Chef de projet"],
            },
            {
                id: "free-apprenticeship",
                kind: "alternance",
                title: "Développeur en alternance",
                organization: "Free Réunion",
                start: 2026,
                end: null,
                summary: "Alternance chez Free Réunion, en parallèle du Master of Science.",
                highlights: ["Développement d'applications métier", "Maitenance/MaJ de logiciels existant", "Connaissances Télécom"],
            },
        ],
    },
];
