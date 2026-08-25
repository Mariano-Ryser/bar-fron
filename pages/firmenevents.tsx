import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export default function Firmenevents() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const introRef = useRef<HTMLDivElement>(null);
  const eventTypesRef = useRef<HTMLDivElement>(null);
  const anfrageRef = useRef<HTMLDivElement>(null);
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

    const refs = [introRef, eventTypesRef, anfrageRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleAnfrageClick = () => {
    router.push('/jetztmieten');
  };

  const eventTypes = [
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
  ];

  return (
    <div className="firmenevents-page">
      {/* Hero Image con Parallax y blur - 100% width */}
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <div className="hero-image-inner" ref={imageRef}>
            <Image
              src="/img/event-1.png"
              alt="Firmenevents Salotto Zürich"
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
                Firmenevents
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                Du kümmerst dich ums Feiern – wir übernehmen den Rest
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`}></div>
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
            Das <strong>Salotto</strong> bietet dir ein All-in-One-Eventlocation-Paket für erfolgreiche Firmenevents. 
            Ob Team-Event, Kundenanlass oder Firmenfeier – unsere stilvolle Location schafft den perfekten Rahmen 
            für unvergessliche Veranstaltungen. Vom entspannten Apéro bis zur ausgelassenen Party feiern Unternehmen 
            bei uns unkompliziert und in besonderer Atmosphäre.
          </p>
        </div>
      </div>

      {/* Event Types Grid */}
      <div 
        ref={eventTypesRef}
        data-section="eventTypes"
        className={`event-types ${visibleSections.has('eventTypes') ? 'visible' : ''}`}
      >
        <h2>Ideal für folgende Firmenevents</h2>
        <div className="event-grid">
          {eventTypes.map((event, index) => (
            <div key={index} className={`event-tag tag-${index + 1}`}>
              {event}
            </div>
          ))}
        </div>
      </div>

      {/* Anfrage Section + Image */}
      <div 
        ref={anfrageRef}
        data-section="anfrage"
        className={`section-with-image ${visibleSections.has('anfrage') ? 'visible' : ''}`}
      >
        <div className="section-text">
          <h2>Unverbindliche Anfrage senden</h2>
          <p>
            Unser engagiertes Team begleitet dich von der Planung bis zur reibungslosen Durchführung – 
            exakt nach deinen Vorstellungen.
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
            src="/img/event-2.jpg"
            alt="Event Planung"
            fill
            style={{ objectFit: 'cover' }}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        data-section="cta"
        className={`cta-section ${visibleSections.has('cta') ? 'visible' : ''}`}
      >
        <h2>Bereit für Dein Firmenevent?</h2>
        <p>Wir beraten Dich gerne persönlich</p>
        <button 
          onClick={handleAnfrageClick} 
          className="cta-btn"
        >
          Jetzt Anfragen
        </button>
      </div>

      <style jsx>{`
        .firmenevents-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 0;
          color: #ffffff;
        }

        /* ===== HERO IMAGE con Parallax - 100% ===== */
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

        /* ===== INTRO ===== */
        .intro-section {
          max-width: 800px;
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
          margin: 0;
        }

        .intro-text strong {
          color: rgba(255, 255, 255, 0.9);
        }

        /* ===== EVENT TYPES ===== */
        .event-types {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .event-types.visible {
          opacity: 1;
          transform: translateY(0);
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
          gap: 0.75rem;
        }

        .event-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
          opacity: 0;
          transform: scale(0.9);
        }

        .event-types.visible .event-tag {
          animation: tagFadeIn 0.5s ease-out both;
        }

        .event-types.visible .tag-1 { animation-delay: 0.05s; }
        .event-types.visible .tag-2 { animation-delay: 0.10s; }
        .event-types.visible .tag-3 { animation-delay: 0.15s; }
        .event-types.visible .tag-4 { animation-delay: 0.20s; }
        .event-types.visible .tag-5 { animation-delay: 0.25s; }
        .event-types.visible .tag-6 { animation-delay: 0.30s; }
        .event-types.visible .tag-7 { animation-delay: 0.35s; }
        .event-types.visible .tag-8 { animation-delay: 0.40s; }
        .event-types.visible .tag-9 { animation-delay: 0.45s; }
        .event-types.visible .tag-10 { animation-delay: 0.50s; }
        .event-types.visible .tag-11 { animation-delay: 0.55s; }
        .event-types.visible .tag-12 { animation-delay: 0.60s; }

        @keyframes tagFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .event-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          transform: scale(1.05);
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

        .section-text {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s ease 0.3s;
        }

        .section-with-image.visible .section-text {
          opacity: 1;
          transform: translateX(0);
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
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease 0.7s;
        }

        .section-with-image.visible .anfrage-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .anfrage-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.02);
        }

        /* ===== CTA ===== */
        .cta-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
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
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.05rem;
          margin-bottom: 2rem;
        }

        .cta-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 1rem 3rem;
          border-radius: 50px;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
        }

        .cta-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.02);
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

          .intro-section {
            padding: 3rem 1.5rem;
          }

          .intro-text {
            font-size: 0.95rem;
          }

          .event-types {
            padding: 3rem 1.5rem;
          }

          .event-types h2 {
            font-size: 1.4rem;
          }

          .event-tag {
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }

          .section-with-image {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 3rem 1.5rem;
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

          .anfrage-btn {
            padding: 0.6rem 2rem;
            font-size: 0.9rem;
          }

          .cta-section {
            padding: 3rem 1.5rem;
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

          .intro-text {
            font-size: 0.9rem;
          }

          .event-types h2 {
            font-size: 1.2rem;
          }

          .event-tag {
            font-size: 0.75rem;
            padding: 0.3rem 0.8rem;
          }

          .section-text h2 {
            font-size: 1.2rem;
          }

          .section-text p {
            font-size: 0.9rem;
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