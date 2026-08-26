import Image from 'next/image';
import { FileText, Users, Calendar, Coffee, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Apero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsHeroVisible(true);

    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.15;
        imageRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const images = [
    { id: 1, src: '/img/apero/apero1.webp', alt: 'Apéro Salotto' },
    { id: 2, src: '/img/apero/apero2.webp', alt: 'Apéro Riche Salotto' },
    { id: 3, src: '/img/apero/apero3.webp', alt: 'Apéro Location Salotto' },
    { id: 4, src: '/img/apero/apero4.webp', alt: 'Apéro Ambiente Salotto' },
  ];

  return (
    <div className="apero-page">
      {/* Hero Section - Full Screen con Parallax y blur - IGUAL QUE FIRMENEVENTS */}
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <div className="hero-image-inner" ref={imageRef}>
            <Image
              src="/img/apero/apero2.webp"
              alt="Apéro Salotto Zürich"
              fill
              className={`hero-image ${imageLoaded ? 'loaded' : ''}`}
              style={{ objectFit: 'cover' }}
              priority
              quality={90}
              sizes="100vw"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className={`hero-title ${isHeroVisible ? 'visible' : ''}`}>
                Apéro &amp; Apéro Riche
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                Für bis zu 60 Personen
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`}></div>
            </div>
          </div>
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

              {/* Quick Links */}
              <div className="quick-links">
                <h3>Schnellzugriff</h3>
                <div className="quick-links-buttons">
                  <a href="/konditionen" className="quick-link">
                    <span>→ Konditionen und Preise</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                  <a href="/jetztmieten" className="quick-link primary">
                    <span>→ Offerte anfragen</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
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
          color: #ffffff;
          overflow-x: hidden;
        }

        /* ===== HERO - FULL SCREEN con Parallax y blur (IGUAL QUE FIRMENEVENTS) ===== */
        .hero-image-container {
          position: relative;
          width: 100%;
          height: 60vh;
          min-height: 400px;
          max-height: 600px;
          overflow: hidden;
        }

        .hero-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .hero-image-inner {
          position: relative;
          width: 100%;
          height: 120%;
          top: -10%;
          will-change: transform;
          transition: none;
        }

        .hero-image {
          transition: filter 1.5s ease-out, transform 1.5s ease-out, opacity 1.5s ease-out;
          filter: blur(30px);
          transform: scale(1.1);
          opacity: 0;
        }

        .hero-image.loaded {
          filter: blur(0px);
          transform: scale(1);
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.6) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .hero-content {
          text-align: center;
          padding: 2rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          letter-spacing: 4px;
          margin-bottom: 0.5rem;
          color: #ffffff;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }

        .hero-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
        }

        .hero-subtitle.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          margin: 1.5rem auto 0;
          opacity: 0;
          transform: scaleX(0);
          transition: opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s;
          transform-origin: center;
        }

        .hero-line.visible {
          opacity: 1;
          transform: scaleX(1);
        }

        /* Content Container */
        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem 4rem;
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
          animation: contentFadeUp 0.8s ease-out 0.6s both;
        }

        @keyframes contentFadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
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
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation: featureSlide 0.6s ease-out both;
          animation-delay: calc(0.8s + (var(--i, 0) * 0.1s));
        }

        .feature-item:nth-child(1) { --i: 0; }
        .feature-item:nth-child(2) { --i: 1; }
        .feature-item:nth-child(3) { --i: 2; }
        .feature-item:nth-child(4) { --i: 3; }

        @keyframes featureSlide {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .feature-item svg {
          color: #ffffff !important;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .feature-item:hover svg {
          transform: scale(1.15) rotate(-5deg);
        }

        .feature-item span {
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 300;
        }

        /* PDF Downloads */
        .pdf-downloads {
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
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-weight: 300;
          font-size: 0.95rem;
          position: relative;
          overflow: hidden;
        }

        .pdf-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .pdf-button:hover::before {
          transform: translateX(0);
        }

        .pdf-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateX(5px);
        }

        .pdf-button svg {
          color: #ffffff !important;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .pdf-button:hover svg {
          transform: scale(1.1);
        }

        .pdf-button span {
          color: #ffffff;
          position: relative;
          z-index: 1;
        }

        /* Quick Links */
        .quick-links {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .quick-links h3 {
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .quick-links-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .quick-link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          color: #ffffff;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-weight: 300;
          font-size: 0.95rem;
          position: relative;
          overflow: hidden;
        }

        .quick-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .quick-link:hover::before {
          transform: translateX(0);
        }

        .quick-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateX(5px);
        }

        .quick-link.primary {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .quick-link.primary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateX(5px);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.05);
        }

        .quick-link svg {
          color: #ffffff !important;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .quick-link:hover svg {
          transform: translateX(5px);
        }

        .quick-link span {
          color: #ffffff;
          position: relative;
          z-index: 1;
        }

        /* Images Column */
        .images-column {
          display: flex;
          flex-direction: column;
          animation: contentFadeUp 0.8s ease-out 0.8s both;
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
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
          animation: imageReveal 0.8s ease-out forwards;
          animation-delay: calc(1s + (var(--i, 0) * 0.1s));
        }

        .image-wrapper:nth-child(1) { --i: 0; }
        .image-wrapper:nth-child(2) { --i: 1; }
        .image-wrapper:nth-child(3) { --i: 2; }
        .image-wrapper:nth-child(4) { --i: 3; }

        @keyframes imageReveal {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .image-wrapper:hover {
          transform: scale(1.03);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
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
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .image-wrapper:hover .image {
          transform: scale(1.1);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .hero-image-container {
            height: 50vh;
            min-height: 350px;
            max-height: 500px;
          }

          .hero-title {
            font-size: 3rem;
          }

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
          padding-top:8rem;
        }
          .hero-image-container {
            height: 40vh;
            min-height: 300px;
            max-height: 400px;
          }

          .hero-title {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }

          .hero-subtitle {
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
            padding: 3rem 1rem 2rem;
          }

          .pdf-button,
          .quick-link {
            padding: 0.7rem 1.2rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
        
          .hero-image-container {

            height: 30vh;
            min-height: 250px;
            max-height: 350px;
          }

          .hero-title {
            font-size: 2rem;
            letter-spacing: 1px;
          }

          .hero-subtitle {
            font-size: 0.9rem;
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

          .pdf-buttons,
          .quick-links-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}