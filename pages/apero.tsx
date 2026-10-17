import Image from 'next/image';
import { FileText, Users, Calendar, Coffee, Sparkles, ArrowRight } from 'lucide-react';
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
      {/* HERO */}
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
              <p className={`hero-eyebrow ${isHeroVisible ? 'visible' : ''}`}>
                Salotto Zürich
              </p>
              <h1 className={`hero-title ${isHeroVisible ? 'visible' : ''}`}>
                Apéro &amp; Apéro Riche
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                Für bis zu 60 Personen
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`} />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content-container">
        <div className="content-grid">
          {/* TEXT */}
          <div className="text-column">
            <div className="text-content">
              <span className="section-eyebrow">Apéro-Kultur</span>
              <h2 className="main-title">
                Genussvolle Apéro-Kultur in der Salotto Location
              </h2>

              <p className="description">
                Für Apéros und Apéro Riche bieten wir Platz für bis zu 60 Personen.
                Gerne erstellen wir Ihnen ein individuelles Angebot für Ihren Anlass.
              </p>

              <p className="description">
                Auf Wunsch servieren wir einen Apéro Riche nach Auswahl aus unserer
                Karte – ideal für Firmenanlässe, Geburtstagsfeiern, Weihnachtsfeiern
                oder private Events.
              </p>

              {/* FEATURES */}
              <div className="features-grid">
                <div className="feature-item">
                  <span className="feature-icon">
                    <Users size={22} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                  </span>
                  <span>Bis zu 60 Personen</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <Calendar size={22} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                  </span>
                  <span>Individuelle Angebote</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <Coffee size={22} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                  </span>
                  <span>Apéro Riche nach Wahl</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">
                    <Sparkles size={22} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                  </span>
                  <span>Für jeden Anlass</span>
                </div>
              </div>

              {/* PDF DOWNLOADS */}
              <div className="pdf-downloads">
                <h3 className="block-title">Unterlagen zum Download</h3>
                <div className="pdf-buttons">
                  <a
                    href="/pdf/getraenkekarte.pdf"
                    className="action-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                    <span>PDF Getränkekarte</span>
                  </a>
                  <a
                    href="/pdf/apero-food-karte.pdf"
                    className="action-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                    <span>PDF Apéro Food-Karte</span>
                  </a>
                </div>
              </div>

              {/* QUICK LINKS */}
              <div className="quick-links">
                <h3 className="block-title">Schnellzugriff</h3>
                <div className="quick-links-buttons">
                  <a href="/konditionen" className="action-button with-arrow">
                    <span>Konditionen und Preise</span>
                    <ArrowRight size={18} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
                  </a>
                  <a href="/jetztmieten" className="action-button primary with-arrow">
                    <span>Offerte anfragen</span>
                    <ArrowRight size={18} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGES */}
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
        /* ============ BASE ============ */
        .apero-page {
          background: #000;
          min-height: 100vh;
          color: #fff;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* ============ HERO ============ */
        .hero-image-container {
          position: relative;
          width: 100%;
          height: 65vh;
          min-height: 420px;
          max-height: 640px;
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
          transition: filter 1.6s ease-out, transform 1.6s ease-out,
            opacity 1.6s ease-out;
          filter: blur(28px);
          transform: scale(1.12);
          opacity: 0;
        }

        .hero-image.loaded {
          filter: blur(0);
          transform: scale(1);
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.35) 0%,
            rgba(0, 0, 0, 0.65) 55%,
            rgba(0, 0, 0, 0.9) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .hero-content {
          text-align: center;
          padding: 2rem;
          max-width: 900px;
        }

        .hero-eyebrow {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          margin: 0 0 1rem;
          opacity: 0;
          transform: translateY(-16px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }

        .hero-eyebrow.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-title {
          font-size: clamp(2rem, 5.5vw, 4.5rem);
          font-weight: 500;
          letter-spacing: 2px;
          line-height: 1.05;
          margin: 0 0 1rem;
          color: #fff;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
          opacity: 0;
          transform: translateY(40px) scale(0.96);
          filter: blur(8px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s,
            transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s,
            filter 1s cubic-bezier(0.22, 1, 0.36, 1) 0.35s;
        }

        .hero-title.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .hero-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
          margin: 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease 0.7s, transform 0.9s ease 0.7s;
        }

        .hero-subtitle.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line {
          width: 70px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          margin: 1.6rem auto 0;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: center;
          transition: opacity 0.8s ease 1s, transform 0.9s ease 1s;
        }

        .hero-line.visible {
          opacity: 1;
          transform: scaleX(1);
        }

        /* ============ CONTENT ============ */
        .content-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4.5rem 2rem;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* ============ TEXT COLUMN ============ */
        .text-column {
          animation: contentFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }

        @keyframes contentFadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .text-content {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          opacity: 0;
          transform: translateX(-20px);
          animation: eyebrowIn 0.6s ease 0.4s both;
        }

        @keyframes eyebrowIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .main-title {
          font-size: clamp(1.7rem, 3vw, 2.4rem);
          font-weight: 500;
          letter-spacing: 1px;
          color: #fff;
          line-height: 1.2;
          margin: 0;
          padding-bottom: 1rem;
          position: relative;
          opacity: 0;
          transform: translateY(24px);
          animation: titleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
        }

        @keyframes titleIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Subrayado animado del título principal */
        .main-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
          animation: underlineGrow 1.1s cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
        }

        @keyframes underlineGrow {
          to {
            width: 100px;
          }
        }

        .description {
          font-size: 1.08rem;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.88);
          font-weight: 400;
          margin: 0;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease 0.7s both;
        }

        .description:nth-of-type(2) {
          animation-delay: 0.8s;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ============ FEATURES ============ */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
          margin: 0.5rem 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem 1.1rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          transition: background 0.35s ease, border-color 0.35s ease,
            transform 0.35s ease, box-shadow 0.35s ease;
          opacity: 0;
          transform: translateX(-16px);
          animation: featureIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .feature-item:nth-child(1) { animation-delay: 0.9s; }
        .feature-item:nth-child(2) { animation-delay: 1.0s; }
        .feature-item:nth-child(3) { animation-delay: 1.1s; }
        .feature-item:nth-child(4) { animation-delay: 1.2s; }

        @keyframes featureIn {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .feature-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .feature-item:hover .feature-icon {
          transform: scale(1.08) rotate(-4deg);
        }

        .feature-item span:not(.feature-icon) {
          font-size: 1rem;
          color: #fff;
          font-weight: 400;
          line-height: 1.4;
        }

        /* ============ BLOCKS (PDF + Quick Links) ============ */
        .pdf-downloads,
        .quick-links {
          padding-top: 1.6rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease both;
        }

        .pdf-downloads {
          animation-delay: 1.35s;
        }

        .quick-links {
          animation-delay: 1.5s;
        }

        .block-title {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 1rem;
        }

        .pdf-buttons,
        .quick-links-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.95rem 1.5rem;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          text-decoration: none;
          font-weight: 400;
          font-size: 1rem;
          transition: background 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .action-button::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06),
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .action-button:hover::before {
          transform: translateX(0);
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.22);
          transform: translateX(5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        }

        .action-button svg {
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .action-button span {
          position: relative;
          z-index: 1;
          color: #fff;
        }

        .action-button.with-arrow {
          justify-content: space-between;
        }

        .action-button.with-arrow:hover svg {
          transform: translateX(4px);
        }

        .action-button.primary {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.22);
          font-weight: 500;
        }

        .action-button.primary:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.05);
        }

        /* ============ IMAGES ============ */
        .images-column {
          animation: contentFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
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
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.5s ease;
          opacity: 0;
          transform: scale(0.94) translateY(20px);
          animation: imageReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .image-wrapper:nth-child(1) { animation-delay: 0.6s; }
        .image-wrapper:nth-child(2) { animation-delay: 0.72s; }
        .image-wrapper:nth-child(3) { animation-delay: 0.84s; }
        .image-wrapper:nth-child(4) { animation-delay: 0.96s; }

        @keyframes imageReveal {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .image-wrapper:hover {
          transform: scale(1.03);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.6);
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
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .image-wrapper:hover .image {
          transform: scale(1.08);
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 1024px) {
          .content-container {
            padding: 3.5rem 1.8rem;
          }

          .content-grid {
            grid-template-columns: 1fr;
            gap: 2.8rem;
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

          .hero-image-container {
            height: 45vh;
            min-height: 320px;
            max-height: 460px;
          }

          .hero-eyebrow {
            letter-spacing: 4px;
            font-size: 0.7rem;
          }

          .content-container {
            padding: 2.6rem 1.1rem;
          }

          .content-grid {
            gap: 2rem;
          }

          .text-content {
            gap: 1.3rem;
          }

          .description {
            font-size: 1.02rem;
            line-height: 1.8;
          }

          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.7rem;
          }

          .feature-item {
            padding: 0.8rem 0.9rem;
            gap: 0.7rem;
          }

          .feature-icon {
            width: 38px;
            height: 38px;
          }

          .feature-item span:not(.feature-icon) {
            font-size: 0.95rem;
          }

          .images-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.7rem;
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

          .action-button {
            padding: 0.85rem 1.2rem;
            font-size: 0.95rem;
          }

          .block-title {
            font-size: 0.8rem;
            letter-spacing: 2.5px;
          }
        }

        @media (max-width: 480px) {
          .apero-page {
            padding-top: 6rem;
          }

          .hero-image-container {
            height: 38vh;
            min-height: 260px;
            max-height: 360px;
          }

          .content-container {
            padding: 2rem 0.9rem;
          }

          .text-content {
            gap: 1.2rem;
          }

          .description {
            font-size: 0.98rem;
            line-height: 1.75;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .feature-item {
            padding: 0.8rem 1rem;
          }

          .feature-item span:not(.feature-icon) {
            font-size: 0.95rem;
          }

          .images-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .image-wrapper.image-1,
          .image-wrapper.image-2,
          .image-wrapper.image-3,
          .image-wrapper.image-4 {
            grid-column: span 1;
            grid-row: span 1;
            aspect-ratio: 4/3;
          }

          .action-button {
            font-size: 0.95rem;
            padding: 0.8rem 1.1rem;
          }

          .pdf-buttons,
          .quick-links-buttons {
            gap: 0.6rem;
          }
        }

        /* Accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .hero-image,
          .hero-title,
          .hero-subtitle,
          .hero-line,
          .hero-eyebrow,
          .text-column,
          .text-content,
          .section-eyebrow,
          .main-title,
          .main-title::after,
          .description,
          .feature-item,
          .pdf-downloads,
          .quick-links,
          .images-column,
          .image-wrapper {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .main-title::after {
            width: 100px !important;
          }
        }
      `}</style>
    </div>
  );
}