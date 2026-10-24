import { PROJECTS } from "./projects";

export type StackCategory = "Frontend" | "Backend" | "DevOps" | "Graphisme" | "CMS";

export type Stack = {
    name: string;
    category: StackCategory;
    /** Mastery from 1 to 5. */
    level: number;
    /** Short monogram shown when no icon is set, e.g. "Nx". */
    short: string;
    /** Brand color: lights the logo up on hover / selection, and tints the monogram. */
    color: string;
    /** Single-color SVG in /public (Simple Icons), recolored through a CSS mask. A monogram is shown when missing. */
    icon?: string;
};

export const STACK_CATEGORIES: StackCategory[] = ["Frontend", "Backend", "DevOps", "Graphisme", "CMS"];

export const LEVEL_LABELS = ["", "Notions", "Bases", "Intermédiaire", "Avancé", "Expert"];

export const STACKS: Stack[] = [
    { name: "React", category: "Frontend", level: 4, short: "Re", color: "#61DAFB", icon: "/img/stacks/react.svg" },
    { name: "Next.js", category: "Frontend", level: 3, short: "Nx", color: "#E8E8F0", icon: "/img/stacks/nextjs.svg" },
    { name: "Angular", category: "Frontend", level: 3, short: "Ng", color: "#DD0031", icon: "/img/stacks/angular.svg" },
    { name: "CSS", category: "Frontend", level: 5, short: "Css", color: "#663399", icon: "/img/stacks/css.svg" },
    { name: "Javascript", category: "Frontend", level: 4, short: "Js", color: "#F7DF1E", icon: "/img/stacks/javascript.svg" },
    { name: "TypeScript", category: "Frontend", level: 4, short: "Ts", color: "#3178C6", icon: "/img/stacks/typescript.svg" },
    { name: "PHP", category: "Backend", level: 3, short: "Php", color: "#777BB4", icon: "/img/stacks/php.svg" },
    { name: "Laravel", category: "Backend", level: 3, short: "Lv", color: "#FF2D20", icon: "/img/stacks/laravel.svg" },
    { name: "Java", category: "Backend", level: 3, short: "Jv", color: "#E76F00", icon: "/img/stacks/java.svg" },
    { name: "SpringBoot", category: "Backend", level: 3, short: "Sb", color: "#6DB33F", icon: "/img/stacks/spring-boot.svg" },
    { name: "Node.js", category: "Backend", level: 4, short: "No", color: "#5FA04E", icon: "/img/stacks/nodejs.svg" },
    { name: "MySQL", category: "Backend", level: 4, short: "My", color: "#4479A1", icon: "/img/stacks/mysql.svg" },
    { name: "MongoDB", category: "Backend", level: 3, short: "Mg", color: "#47A248", icon: "/img/stacks/mongodb.svg" },
    { name: "Git", category: "DevOps", level: 4, short: "Gt", color: "#F05032", icon: "/img/stacks/git.svg" },
    { name: "Docker", category: "DevOps", level: 3, short: "Dk", color: "#2496ED", icon: "/img/stacks/docker.svg" },
    { name: "Kubernetes", category: "DevOps", level: 1, short: "K8s", color: "#326CE5", icon: "/img/stacks/kubernetes.svg" },
    { name: "NGINX", category: "DevOps", level: 3, short: "Nx", color: "#009639", icon: "/img/stacks/nginx.svg" },
    { name: "Redis", category: "DevOps", level: 1, short: "Rd", color: "#DC382D", icon: "/img/stacks/redis.svg" },
    { name: "Linux", category: "DevOps", level: 3, short: "Lx", color: "#FCC624", icon: "/img/stacks/linux.svg" },
    { name: "Firebase", category: "DevOps", level: 2, short: "Fb", color: "#FFCA28", icon: "/img/stacks/firebase.svg" },
    { name: "Figma", category: "Graphisme", level: 3, short: "Fg", color: "#A259FF", icon: "/img/stacks/figma.svg" },
    { name: "Aseprite", category: "Graphisme", level: 3, short: "As", color: "#7D929E", icon: "/img/stacks/aseprite.svg" },
    { name: "Wordpress", category: "CMS", level: 4, short: "Wp", color: "#3E9BD1", icon: "/img/stacks/wordpress.svg" },
    { name: "WooCommerce", category: "CMS", level: 3, short: "Wc", color: "#A66BA0", icon: "/img/stacks/woocommerce.svg" },
    { name: "Shopify", category: "CMS", level: 2, short: "Sh", color: "#95BF47", icon: "/img/stacks/shopify.svg" },
    { name: "Prestashop", category: "CMS", level: 1, short: "Ps", color: "#DF0067", icon: "/img/stacks/prestashop.svg" },
];

/** Stacks sorted by mastery, highest first. */
export const STACKS_BY_LEVEL = [...STACKS].sort((a, b) => b.level - a.level);

/** Projects (from data/projects) that list this stack. */
export function projectsUsing(stackName: string) {
    return PROJECTS.filter((project) => project.stack.includes(stackName));
}
