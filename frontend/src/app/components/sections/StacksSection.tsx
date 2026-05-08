"use client";

import { useEffect, useState } from "react";

type Category =
    | "Tous"
    | "Frontend"
    | "Backend"
    | "DevOps"
    | "Graphisme"
    | "CMS";

const FILTERS: Category[] = [
    "Tous",
    "Frontend",
    "Backend",
    "DevOps",
    "Graphisme",
    "CMS",
];

const STACKS = [
    {
        name: "React",
        icon: "⚛",
        bg: "rgba(97,218,251,0.1)",
        category: "Frontend",
        stars: 4,
    },
    {
        name: "Next.js",
        icon: "▲",
        bg: "rgba(0,0,0,0.3)",
        category: "Frontend",
        stars: 4,
    },
    {
        name: "Angular",
        icon: "▲",
        bg: "rgba(0,0,0,0.3)",
        category: "Frontend",
        stars: 4,
    },
    {
        name: "CSS",
        icon: "▲",
        bg: "rgba(0,0,0,0.3)",
        category: "Frontend",
        stars: 5,
    },
    {
        name: "Javascript",
        icon: "⬡",
        bg: "rgba(255,255,255,0.05)",
        category: "Frontend",
        stars: 4,
    },
    {
        name: "Figma",
        icon: "◈",
        bg: "rgba(162,89,255,0.1)",
        category: "Graphisme",
        stars: 3,
    },
    {
        name: "Java",
        icon: "☕",
        bg: "rgba(49,120,198,0.15)",
        category: "Backend",
        stars: 3,
    },
    {
        name: "SpringBoot",
        icon: "⬢",
        bg: "rgba(109,179,63,0.1)",
        category: "Backend",
        stars: 3,
    },
    {
        name: "Node.js",
        icon: "⬡",
        bg: "rgba(104,160,99,0.15)",
        category: "Backend",
        stars: 4,
    },
    {
        name: "MySQL",
        icon: "🔷",
        bg: "rgba(255,100,100,0.1)",
        category: "Backend",
        stars: 4,
    },
    {
        name: "MongoDB",
        icon: "🍃",
        bg: "rgba(77,179,61,0.1)",
        category: "Backend",
        stars: 3,
    },
    {
        name: "Docker",
        icon: "🐳",
        bg: "rgba(85,66,168,0.2)",
        category: "DevOps",
        stars: 3,
    }, {
        name: "NGINX",
        icon: "🐳",
        bg: "rgba(85,66,168,0.2)",
        category: "DevOps",
        stars: 3,
    },
    {
        name: "Redis",
        icon: "🐳",
        bg: "rgba(85,66,168,0.2)",
        category: "DevOps",
        stars: 1,
    },
    {
        name: "Linux",
        icon: "🐳",
        bg: "rgba(85,66,168,0.2)",
        category: "DevOps",
        stars: 3,
    },
    {
        name: "Firebase",
        icon: "🔥",
        bg: "rgba(255,160,0,0.1)",
        category: "DevOps",
        stars: 2,
    },
    {
        name: "Aseprite",
        icon: "◼",
        bg: "rgba(168,158,232,0.1)",
        category: "Graphisme",
        stars: 3,
    },
    {
        name: "Wordpress",
        icon: "🔥",
        bg: "rgba(255,160,0,0.1)",
        category: "CMS",
        stars: 4,
    },
    {
        name: "WooCommerce",
        icon: "◼",
        bg: "rgba(168,158,232,0.1)",
        category: "CMS",
        stars: 3,
    },
    {
        name: "Shopify",
        icon: "◼",
        bg: "rgba(168,158,232,0.1)",
        category: "CMS",
        stars: 2,
    },
    {
        name: "Prestashop",
        icon: "◼",
        bg: "rgba(168,158,232,0.1)",
        category: "CMS",
        stars: 1,
    }
] as const;

export default function StackSection() {
    const [active, setActive] = useState<Category>("Tous");
    const [offset, setOffset] = useState(0);
    const [visibleCount, setVisibleCount] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 600) {
                setVisibleCount(1);
                return;
            }
            if (width < 760) {
                setVisibleCount(2);
                return;
            }
            if (width < 1040) {
                setVisibleCount(3);
                return;
            }
            if (width < 1200) {
                setVisibleCount(4);
                return;
            }

            if (width < 1426) {
                setVisibleCount(5);
                return;
            }

            if (width < 1668) {
                setVisibleCount(6);
                return;
            }
            setVisibleCount(7);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const filtered = [...STACKS]
        .filter(
            (stack) => active === "Tous" || stack.category === active
        )
        .sort((a, b) => b.stars - a.stars);

    const pages = Math.ceil(filtered.length / visibleCount);

    const visible = filtered.slice(
        offset * visibleCount,
        offset * visibleCount + visibleCount
    );

    const prev = () => {
        setOffset((current) => Math.max(0, current - 1));
    };

    const next = () => {
        setOffset((current) => Math.min(pages - 1, current + 1));
    };

    const setFilter = (filter: Category) => {
        setActive(filter);
        setOffset(0);
    };

    return (
        <section className="stack-section">
            <div className="stack-filters">
                {FILTERS.map((filter) => (
                    <button
                        key={filter}
                        className={`stack-filter${active === filter ? " active" : ""
                            }`}
                        onClick={() => setFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="stack-track">
                {visible.map((stack) => (
                    <div key={stack.name} className="stack-card">
                        <div className="stack-card-inner">
                            <div
                                className="stack-icon"
                                style={{ background: stack.bg }}
                            >
                                {stack.icon}
                            </div>

                            <span className="stack-name">{stack.name}</span>

                            <div className="stack-stars">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`stack-star${index >= stack.stars ? " off" : ""
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="stack-footer">
                <div className="stack-dots">
                    {Array.from({ length: pages }).map((_, index) => (
                        <div
                            key={index}
                            className={`stack-dot${index === offset ? "" : " off"
                                }`}
                        />
                    ))}
                </div>

                <div className="stack-arrows">
                    <button
                        className="arr-skew"
                        onClick={prev}
                        disabled={offset === 0}
                    >
                        ←
                    </button>

                    <button
                        className="arr-skew"
                        onClick={next}
                        disabled={offset === pages - 1}
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}