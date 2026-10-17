import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
              setVisibleSections((prev) => new Set(prev).add(sectionId));
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
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
      {/* HERO */}
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
              <p className={`hero-eyebrow ${isHeroVisible ? 'visible' : ''}`}>
                Salotto Zürich
              </p>
              <h1 className={`hero-title ${isHeroVisible ? 'visible' : ''}`}>
                Firmenevents
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                Du kümmerst dich ums Feiern – wir übernehmen den Rest
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`} />
            </div>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div
        ref={introRef}
        data-section="intro"
        className={`intro-section ${
          visibleSections.has('intro') ? 'visible' : ''
        }`}
      >
        <div className="intro-content">
          <p className="intro-text">
            Das <strong>Salotto</strong> bietet dir ein
            All-in-One-Eventlocation-Paket für erfolgreiche Firmenevents. Ob
            Team-Event, Kundenanlass oder Firmenfeier – unsere stilvolle
            Location schafft den perfekten Rahmen für unvergessliche
            Veranstaltungen. Vom entspannten Apéro bis zur ausgelassenen Party
            feiern Unternehmen bei uns unkompliziert und in besonderer
            Atmosphäre.
          </p>
        </div>
      </div>

      {/* EVENT TYPES */}
      <div
        ref={eventTypesRef}
        data-section="eventTypes"
        className={`event-types ${
          visibleSections.has('eventTypes') ? 'visible' : ''
        }`}
      >
        <span className="section-eyebrow center">Für jeden Anlass</span>
        <h2 className="section-title center">
          Ideal für folgende Firmenevents
        </h2>
        <div className="event-grid">
          {eventTypes.map((event, index) => (
            <div key={index} className="event-tag">
              {event}
            </div>
          ))}
        </div>
      </div>

      {/* ANFRAGE */}
      <div
        ref={anfrageRef}
        data-section="anfrage"
        className={`section-with-image ${
          visibleSections.has('anfrage') ? 'visible' : ''
        }`}
      >
        <div className="section-text">
          <span className="section-eyebrow">Kontakt</span>
          <h2 className="section-title">Unverbindliche Anfrage senden</h2>
          <p>
            Unser engagiertes Team begleitet dich von der Planung bis zur
            reibungslosen Durchführung – exakt nach deinen Vorstellungen.
          </p>
          <button onClick={handleAnfrageClick} className="anfrage-btn">
            <span className="span" >Jetzt Anfrage senden</span>
            <ArrowRight size={18} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
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

      {/* CTA */}
      <div
        ref={ctaRef}
        data-section="cta"
        className={`cta-section ${visibleSections.has('cta') ? 'visible' : ''}`}
      >
        <h2 className="cta-title">Bereit für Dein Firmenevent?</h2>
        <p className="cta-text">Wir beraten Dich gerne persönlich</p>
        <button onClick={handleAnfrageClick} className="cta-btn">
          <span className="span">Jetzt Anfragen</span>
          <ArrowRight size={18} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
        </button>
      </div>

      {/* QUICK LINKS */}
      <div className="quick-links-section">
        <div className="quick-links-container">
          <a href="/konditionen" className="quick-link">
            <span>Konditionen und Preise</span>
            <ArrowRight size={18} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </a>
          <a href="/jetztmieten" className="quick-link primary">
            <span>Jetzt mieten</span>
            <ArrowRight size={18} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </a>
        </div>
      </div>

      <style jsx>{`
        /* ============ BASE ============ */
        .firmenevents-page {
          background: #000;
          min-height: 100vh;
          color: #fff;
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
          padding: 3rem 4rem;
        }

        .hero-content {
          text-align: center;
          padding: 0;
          max-width: 900px;
          width: 100%;
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

        /* ============ INTRO ============ */
        .intro-section {
          max-width: 850px;
          margin: 0 auto;
          padding: 4.5rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .intro-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .intro-text {
          font-size: 1.1rem;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.88);
          margin: 0;
          font-weight: 400;
        }

        .intro-text strong {
          color: #fff;
          font-weight: 600;
        }

        /* ============ EVENT TYPES ============ */
        .event-types {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .event-types.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Eyebrow editorial */
        .section-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 0.8rem;
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
        }

        .event-types.visible .section-eyebrow,
        .section-with-image.visible .section-eyebrow {
          opacity: 1;
          transform: translateX(0);
        }

        .section-eyebrow.center {
          display: block;
          text-align: center;
          transform: translateY(-10px);
        }

        .event-types.visible .section-eyebrow.center {
          transform: translateY(0);
        }

        /* Títulos con subrayado animado */
        .section-title {
          font-size: clamp(1.6rem, 3vw, 2.3rem);
          font-weight: 500;
          letter-spacing: 1px;
          margin: 0 0 2rem;
          color: #fff;
          position: relative;
          padding-bottom: 1rem;
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s;
        }

        .event-types.visible .section-title,
        .section-with-image.visible .section-title {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
        }

        .section-title.center::after {
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(
            90deg,
            transparent,
            #fff,
            transparent
          );
        }

        .section-title:not(.center)::after {
          left: 0;
        }

        .event-types.visible .section-title::after,
        .section-with-image.visible .section-title::after {
          width: 90px;
        }

        /* Grid de tags */
        .event-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.85rem;
          margin-top: 1rem;
        }

        .event-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.7rem 1.4rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.88);
          transition: background 0.35s ease, border-color 0.35s ease,
            color 0.3s ease, transform 0.35s ease;
          opacity: 0;
          transform: scale(0.9) translateY(10px);
        }

        .event-types.visible .event-tag {
          animation: tagPop 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .event-types.visible .event-tag:nth-child(1) { animation-delay: 0.1s; }
        .event-types.visible .event-tag:nth-child(2) { animation-delay: 0.16s; }
        .event-types.visible .event-tag:nth-child(3) { animation-delay: 0.22s; }
        .event-types.visible .event-tag:nth-child(4) { animation-delay: 0.28s; }
        .event-types.visible .event-tag:nth-child(5) { animation-delay: 0.34s; }
        .event-types.visible .event-tag:nth-child(6) { animation-delay: 0.40s; }
        .event-types.visible .event-tag:nth-child(7) { animation-delay: 0.46s; }
        .event-types.visible .event-tag:nth-child(8) { animation-delay: 0.52s; }
        .event-types.visible .event-tag:nth-child(9) { animation-delay: 0.58s; }
        .event-types.visible .event-tag:nth-child(10) { animation-delay: 0.64s; }
        .event-types.visible .event-tag:nth-child(11) { animation-delay: 0.70s; }
        .event-types.visible .event-tag:nth-child(12) { animation-delay: 0.76s; }

        @keyframes tagPop {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .event-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.22);
          color: #fff;
          transform: translateY(-2px) scale(1.03);
        }

        /* ============ SECTION WITH IMAGE ============ */
        .section-with-image {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4.5rem 2rem;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .section-with-image.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section-with-image:last-of-type {
          border-bottom: none;
        }

        .section-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .section-text p {
          font-size: 1.08rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 1.8rem;
          font-weight: 400;
        }

        .anfrage-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #fff;
          padding: 1rem 2.4rem;
          border-radius: 50px;
          font-size: 1.02rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease, box-shadow 0.3s ease;
        }

        .anfrage-btn svg {
          transition: transform 0.3s ease;
        }

        .anfrage-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
        }

        .anfrage-btn:hover svg {
          transform: translateX(4px);
        }

        .section-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #1a1a1a;
          border-radius: 12px;
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 0.9s ease 0.45s,
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.45s;
        }

        .section-with-image.visible .section-image {
          opacity: 1;
          transform: scale(1);
        }

        .section-image :global(img) {
          transition: transform 0.7s ease;
        }

        .section-image:hover :global(img) {
          transform: scale(1.06);
        }

        /* ============ CTA ============ */
        .cta-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 4.5rem 2rem;
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .cta-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-title {
          font-size: clamp(1.7rem, 3vw, 2.3rem);
          font-weight: 500;
          letter-spacing: 1px;
          margin: 0 0 0.8rem;
          color: #fff;
          position: relative;
          display: inline-block;
          padding-bottom: 1rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }

        .cta-section.visible .cta-title {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-title::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, transparent, #fff, transparent);
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.55s;
        }

        .cta-section.visible .cta-title::after {
          width: 90px;
        }

        .cta-text {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.08rem;
          font-weight: 400;
          margin: 0 0 2.2rem;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 1rem 2.8rem;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: 0.8px;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease,
          transform 0.3s ease, box-shadow 0.3s ease;
        }
        .span{
          color: #fff;
        }

        .cta-btn svg {
          transition: transform 0.3s ease;
        }

        .cta-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
        }

        .cta-btn:hover svg {
          transform: translateX(4px);
        }

        /* ============ QUICK LINKS ============ */
        .quick-links-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 2rem 4.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .quick-links-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .quick-link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.045);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          text-decoration: none;
          transition: background 0.3s ease, border-color 0.3s ease,
            transform 0.3s ease, box-shadow 0.3s ease;
          font-weight: 400;
          font-size: 1rem;
          position: relative;
          overflow: hidden;
        }

        .quick-link::before {
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

        .quick-link:hover::before {
          transform: translateX(0);
        }

        .quick-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateX(5px);
        }

        .quick-link.primary {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.2);
          font-weight: 500;
        }

        .quick-link.primary:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateX(5px);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.05);
        }

        .quick-link svg {
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .quick-link:hover svg {
          transform: translateX(4px);
        }

        .quick-link span {
          position: relative;
          z-index: 1;
          color: #fff;
        }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 1024px) {
          .hero-image-container {
            height: 55vh;
            min-height: 380px;
            max-height: 540px;
          }

          .section-with-image {
            gap: 2.5rem;
            padding: 3.5rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .firmenevents-page {
            padding-top: 8rem;
          }

          .hero-image-container {
            height: 45vh;
            min-height: 320px;
            max-height: 460px;
          }

          .hero-overlay {
            padding: 2rem;
          }

          .hero-eyebrow {
            letter-spacing: 4px;
            font-size: 0.7rem;
          }

          .intro-section {
            padding: 3rem 1.4rem;
          }

          .intro-text {
            font-size: 1.02rem;
          }

          .event-types {
            padding: 3rem 1.4rem;
          }

          .event-tag {
            font-size: 0.92rem;
            padding: 0.55rem 1.1rem;
          }

          .section-with-image {
            grid-template-columns: 1fr;
            gap: 1.8rem;
            padding: 3rem 1.4rem;
          }

          .section-image {
            aspect-ratio: 16/10;
          }

          .section-text p {
            font-size: 1.02rem;
          }

          .anfrage-btn,
          .cta-btn {
            padding: 0.9rem 2rem;
            font-size: 0.98rem;
          }

          .cta-section {
            padding: 3rem 1.4rem;
          }

          .cta-text {
            font-size: 1rem;
          }

          .quick-links-section {
            padding: 1.5rem 1.4rem 3rem;
          }

          .quick-link {
            padding: 0.9rem 1.3rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .firmenevents-page {
            padding-top: 6rem;
          }

          .hero-image-container {
            height: 38vh;
            min-height: 260px;
            max-height: 360px;
          }

          .hero-overlay {
            padding: 1.5rem;
          }

          .section-title,
          .cta-title {
            font-size: 1.4rem;
          }

          .intro-text,
          .section-text p,
          .cta-text {
            font-size: 0.98rem;
          }

          .event-tag {
            font-size: 0.85rem;
            padding: 0.5rem 0.95rem;
          }

          .event-grid {
            gap: 0.6rem;
          }

          .anfrage-btn,
          .cta-btn {
            padding: 0.8rem 1.7rem;
            font-size: 0.92rem;
          }

          .quick-links-section {
            padding: 1.2rem 1rem 2.5rem;
          }

          .quick-link {
            padding: 0.8rem 1.15rem;
            font-size: 0.92rem;
          }
        }

        /* Accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .hero-image,
          .hero-title,
          .hero-subtitle,
          .hero-line,
          .hero-eyebrow,
          .intro-section,
          .event-types,
          .section-with-image,
          .section-title,
          .section-title::after,
          .section-eyebrow,
          .event-tag,
          .section-image,
          .cta-section,
          .cta-title,
          .cta-title::after,
          .quick-link {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .section-title::after,
          .cta-title::after {
            width: 90px !important;
          }
        }
      `}</style>
    </div>
  );
}