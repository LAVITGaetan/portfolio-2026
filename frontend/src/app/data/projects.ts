export type ProjectStatus = "En ligne" | "En cours";

export type Collaborator = {
    name: string;
    nickname?: string;
    /** GitHub username: gives both the profile link and the avatar (GitHub mark when missing). */
    github?: string;
};

export type Project = {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    details: string[];
    year: string;
    role: string;
    status: ProjectStatus;
    stack: string[];
    /** Image path in /public, e.g. "/img/thumbnails/chez-pepe.png". A placeholder is shown when missing. */
    thumbnail?: string;
    links: {
        live?: string;
        github?: string;
    };
    collaborators?: Collaborator[];
};

// Placeholder data — replace with your real projects.
export const PROJECTS: Project[] = [
    {
        slug: "joha-kpopstore",
        title: "Joha Kpop Store",
        tagline: "E-commerce de produits Kpop à la Réunion",
        description:
            "Boutique WooCommerce personnalisée pour les fans de Kpop à la Réunion.",
        details: [
            "Thème développé from scratch pour un design unique et responsive.",
            "Gestion des stocks et des promotions via l'interface WooCommerce.",
        ],
        year: "2025",
        role: "Dev & Design",
        status: "En ligne",
        stack: ["Wordpress", "WooCommerce", "Figma", "CSS"],
        thumbnail: "/img/thumbnails/joha-kpopstore.png",
        links: { live: "https://johakpopstore.com" },
    },
        {
        slug: "chez-pepe",
        title: "Chez Pépé",
        tagline: "Site de location de bungalows avec gestion des reservations",
        description:
            "Application web pour gérer les réservations d'un site de location de bungalows, avec un back-office complet et un front-office pour les clients.",
        details: [
            "Gestion des disponibilités et des réservations en temps réel.",
            "Front-office responsive avec calendrier interactif",
        ],
        year: "2026",
        role: "Full Stack",
        status: "En cours",
        stack: ["Next.js", "SpringBoot"],
        thumbnail: "/img/thumbnails/chez-pepe.png",
        links: { live: "https://chez-pepe.re", github: "https://github.com/LAVITGaetan/location-pepe" },
    },
    {
        slug: "mobiwise",
        title: "Mobiwise Hackathon Microsoft x Citiz",
        tagline: "Solution d'étude de l'accès aux transports en commun à la Réunion",
        description:
            "Une solution d'étude de l'accès aux transports en commun à la Réunion, Suggestion d'emplacements pour des stations d'auto-partage.",
        details: [
            "Analyse des données de transport en commun et des flux de population.",
            "Proposition d'emplacements optimaux pour des stations d'auto-partage.",
            "Présentation du projet lors du hackathon Microsoft x Citiz.",
        ],
        year: "2026",
        role: "Dev & Design",
        status: "En cours",
        stack: ["Next.js", "Microsoft Fabric", "LLM"],
        thumbnail: "/img/thumbnails/mobiwise.png",
            links: { live: "https://mobiwise.vercel.app/", github: "https://github.com" },
        collaborators: [
            { name: "Mahé", nickname: "le GOAT", github: "LessForOne" },
            { name: "Saneilla", nickname: "L'artiste", github: "SaneillaV-P" },
            { name: "Raphael Baptiste", nickname: "Le professeur", github: "777-fr" },
        ],
    },
        {
        slug: "paf-warrior-2d",
        title: "Legend Of The Paf Warrior",
        tagline: "Tactical RPG Pixel-art en vue isométrique",
        description:
            "RPG de stratégie tour par tour tactique en 2D Pixel-art avec vue isométrique",
        details: [
            "Librairie LibGDX",
            "Créations en Pixel-art",
            "Principes Java",
            "Test Unitaires & Couverture",
            "Création de carte 2D isometrique",
            "Travail en équipe (Les Pafousquetaires)",
        ],
        year: "2025",
        role: "UI/UX/Art Designer & Dev",
        status: "En cours",
        stack: ["Java", "LibGDX", "Tiled", "Aseprite"],
        thumbnail: "/img/thumbnails/paf-warrior-2d.png",
            links: { github: "https://github.com/777-fr/THE-LEGEND-OF-THE-PAF-WARRIOR" },
        collaborators: [
            { name: "Raphael Baptiste", nickname: "Le professeur", github: "777-fr" },
            { name: "Assad Madi", nickname: "Le conseiller" },
        ],
    },
];
