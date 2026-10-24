"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import type { Project } from "../../data/projects";
import { ArrowIcon, CloseIcon } from "./ProjectIcons";

type GalleryImage = { src: string; fileName: string; alt: string };

const pad = (value: number) => String(value).padStart(2, "0");

/** Screenshots sit next to the thumbnail: "<slug>-1.png", "<slug>-2.png"… */
function getGalleryImages({ slug, title, galleryCount = 0 }: Project): GalleryImage[] {
    return Array.from({ length: galleryCount }, (_, index) => {
        const fileName = `${slug}-${index + 1}.png`;
        return { src: `/img/thumbnails/${fileName}`, fileName, alt: `${title}, capture ${index + 1}` };
    });
}

function Lightbox({ images, startIndex, onClose }: { images: GalleryImage[]; startIndex: number; onClose: () => void }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [index, setIndex] = useState(startIndex);
    const image = images[index];
    const go = (step: number) => setIndex((current) => (current + step + images.length) % images.length);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    // The lightbox sits inside the project modal: keep its arrows from switching project.
    const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.stopPropagation();
        go(event.key === "ArrowRight" ? 1 : -1);
    };

    return (
        <dialog ref={dialogRef} className="gal-lightbox" onClose={onClose} onKeyDown={onKeyDown} aria-label="Galerie en plein écran">
            <div className="gal-lightbox-bar">
                <span className="gal-lightbox-name">
                    <span className="hero-surtitle-prompt">❯</span> {image.fileName}
                </span>
                <button type="button" className="proj-modal-close" onClick={() => dialogRef.current?.close()} autoFocus>
                    <span className="proj-modal-close-hint">Échap</span>
                    <CloseIcon size={14} />
                    <span className="sr-only">Fermer</span>
                </button>
            </div>
            <div className="gal-lightbox-stage" key={image.src}>
                <Image src={image.src} alt={image.alt} fill sizes="100vw" />
            </div>
            <div className="gal-lightbox-bar is-bottom">
                <span className="proj-modal-count">
                    {pad(index + 1)} <span>/ {pad(images.length)}</span>
                </span>
                <button type="button" className="arr-skew" onClick={() => go(-1)} aria-label="Image précédente">
                    <ArrowIcon size={12} direction="left" />
                </button>
                <button type="button" className="arr-skew" onClick={() => go(1)} aria-label="Image suivante">
                    <ArrowIcon size={12} />
                </button>
            </div>
        </dialog>
    );
}

/** Mosaic of the project screenshots; a tile opens the fullscreen lightbox. */
export default function ProjectGallery({ project }: { project: Project }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const images = getGalleryImages(project);
    if (images.length === 0) return null;

    return (
        <section className="gal-section" aria-labelledby="gal-title">
            <div className="gal-head">
                <h3 id="gal-title" className="proj-modal-subtitle">Galerie</h3>
                <span className="gal-head-count">{pad(images.length)} captures</span>
            </div>

            <ul className="gal-mosaic">
                {images.map((image, index) => (
                    <li key={image.src}>
                        <button type="button" className="gal-tile" onClick={() => setOpenIndex(index)} aria-label={`Agrandir : ${image.alt}`}>
                            <Image src={image.src} alt="" fill sizes={index === 0 ? "(max-width: 600px) 100vw, 760px" : "(max-width: 600px) 50vw, 380px"} />
                            <span className="gal-tile-caption">
                                <span className="hero-surtitle-prompt">❯</span> {image.fileName}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {openIndex !== null && <Lightbox images={images} startIndex={openIndex} onClose={() => setOpenIndex(null)} />}
        </section>
    );
}
