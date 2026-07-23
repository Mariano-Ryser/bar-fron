import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Users, GlassWater, Utensils, Calendar, ArrowRight } from 'lucide-react';

export default function FeaturesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const features = [
    {
      id: 1,
      title: "Firmenevents",
      text: "Das Salotto bietet dir ein All-in-One-Eventlocation-Paket für erfolgreiche Firmenevents. Ob Team-Event, Kundenanlass oder Firmenfeier.",
      image: "/img/event1.jpg",
      icon: <Users size={24} />,
      badge: "Events"
    },
    {
      id: 2,
      title: "Apéro & Apéro Riche",
      text: "Für Apéros und Apéro Riche bieten wir Platz für bis zu 60 Personen. Gerne erstellen wir Ihnen ein individuelles Angebot für Ihren Anlass.",
      image: "/img/apero.jpg",
      icon: <GlassWater size={24} />,
      badge: "Apéro"
    },
    {
      id: 3,
      title: "Restaurant & Lunch Time",
      text: "Unser Restaurant bietet Ihnen eine exquisite Auswahl an Gerichten für jeden Geschmack. Ob geschäftliches Mittagessen oder romantisches Dinner.",
      image: "/img/restaurant.jpg",
      icon: <Utensils size={24} />,
      badge: "Restaurant"
    },
    {
      id: 4,
      title: "Private Events",
      text: "Ob Geburtstag, Hochzeit, Taufe oder Jubiläum – bei uns finden Sie den perfekten Rahmen für Ihre private Feier. Wir kümmern uns um alles.",
      image: "/img/private-event.jpg",
      icon: <Calendar size={24} />,
      badge: "Privat"
    }
  ];

  return (
    <section ref={sectionRef} className="features-section">
      <div className="section-header">
        <span className="section-label">Was wir bieten</span>
        <h2 className="section-title">Entdecke unsere <span>Services</span></h2>
        <p className="section-subtitle">Von Firmenevents bis zu privaten Feiern – wir haben für jeden Anlass das passende Angebot</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => {
          const refCallback = (el: HTMLDivElement | null) => {
            itemRefs.current[index] = el;
          };

          return (
            <div 
              key={feature.id}
              ref={refCallback}
              data-index={index}
              className={`feature-card ${visibleItems.includes(index) ? 'visible' : ''}`}
            >
              <div className="feature-card-image">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="feature-card-img"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="feature-card-overlay">
                  <div className="feature-card-content">
                    <div className="feature-card-icon">{feature.icon}</div>
                    <span className="feature-card-badge">{feature.badge}</span>
                    <h3 className="feature-card-title">{feature.title}</h3>
                    <p className="feature-card-text">{feature.text}</p>
                    <button className="feature-card-button">
                      Mehr erfahren <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .features-section {
          background: #000000;
          padding: 2.5rem 0 0;
          color: #ffffff;
          width: 100%;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          max-width: 85%;
          margin: 0 auto 2.5rem;
          padding: 0 1rem;
        }

        .section-label {
          display: inline-block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 0.4rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.25rem 0.8rem;
          border-radius: 50px;
        }

        .section-title {
          color: rgba(255, 255, 255, 0.85);
          font-size: 2.2rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .section-title span {
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff, #888888);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 300;
          letter-spacing: 1px;
          line-height: 1.6;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Grid de características */
        .features-grid {
          max-width: 90%;
          margin: 0 auto;
          padding: 0 1rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .feature-card {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .feature-card:nth-child(2) {
          transition-delay: 0.1s;
        }

        .feature-card:nth-child(3) {
          transition-delay: 0.2s;
        }

        .feature-card:nth-child(4) {
          transition-delay: 0.3s;
        }

        .feature-card-image {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: all 0.4s ease;
        }

        .feature-card-image:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        .feature-card-img {
          transition: transform 0.6s ease;
        }

        .feature-card-image:hover .feature-card-img {
          transform: scale(1.1);
        }

        .feature-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .feature-card-image:hover .feature-card-overlay {
          opacity: 1;
        }

        .feature-card-content {
          text-align: center;
          color: #ffffff;
          transform: translateY(20px);
          transition: all 0.5s ease;
          opacity: 0;
        }

        .feature-card-image:hover .feature-card-content {
          transform: translateY(0);
          opacity: 1;
        }

        .feature-card-icon {
          display: inline-block;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.5rem;
        }

        .feature-card-badge {
          display: inline-block;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.8rem;
          border-radius: 50px;
          margin-bottom: 0.75rem;
        }

        .feature-card-title {
          font-size: 1.5rem;
          font-weight: 500;
          letter-spacing: 2px;
          margin-bottom: 0.75rem;
          color: #ffffff;
        }

        .feature-card-text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.25rem;
          font-weight: 400;
        }

        .feature-card-button {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
          font-weight: 400;
        }

        .feature-card-button:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateX(4px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.2rem;
            max-width: 92%;
          }

          .section-title {
            font-size: 2rem;
          }

          .feature-card-title {
            font-size: 1.3rem;
          }

          .feature-card-text {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 768px) {
          .features-section {
            padding: 1.5rem 0 0;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
            max-width: 100%;
            padding: 0 0.5rem;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .section-subtitle {
            font-size: 0.85rem;
          }

          .section-header {
            margin-bottom: 1.5rem;
            max-width: 95%;
            padding: 0;
          }

          .feature-card-title {
            font-size: 1.1rem;
          }

          .feature-card-text {
            font-size: 0.75rem;
            line-height: 1.5;
          }

          .feature-card-overlay {
            padding: 1rem;
          }

          .feature-card-badge {
            font-size: 0.5rem;
            padding: 0.1rem 0.6rem;
            margin-bottom: 0.5rem;
          }

          .feature-card-button {
            font-size: 0.65rem;
            padding: 0.2rem 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            padding: 0 0.25rem;
          }

          .section-title {
            font-size: 1.4rem;
          }

          .section-label {
            font-size: 0.55rem;
            padding: 0.15rem 0.6rem;
          }

          .feature-card-title {
            font-size: 0.9rem;
            letter-spacing: 1px;
          }

          .feature-card-text {
            font-size: 0.65rem;
            line-height: 1.4;
          }

          .feature-card-overlay {
            padding: 0.75rem;
          }

          .feature-card-badge {
            font-size: 0.4rem;
            padding: 0.1rem 0.5rem;
            margin-bottom: 0.3rem;
          }

          .feature-card-button {
            font-size: 0.55rem;
            padding: 0.15rem 0.6rem;
          }

          .feature-card-icon {
            transform: scale(0.8);
          }

          .feature-card-image:hover {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}