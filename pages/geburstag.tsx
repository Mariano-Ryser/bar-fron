import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export default function Geburtstag() {
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.15;
        imageRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animación de entrada
    setIsVisible(true);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnfrageClick = () => {
    router.push('/kontakt');
  };

  return (
    <div className="geburtstag-page">
      {/* Hero Section con animación */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className={`fade-in ${isVisible ? 'visible' : ''}`}>
            Geburtstagsfeier
          </h1>
          <p className={`fade-in-delay ${isVisible ? 'visible' : ''}`}>
            & Privat Partys
          </p>
          <div className={`hero-line ${isVisible ? 'visible' : ''}`}></div>
          <p className={`hero-sub ${isVisible ? 'visible' : ''}`}>
            🎉 Feiere unvergesslich in Zürich
          </p>
        </div>
      </div>

      {/* Header Image con Parallax */}
      <div className="header-image-wrapper">
        <div className="header-image-container">
          <div className="header-image-inner" ref={imageRef}>
            <Image
              src="/img/geburtstag/party1.webp" 
              alt="Geburtstagsfeier Salotto Zürich"
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="header-image"
            />
          </div>
          <div className="header-image-overlay"></div>
        </div>
      </div>

      {/* Intro Text con animación */}
      <div className="intro-section">
        <div className="intro-content">
          <p className="intro-text">
            Du suchst eine einzigartige Location für Deine Geburtstagsfeier in Zürich? 
            Das <strong>Salotto Zürich</strong> kannst Du exklusiv für Deine private Party mieten. 
            Ob runder Geburtstag, Überraschungsparty oder ein Fest mit Freunden und Familie – 
            bei uns feierst Du in stilvoller, lockerer Atmosphäre.
          </p>
          <p className="intro-text highlight">
            Unser Eventlokal bietet Platz für bis zu <strong>60 Personen</strong> und steht Dir 
            für geschlossene Gesellschaften exklusiv zur Verfügung.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎂</div>
            <h3>Runder Geburtstag</h3>
            <p>Feiere Deinen besonderen Tag in exklusiver Atmosphäre</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>Überraschungsparty</h3>
            <p>Perfekte Location für unvergessliche Überraschungen</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Party & Musik</h3>
            <p>Mit Bar, Musik und legendärer Discokugel</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Bis zu 60 Gäste</h3>
            <p>Genug Platz für alle Freunde und Familie</p>
          </div>
        </div>
      </div>

      {/* Section con Imagen 1 */}
      <div className="section-with-image">
        <div className="section-text">
          <h2>Deine Geburtstagsfeier in Zürich</h2>
          <p>
            Freue Dich auf eine gemütliche Partylocation mit Bar, Musik und der 
            legendären Discokugel – perfekt zum Feiern, Tanzen und Geniessen.
          </p>
          <p className="highlight-text">
            Du feierst – wir kümmern uns um den Rest. So wird Deine Geburtstagsfeier 
            in Zürich unkompliziert und unvergesslich.
          </p>
          <button 
            onClick={handleAnfrageClick} 
            className="anfrage-btn"
          >
            Jetzt Anfrage senden
          </button>
        </div>
        <div className="section-image">
          <Image
            src="/img/geburtstag/party2.jpg"
            alt="Party Location Zürich"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Section con Imagen 2 (reverse) */}
      <div className="section-with-image reverse">
        <div className="section-text">
          <h2>Exklusiv für Dich und Deine Gäste</h2>
          <p>
            Das Salotto Zürich steht Dir für geschlossene Gesellschaften exklusiv zur Verfügung. 
            Geniesse die Privatsphäre und die einzigartige Atmosphäre unserer Location.
          </p>
          <p>
            Ob mit DJ, eigener Playlist oder Live-Musik – wir passen uns Deinen Wünschen an 
            und sorgen für den perfekten Rahmen Deiner Feier.
          </p>
        </div>
        <div className="section-image">
          <Image
            src="/img/geburtstag/party3.jpg"
            alt="Geburtstagsfeier Location"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Extras Section */}
      {/* <div className="extras-section">
        <h2>Was wir Dir bieten</h2>
        <div className="extras-grid">
          <div className="extra-item">
            <span className="extra-emoji">🍾</span>
            <span>Exklusive Bar</span>
          </div>
          <div className="extra-item">
            <span className="extra-emoji">🪩</span>
            <span>Discokugel</span>
          </div>
          <div className="extra-item">
            <span className="extra-emoji">🎶</span>
            <span>Musik-Anlage</span>
          </div>
          <div className="extra-item">
            <span className="extra-emoji">🕯️</span>
            <span>Stimmungsvolle Beleuchtung</span>
          </div>
          <div className="extra-item">
            <span className="extra-emoji">🍽️</span>
            <span>Catering möglich</span>
          </div>
          <div className="extra-item">
            <span className="extra-emoji">🎉</span>
            <span>Dekoration nach Wunsch</span>
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Bereit für Deine Geburtstagsfeier?</h2>
        <p>Kontaktiere uns für eine unverbindliche Anfrage</p>
        <button 
          onClick={handleAnfrageClick} 
          className="cta-btn"
        >
          Jetzt Anfragen
        </button>
      </div>

      <style jsx>{`
        .geburtstag-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 8rem;
          color: #ffffff;
        }

        /* ===== HERO ===== */
        .hero-section {
          padding: 0rem 2rem 2rem;
          text-align: center;
        }

        .hero-content h1 {
          color: #ffffff;
          font-size: 3.5rem;
          font-weight: 300;
          letter-spacing: 4px;
          margin-bottom: 0.5rem;
        }

        .hero-content p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        .hero-sub {
          margin-top: 1rem;
          font-size: 1.2rem !important;
          color: rgba(255, 215, 0, 0.7) !important;
        }

        .hero-line {
          width: 50px;
          height: 2px;
          background: rgba(255, 215, 0, 0.5);
          margin: 1rem auto 0;
        }

        /* ===== ANIMACIONES ===== */
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-in-delay {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }

        .fade-in-delay.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-line {
          opacity: 0;
          transform: scaleX(0);
          transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
          transform-origin: center;
        }

        .hero-line.visible {
          opacity: 1;
          transform: scaleX(1);
        }

        .hero-sub {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s;
        }

        .hero-sub.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== HEADER IMAGE ===== */
        .header-image-wrapper {
          display: flex;
          justify-content: center;
          padding: 1rem 0 2rem;
        }

        .header-image-container {
          position: relative;
          width: 65%;
          height: 50vh;
          min-height: 350px;
          max-height: 650px;
          overflow: hidden;
          background: #1a1a1a;
        }

        .header-image-inner {
          position: relative;
          width: 100%;
          height: 120%;
          top: -10%;
          will-change: transform;
          transition: none;
        }

        .header-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.4) 0%,
            transparent 50%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* ===== INTRO ===== */
        .intro-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .intro-content {
          animation: fadeInUp 1s ease;
        }

        .intro-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 1rem;
        }

        .intro-text strong {
          color: rgba(255, 255, 255, 0.9);
        }

        .intro-text.highlight {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .intro-text.highlight strong {
          color: #ffd700;
        }

        /* ===== FEATURES ===== */
        .features-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.4s ease;
          border-radius: 8px;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 215, 0, 0.3);
          background: rgba(255, 215, 0, 0.05);
        }

        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.1rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.5rem;
        }

        .feature-card p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.5;
          margin: 0;
        }

        /* ===== SECTION WITH IMAGE ===== */
        .section-with-image {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section-with-image:last-of-type {
          border-bottom: none;
        }

        .section-with-image.reverse {
          direction: rtl;
        }

        .section-with-image.reverse .section-text {
          direction: ltr;
        }

        .section-text {
          direction: ltr;
        }

        .section-text h2 {
          font-size: 1.8rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .section-text p {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
        }

        .section-text .highlight-text {
          color: rgba(255, 215, 0, 0.8);
          font-size: 1.05rem;
          padding: 1rem;
          border-left: 3px solid rgba(255, 215, 0, 0.3);
        }

        .section-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #1a1a1a;
          border-radius: 4px;
        }

        .section-image img {
          transition: transform 0.6s ease;
        }

        .section-image:hover img {
          transform: scale(1.05);
        }

        .anfrage-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.8rem 2.5rem;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
        }

        .anfrage-btn:hover {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.4);
          transform: scale(1.02);
        }

        /* ===== EXTRAS ===== */
        .extras-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .extras-section h2 {
          font-size: 1.8rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .extras-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .extra-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 50px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .extra-item:hover {
          border-color: rgba(255, 215, 0, 0.3);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .extra-emoji {
          font-size: 1.2rem;
        }

        /* ===== CTA ===== */
        .cta-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
        }

        .cta-section h2 {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.05rem;
          margin-bottom: 2rem;
        }

        .cta-btn {
          background: rgba(255, 215, 0, 0.15);
          border: 1px solid rgba(255, 215, 0, 0.3);
          color: #ffffff;
          padding: 1rem 3rem;
          border-radius: 50px;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
        }

        .cta-btn:hover {
          background: rgba(255, 215, 0, 0.25);
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.02);
        }

        /* ===== ANIMACIONES ===== */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .header-image-container {
            width: 85%;
            height: 45vh;
            min-height: 300px;
            max-height: 500px;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-with-image {
            gap: 2rem;
            padding: 2rem 2rem;
          }

          .section-text h2 {
            font-size: 1.5rem;
          }

          .extras-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .geburtstag-page {
            padding-top: 6rem;
          }

          .hero-section {
            padding: 0.5rem 1rem 1.5rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .header-image-wrapper {
            padding: 0.5rem 0 1.5rem;
          }

          .header-image-container {
            width: 92%;
            height: 35vh;
            min-height: 250px;
            max-height: 400px;
          }

          .header-image-inner {
            height: 130%;
            top: -15%;
          }

          .intro-section {
            padding: 2rem 1rem;
          }

          .intro-text {
            font-size: 0.95rem;
          }

          .features-section {
            padding: 2rem 1rem;
          }

          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .feature-card {
            padding: 1.5rem 1rem;
          }

          .section-with-image {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 2rem 1rem;
          }

          .section-with-image.reverse {
            direction: ltr;
          }

          .section-image {
            aspect-ratio: 16/10;
          }

          .section-text h2 {
            font-size: 1.4rem;
          }

          .section-text p {
            font-size: 0.95rem;
          }

          .extras-section {
            padding: 2rem 1rem;
          }

          .extras-section h2 {
            font-size: 1.4rem;
          }

          .extras-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          .extra-item {
            font-size: 0.85rem;
            padding: 0.8rem 1rem;
          }

          .anfrage-btn {
            padding: 0.6rem 2rem;
            font-size: 0.9rem;
          }

          .cta-section {
            padding: 3rem 1rem;
          }

          .cta-section h2 {
            font-size: 1.6rem;
          }

          .cta-btn {
            padding: 0.8rem 2.5rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 0.9rem;
          }

          .header-image-container {
            width: 95%;
            height: 30vh;
            min-height: 200px;
            max-height: 300px;
          }

          .header-image-inner {
            height: 140%;
            top: -20%;
          }

          .intro-text {
            font-size: 0.9rem;
          }

          .intro-text.highlight {
            font-size: 0.95rem;
          }

          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }

          .feature-card {
            padding: 1rem;
          }

          .feature-icon {
            font-size: 2rem;
          }

          .feature-card h3 {
            font-size: 0.95rem;
          }

          .feature-card p {
            font-size: 0.8rem;
          }

          .section-text h2 {
            font-size: 1.2rem;
          }

          .section-text p {
            font-size: 0.9rem;
          }

          .section-text .highlight-text {
            font-size: 0.95rem;
            padding: 0.75rem;
          }

          .extras-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }

          .extra-item {
            font-size: 0.75rem;
            padding: 0.6rem 0.8rem;
          }

          .extra-emoji {
            font-size: 1rem;
          }

          .anfrage-btn {
            padding: 0.5rem 1.6rem;
            font-size: 0.85rem;
          }

          .cta-section h2 {
            font-size: 1.3rem;
          }

          .cta-section p {
            font-size: 0.9rem;
          }

          .cta-btn {
            padding: 0.6rem 2rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}