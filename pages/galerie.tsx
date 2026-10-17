import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Seo from "../components/Seo/Seo";
import { siteConfig } from "../config/siteConfig";

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const { hero, labels, images } = siteConfig.pages.galerie;
  const { seo } = siteConfig.pages.galerie;

  // Observer para animaciones de entrada
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll(".gallery-item-wrapper");
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  // Precarga de imágenes
  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
        setPreloadedImages((prev) => {
          const newSet = new Set(prev);
          const index = images.findIndex((i) => i.src === image.src);
          newSet.add(index);
          return newSet;
        });
      };
    });
  }, [images]);

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") goToPrevious();
        if (e.key === "ArrowRight") goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <Seo title={seo.title} description={seo.description} url={seo.url} />

      <div ref={sectionRef} className="galerie-page">
        {/* Hero */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>{hero.title}</h1>
            <p>{hero.subtitle}</p>
            <div className="hero-line"></div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-container">
          <div className="gallery-grid">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item-wrapper ${
                  visibleItems.includes(index) ? "visible" : ""
                }`}
                data-index={index}
                onClick={() => openModal(index)}
              >
                <div className="gallery-item">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="gallery-image"
                    style={{ objectFit: "cover" }}
                    quality={85}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 4}
                  />
                  <div className="gallery-overlay">
                    <div className="gallery-overlay-content">
                      <span className="gallery-category">{labels.category}</span>
                      <span className="gallery-view">{labels.viewHint}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedImage !== null && (
          <div className="modal-overlay" onClick={closeModal}>
            <button className="modal-close" onClick={closeModal} aria-label="Schließen">
              <X size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
            </button>

            <button
              className="modal-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Vorheriges"
            >
              <ChevronLeft size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
            </button>

            <button
              className="modal-nav next"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Nächstes"
            >
              <ChevronRight size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
            </button>

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-image-container">
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  fill
                  className="modal-image"
                  style={{ objectFit: "contain" }}
                  quality={100}
                  priority
                  sizes="100vw"
                />
                {!preloadedImages.has(selectedImage) && (
                  <div className="modal-loading">
                    <div className="spinner"></div>
                  </div>
                )}
              </div>
              <div className="modal-info">
                <p className="modal-title">{images[selectedImage].alt}</p>
                <div className="modal-meta">
                  <p className="modal-category">{labels.category}</p>
                  <span className="modal-counter">
                    {selectedImage + 1} / {images.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .galerie-page {
            background: #000000;
            min-height: 100vh;
            padding-top: 10rem;
            color: #ffffff;
          }

          /* Hero */
          .hero-section {
            padding: 2rem 2rem 4rem;
            text-align: center;
          }

          .hero-content h1 {
            font-size: 4rem;
            font-weight: 300;
            letter-spacing: 4px;
            margin-bottom: 1rem;
            color: #ffffff;
          }

          .hero-content p {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 300;
          }

          .hero-line {
            width: 60px;
            height: 2px;
            background: rgba(255, 255, 255, 0.3);
            margin: 1.5rem auto 0;
          }

          /* Gallery */
          .gallery-container {
            max-width: 1500px;
            margin: 0 auto;
            padding: 0 2rem 4rem;
          }

          /*
           * Grid tipo mosaico SIN HUECOS:
           * - grid-auto-flow: dense → rellena huecos automáticamente
           * - aspect-ratio en cada celda → no quedan filas vacías
           * - gap mínimo → sin espacios visibles entre imágenes
           */
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: 1fr;
            grid-auto-flow: dense;
            gap: 2px;
          }

          .gallery-item-wrapper {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            aspect-ratio: 1 / 1;
            min-width: 0;
            min-height: 0;
          }

          .gallery-item-wrapper.visible {
            opacity: 1;
            transform: translateY(0);
          }

          /* Patrón de mosaico: spans que suman exacto por fila */
          .gallery-item-wrapper:nth-child(8n + 1) {
            grid-column: span 2;
            grid-row: span 2;
            aspect-ratio: auto;
          }

          .gallery-item-wrapper:nth-child(8n + 2),
          .gallery-item-wrapper:nth-child(8n + 3),
          .gallery-item-wrapper:nth-child(8n + 4),
          .gallery-item-wrapper:nth-child(8n + 5) {
            grid-column: span 1;
            grid-row: span 1;
          }

          .gallery-item-wrapper:nth-child(8n + 6) {
            grid-column: span 2;
            grid-row: span 1;
            aspect-ratio: 2 / 1;
          }

          .gallery-item-wrapper:nth-child(8n + 7) {
            grid-column: span 1;
            grid-row: span 2;
            aspect-ratio: auto;
          }

          .gallery-item-wrapper:nth-child(8n + 8) {
            grid-column: span 1;
            grid-row: span 1;
          }

          .gallery-item {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            cursor: pointer;
            transition: filter 0.3s ease;
            background: #1a1a1a;
            /* SIN border-radius */
            border-radius: 0;
          }

          .gallery-item:hover {
            filter: brightness(1.15);
            z-index: 2;
          }

          .gallery-image {
            transition: transform 0.6s ease;
          }

          .gallery-item:hover .gallery-image {
            transform: scale(1.06);
          }

          .gallery-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .gallery-item:hover .gallery-overlay {
            opacity: 1;
          }

          .gallery-overlay-content {
            text-align: center;
            color: #ffffff;
            transform: translateY(12px);
            transition: transform 0.3s ease;
          }

          .gallery-item:hover .gallery-overlay-content {
            transform: translateY(0);
          }

          .gallery-category {
            display: block;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 0.4rem;
          }

          .gallery-view {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: 1px;
          }

          /* Modal */
          .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.96);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.25s ease;
          }

          @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          .modal-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            width: 52px;
            height: 52px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20;
          }

          .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
          }

          .modal-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 50%;
            width: 52px;
            height: 52px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 20;
          }

          .modal-nav:hover {
            background: rgba(255, 255, 255, 0.18);
          }

          .modal-nav.prev { left: 1.5rem; }
          .modal-nav.next { right: 1.5rem; }

          /*
           * Modal: la imagen ocupa TODO el espacio disponible.
           * - width/height 100% en el contenedor
           * - object-fit: contain para ver la imagen completa
           * - sin border-radius, sin background que genere franjas visibles
           */
          .modal-content {
            position: relative;
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: column;
            padding: 0;
          }

          .modal-image-container {
            position: relative;
            flex: 1;
            width: 100%;
            min-height: 0;
            background: transparent;
            /* SIN border-radius */
            border-radius: 0;
          }

          .modal-image {
            /* contain → imagen completa, sin recortes */
            object-fit: contain;
          }

          .modal-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
          }

          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top: 3px solid #ffffff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .modal-info {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem 2rem;
            text-align: center;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.75) 0%,
              rgba(0, 0, 0, 0) 100%
            );
            z-index: 10;
          }

          .modal-title {
            font-size: 1.1rem;
            font-weight: 300;
            letter-spacing: 2px;
            color: rgba(255, 255, 255, 0.95);
            margin: 0 0 0.4rem 0;
          }

          .modal-meta {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }

          .modal-category {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            letter-spacing: 2px;
            text-transform: uppercase;
            margin: 0;
          }

          .modal-counter {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.35);
          }

          /* ============ RESPONSIVE ============ */

          @media (max-width: 1024px) {
            .gallery-grid {
              grid-template-columns: repeat(3, 1fr);
            }

            /* En 3 columnas, patrón adaptado */
            .gallery-item-wrapper:nth-child(8n + 1) {
              grid-column: span 2;
              grid-row: span 2;
            }
          }

          @media (max-width: 768px) {
            .galerie-page {
              padding-top: 8rem;
            }

            .hero-content h1 {
              font-size: 2.8rem;
            }

            .hero-content p {
              font-size: 1rem;
            }

            .gallery-container {
              padding: 0 0.75rem 2rem;
            }

            .gallery-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 2px;
            }

            /* Patrón para 2 columnas: cada bloque de 4 suma 2 columnas */
            .gallery-item-wrapper:nth-child(4n + 1) {
              grid-column: span 2;
              grid-row: span 2;
              aspect-ratio: auto;
            }

            .gallery-item-wrapper:nth-child(4n + 2),
            .gallery-item-wrapper:nth-child(4n + 3) {
              grid-column: span 1;
              grid-row: span 1;
              aspect-ratio: 1 / 1;
            }

            .gallery-item-wrapper:nth-child(4n + 4) {
              grid-column: span 2;
              grid-row: span 1;
              aspect-ratio: 2 / 1;
            }

            .modal-nav {
              width: 42px;
              height: 42px;
            }

            .modal-nav.prev { left: 0.5rem; }
            .modal-nav.next { right: 0.5rem; }

            .modal-close {
              width: 42px;
              height: 42px;
              top: 0.75rem;
              right: 0.75rem;
            }

            .modal-info {
              padding: 1rem;
            }

            .modal-title {
              font-size: 0.95rem;
            }
          }

          @media (max-width: 480px) {
            .hero-content h1 {
              font-size: 2rem;
            }

            .modal-nav {
              width: 36px;
              height: 36px;
            }

            .modal-nav svg {
              width: 22px;
              height: 22px;
            }

            .modal-close {
              width: 36px;
              height: 36px;
            }

            .modal-close svg {
              width: 22px;
              height: 22px;
            }
          }
        `}</style>
      </div>
    </>
  );
}