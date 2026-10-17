import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
              setVisibleSections((prev) => new Set(prev).add(sectionId));
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
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
      {/* HERO */}
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
              <p className={`hero-eyebrow ${isHeroVisible ? 'visible' : ''}`}>
                Salotto Zürich
              </p>
              <h1 className={`hero-title ${isHeroVisible ? 'visible' : ''}`}>
                Geburtstagsfeier
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                & Privat Partys
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`} />
              <p className={`hero-description ${isHeroVisible ? 'visible' : ''}`}>
                Feiere unvergesslich in Zürich
              </p>
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
            Du suchst eine einzigartige Location für Deine Geburtstagsfeier in
            Zürich? Das <strong>Salotto Zürich</strong> kannst Du exklusiv für
            Deine private Party mieten. Ob runder Geburtstag, Überraschungsparty
            oder ein Fest mit Freunden und Familie – bei uns feierst Du in
            stilvoller, lockerer Atmosphäre.
          </p>
          <p className="intro-text highlight">
            Unser Eventlokal bietet Platz für bis zu{' '}
            <strong>60 Personen</strong> und steht Dir für geschlossene
            Gesellschaften exklusiv zur Verfügung.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div
        ref={featuresRef}
        data-section="features"
        className={`features-section ${
          visibleSections.has('features') ? 'visible' : ''
        }`}
      >
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

      {/* SECTION 1 */}
      <div
        ref={section1Ref}
        data-section="section1"
        className={`section-with-image ${
          visibleSections.has('section1') ? 'visible' : ''
        }`}
      >
        <div className="section-text">
          <span className="section-eyebrow">Location</span>
          <h2 className="section-title">Deine Geburtstagsfeier in Zürich</h2>
          <p>
            Freue Dich auf eine gemütliche Partylocation mit Bar, Musik und der
            legendären Discokugel – perfekt zum Feiern, Tanzen und Geniessen.
          </p>
          <p className="highlight-text">
            Du feierst – wir kümmern uns um den Rest. So wird Deine
            Geburtstagsfeier in Zürich unkompliziert und unvergesslich.
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

      {/* SECTION 2 (reverse) */}
      <div
        ref={section2Ref}
        data-section="section2"
        className={`section-with-image reverse ${
          visibleSections.has('section2') ? 'visible' : ''
        }`}
      >
        <div className="section-text">
          <span className="section-eyebrow">Privat</span>
          <h2 className="section-title">Exklusiv für Dich und Deine Gäste</h2>
          <p>
            Das Salotto Zürich steht Dir für geschlossene Gesellschaften
            exklusiv zur Verfügung. Geniesse die Privatsphäre und die
            einzigartige Atmosphäre unserer Location.
          </p>
          <p>
            Ob mit DJ, eigener Playlist oder Live-Musik – wir passen uns Deinen
            Wünschen an und sorgen für den perfekten Rahmen Deiner Feier.
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

      {/* CTA */}
      <div
        ref={ctaRef}
        data-section="cta"
        className={`cta-section ${visibleSections.has('cta') ? 'visible' : ''}`}
      >
        <h2 className="cta-title">Bereit für Deine Geburtstagsfeier?</h2>
        <p className="cta-text">
          Kontaktiere uns für eine unverbindliche Anfrage
        </p>
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
        .geburtstag-page {
          background: #000;
          min-height: 100vh;
          padding-top: 0;
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
          max-height: 840px;
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
            rgba(255, 215, 0, 0.7),
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

        .hero-description {
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          color: rgba(255, 215, 0, 0.8);
          font-weight: 400;
          margin: 1.2rem 0 0;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.9s ease 1.2s, transform 0.9s ease 1.2s;
        }

        .hero-description.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ============ INTRO ============ */
        .intro-section {
          max-width: 1250px;
          margin: 0 auto;
          padding: 3.5rem 2rem;
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
          margin: 0 0 1.2rem;
          font-weight: 400;
        }

        .intro-text strong {
          color: #fff;
          font-weight: 600;
        }

        .intro-text.highlight {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0;
        }

        .intro-text.highlight strong {
          color: #ffd700;
          font-weight: 600;
        }

        /* ============ FEATURES ============ */
        .features-section {
          max-width: 1500px;
          margin: 0 auto;
          padding: 3.5rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
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
          padding: 2.2rem 1.6rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          transition: background 0.4s ease, border-color 0.4s ease,
            transform 0.4s ease, box-shadow 0.4s ease;
          opacity: 0;
          transform: translateY(30px) scale(0.97);
        }

        .features-section.visible .feature-card:nth-child(1) {
          animation: cardPop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }
        .features-section.visible .feature-card:nth-child(2) {
          animation: cardPop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both;
        }
        .features-section.visible .feature-card:nth-child(3) {
          animation: cardPop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.41s both;
        }
        .features-section.visible .feature-card:nth-child(4) {
          animation: cardPop 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.54s both;
        }

        @keyframes cardPop {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 215, 0, 0.3);
          background: rgba(255, 215, 0, 0.05);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }

        .feature-icon {
          font-size: 2.8rem;
          margin-bottom: 1.1rem;
          display: inline-block;
          transition: transform 0.4s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.15) rotate(-6deg);
        }

        .feature-card h3 {
          font-size: clamp(1.05rem, 1.4vw, 1.2rem);
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.3px;
          margin: 0 0 0.6rem;
          line-height: 1.3;
        }

        .feature-card p {
          font-size: 0.98rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.55;
          margin: 0;
          font-weight: 400;
        }

        /* ============ SECTION WITH IMAGE ============ */
        .section-with-image {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          max-width: 1500px;
          margin: 0 auto;
          padding: 3.5rem 2rem;
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

        .section-with-image.reverse {
          direction: rtl;
        }

        .section-with-image.reverse .section-text {
          direction: ltr;
        }

        .section-text {
          direction: ltr;
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
          transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
        }

        .section-with-image.visible .section-eyebrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Título con subrayado animado */
        .section-title {
          font-size: clamp(1.6rem, 3vw, 2.3rem);
          font-weight: 500;
          letter-spacing: 1px;
          margin: 0 0 1.5rem;
          color: #fff;
          line-height: 1.2;
          position: relative;
          padding-bottom: 1rem;
          display: inline-block;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }

        .section-with-image.visible .section-title {
          opacity: 1;
          transform: translateY(0);
        }

        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #ffd700, rgba(255, 215, 0, 0));
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.55s;
        }

        .section-with-image.visible .section-title::after {
          width: 90px;
        }

        .section-text p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 1.4rem;
          font-weight: 400;
        }

        .section-text .highlight-text {
          color: rgba(255, 215, 0, 0.9);
          font-size: 1.08rem;
          font-weight: 400;
          padding: 1rem 1.2rem;
          border-left: 3px solid rgba(255, 215, 0, 0.4);
          background: rgba(255, 215, 0, 0.04);
          border-radius: 0 8px 8px 0;
          margin: 0;
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
          padding: 4rem 2rem;
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
          margin: 0 0 1rem;
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
          background: linear-gradient(90deg, transparent, #ffd700, transparent);
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.55s;
        }

        .cta-section.visible .cta-title::after {
          width: 90px;
        }

        .cta-text {
          color: rgba(255, 255, 255, 0.75);
          font-size: 1.08rem;
          font-weight: 400;
          margin: 0;
        }

        /* ============ QUICK LINKS ============ */
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
          background: rgba(255, 215, 0, 0.08);
          border-color: rgba(255, 215, 0, 0.22);
          font-weight: 500;
        }

        .quick-link.primary:hover {
          background: rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.4);
          transform: translateX(5px);
          box-shadow: 0 8px 30px rgba(255, 215, 0, 0.08);
        }

        .quick-link :global(svg) {
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .quick-link:hover :global(svg) {
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

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-with-image {
            gap: 2.5rem;
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .geburtstag-page {
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

          .intro-section {
            padding: 2.6rem 1.4rem;
          }

          .intro-text {
            font-size: 1.02rem;
          }

          .intro-text.highlight {
            font-size: 1.05rem;
          }

          .features-section {
            padding: 2.6rem 1.4rem;
          }

          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .feature-card {
            padding: 1.7rem 1.1rem;
          }

          .feature-icon {
            font-size: 2.4rem;
          }

          .feature-card p {
            font-size: 0.92rem;
          }

          .section-with-image {
            grid-template-columns: 1fr;
            gap: 1.8rem;
            padding: 2.6rem 1.4rem;
          }

          .section-with-image.reverse {
            direction: ltr;
          }

          .section-image {
            aspect-ratio: 16/10;
          }

          .section-text p {
            font-size: 1rem;
          }

          .section-text .highlight-text {
            font-size: 1rem;
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
          .geburtstag-page {
            padding-top: 6rem;
          }

          .hero-image-container {
            height: 38vh;
            min-height: 260px;
            max-height: 360px;
          }

          .intro-section {
            padding: 2rem 1.1rem;
          }

          .intro-text {
            font-size: 0.98rem;
          }

          .intro-text.highlight {
            font-size: 1rem;
          }

          .features-section {
            padding: 2rem 1.1rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .feature-card {
            padding: 1.4rem 1.1rem;
          }

          .feature-icon {
            font-size: 2.2rem;
          }

          .feature-card h3 {
            font-size: 1.02rem;
          }

          .feature-card p {
            font-size: 0.9rem;
          }

          .section-with-image {
            padding: 2rem 1.1rem;
            gap: 1.4rem;
          }

          .section-text p {
            font-size: 0.98rem;
          }

          .section-text .highlight-text {
            font-size: 0.98rem;
            padding: 0.85rem 1rem;
          }

          .cta-section {
            padding: 2.2rem 1.1rem;
          }

          .cta-text {
            font-size: 0.98rem;
          }

          .quick-links-section {
            padding: 1.2rem 1.1rem 2.4rem;
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
          .hero-description,
          .intro-section,
          .features-section,
          .feature-card,
          .section-with-image,
          .section-eyebrow,
          .section-title,
          .section-title::after,
          .section-image,
          .cta-section,
          .cta-title,
          .cta-title::after {
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