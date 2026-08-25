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
  Phone
} from 'lucide-react';

export default function Konditionen() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [imageLoaded, setImageLoaded] = useState(false);
  const mieteRef = useRef<HTMLDivElement>(null);
  const umsatzRef = useRef<HTMLDivElement>(null);
  const angebotRef = useRef<HTMLDivElement>(null);
  const reservationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Forzar la carga de la imagen después del montaje
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
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
      {/* Hero Image */}
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <Image
            src="/img/konditionen/konditionen1.webp"
            alt="Salotto Location Konditionen"
            fill
            className={`hero-image ${imageLoaded ? 'loaded' : ''}`}
            style={{ objectFit: 'cover' }}
            quality={90}
            priority={true}
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
          />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1 className="hero-title">Konditionen &amp; Preise</h1>
              <p className="hero-subtitle">Alles was Du für Deinen Event wissen musst</p>
              <div className="hero-line"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        {/* Miete Section */}
        <div 
          ref={mieteRef}
          data-section="miete"
          className={`section ${visibleSections.has('miete') ? 'visible' : ''}`}
        >
          <h2 className="section-title">Miete</h2>
          
          <div className="card-grid">
            <div className="card card-1">
              <div className="card-header">
                <Calendar size={28} color="#ffffff" stroke="#ffffff" />
                <h3>Tagesmiete Wochentags</h3>
              </div>
              <p className="card-text">
                Falls du deinen Event an einem Werktag machen möchtest, stellen wir für dich eine 
                <span className="highlight"> individuelle Offerte</span> zusammen!
              </p>
              <div className="card-badge">
                <Clock size={16} color="#ffffff" stroke="#ffffff" />
                <span className="badge-text">Bis 22.00 Uhr</span>
              </div>
            </div>

            <div className="card card-2">
              <div className="card-header">
                <Moon size={28} color="#ffffff" stroke="#ffffff" />
                <h3>Abendmiete – am Wochenende</h3>
              </div>
              <p className="card-text">
                Zwischen <span className="highlight">17.00 bis 04.00 Uhr</span> – maximal 8 Stunden
              </p>
              <div className="card-details">
                <div className="detail-item">
                  <Clock size={16} color="#ffffff" stroke="#ffffff" />
                  <span className="detail-text">Maximal 8 Stunden</span>
                </div>
                <div className="detail-item">
                  <GlassWater size={16} color="#ffffff" stroke="#ffffff" />
                  <span className="detail-text">Getränke ausschliesslich an der Bar</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mindestumsatz Section */}
        <div 
          ref={umsatzRef}
          data-section="umsatz"
          className={`section ${visibleSections.has('umsatz') ? 'visible' : ''}`}
        >
          <h2 className="section-title">Mindestumsatz</h2>
          <div className="umsatz-card">
            <p className="umsatz-text">
              Der Mindestumsatz beträgt <span className="highlight">CHF 250/Stunde</span> (nur Getränke)
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

        {/* Angebot Section */}
        <div 
          ref={angebotRef}
          data-section="angebot"
          className={`section ${visibleSections.has('angebot') ? 'visible' : ''}`}
        >
          <h2 className="section-title">Angebot</h2>
          <div className="angebot-grid">
            <div className="angebot-item">
              <Sparkles size={20} color="#ffffff" stroke="#ffffff" />
              <span>Exklusive Nutzung der gesamten Location</span>
            </div>
            <div className="angebot-item">
              <Users size={20} color="#ffffff" stroke="#ffffff" />
              <span>Bis zu 60 Personen – perfekt für kleine &amp; mittlere Feiern</span>
            </div>
            <div className="angebot-item">
              <GlassWater size={20} color="#ffffff" stroke="#ffffff" />
              <span>Professioneller Barbetrieb</span>
            </div>
            <div className="angebot-item">
              <Music size={20} color="#ffffff" stroke="#ffffff" />
              <span>Professionelle Musikanlage – für die perfekte Party-Atmosphäre</span>
            </div>
            <div className="angebot-item">
              <Sofa size={20} color="#ffffff" stroke="#ffffff" />
              <span>Individuelle Möblierung – flexibel nach Deinen Wünschen</span>
            </div>
            <div className="angebot-item">
              <Coffee size={20} color="#ffffff" stroke="#ffffff" />
              <span>Ausgesuchte Getränke- und Cocktailauswahl</span>
            </div>
            <div className="angebot-item">
              <Umbrella size={20} color="#ffffff" stroke="#ffffff" />
              <span>Gedeckter Aussenbereich – bei jedem Wetter geniessen</span>
            </div>
            <div className="angebot-item">
              <Moon size={20} color="#ffffff" stroke="#ffffff" />
              <span>Verlängerte Nachtbewilligung am Wochenende</span>
            </div>
          </div>

          <div className="party-info">
            <h4>Party-Info</h4>
            <div className="party-details">
              <div className="party-detail">
                <Clock size={18} color="#ffffff" stroke="#ffffff" />
                <span className="party-text">Letzte Runde 3.30 Uhr</span>
              </div>
              <div className="party-detail">
                <Clock size={18} color="#ffffff" stroke="#ffffff" />
                <span className="party-text">½ Stunde vorher einrichten</span>
              </div>
              <div className="party-detail">
                <Clock size={18} color="#ffffff" stroke="#ffffff" />
                <span className="party-text">Party max. 8 Stunden</span>
              </div>
            </div>
          </div>

          <div className="highlight-box">
            <p>
              <span className="highlight">Keine Mietkosten</span> – nur zahlen, was Du konsumierst
            </p>
            <p>
              <span className="highlight">Catering auf Anfrage</span> – rundum sorglos feiern
            </p>
          </div>
        </div>

        {/* Reservation Section */}
        <div 
          ref={reservationRef}
          data-section="reservation"
          className={`section reservation-section ${visibleSections.has('reservation') ? 'visible' : ''}`}
        >
          <h2 className="section-title">Reservation</h2>
          <div className="reservation-content">
            <p className="reservation-text">
              Wir freuen uns, Dir unsere Möglichkeiten in unserem Eventlokal zu zeigen. 
              Kommt anschliessend eine definitive Buchung zustande, senden wir Dir per E-Mail 
              die Reservationsdetails.
            </p>
            <p className="reservation-text">
              Vereinbare jetzt einen Termin mit <span className="highlight">Marcos</span>, 
              um das Salotto Zürich kennenzulernen. Wir freuen uns sehr, einen Anlass nach 
              Deinen persönlichen Wünschen zu organisieren und durchzuführen.
            </p>
            <p className="reservation-text">
              Gerne stehen wir Dir für sämtliche weiteren Fragen zur Verfügung.
            </p>

            <div className="contact-buttons">
              <a href="/kontakt" className="contact-button primary">
                <Mail size={20} color="#ffffff" stroke="#ffffff" />
                <span>Offerte Anfragen</span>
              </a>
              <a href="tel:+41441234567" className="contact-button secondary">
                <Phone size={20} color="#ffffff" stroke="#ffffff" />
                <span>Telefonisch Kontakt</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .konditionen-page {
          background: #000000;
          min-height: 100vh;
          color: #ffffff;
        }

        /* Hero Image */
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
        }

        .hero-content {
          text-align: center;
          padding: 2rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          letter-spacing: 4px;
          margin-bottom: 1rem;
          color: #ffffff;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
          animation: fadeInUp 1.2s ease-out 0.3s both;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          animation: fadeInUp 1.2s ease-out 0.6s both;
        }

        .hero-line {
          width: 60px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          margin: 1.5rem auto 0;
          animation: fadeInUp 1.2s ease-out 0.9s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Content Container */
        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem 4rem;
        }

        /* Sections */
        .section {
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .section:last-child {
          margin-bottom: 0;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 300;
          letter-spacing: 3px;
          color: #ffffff;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Cards */
        .card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.5s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .section.visible .card-1 {
          animation: cardFadeIn 0.6s ease-out 0.2s both;
        }

        .section.visible .card-2 {
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

        .card:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .card-header h3 {
          font-size: 1.3rem;
          font-weight: 300;
          letter-spacing: 1px;
          color: #ffffff;
        }

        .card-text {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.2rem;
        }

        .highlight {
          color: #ffffff;
          font-weight: 400;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .card-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .badge-text {
          color: #ffffff;
        }

        .card-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
        }

        .detail-text {
          color: #ffffff;
        }

        /* Umsatz */
        .umsatz-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .section.visible .umsatz-card {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.3s;
        }

        .umsatz-text {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          margin-bottom: 2rem;
        }

        .umsatz-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .umsatz-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
        }

        .umsatz-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: scale(1.02);
        }

        .umsatz-item .hours {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.3rem;
        }

        .umsatz-item .price {
          font-size: 1.4rem;
          color: #ffffff;
          font-weight: 300;
        }

        .umsatz-footer {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Angebot */
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
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateX(-20px);
        }

        .section.visible .angebot-item {
          animation: itemFadeIn 0.5s ease-out both;
        }

        .section.visible .angebot-item:nth-child(1) { animation-delay: 0.1s; }
        .section.visible .angebot-item:nth-child(2) { animation-delay: 0.2s; }
        .section.visible .angebot-item:nth-child(3) { animation-delay: 0.3s; }
        .section.visible .angebot-item:nth-child(4) { animation-delay: 0.4s; }
        .section.visible .angebot-item:nth-child(5) { animation-delay: 0.5s; }
        .section.visible .angebot-item:nth-child(6) { animation-delay: 0.6s; }
        .section.visible .angebot-item:nth-child(7) { animation-delay: 0.7s; }
        .section.visible .angebot-item:nth-child(8) { animation-delay: 0.8s; }

        @keyframes itemFadeIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .angebot-item:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateX(4px);
        }

        .angebot-item span {
          font-size: 0.95rem;
          color: #ffffff;
        }

        .party-info {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem 2rem;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .section.visible .party-info {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.5s;
        }

        .party-info h4 {
          font-size: 1.1rem;
          font-weight: 300;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1rem;
        }

        .party-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .party-detail {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
        }

        .party-text {
          color: #ffffff;
        }

        .highlight-box {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .section.visible .highlight-box {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.7s;
        }

        .highlight-box p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Reservation */
        .reservation-section {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
        }

        .reservation-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.5rem;
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .section.visible .contact-buttons {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .contact-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 300;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .contact-button.primary {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .contact-button.primary:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .contact-button.secondary {
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
        }

        .contact-button.secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .contact-button span {
          color: #ffffff;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3rem;
          }

          .content-container {
            padding: 2rem 1.5rem 3rem;
          }
        }

        @media (max-width: 768px) {
          .konditionen-page {
            padding-top: 0rem;
          }

          .hero-image-container {
            height: 40vh;
            min-height: 300px;
          }

          .hero-title {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .card-grid {
            grid-template-columns: 1fr;
          }

          .umsatz-grid {
            grid-template-columns: 1fr;
          }

          .angebot-grid {
            grid-template-columns: 1fr;
          }

          .contact-buttons {
            flex-direction: column;
          }

          .contact-button {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-image-container {
            height: 30vh;
            min-height: 250px;
          }

          .hero-title {
            font-size: 1.8rem;
            letter-spacing: 2px;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .card {
            padding: 1.5rem;
          }

          .card-header h3 {
            font-size: 1.1rem;
          }

          .umsatz-text {
            font-size: 1rem;
          }

          .reservation-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}