import Image from 'next/image';
import { useRef, useEffect } from 'react';

export default function Firmenevents() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.2; // Velocidad del parallax
        imageRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="firmenevents-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Firmenevents</h1>
          <p>Du kümmerst dich ums Feiern – wir übernehmen den Rest</p>
          <div className="hero-line"></div>
        </div>
      </div>

      {/* Header Image con Parallax - 75% width */}
      <div className="header-image-wrapper">
        <div className="header-image-container">
          <div className="header-image-inner" ref={imageRef}>
            <Image
              src="/img/event-1.png"
              alt="Salotto Restaurant"
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="header-image"
            />
          </div>
          <div className="header-image-overlay"></div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="intro-section">
        <p className="intro-text">
          Das <strong>Salotto</strong> bietet dir ein All-in-One-Eventlocation-Paket für erfolgreiche Firmenevents. 
          Ob Team-Event, Kundenanlass oder Firmenfeier – unsere stilvolle Location schafft den perfekten Rahmen 
          für unvergessliche Veranstaltungen. Vom entspannten Apéro bis zur ausgelassenen Party feiern Unternehmen 
          bei uns unkompliziert und in besonderer Atmosphäre.
        </p>
      </div>

      {/* Event Types Grid */}
      <div className="event-types">
        <h2>Ideal für folgende Firmenevents</h2>
        <div className="event-grid">
          {[
            'Weihnachtsfeier',
            'Sommerfest für Unternehmen',
            'After-Work-Party',
            'Teambuilding Event',
            'Produktpräsentation / Product Launch',
            'Networking Event',
            'Kick-off Meeting (in lockerer Atmosphäre)',
            'Kundenanlass / Kunden-Event',
            'Mitarbeiterevent / Staff Event',
            'Firmeninterner Anlass',
            'Corporate Staff Event',
            'Employee Event',
          ].map((event, index) => (
            <div key={index} className="event-tag">
              {event}
            </div>
          ))}
        </div>
      </div>

      {/* Anfrage Section + Image */}
      <div className="section-with-image reverse">
        <div className="section-text">
          <h2>Unverbindliche Anfrage senden</h2>
          <p>
            Unser engagiertes Team begleitet dich von der Planung bis zur reibungslosen Durchführung – 
            exakt nach deinen Vorstellungen.
          </p>
          <button className="anfrage-btn">Jetzt Anfrage senden</button>
        </div>
        <div className="section-image">
          <Image
            src="/img/event-2.jpg"
            alt="Event Planung"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Zeiten & Optionen */}
      <div className="times-section">
        <h2>Unsere Zeiten & Optionen im Überblick</h2>
        <div className="times-grid">
          <div className="time-card">
            <h3>Wochentags (Tagesmiete)</h3>
            <p>Die Location steht dir bis <strong>22:00 Uhr</strong> zur Verfügung.</p>
          </div>
          <div className="time-card">
            <h3>Wochenende</h3>
            <p>Feiere mit deinen Gästen <strong>open end</strong>!</p>
          </div>
        </div>
      </div>

      {/* Konditionen + Image */}
      <div className="section-with-image">
        <div className="section-text">
          <h2>Keine Raummiete, voller Fokus auf dein Event!</h2>
          <p>
            Bei uns mietest du die Location exklusiv, aber ohne klassische Mietkosten – du zahlst nur, 
            was du und deine Gäste auch wirklich konsumieren. Wir arbeiten stattdessen mit einer fairen 
            <strong> Mindestkonsumation</strong>. Wird dieser Mindestumsatz am Ende des Events nicht erreicht, 
            verrechnen wir lediglich die Differenz.
          </p>
        </div>
        <div className="section-image">
          <Image
            src="/img/event-3.png"
            alt="Event Konditionen"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Apéro Angebot */}
      <div className="apero-section">
        <h2>Wirf einen Blick auf unser aktuelles Apéro-Angebot!</h2>
        <p>
          Hast du für deinen Apéro oder Apéro Riche ganz eigene Ideen oder spezielle Wünsche? 
          Kontaktiere uns einfach.
        </p>
        <button className="apero-btn">Zum Apéro-Angebot</button>
      </div>

      <style jsx>{`
        .firmenevents-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 8rem;
          color: #ffffff;
        }

        /* Hero */
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

        .hero-line {
          width: 50px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          margin: 1rem auto 0;
        }

        /* Header Image - 65% width con Parallax */
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
          height: 120%; /* Más altura para el efecto parallax */
          top: -10%;
          will-change: transform;
          transition: none;
        }

        .header-image {
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
            rgba(0, 0, 0, 0.3) 0%,
            transparent 50%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Intro Section */
        .intro-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .intro-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .intro-text strong {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Section with Image */
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

        .section-text p strong {
          color: rgba(255, 255, 255, 0.9);
        }

        .section-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #1a1a1a;
        }

        .section-image img {
          transition: transform 0.5s ease;
        }

        .section-image:hover img {
          transform: scale(1.03);
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
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.02);
        }

        /* Event Types */
        .event-types {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .event-types h2 {
          font-size: 1.8rem;
          font-weight: 300;
          letter-spacing: 2px;
          text-align: center;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .event-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.6rem;
        }

        .event-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .event-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        /* Times */
        .times-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .times-section h2 {
          font-size: 1.8rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .times-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .time-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 2rem 1.5rem;
          transition: all 0.3s ease;
        }

        .time-card:hover {
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
        }

        .time-card h3 {
          font-size: 1.2rem;
          font-weight: 400;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .time-card p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .time-card strong {
          color: rgba(255, 255, 255, 0.8);
        }

        /* Apéro */
        .apero-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem 4rem;
          text-align: center;
        }

        .apero-section h2 {
          font-size: 1.6rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .apero-section p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .apero-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.7rem 2.2rem;
          border-radius: 50px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
        }

        .apero-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .header-image-container {
            width: 85%;
            height: 45vh;
            min-height: 300px;
            max-height: 500px;
          }

          .section-with-image {
            gap: 2rem;
            padding: 2rem 2rem;
          }

          .section-text h2 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .firmenevents-page {
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

          .event-types {
            padding: 2rem 1rem;
          }

          .event-types h2 {
            font-size: 1.4rem;
          }

          .event-tag {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }

          .times-section {
            padding: 2rem 1rem;
          }

          .times-section h2 {
            font-size: 1.4rem;
          }

          .times-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .time-card {
            padding: 1.5rem 1rem;
          }

          .anfrage-btn {
            padding: 0.6rem 2rem;
            font-size: 0.9rem;
          }

          .apero-section {
            padding: 2rem 1rem 3rem;
          }

          .apero-section h2 {
            font-size: 1.3rem;
          }

          .apero-section p {
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

          .section-text h2 {
            font-size: 1.2rem;
          }

          .section-text p {
            font-size: 0.9rem;
          }

          .event-types h2 {
            font-size: 1.2rem;
          }

          .event-tag {
            font-size: 0.7rem;
            padding: 0.3rem 0.8rem;
          }

          .times-section h2 {
            font-size: 1.2rem;
          }

          .time-card h3 {
            font-size: 1rem;
          }

          .time-card p {
            font-size: 0.85rem;
          }

          .anfrage-btn {
            padding: 0.5rem 1.6rem;
            font-size: 0.85rem;
          }

          .apero-section h2 {
            font-size: 1.1rem;
          }

          .apero-section p {
            font-size: 0.9rem;
          }

          .apero-btn {
            padding: 0.5rem 1.6rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}