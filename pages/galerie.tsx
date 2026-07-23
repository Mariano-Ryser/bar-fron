import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Galerie() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  const images = [
    { id: 1, src: '/img/gallery-1.jpg', alt: 'Salotto Ambiente 1', category: 'Ambiente' },
    { id: 2, src: '/img/gallery-2.jpg', alt: 'Salotto Ambiente 2', category: 'Ambiente' },
    { id: 3, src: '/img/gallery-3.jpg', alt: 'Salotto Ambiente 3', category: 'Ambiente' },
    { id: 4, src: '/img/gallery-4.webp', alt: 'Salotto Ambiente 4', category: 'Ambiente' },
    { id: 5, src: '/img/gallery-5.jpg', alt: 'Salotto Ambiente 5', category: 'Ambiente' },
    { id: 6, src: '/img/gallery-6.jpg', alt: 'Salotto Ambiente 6', category: 'Ambiente' },
    { id: 7, src: '/img/gallery-7.jpg', alt: 'Salotto Ambiente 7', category: 'Ambiente' },
    { id: 8, src: '/img/gallery-8.jpg', alt: 'Salotto Ambiente 8', category: 'Ambiente' },
    { id: 9, src: '/img/gallery-9.jpg', alt: 'Salotto Ambiente 9', category: 'Ambiente' },
    { id: 10, src: '/img/gallery-10.jpg', alt: 'Salotto Ambiente 10', category: 'Ambiente' },
    { id: 11, src: '/img/gallery-11.jpg', alt: 'Salotto Ambiente 11', category: 'Ambiente' },
    { id: 12, src: '/img/gallery-12.jpg', alt: 'Salotto Ambiente 12', category: 'Ambiente' },
  ];

  // Observer para animaciones de entrada usando sectionRef
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.gallery-item-wrapper');
    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  // Precarga de imágenes para el modal
  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
        setPreloadedImages(prev => {
          const newSet = new Set(prev);
          const index = images.findIndex(img => img.src === image.src);
          newSet.add(index);
          return newSet;
        });
      };
    });
  }, []);

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div ref={sectionRef} className="galerie-page">
      {/* Hero */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Unsere Galerie</h1>
          <p>Ein Blick in die Salotto Location</p>
          <div className="hero-line"></div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-container">
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item-wrapper ${visibleItems.includes(index) ? 'visible' : ''}`}
              data-index={index}
              onClick={() => openModal(index)}
            >
              <div className="gallery-item">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="gallery-image"
                  style={{ objectFit: 'cover' }}
                  quality={85}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={index < 4}
                />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-category">{image.category}</span>
                    <span className="gallery-view">Klicken zum Vergrößern</span>
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
          <button className="modal-close" onClick={closeModal}>
            <X size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <button className="modal-nav prev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
            <ChevronLeft size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <button className="modal-nav next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
            <ChevronRight size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-container">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="modal-image"
                style={{ objectFit: 'contain' }}
                quality={100}
                priority={true}
                sizes="90vw"
              />
              {!preloadedImages.has(selectedImage) && (
                <div className="modal-loading">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            <div className="modal-info">
              <p className="modal-title">{images[selectedImage].alt}</p>
              <p className="modal-category">{images[selectedImage].category}</p>
              <span className="modal-counter">
                {selectedImage + 1} / {images.length}
              </span>
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

        /* Hero - Título en blanco */
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
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(200px, auto);
          gap: 1rem;
        }

        .gallery-item-wrapper {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.6s ease;
        }

        .gallery-item-wrapper.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Layout de imágenes */
        .gallery-item-wrapper:nth-child(1) {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gallery-item-wrapper:nth-child(2) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(3) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(4) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(5) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(6) {
          grid-column: span 2;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(7) {
          grid-column: span 1;
          grid-row: span 2;
        }

        .gallery-item-wrapper:nth-child(8) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(9) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(10) {
          grid-column: span 2;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(11) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item-wrapper:nth-child(12) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 180px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #1a1a1a;
        }

        .gallery-item:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          z-index: 2;
        }

        .gallery-image {
          transition: transform 0.6s ease;
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.1);
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: all 0.3s ease;
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
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .gallery-item:hover .gallery-overlay-content {
          transform: translateY(0);
        }

        .gallery-category {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.5rem;
        }

        .gallery-view {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 1px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-close:hover {
          transform: rotate(90deg) scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-nav:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-50%) scale(1.1);
        }

        .modal-nav.prev {
          left: 2rem;
        }

        .modal-nav.next {
          right: 2rem;
        }

        .modal-content {
          position: relative;
          width: 90%;
          max-width: 1200px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .modal-image-container {
          position: relative;
          width: 100%;
          height: 70vh;
          border-radius: 12px;
          overflow: hidden;
          background: #0a0a0a;
        }

        .modal-image {
          transition: transform 0.3s ease;
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
          margin-top: 1.5rem;
          text-align: center;
        }

        .modal-title {
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.9);
        }

        .modal-category {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 0.25rem;
        }

        .modal-counter {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.3);
          margin-left: 1rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: minmax(180px, auto);
          }

          .gallery-item-wrapper:nth-child(1),
          .gallery-item-wrapper:nth-child(2),
          .gallery-item-wrapper:nth-child(3),
          .gallery-item-wrapper:nth-child(4),
          .gallery-item-wrapper:nth-child(5),
          .gallery-item-wrapper:nth-child(6),
          .gallery-item-wrapper:nth-child(7),
          .gallery-item-wrapper:nth-child(8),
          .gallery-item-wrapper:nth-child(9),
          .gallery-item-wrapper:nth-child(10),
          .gallery-item-wrapper:nth-child(11),
          .gallery-item-wrapper:nth-child(12) {
            grid-column: span 1;
            grid-row: span 1;
          }

          .gallery-item {
            min-height: 160px;
          }
        }

        @media (max-width: 768px) {
          .galerie-page {
            padding-top: 8rem;
          }

          .hero-content h1 {
            font-size: 2.8rem;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: minmax(150px, auto);
            gap: 0.75rem;
          }

          .gallery-item-wrapper:nth-child(1) {
            grid-column: span 2;
            grid-row: span 2;
          }

          .gallery-item-wrapper:nth-child(2),
          .gallery-item-wrapper:nth-child(3),
          .gallery-item-wrapper:nth-child(4),
          .gallery-item-wrapper:nth-child(5),
          .gallery-item-wrapper:nth-child(6),
          .gallery-item-wrapper:nth-child(7),
          .gallery-item-wrapper:nth-child(8),
          .gallery-item-wrapper:nth-child(9),
          .gallery-item-wrapper:nth-child(10),
          .gallery-item-wrapper:nth-child(11),
          .gallery-item-wrapper:nth-child(12) {
            grid-column: span 1;
            grid-row: span 1;
          }

          .gallery-item {
            min-height: 130px;
          }

          .modal-nav {
            width: 45px;
            height: 45px;
          }

          .modal-nav.prev {
            left: 0.5rem;
          }

          .modal-nav.next {
            right: 0.5rem;
          }

          .modal-close {
            width: 45px;
            height: 45px;
            top: 1rem;
            right: 1rem;
          }

          .modal-image-container {
            height: 50vh;
          }

          .gallery-container {
            padding: 0 1rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: minmax(120px, auto);
            gap: 0.5rem;
          }

          .gallery-item-wrapper:nth-child(1) {
            grid-column: span 2;
            grid-row: span 2;
          }

          .gallery-item {
            min-height: 100px;
          }

          .modal-nav {
            width: 38px;
            height: 38px;
          }

          .modal-nav svg {
            width: 24px;
            height: 24px;
          }

          .modal-close {
            width: 38px;
            height: 38px;
          }

          .modal-close svg {
            width: 24px;
            height: 24px;
          }

          .modal-image-container {
            height: 40vh;
          }

          .modal-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
