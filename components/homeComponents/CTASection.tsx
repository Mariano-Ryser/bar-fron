import { useState, useEffect, useRef } from 'react';

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <p className={`cta-eyebrow ${isVisible ? 'visible' : ''}`}>
            Eventlocation Zürich West
          </p>
          <h2 className={`cta-title ${isVisible ? 'visible' : ''}`}>
            Die perfekte Eventlocation in Zürich West
          </h2>
          <p className={`cta-text ${isVisible ? 'visible' : ''}`}>
            Ob Geburtstag, Firmenfeier, Apéro, Networking-Event oder private
            Party – das Salotto Zürich bietet den idealen Rahmen für
            unvergessliche Veranstaltungen. Die stilvolle Location verbindet
            urbanes Ambiente mit einer entspannten Atmosphäre und schafft den
            perfekten Ort, um gemeinsam besondere Momente zu erleben.
          </p>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          background: #000;
          padding: 5.5rem 2rem;
          color: #fff;
          width: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .cta-container {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
        }

        .cta-content {
          max-width: 900px;
          margin: 0 auto;
        }

        /* Eyebrow editorial */
        .cta-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin: 0 0 1rem;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }

        .cta-eyebrow.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Título con blur-reveal + subrayado animado */
        .cta-title {
          font-size: clamp(1.6rem, 3.4vw, 2.8rem);
          font-weight: 500;
          letter-spacing: 1px;
          line-height: 1.15;
          margin: 0 auto 1.5rem;
          color: #fff;
          position: relative;
          display: inline-block;
          padding-bottom: 1.1rem;
          opacity: 0;
          transform: translateY(30px) scale(0.97);
          filter: blur(8px);
          transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s,
            transform 1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s,
            filter 1s cubic-bezier(0.22, 1, 0.36, 1) 0.25s;
        }

        .cta-title.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
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
          transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.6s;
        }

        .cta-title.visible::after {
          width: 90px;
        }

        /* Texto con fade-up escalonado */
        .cta-text {
          font-size: clamp(1rem, 1.6vw, 1.15rem);
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
          letter-spacing: 0.3px;
          margin: 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease 0.55s, transform 0.9s ease 0.55s;
        }

        .cta-text.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .cta-section {
            padding: 4.5rem 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 3.5rem 1.4rem;
          }

          .cta-eyebrow {
            letter-spacing: 4px;
            font-size: 0.7rem;
          }

          .cta-title {
            margin-bottom: 1.2rem;
            padding-bottom: 1rem;
          }
        }

        @media (max-width: 480px) {
          .cta-section {
            padding: 2.8rem 1.1rem;
          }

          .cta-title {
            letter-spacing: 0.5px;
          }
        }

        /* Accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .cta-eyebrow,
          .cta-title,
          .cta-title::after,
          .cta-text {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .cta-title::after {
            width: 90px !important;
          }
        }
      `}</style>
    </section>
  );
}