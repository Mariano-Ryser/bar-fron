import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { 
  Clock, 
  Utensils, 
  Soup, 
  Salad, 
  Phone, 
  Calendar,
  Coffee,
  Users
} from 'lucide-react';

export default function Mittagessen() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const introRef = useRef<HTMLDivElement>(null);
  const warmeRef = useRef<HTMLDivElement>(null);
  const kalteRef = useRef<HTMLDivElement>(null);
  const reservationRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections(prev => new Set(prev).add(sectionId));
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const refs = [introRef, warmeRef, kalteRef, reservationRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleReservationClick = () => {
    window.location.href = 'tel:0762275543';
  };

  return (
    <div className="mittagessen-page">
      {/* Hero Image con Parallax y blur */}
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <div className="hero-image-inner" ref={imageRef}>
            <Image
              src="/img/mittag/mittag1.webp"
              alt="Mittagessen Salotto Zürich"
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
                Lunch Time
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                Mittagessen im Salotto
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`}></div>
              <p className={`hero-description ${isHeroVisible ? 'visible' : ''}`}>
                🍽️ Frisch, vielfältig & täglich wechselnd
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <div 
        ref={introRef}
        data-section="intro"
        className={`intro-section ${visibleSections.has('intro') ? 'visible' : ''}`}
      >
        <div className="intro-content">
          <p className="intro-text">
            Ob für eine schnelle Mittagspause, ein entspanntes Essen vor Ort oder zum Mitnehmen – 
            bei uns findet jeder etwas Passendes. Unsere Küche bietet täglich frische, 
            abwechslungsreiche Gerichte mit vegetarischen und fleischhaltigen Optionen.
          </p>
          <div className="intro-features">
            <div className="intro-feature">
              <Clock size={20} color="#ffffff" stroke="#ffffff" />
              <span className="feature-text">Täglich wechselndes Menü</span>
            </div>
            <div className="intro-feature">
              <Utensils size={20} color="#ffffff" stroke="#ffffff" />
              <span className="feature-text">Vegetarische & fleischhaltige Optionen</span>
            </div>
            <div className="intro-feature">
              <Coffee size={20} color="#ffffff" stroke="#ffffff" />
              <span className="feature-text">Vor Ort oder zum Mitnehmen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warme Küche Section */}
      <div 
        ref={warmeRef}
        data-section="warme"
        className={`section-with-image ${visibleSections.has('warme') ? 'visible' : ''}`}
      >
        <div className="section-text">
          <h2>
            <Soup size={28} color="#ffd700" stroke="#ffd700" style={{ display: 'inline-block', marginRight: '0.75rem' }} />
            Warme Küche
          </h2>
          <div className="menu-items">
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Penne Bolognese, Pomodoro oder Pesto</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Vegetarisches Thai Curry</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Thai Curry mit Poulet</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Chili con Carne</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Tagessuppe</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Gnocchi (Pomodoro oder Bolognese)</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Wochenravioli (vegetarisch)</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Tagesmenü vegetarisch oder mit Fleisch</span>
            </div>
          </div>
        </div>
        <div className="section-image">
          <Image
            src="/img/mittag/mittag3.webp"
            alt="Warme Küche Salotto"
            fill
            style={{ objectFit: 'cover' }}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Kalte Küche Section */}
      <div 
        ref={kalteRef}
        data-section="kalte"
        className={`section-with-image reverse ${visibleSections.has('kalte') ? 'visible' : ''}`}
      >
        <div className="section-text">
          <h2>
            <Salad size={28} color="#ffd700" stroke="#ffd700" style={{ display: 'inline-block', marginRight: '0.75rem' }} />
            Kalte Küche
          </h2>
          <p className="section-subtitle">Unsere saisonal wechselnden Sommersalate</p>
          <div className="menu-items">
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Griechischer Salat</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Linsen-Gemüse-Salat</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Taboulé-Salat (vegetarisch oder mit Chicken)</span>
            </div>
            <div className="menu-item">
              <span className="menu-dot">•</span>
              <span className="menu-text">Caesar Salat</span>
            </div>
          </div>
        </div>
        <div className="section-image">
          <Image
            src="/img/mittag/mittag2.webp"
            alt="Kalte Küche Salotto"
            fill
            style={{ objectFit: 'cover' }}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Reservation Section */}
      <div 
        ref={reservationRef}
        data-section="reservation"
        className={`reservation-section ${visibleSections.has('reservation') ? 'visible' : ''}`}
      >
        <div className="reservation-content">
          <div className="reservation-icon-wrapper">
            <Phone size={40} color="#ffd700" stroke="#ffd700" />
          </div>
          <h2>Tischreservationen</h2>
          <p className="reservation-text">
            Reservationen für das Mittagessen nehmen wir gerne telefonisch am selben Tag entgegen.
          </p>
          <div className="reservation-details">
            <div className="reservation-detail">
              <Clock size={18} color="#ffffff" stroke="#ffffff" />
              <span className="detail-text">Mo–Fr, 9–17 Uhr</span>
            </div>
            <div className="reservation-detail">
              <Phone size={18} color="#ffffff" stroke="#ffffff" />
              <span className="detail-text">076 227 55 43</span>
            </div>
          </div>
          <button 
            onClick={handleReservationClick} 
            className="reservation-btn"
          >
            <Phone size={20} color="#ffffff" stroke="#ffffff" />
            <span className="btn-text">Jetzt anrufen</span>
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        data-section="cta"
        className={`cta-section ${visibleSections.has('cta') ? 'visible' : ''}`}
      >
        <h2>Lust auf Mittagessen?</h2>
        <p>Besuche uns in Zürich oder bestelle zum Mitnehmen</p>
        <div className="cta-buttons">
          <button onClick={handleReservationClick} className="cta-btn primary">
            <Phone size={20} color="#ffffff" stroke="#ffffff" />
            <span className="btn-text">Reservieren</span>
          </button>
          <a href="/kontakt" className="cta-btn secondary">
            <span className="btn-text">Kontakt aufnehmen</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .mittagessen-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 0;
          color: #ffffff;
        }

        /* ===== HERO IMAGE con Parallax ===== */
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
          background: rgba(255, 215, 0, 0.5);
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

        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 215, 0, 0.7);
          font-weight: 300;
          margin-top: 1rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 1.2s, transform 0.8s ease 1.2s;
        }

        .hero-description.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== INTRO ===== */
        .intro-section {
          max-width: 900px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .intro-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .intro-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 2rem;
        }

        .intro-features {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .intro-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
        }

        .feature-text {
          color: #ffffff;
        }

        .intro-feature svg {
          flex-shrink: 0;
        }

        /* ===== SECTION WITH IMAGE ===== */
        .section-with-image {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section-with-image.visible {
          opacity: 1;
          transform: translateY(0);
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
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s ease 0.3s;
        }

        .section-with-image.visible .section-text {
          opacity: 1;
          transform: translateX(0);
        }

        .section-with-image.reverse .section-text {
          transform: translateX(30px);
        }

        .section-with-image.reverse.visible .section-text {
          transform: translateX(0);
        }

        .section-text h2 {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          color: #ffffff;
          display: flex;
          align-items: center;
        }

        .section-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
        }

        .menu-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          padding: 0.25rem 0;
        }

        .menu-text {
          color: #ffffff;
        }

        .menu-dot {
          color: #ffd700;
          font-size: 1.2rem;
        }

        .section-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #1a1a1a;
          border-radius: 12px;
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.8s ease 0.5s;
        }

        .section-with-image.visible .section-image {
          opacity: 1;
          transform: scale(1);
        }

        .section-image img {
          transition: transform 0.6s ease;
        }

        .section-image:hover img {
          transform: scale(1.05);
        }

        /* ===== RESERVATION ===== */
        .reservation-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .reservation-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reservation-icon-wrapper {
          margin-bottom: 1.5rem;
        }

        .reservation-section h2 {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 2px;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .reservation-text {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .reservation-details {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .reservation-detail {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.05rem;
        }

        .detail-text {
          color: #ffffff;
        }

        .reservation-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
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

        .reservation-btn:hover {
          background: rgba(255, 215, 0, 0.25);
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.02);
        }

        .btn-text {
          color: #ffffff;
        }

        /* ===== CTA ===== */
        .cta-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-section h2 {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.05rem;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2.5rem;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-btn.primary {
          background: rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.3);
          color: #ffffff;
        }

        .cta-btn.primary:hover {
          background: rgba(255, 215, 0, 0.25);
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.02);
        }

        .cta-btn.secondary {
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
        }

        .cta-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .cta-btn .btn-text {
          color: #ffffff;
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

          .section-with-image {
            gap: 2rem;
            padding: 3rem 2rem;
          }

          .section-text h2 {
            font-size: 1.5rem;
          }

          .intro-features {
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-image-container {
            height: 40vh;
            min-height: 300px;
            max-height: 400px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .intro-section {
            padding: 3rem 1.5rem;
          }

          .intro-text {
            font-size: 0.95rem;
          }

          .intro-features {
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
          }

          .section-with-image {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 3rem 1.5rem;
          }

          .section-with-image.reverse {
            direction: ltr;
          }

          .section-with-image.reverse .section-text {
            transform: translateX(-30px);
          }

          .section-with-image.reverse.visible .section-text {
            transform: translateX(0);
          }

          .section-image {
            aspect-ratio: 16/10;
          }

          .section-text h2 {
            font-size: 1.4rem;
          }

          .menu-item {
            font-size: 0.95rem;
          }

          .reservation-section {
            padding: 3rem 1.5rem;
          }

          .reservation-section h2 {
            font-size: 1.6rem;
          }

          .reservation-details {
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
          }

          .reservation-btn {
            padding: 0.8rem 2rem;
            font-size: 0.95rem;
          }

          .cta-section {
            padding: 3rem 1.5rem;
          }

          .cta-section h2 {
            font-size: 1.6rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            justify-content: center;
            padding: 0.8rem 2rem;
            font-size: 0.95rem;
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
            letter-spacing: 2px;
          }

          .hero-subtitle {
            font-size: 0.9rem;
          }

          .hero-description {
            font-size: 0.9rem;
          }

          .intro-text {
            font-size: 0.9rem;
          }

          .intro-feature {
            font-size: 0.9rem;
          }

          .section-text h2 {
            font-size: 1.2rem;
          }

          .menu-item {
            font-size: 0.85rem;
          }

          .reservation-section h2 {
            font-size: 1.3rem;
          }

          .reservation-text {
            font-size: 0.95rem;
          }

          .reservation-detail {
            font-size: 0.95rem;
          }

          .reservation-btn {
            padding: 0.6rem 1.6rem;
            font-size: 0.85rem;
          }

          .cta-section h2 {
            font-size: 1.3rem;
          }

          .cta-section p {
            font-size: 0.9rem;
          }

          .cta-btn {
            font-size: 0.85rem;
            padding: 0.6rem 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}