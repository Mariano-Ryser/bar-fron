import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Instagram, Linkedin, Mail, Users, Star, Coffee, Wine, Utensils, ArrowRight } from 'lucide-react';

export default function TeamPage() {
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

  const teamMembers = [
    {
      id: 1,
      name: "Mirtha Legrand",
      role: "Chef Ejecutiva & Directora de Eventos",
      description: "La diva de los fuegos, con más de 60 años de experiencia en la mesa. Ella decide quién come y quién no. Su lema: 'Al que no le gusta, que se vaya a comer a otro lado'.",
      image: "/img/team/mirtha.png",
      specialty: "Cocina de autor y organización de eventos de alto nivel",
      icon: <Utensils size={20} />,
      social: {
        instagram: "https://instagram.com/mirthalegrand",
        linkedin: "https://linkedin.com/in/mirthalegrand",
        email: "mirtha@salotto.ch"
      }
    },
    {
      id: 2,
      name: "El Pity Álvarez",
      role: "Mixólogo & DJ Residente",
      description: "El alma de la fiesta. Especialista en cócteles que 'te vuelan la cabeza' y sets musicales que hacen bailar hasta a las mesas. Si no hay Pity, no hay party.",
      image: "/img/team/pity.png",
      specialty: "Cócteles de autor y música en vivo",
      icon: <Wine size={20} />,
      social: {
        instagram: "https://instagram.com/elpityalvarez",
        linkedin: "https://linkedin.com/in/elpityalvarez",
        email: "pity@salotto.ch"
      }
    },
    {
      id: 3,
      name: "Diego Armando Maradona",
      role: "Director de Experiencia & Anfitrión",
      description: "El 10 de la hospitalidad. Con su carisma y talento innato, Diego se encarga de que cada invitado se sienta como un campeón. Su lema: 'La mejor experiencia es la que se disfruta con el corazón'.",
      image: "/img/team/maradona.png",
      specialty: "Atención al cliente y gestión de eventos",
      icon: <Star size={20} />,
      social: {
        instagram: "https://instagram.com/diegomaradona",
        linkedin: "https://linkedin.com/in/diegomaradona",
        email: "diego@salotto.ch"
      }
    },
    {
      id: 4,
      name: "René Favaloro",
      role: "Director de Salud & Bienestar",
      description: "El médico de la casa. Siempre atento a que todo esté en perfecto estado y funcionamiento. Su lema: 'Un evento saludable es un evento exitoso'.",
      image: "/img/team/favaloro.png",
      specialty: "Control de calidad y bienestar",
      icon: <Users size={20} />,
      social: {
        instagram: "https://instagram.com/renefavaloro",
        linkedin: "https://linkedin.com/in/renefavaloro",
        email: "rene@salotto.ch"
      }
    },
    
    {
      id: 5,
      name: "Susana Giménez",
      role: "Directora de Relaciones Públicas",
      description: "La reina de la comunicación. Susana se encarga de que todos los invitados se sientan como estrellas. Su lema: 'Un evento sin glamour no es un evento'.",
      image: "/img/team/susana.png",
      specialty: "Relaciones públicas y gestión de invitados",
      icon: <Star size={20} />,
      social: {
        instagram: "https://instagram.com/susanagimenez",
        linkedin: "https://linkedin.com/in/susanagimenez",
        email: "susana@salotto.ch"
      }
    }
  ];

  return (
    <div className="team-page">
      {/* Hero */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Unser Team</h1>
          <p>Die Menschen hinter dem Salotto</p>
          <div className="hero-line"></div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="team-grid">
        {teamMembers.map((member, index) => {
          const refCallback = (el: HTMLDivElement | null) => {
            itemRefs.current[index] = el;
          };

          return (
            <div
              key={member.id}
              ref={refCallback}
              data-index={index}
              className={`team-card ${visibleItems.includes(index) ? 'visible' : ''}`}
            >
              <div className="team-card-image">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="team-image"
                  style={{ objectFit: 'cover' }}
                />
                <div className="team-card-overlay">
                  <div className="team-social">
                    <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram size={18} />
                    </a>
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={18} />
                    </a>
                    <a href={`mailto:${member.social.email}`}>
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="team-card-content">
                <div className="team-card-icon">{member.icon}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
                <span className="team-specialty">{member.specialty}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="team-cta">
        <div className="cta-content">
          <h2>Bist du bereit, Teil unseres Teams zu werden?</h2>
          <p>Wir suchen immer nach talentierten Menschen, die unsere Leidenschaft für Gastfreundschaft teilen.</p>
          <button className="cta-button">
            Jetzt bewerben <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .team-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 10rem;
          color: #ffffff;
        }

        /* Hero */
        .hero-section {
          padding: 0rem 2rem 4rem;
          text-align: center;
        }

        .hero-content h1 {
            color: #ffffff;
          font-size: 4rem;
          font-weight: 300;
          letter-spacing: 4px;
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        .hero-line {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          margin: 1.5rem auto 0;
        }

        /* Team Grid */
        .team-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .team-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }

        .team-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .team-card:nth-child(2) {
          transition-delay: 0.1s;
        }

        .team-card:nth-child(3) {
          transition-delay: 0.2s;
        }

        .team-card:nth-child(4) {
          transition-delay: 0.3s;
        }

        .team-card:nth-child(5) {
          transition-delay: 0.4s;
        }

        .team-card:nth-child(6) {
          transition-delay: 0.5s;
        }

        .team-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }

        .team-card-image {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          overflow: hidden;
          background: #1a1a1a;
        }

        .team-image {
          transition: transform 0.6s ease;
        }

        .team-card:hover .team-image {
          transform: scale(1.05);
        }

        .team-card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .team-card:hover .team-card-overlay {
          opacity: 1;
        }

        .team-social {
          display: flex;
          gap: 1.5rem;
          transform: translateY(20px);
          transition: all 0.4s ease;
        }

        .team-card:hover .team-social {
          transform: translateY(0);
        }

        .team-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transition: all 0.3s ease;
        }

        .team-social a:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.1);
        }

        .team-card-content {
          padding: 1.5rem;
          text-align: center;
        }

        .team-card-icon {
          display: inline-block;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 0.5rem;
        }

        .team-name {
          font-size: 1.3rem;
          font-weight: 400;
          letter-spacing: 2px;
          margin-bottom: 0.25rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .team-role {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }

        .team-description {
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1rem;
        }

        .team-specialty {
          display: inline-block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.25rem 1rem;
          border-radius: 50px;
        }

        /* CTA */
        .team-cta {
          max-width: 90%;
          margin: 0 auto 0rem;
          padding: 3rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .cta-content p {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.5);
          max-width: 600px;
          margin: 0 auto 2rem;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 0.75rem 2.5rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .cta-button:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .hero-content h1 {
            font-size: 3rem;
          }
        }

        @media (max-width: 768px) {
          .team-page {
            padding-top: 8rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-section {
            padding: 1rem 1rem 2rem;
          }

          .team-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            padding: 0 1rem 2rem;
          }

          .team-name {
            font-size: 1.1rem;
          }

          .team-role {
            font-size: 0.75rem;
          }

          .team-description {
            font-size: 0.75rem;
          }

          .team-card-content {
            padding: 1rem;
          }

          .cta-content h2 {
            font-size: 1.5rem;
          }

          .cta-content p {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .team-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
            padding: 0 0.5rem 2rem;
          }

          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .team-name {
            font-size: 1rem;
          }

          .team-description {
            font-size: 0.7rem;
          }

          .team-cta {
            padding: 2rem 1rem;
          }

          .cta-content h2 {
            font-size: 1.2rem;
          }

          .cta-button {
            padding: 0.5rem 1.5rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}