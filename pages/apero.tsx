import Image from 'next/image';
import { FileText, Users, Calendar, Coffee, Sparkles } from 'lucide-react';

export default function Apero() {
  const images = [
    { id: 1, src: '/img/apero/apero1.webp', alt: 'Apéro Salotto' },
    { id: 2, src: '/img/apero/apero2.webp', alt: 'Apéro Riche Salotto' },
    { id: 3, src: '/img/apero/apero3.webp', alt: 'Apéro Location Salotto' },
    { id: 4, src: '/img/apero/apero4.webp', alt: 'Apéro Ambiente Salotto' },
  ];

  return (
    <div className="apero-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Apéro &amp; Apéro Riche</h1>
          <p>Für bis zu 60 Personen</p>
          <div className="hero-line"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        <div className="content-grid">
          {/* Left Column - Text */}
          <div className="text-column">
            <div className="text-content">
              <h2>Genussvolle Apéro-Kultur in der Salotto Location</h2>
              
              <p className="description">
                Für Apéros und Apéro Riche bieten wir Platz für bis zu 60 Personen. 
                Gerne erstellen wir Ihnen ein individuelles Angebot für Ihren Anlass.
              </p>

              <p className="description">
                Auf Wunsch servieren wir einen Apéro Riche nach Auswahl aus unserer Karte – 
                ideal für Firmenanlässe, Geburtstagsfeiern, Weihnachtsfeiern oder private Events.
              </p>

              {/* Features */}
              <div className="features-grid">
                <div className="feature-item">
                  <Users size={24} color="#ffffff" stroke="#ffffff" />
                  <span>Bis zu 60 Personen</span>
                </div>
                <div className="feature-item">
                  <Calendar size={24} color="#ffffff" stroke="#ffffff" />
                  <span>Individuelle Angebote</span>
                </div>
                <div className="feature-item">
                  <Coffee size={24} color="#ffffff" stroke="#ffffff" />
                  <span>Apéro Riche nach Wahl</span>
                </div>
                <div className="feature-item">
                  <Sparkles size={24} color="#ffffff" stroke="#ffffff" />
                  <span>Für jeden Anlass</span>
                </div>
              </div>

              {/* PDF Downloads */}
              <div className="pdf-downloads">
                <h3>Unterlagen zum Download</h3>
                <div className="pdf-buttons">
                  <a href="/pdf/getraenkekarte.pdf" className="pdf-button" target="_blank" rel="noopener noreferrer">
                    <FileText size={20} color="#ffffff" stroke="#ffffff" />
                    <span>PDF Getränkekarte</span>
                  </a>
                  <a href="/pdf/apero-food-karte.pdf" className="pdf-button" target="_blank" rel="noopener noreferrer">
                    <FileText size={20} color="#ffffff" stroke="#ffffff" />
                    <span>PDF Apéro Food-Karte</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="images-column">
            <div className="images-grid">
              {images.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`image-wrapper image-${index + 1}`}
                >
                  <div className="image-container">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="image"
                      style={{ objectFit: 'cover' }}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .apero-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 10rem;
          color: #ffffff;
        }

        /* Hero Section */
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

        /* Content Container */
        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* Text Column */
        .text-column {
          display: flex;
          flex-direction: column;
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .text-content h2 {
          font-size: 2.2rem;
          font-weight: 300;
          letter-spacing: 2px;
          color: #ffffff;
          line-height: 1.2;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 0.5rem 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .feature-item svg {
          color: #ffffff !important;
          flex-shrink: 0;
        }

        .feature-item span {
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 300;
        }

        /* PDF Downloads */
        .pdf-downloads {
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .pdf-downloads h3 {
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .pdf-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pdf-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 300;
          font-size: 0.95rem;
        }

        .pdf-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateX(5px);
        }

        .pdf-button svg {
          color: #ffffff !important;
          flex-shrink: 0;
        }

        .pdf-button span {
          color: #ffffff;
        }

        /* Images Column */
        .images-column {
          display: flex;
          flex-direction: column;
        }

        .images-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 1rem;
        }

        .image-wrapper {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          aspect-ratio: 4/3;
          transition: all 0.3s ease;
        }

        .image-wrapper:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          z-index: 2;
        }

        .image-wrapper.image-1 {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
          aspect-ratio: 3/4;
        }

        .image-wrapper.image-2 {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }

        .image-wrapper.image-3 {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }

        .image-wrapper.image-4 {
          grid-column: 1 / 2;
          grid-row: 3 / 4;
          aspect-ratio: 4/3;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .image {
          transition: transform 0.6s ease;
        }

        .image-wrapper:hover .image {
          transform: scale(1.08);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .images-grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: auto;
          }

          .image-wrapper.image-1,
          .image-wrapper.image-2,
          .image-wrapper.image-3,
          .image-wrapper.image-4 {
            grid-column: span 1;
            grid-row: span 1;
            aspect-ratio: 4/3;
          }
        }

        @media (max-width: 768px) {
          .apero-page {
            padding-top: 8rem;
          }

          .hero-content h1 {
            font-size: 2.8rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .text-content h2 {
            font-size: 1.8rem;
          }

          .description {
            font-size: 1rem;
          }

          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          .feature-item {
            padding: 0.75rem;
          }

          .feature-item span {
            font-size: 0.85rem;
          }

          .images-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          .image-wrapper.image-1 {
            grid-column: span 2;
            grid-row: span 1;
            aspect-ratio: 16/9;
          }

          .image-wrapper.image-2,
          .image-wrapper.image-3,
          .image-wrapper.image-4 {
            grid-column: span 1;
            grid-row: span 1;
            aspect-ratio: 4/3;
          }

          .content-container {
            padding: 0 1rem 2rem;
          }

          .pdf-button {
            padding: 0.7rem 1.2rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 0.95rem;
          }

          .text-content h2 {
            font-size: 1.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .images-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .image-wrapper.image-1,
          .image-wrapper.image-2,
          .image-wrapper.image-3,
          .image-wrapper.image-4 {
            grid-column: span 1;
            aspect-ratio: 4/3;
          }

          .pdf-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}