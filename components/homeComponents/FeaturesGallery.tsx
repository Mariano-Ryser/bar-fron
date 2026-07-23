import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { Star, ArrowRight, ExternalLink } from 'lucide-react';

export default function FeaturesGallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const goToGallery = () => {
    Router.push('/galerie');
  };

  return (
    <div ref={sectionRef} className="gallery-wrapper">
      <div className={`gallery-section ${isVisible ? 'visible' : ''}`}>
        <div className="gallery-header">
          <h3>
            <span onClick={goToGallery} className="gallery-title-link">
              Unsere <span>Galerie</span>
              <ExternalLink size={14} className="gallery-link-icon" />
            </span>
          </h3>
          <p>Ein Blick in unsere Location</p>
        </div>
        <div className="gallery-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item} 
              className="gallery-item"
              onClick={goToGallery}
            >
              <Image
                src={`/img/gallery-${item}.jpg`}
                alt={`Galerie ${item}`}
                fill
                className="gallery-image"
                style={{ objectFit: 'cover' }}
              />
              <div className="gallery-overlay">
                <Star size={18} />
                <span className="gallery-view-text">Alle anzeigen</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-footer">
          <button onClick={goToGallery} className="gallery-button">
            Zur Galerie <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .gallery-wrapper {
          background: #000000;
          padding: 1rem 0 1.5rem;
          width: 100%;
        }

        .gallery-section {
          max-width: 85%;
          margin: 0 auto;
          padding: 0 1rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 1.2rem;
        }

        .gallery-header h3 {
          color: rgba(255, 255, 255, 0.85);
          font-size: 1.6rem;
          font-weight: 300;
          letter-spacing: 2px;
        }

        .gallery-title-link {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.3s ease;
        }

        .gallery-title-link:hover {
          opacity: 0.7;
          transform: scale(1.02);
        }

        .gallery-title-link span {
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff, #888888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gallery-link-icon {
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .gallery-title-link:hover .gallery-link-icon {
          transform: translateX(4px);
          color: rgba(255, 255, 255, 0.6);
        }

        .gallery-header p {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.85rem;
          margin-top: 0.2rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 120px 120px;
          gap: 0.5rem;
        }

        .gallery-item {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
        }

        .gallery-item:first-child {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gallery-item:nth-child(2),
        .gallery-item:nth-child(3) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item:nth-child(4),
        .gallery-item:nth-child(5),
        .gallery-item:nth-child(6) {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-image {
          transition: transform 0.5s ease;
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          gap: 0.15rem;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-view-text {
          font-size: 0.65rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.7);
        }

        .gallery-footer {
          text-align: center;
          margin-top: 1.2rem;
        }

        .gallery-button {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          padding: 0.4rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
        }

        .gallery-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-rows: 100px 100px;
          }

          .gallery-header h3 {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 768px) {
          .gallery-wrapper {
            padding: 0.5rem 0 1rem;
          }

          .gallery-section {
            max-width: 100%;
            padding: 0 0.5rem;
          }

          .gallery-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 80px 80px 80px;
            gap: 0.3rem;
          }

          .gallery-item:first-child {
            grid-column: span 2;
            grid-row: span 2;
          }

          .gallery-item:nth-child(2),
          .gallery-item:nth-child(3),
          .gallery-item:nth-child(4),
          .gallery-item:nth-child(5),
          .gallery-item:nth-child(6) {
            grid-column: span 1;
            grid-row: span 1;
          }

          .gallery-header h3 {
            font-size: 1.2rem;
          }

          .gallery-header p {
            font-size: 0.75rem;
          }

          .gallery-view-text {
            font-size: 0.55rem;
          }

          .gallery-button {
            padding: 0.3rem 1rem;
            font-size: 0.7rem;
          }

          .gallery-footer {
            margin-top: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .gallery-wrapper {
            padding: 0.25rem 0 0.75rem;
          }

          .gallery-grid {
            grid-template-rows: 60px 60px 60px;
            gap: 0.2rem;
          }

          .gallery-header h3 {
            font-size: 1rem;
          }

          .gallery-header p {
            font-size: 0.7rem;
          }

          .gallery-section {
            padding: 0 0.25rem;
          }

          .gallery-button {
            padding: 0.25rem 0.8rem;
            font-size: 0.65rem;
          }

          .gallery-view-text {
            font-size: 0.45rem;
          }
        }
      `}</style>
    </div>
  );
}