import { useState, useEffect, useRef } from 'react';
import Router from "next/router";

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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className={`cta-title ${isVisible ? 'visible' : ''}`}>
            Die perfekte Eventlocation in Zürich West
          </h2>
          <p className={`cta-text ${isVisible ? 'visible' : ''}`}>
            Ob Geburtstag, Firmenfeier, Apéro, Networking-Event oder private Party – das Salotto Zürich bietet den idealen Rahmen für unvergessliche Veranstaltungen. Die stilvolle Location verbindet urbanes Ambiente mit einer entspannten Atmosphäre und schafft den perfekten Ort, um gemeinsam besondere Momente zu erleben. Du kümmerst dich ums Feiern – wir übernehmen den Rest. Das Salotto bietet dir ein All-in-One-Eventlocation-Paket.
          </p>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          background: #000000;
          padding: 5rem 2rem;
          color: #ffffff;
          width: 100%;
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

        .cta-title {
          font-size: 3rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          letter-spacing: 0.5px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0.2s;
        }

        .cta-text.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .cta-title {
            font-size: 2.5rem;
          }

          .cta-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 3.5rem 1.5rem;
          }

          .cta-title {
            font-size: 2rem;
            margin-bottom: 1rem;
          }

          .cta-text {
            font-size: 0.95rem;
            line-height: 1.7;
          }
        }

        @media (max-width: 480px) {
          .cta-section {
            padding: 2.5rem 1rem;
          }

          .cta-title {
            font-size: 1.6rem;
            letter-spacing: 1px;
          }

          .cta-text {
            font-size: 0.85rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </section>
  );
}