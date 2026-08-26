import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export default function Geburtstag() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const introRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
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

    const refs = [introRef, featuresRef, section1Ref, section2Ref, ctaRef];
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
    <div className="geburtstag-page">
      {/* Hero Image con Parallax y blur */}
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <div className="hero-image-inner" ref={imageRef}>
            <Image
              src="/img/geburtstag/party3.webp"
              alt="Geburtstagsfeier Salotto Zürich"
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
                Geburtstagsfeier
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                & Privat Partys
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`}></div>
              <p className={`hero-description ${isHeroVisible ? 'visible' : ''}`}>
                Feiere unvergesslich in Zürich
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Text con animación */}
      <div 
        ref={introRef}
        data-section="intro"
        className={`intro-section ${visibleSections.has('intro') ? 'visible' : ''}`}
      >
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
      <div 
        ref={featuresRef}
        data-section="features"
        className={`features-section ${visibleSections.has('features') ? 'visible' : ''}`}
      >
        <div className="features-grid">
          <div className="feature-card feature-1">
            <div className="feature-icon">🎂</div>
            <h3>Runder Geburtstag</h3>
            <p>Feiere Deinen besonderen Tag in exklusiver Atmosphäre</p>
          </div>
          <div className="feature-card feature-2">
            <div className="feature-icon">🎁</div>
            <h3>Überraschungsparty</h3>
            <p>Perfekte Location für unvergessliche Überraschungen</p>
          </div>
          <div className="feature-card feature-3">
            <div className="feature-icon">🎵</div>
            <h3>Party & Musik</h3>
            <p>Mit Bar, Musik und legendärer Discokugel</p>
          </div>
          <div className="feature-card feature-4">
            <div className="feature-icon">👥</div>
            <h3>Bis zu 60 Gäste</h3>
            <p>Genug Platz für alle Freunde und Familie</p>
          </div>
        </div>
      </div>

      {/* Section con Imagen 1 */}
      <div 
        ref={section1Ref}
        data-section="section1"
        className={`section-with-image ${visibleSections.has('section1') ? 'visible' : ''}`}
      >
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
        </div>
        <div className="section-image">
          <Image
            src="/img/geburtstag/party1.webp"
            alt="Party Location Zürich"
            fill
            style={{ objectFit: 'cover' }}
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Section con Imagen 2 (reverse) */}
      <div 
        ref={section2Ref}
        data-section="section2"
        className={`section-with-image reverse ${visibleSections.has('section2') ? 'visible' : ''}`}
      >
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
            src="/img/geburtstag/party2.webp"
            alt="Geburtstagsfeier Location"
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
        <h2>Bereit für Deine Geburtstagsfeier?</h2>
        <p>Kontaktiere uns für eine unverbindliche Anfrage</p>
      </div>

      {/* Quick Links - Al final */}
      <div className="quick-links-section">
        <div className="quick-links-container">
          <a href="/konditionen" className="quick-link">
            <span>Konditionen und Preise</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="/jetztmieten" className="quick-link primary">
            <span>Jetzt mieten</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .geburtstag-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 0;
          color: #ffffff;
          overflow-x: hidden;
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
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem;
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
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .features-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .feature-card {
          text-align: center;
          padding: 2rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.5s ease;
          border-radius: 8px;
          opacity: 0;
          transform: translateY(30px);
        }

        .features-section.visible .feature-1 {
          animation: cardFadeIn 0.6s ease-out 0.1s both;
        }
        .features-section.visible .feature-2 {
          animation: cardFadeIn 0.6s ease-out 0.2s both;
        }
        .features-section.visible .feature-3 {
          animation: cardFadeIn 0.6s ease-out 0.3s both;
        }
        .features-section.visible .feature-4 {
          animation: cardFadeIn 0.6s ease-out 0.4s both;
        }

        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
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

        /* ===== CTA ===== */
        .cta-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem;
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
          margin-bottom: 0;
        }

        /* ===== QUICK LINKS ===== */
        .quick-links-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 2rem 4rem;
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
          background: rgba(255, 215, 0, 0.08);
          border-color: rgba(255, 215, 0, 0.2);
        }

        .quick-link.primary:hover {
          background: rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.35);
          transform: translateX(5px);
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.05);
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

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          
          .hero-image-container {
            height: 50vh;
            min-height: 350px;
            max-height: 500px;
          }
          .hero-title { font-size: 3rem; }
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .section-with-image { gap: 2rem; padding: 2.5rem 2rem; }
          .section-text h2 { font-size: 1.5rem; }
        }

        @media (max-width: 768px) { 
          .geburtstag-page { padding-top: 8rem; }
          .hero-image-container {
            height: 40vh;
            min-height: 300px;
            max-height: 400px;
          }
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1rem; }
          .hero-description { font-size: 1rem; }
          
          .intro-section { padding: 2rem 1.5rem; }
          .intro-text { font-size: 0.95rem; }
          
          .features-section { padding: 2rem 1.5rem; }
          .features-grid { 
            grid-template-columns: 1fr 1fr; 
            gap: 1rem; 
          }
          .feature-card { padding: 1.5rem 1rem; }
          
          .section-with-image {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 2rem 1.5rem;
          }
          .section-with-image.reverse { direction: ltr; }
          .section-with-image.reverse .section-text { transform: translateX(-30px); }
          .section-with-image.reverse.visible .section-text { transform: translateX(0); }
          .section-image { aspect-ratio: 16/10; }
          .section-text h2 { font-size: 1.4rem; }
          .section-text p { font-size: 0.95rem; }
          
          .cta-section { padding: 2rem 1.5rem; }
          .cta-section h2 { font-size: 1.6rem; }
          
          .quick-links-section { padding: 1.5rem 1.5rem 3rem; }
        }

        @media (max-width: 480px) {
          .geburtstag-page { padding-top: 6rem; }
          
          .hero-image-container {
            height: 30vh;
            min-height: 250px;
            max-height: 350px;
          }
          .hero-title { font-size: 2rem; letter-spacing: 2px; }
          .hero-subtitle { font-size: 0.9rem; }
          .hero-description { font-size: 0.9rem; }
          
          .intro-section { padding: 1.5rem 1.2rem; }
          .intro-text { font-size: 0.9rem; }
          .intro-text.highlight { font-size: 0.95rem; }
          
          .features-section { padding: 1.5rem 1.2rem; }
          .features-grid { 
            grid-template-columns: 1fr; 
            gap: 0.75rem; 
          }
          .feature-card { padding: 1rem; }
          .feature-icon { font-size: 2rem; }
          .feature-card h3 { font-size: 0.95rem; }
          .feature-card p { font-size: 0.8rem; }
          
          .section-with-image { 
            padding: 1.5rem 1.2rem; 
            gap: 1rem;
          }
          .section-text h2 { font-size: 1.2rem; }
          .section-text p { font-size: 0.9rem; }
          .section-text .highlight-text { 
            font-size: 0.95rem; 
            padding: 0.75rem; 
          }
          
          .cta-section { padding: 1.5rem 1.2rem; }
          .cta-section h2 { font-size: 1.3rem; }
          .cta-section p { font-size: 0.9rem; }
          
          .quick-links-section { padding: 1rem 1rem 2rem; }
          .quick-link { 
            padding: 0.7rem 1.2rem; 
            font-size: 0.85rem; 
          }
        }
      `}</style>
    </div>
  );
}