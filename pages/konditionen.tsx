import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  Clock,
  Calendar,
  Users,
  GlassWater,
  Music,
  Sofa,
  Coffee,
  Umbrella,
  Moon,
  Sparkles,
  Mail,
} from 'lucide-react';

export default function Konditionen() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [imageLoaded, setImageLoaded] = useState(false);
  const mieteRef = useRef<HTMLDivElement>(null);
  const umsatzRef = useRef<HTMLDivElement>(null);
  const angebotRef = useRef<HTMLDivElement>(null);
  const reservationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setImageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections((prev) => new Set(prev).add(sectionId));
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const refs = [mieteRef, umsatzRef, angebotRef, reservationRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="konditionen-page">
      {/* Hero */}
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <Image
            src="/img/konditionen/konditionen1.webp"
            alt="Salotto Location Konditionen"
            fill
            className={`hero-image ${imageLoaded ? 'loaded' : ''}`}
            style={{ objectFit: 'cover' }}
            quality={90}
            priority
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <p className="hero-eyebrow">Salotto Zürich</p>
              <h1 className="hero-title">Konditionen &amp; Preise</h1>
              <p className="hero-subtitle">
                Alles was Du für Deinen Event wissen musst
              </p>
              <div className="hero-line"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        {/* MIETE */}
        <div
          ref={mieteRef}
          data-section="miete"
          className={`section ${visibleSections.has('miete') ? 'visible' : ''}`}
        >
          <div className="section-heading">
            <span className="section-eyebrow">01 — Miete</span>
            <h2 className="section-title">Miete</h2>
          </div>

          <div className="card-grid">
            <div className="card card-1">
              <div className="card-header">
                <span className="card-icon">
                  <Calendar size={26} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                </span>
                <h3>Tagesmiete Wochentags</h3>
              </div>
              <p className="card-text">
                Falls du deinen Event an einem Werktag machen möchtest, stellen
                wir für dich eine{' '}
                <span className="highlight">individuelle Offerte</span> zusammen!
              </p>
              <div className="card-badge">
                <Clock size={16} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                <span className="badge-text">Bis 22.00 Uhr</span>
              </div>
            </div>

            <div className="card card-2">
              <div className="card-header">
                <span className="card-icon">
                  <Moon size={26} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                </span>
                <h3>Abendmiete – am Wochenende</h3>
              </div>
              <p className="card-text">
                Zwischen <span className="highlight">17.00 bis 04.00 Uhr</span>{' '}
                – maximal 8 Stunden
              </p>
              <div className="card-details">
                <div className="detail-item">
                  <Clock size={18} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                  <span className="detail-text">Maximal 8 Stunden</span>
                </div>
                <div className="detail-item">
                  <GlassWater size={18} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                  <span className="detail-text">
                    Getränke ausschliesslich an der Bar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MINDESTUMSATZ */}
        <div
          ref={umsatzRef}
          data-section="umsatz"
          className={`section ${visibleSections.has('umsatz') ? 'visible' : ''}`}
        >
          <div className="section-heading">
            <span className="section-eyebrow">02 — Mindestumsatz</span>
            <h2 className="section-title">Mindestumsatz</h2>
          </div>

          <div className="umsatz-card">
            <p className="umsatz-text">
              Der Mindestumsatz beträgt{' '}
              <span className="highlight highlight-strong">
                CHF 250 / Stunde
              </span>{' '}
              (nur Getränke)
            </p>

            <div className="umsatz-grid">
              <div className="umsatz-item">
                <span className="hours">6 Std</span>
                <span className="price">CHF 1'500.-</span>
              </div>
              <div className="umsatz-item">
                <span className="hours">7 Std</span>
                <span className="price">CHF 1'750.-</span>
              </div>
              <div className="umsatz-item">
                <span className="hours">8 Std</span>
                <span className="price">CHF 2'000.-</span>
              </div>
            </div>

            <div className="umsatz-footer">
              <span className="highlight">Lokal-Reinigung CHF 100.-</span>
            </div>
          </div>
        </div>

        {/* ANGEBOT */}
        <div
          ref={angebotRef}
          data-section="angebot"
          className={`section ${visibleSections.has('angebot') ? 'visible' : ''}`}
        >
          <div className="section-heading">
            <span className="section-eyebrow">03 — Inklusive</span>
            <h2 className="section-title">Angebot</h2>
          </div>

          <div className="angebot-grid">
            <div className="angebot-item">
              <Sparkles size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Exklusive Nutzung der gesamten Location</span>
            </div>
            <div className="angebot-item">
              <Users size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Bis zu 60 Personen – perfekt für kleine &amp; mittlere Feiern</span>
            </div>
            <div className="angebot-item">
              <GlassWater size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Professioneller Barbetrieb</span>
            </div>
            <div className="angebot-item">
              <Music size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Professionelle Musikanlage – perfekte Party-Atmosphäre</span>
            </div>
            <div className="angebot-item">
              <Sofa size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Individuelle Möblierung – flexibel nach Deinen Wünschen</span>
            </div>
            <div className="angebot-item">
              <Coffee size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Ausgesuchte Getränke- und Cocktailauswahl</span>
            </div>
            <div className="angebot-item">
              <Umbrella size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Gedeckter Aussenbereich – bei jedem Wetter</span>
            </div>
            <div className="angebot-item">
              <Moon size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span>Verlängerte Nachtbewilligung am Wochenende</span>
            </div>
          </div>

          <div className="party-info">
            <h4>Party-Info</h4>
            <div className="party-details">
              <div className="party-detail">
                <Clock size={18} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                <span className="party-text">Letzte Runde 3.30 Uhr</span>
              </div>
              <div className="party-detail">
                <Clock size={18} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                <span className="party-text">½ Stunde vorher einrichten</span>
              </div>
              <div className="party-detail">
                <Clock size={18} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                <span className="party-text">Party max. 8 Stunden</span>
              </div>
            </div>
          </div>

          <div className="highlight-box">
            <p>
              <span className="highlight highlight-strong">Keine Mietkosten</span>{' '}
              – nur zahlen, was Du konsumierst
            </p>
            <p>
              <span className="highlight highlight-strong">Catering auf Anfrage</span>{' '}
              – rundum sorglos feiern
            </p>
          </div>
        </div>

        {/* RESERVATION */}
        <div
          ref={reservationRef}
          data-section="reservation"
          className={`section reservation-section ${
            visibleSections.has('reservation') ? 'visible' : ''
          }`}
        >
          <div className="section-heading">
            <span className="section-eyebrow">04 — Kontakt</span>
            <h2 className="section-title">Reservation</h2>
          </div>

          <div className="reservation-content">
            <p className="reservation-text">
              Wir freuen uns, Dir unsere Möglichkeiten in unserem Eventlokal zu
              zeigen. Kommt anschliessend eine definitive Buchung zustande,
              senden wir Dir per E-Mail die Reservationsdetails.
            </p>
            <p className="reservation-text">
              Vereinbare jetzt einen Termin mit{' '}
              <span className="highlight">Marcos</span>, um das Salotto Zürich
              kennenzulernen. Wir freuen uns sehr, einen Anlass nach Deinen
              persönlichen Wünschen zu organisieren und durchzuführen.
            </p>
            <p className="reservation-text">
              Gerne stehen wir Dir für sämtliche weiteren Fragen zur Verfügung.
            </p>

            <div className="contact-buttons">
              <a href="/jetztmieten" className="contact-button primary">
                <Mail size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                <span>Offerte Anfragen</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ============ BASE ============ */
        .konditionen-page {
          background: #000;
          min-height: 100vh;
          color: #fff;
          padding-top: 9rem;
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
          margin-bottom: 1rem;
          animation: fadeInDown 1s ease-out 0.2s both;
        }

        .hero-title {
          font-size: clamp(2rem, 5.5vw, 4.5rem);
          font-weight: 500;
          letter-spacing: 2px;
          line-height: 1.05;
          margin: 0 0 1.2rem;
          color: #fff;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
          animation: heroReveal 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.5px;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
          animation: fadeInUp 1.2s ease-out 0.6s both;
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
          margin: 1.8rem auto 0;
          animation: lineGrow 1s ease-out 0.9s both;
        }

        @keyframes heroReveal {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.96);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lineGrow {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 70px;
            opacity: 1;
          }
        }

        /* ============ CONTENT ============ */
        .content-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 4rem 2rem 5rem;
        }

        .section {
          margin-bottom: 5rem;
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section:last-child {
          margin-bottom: 0;
        }

        /* Heading con eyebrow + línea animada */
        .section-heading {
          margin-bottom: 2.5rem;
          position: relative;
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.6rem;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }

        .section.visible .section-eyebrow {
          opacity: 1;
          transform: translateX(0);
        }

        .section-title {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 500;
          letter-spacing: 1.5px;
          color: #fff;
          margin: 0;
          padding-bottom: 1.2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s;
        }

        .section.visible .section-title {
          opacity: 1;
          transform: translateY(0);
        }

        /* Línea que crece bajo el título al aparecer */
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
          transition: width 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
        }

        .section.visible .section-title::after {
          width: 80px;
        }

        /* ============ CARDS (MIETE) ============ */
        .card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .card {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 2rem;
          transition: background 0.4s ease, border-color 0.4s ease,
            box-shadow 0.4s ease, transform 0.4s ease;
          opacity: 0;
          transform: translateY(40px) scale(0.97);
        }

        .section.visible .card-1 {
          animation: cardPop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
        }
        .section.visible .card-2 {
          animation: cardPop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
        }

        @keyframes cardPop {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.4rem;
        }

        .card-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .card-header h3 {
          font-size: clamp(1.15rem, 1.6vw, 1.35rem);
          font-weight: 500;
          letter-spacing: 0.3px;
          color: #fff;
          line-height: 1.3;
          margin: 0;
        }

        .card-text {
          font-size: 1.02rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.88);
          margin: 0 0 1.3rem;
          font-weight: 400;
        }

        .highlight {
          color: #fff;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.08rem 0.45rem;
          border-radius: 5px;
          white-space: nowrap;
        }

        .highlight-strong {
          background: rgba(255, 214, 100, 0.14);
          color: #ffe08a;
          border: 1px solid rgba(255, 214, 100, 0.22);
        }

        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.55rem 1.1rem;
          border-radius: 999px;
          font-size: 0.92rem;
          font-weight: 500;
        }

        .badge-text {
          color: #fff;
        }

        .card-details {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-top: 1.2rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.98rem;
          font-weight: 400;
        }

        .detail-text {
          color: rgba(255, 255, 255, 0.9);
        }

        /* ============ UMSATZ ============ */
        .umsatz-card {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 2.2rem;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s,
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
        }

        .section.visible .umsatz-card {
          opacity: 1;
          transform: translateY(0);
        }

        .umsatz-text {
          font-size: clamp(1.05rem, 1.7vw, 1.3rem);
          color: rgba(255, 255, 255, 0.95);
          text-align: center;
          margin: 0 0 2rem;
          font-weight: 400;
          line-height: 1.6;
        }

        .umsatz-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.6rem;
        }

        .umsatz-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.4rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: background 0.35s ease, transform 0.35s ease,
            border-color 0.35s ease;
          opacity: 0;
          transform: translateY(20px);
        }

        .section.visible .umsatz-item {
          animation: itemRise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .section.visible .umsatz-item:nth-child(1) { animation-delay: 0.45s; }
        .section.visible .umsatz-item:nth-child(2) { animation-delay: 0.55s; }
        .section.visible .umsatz-item:nth-child(3) { animation-delay: 0.65s; }

        @keyframes itemRise {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .umsatz-item:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-3px);
        }

        .umsatz-item .hours {
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 0.5rem;
        }

        .umsatz-item .price {
          font-size: clamp(1.3rem, 2.2vw, 1.7rem);
          color: #fff;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .umsatz-footer {
          text-align: center;
          padding-top: 1.6rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 1rem;
        }

        /* ============ ANGEBOT ============ */
        .angebot-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .angebot-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 1.2rem;
          background: rgba(255, 255, 255, 0.035);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.35s ease, transform 0.35s ease,
            border-color 0.35s ease;
          opacity: 0;
          transform: translateX(-24px);
        }

        .section.visible .angebot-item {
          animation: itemSlide 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .section.visible .angebot-item:nth-child(1) { animation-delay: 0.25s; }
        .section.visible .angebot-item:nth-child(2) { animation-delay: 0.33s; }
        .section.visible .angebot-item:nth-child(3) { animation-delay: 0.41s; }
        .section.visible .angebot-item:nth-child(4) { animation-delay: 0.49s; }
        .section.visible .angebot-item:nth-child(5) { animation-delay: 0.57s; }
        .section.visible .angebot-item:nth-child(6) { animation-delay: 0.65s; }
        .section.visible .angebot-item:nth-child(7) { animation-delay: 0.73s; }
        .section.visible .angebot-item:nth-child(8) { animation-delay: 0.81s; }

        @keyframes itemSlide {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .angebot-item:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.14);
          transform: translateX(6px);
        }

        .angebot-item span {
          font-size: 1rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.92);
          font-weight: 400;
        }

        .party-info {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 1.6rem 2rem;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s;
        }

        .section.visible .party-info {
          opacity: 1;
          transform: translateY(0);
        }

        .party-info h4 {
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          margin: 0 0 1.1rem;
        }

        .party-details {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .party-detail {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1rem;
        }

        .party-text {
          color: rgba(255, 255, 255, 0.9);
        }

        .highlight-box {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          padding: 1.7rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          text-align: center;
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s;
        }

        .section.visible .highlight-box {
          opacity: 1;
          transform: scale(1);
        }

        .highlight-box p {
          font-size: 1.08rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 400;
          margin: 0;
          line-height: 1.6;
        }

        /* ============ RESERVATION ============ */
        .reservation-section {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 2.5rem;
        }

        .reservation-content {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }

        .section.visible .reservation-content {
          opacity: 1;
          transform: translateY(0);
        }

        .reservation-text {
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.88);
          margin-bottom: 1.4rem;
          font-weight: 400;
        }

        .reservation-text:last-of-type {
          margin-bottom: 0;
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .contact-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 2.2rem;
          border-radius: 10px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          transition: background 0.3s ease, transform 0.3s ease,
            box-shadow 0.3s ease, border-color 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .contact-button.primary {
          background: rgba(255, 255, 255, 0.09);
          color: #fff;
        }

        .contact-button.primary:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.28);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
        }

        .contact-button span {
          color: #fff;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 1024px) {
          .content-container {
            padding: 3rem 1.5rem 4rem;
          }
          .section {
            margin-bottom: 4rem;
          }
        }

        @media (max-width: 768px) {
          .konditionen-page {
            padding-top: 8rem;
          }

          .hero-image-container {
            height: 45vh;
            min-height: 320px;
          }

          .hero-eyebrow {
            letter-spacing: 4px;
            font-size: 0.7rem;
          }

          .content-container {
            padding: 2.5rem 1.2rem 3rem;
          }

          .section {
            margin-bottom: 3.5rem;
          }

          .section-heading {
            margin-bottom: 1.8rem;
          }

          .card-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }

          .card {
            padding: 1.6rem;
          }

          .umsatz-card {
            padding: 1.5rem;
          }

          .umsatz-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .angebot-grid {
            grid-template-columns: 1fr;
          }

          .party-info {
            padding: 1.4rem;
          }

          .contact-buttons {
            flex-direction: column;
          }

          .contact-button {
            justify-content: center;
            width: 100%;
          }

          .reservation-section {
            padding: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .konditionen-page {
            padding-top: 6rem;
          }

          .hero-image-container {
            height: 38vh;
            min-height: 260px;
          }

          .content-container {
            padding: 2rem 1rem 2.5rem;
          }

          .card {
            padding: 1.3rem;
          }

          .card-header {
            gap: 0.8rem;
            margin-bottom: 1.1rem;
          }

          .card-icon {
            width: 44px;
            height: 44px;
          }

          .umsatz-item .price {
            font-size: 1.35rem;
          }

          .reservation-section {
            padding: 1.4rem;
          }
        }

        /* Accesibilidad: sin animaciones si el usuario lo pide */
        @media (prefers-reduced-motion: reduce) {
          .hero-image,
          .hero-title,
          .hero-subtitle,
          .hero-line,
          .hero-eyebrow,
          .section,
          .card,
          .umsatz-card,
          .umsatz-item,
          .angebot-item,
          .party-info,
          .highlight-box,
          .reservation-content,
          .section-title,
          .section-title::after,
          .section-eyebrow {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .section-title::after {
            width: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}