import { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    guests: '',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
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
      { threshold: 0.1 }
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

  const eventTypes = [
    'Firmenevent',
    'Private Party',
    'Geburtstagsfeier',
    'Apéro Riche',
    'Weihnachtsfeier',
    'Hochzeit',
    'Anderer Anlass'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError('Bitte füllen Sie alle Pflichtfelder aus.');
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        guests: '',
        date: '',
        message: '',
      });
    } catch (err) {
      setError('Es gab einen Fehler beim Senden. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'E-Mail',
      value: 'info@salotto-zurich.ch',
      link: 'mailto:info@salotto-zurich.ch',
      description: 'Wir antworten innerhalb 24 Stunden'
    },
    {
      icon: <Phone size={20} />,
      title: 'Telefon',
      value: '+41 76 227 55 43',
      link: 'tel:+41762275543',
      description: 'Mo - Fr 10:00 - 15:00'
    },
    {
      icon: <MapPin size={20} />,
      title: 'Adresse',
      value: 'Hardturmstrasse 169, 8005 Zürich',
      link: 'https://www.google.com/maps/place/Salotto+Bar+I+Lunch+I+Eventlocation/@47.3933226,8.5087277,671m/data=!3m1!1e3!4m15!1m8!3m7!1s0x47900a48ae02bb3d:0xa1205263669fd54e!2sHardturmstrasse+169,+8005+Z%C3%BCrich!3b1!8m2!3d47.3933226!4d8.5113026!16s%2Fg%2F11q2x8smfb!3m5!1s0x47900a48ad4fe49d:0x40c09eb32643d4f4!8m2!3d47.393454!4d8.511219!16s%2Fg%2F1jglsnd9t?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D',
      description: 'Google Maps öffnen'
    },
  ];

  return (
    <div className="kontakt-page">
      {/* Hero */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Kontakt</h1>
          <p>Wir sind für Sie da – für Ihre Fragen und Anliegen</p>
          <div className="hero-line"></div>
        </div>
      </div>

      <div className="kontakt-container">
        {/* Info Cards */}
        <div className="info-grid">
          {contactInfo.map((info, index) => {
            const refCallback = (el: HTMLDivElement | null) => {
              itemRefs.current[index] = el;
            };

            return (
              <div 
                key={index}
                ref={refCallback}
                data-index={index}
                className={`info-card ${visibleItems.includes(index) ? 'visible' : ''}`}
              >
                <a href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="info-card-link">
                  <div className="info-icon">{info.icon}</div>
                  <h3>{info.title}</h3>
                  <p className="info-value">{info.value}</p>
                  <span className="info-description">{info.description}</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Section */}
        {/* <div className="whatsapp-section">
          <div className="whatsapp-content">
            <div className="whatsapp-icon">
              <MessageCircle size={24} />
            </div>
            <div className="whatsapp-text">
              <h3>WhatsApp</h3>
              <p>Schnell und unkompliziert über WhatsApp kontaktieren</p>
            </div>
          </div>
          <a 
            href="https://wa.me/41788747974" 
            target="_blank" 
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            <MessageCircle size={18} />
            WhatsApp schreiben
          </a>
        </div> */}

        {/* Form + Map Grid */}
        <div className="form-map-grid">
          {/* Form */}
          <div className="form-container">
            <h2>Anfrage senden</h2>
            <p className="form-subtitle">Füllen Sie das Formular aus und wir melden uns bei Ihnen.</p>

            {isSubmitted ? (
              <div className="success-message">
                <CheckCircle size={48} />
                <h3>Vielen Dank!</h3>
                <p>Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.</p>
                <button onClick={() => setIsSubmitted(false)} className="reset-button">
                  Neue Anfrage
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {error && (
                  <div className="error-message">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ihr vollständiger Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-Mail *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ihre@email.ch"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+41 78 874 79 74"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventType">Art des Anlasses</label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                    >
                      <option value="">Bitte wählen...</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guests">Anzahl Gäste</label>
                    <input
                      type="number"
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="z.B. 50"
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Wunschdatum</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Nachricht *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beschreiben Sie Ihren Anlass und Ihre Wünsche..."
                    rows={5}
                    required
                  />
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Anfrage senden
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="map-container">
            <h2>Besuchen Sie uns</h2>
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.345678901234!2d8.4966!3d47.3927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a1234567890%3A0x1234567890abcdef!2sHardturmstrasse%20169%2C%208005%20Z%C3%BCrich!5e0!3m2!1sde!2sch!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salotto Location"
              />
            </div>
            <div className="map-info">
              <p>
                <MapPin size={16} />
                Hardturmstrasse 169, 8005 Zürich
              </p>
              <a 
                href="https://www.google.com/maps/place/Salotto+Bar+I+Lunch+I+Eventlocation/@47.393454,8.5086441,1870m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47900a48ad4fe49d:0x40c09eb32643d4f4!8m2!3d47.393454!4d8.511219!16s%2Fg%2F1jglsnd9t?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                Route planen
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .kontakt-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 8rem;
          color: #ffffff;
        }

        /* Hero */
        .hero-section {
          padding: 0rem 2rem 3rem;
          text-align: center;
        }

        .hero-content h1 {
          color: #ffd700;
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
          background: #ffd700;
          margin: 1rem auto 0;
        }

        .kontakt-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 4rem;
        }

        /* Info Cards */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .info-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .info-card:nth-child(2) {
          transition-delay: 0.1s;
        }

        .info-card:nth-child(3) {
          transition-delay: 0.2s;
        }

        .info-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 215, 0, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .info-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .info-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.2);
          margin-bottom: 1rem;
          color: #ffd700;
        }

        .info-card h3 {
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          color: #ffd700;
        }

        .info-value {
          font-size: 1.1rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 0.25rem;
        }

        .info-description {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        /* WhatsApp */
        .whatsapp-section {
          background: rgba(37, 211, 102, 0.05);
          border: 1px solid rgba(37, 211, 102, 0.15);
          border-radius: 12px;
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .whatsapp-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          flex-wrap: wrap;
        }

        .whatsapp-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #25D366;
          color: #ffffff;
          flex-shrink: 0;
        }

        .whatsapp-text h3 {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 0.2rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .whatsapp-text p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .whatsapp-button {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #25D366;
          color: #ffffff;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .whatsapp-button:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
        }

        /* Form + Map */
        .form-map-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-container {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2.5rem;
        }

        .form-container h2 {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 0.25rem;
          color: #ffd700;
        }

        .form-subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.8rem;
          font-weight: 500;
          color: #ffd700;
          letter-spacing: 1px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.8rem 1rem;
          color: #ffffff;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          font-family: inherit;
          width: 100%;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ffd700;
          background: rgba(255, 215, 0, 0.05);
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.05);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.5)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          cursor: pointer;
        }

        .form-group select option {
          background: #1a1a1a;
          color: #ffffff;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.2);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #ff6b6b;
          font-size: 0.9rem;
        }

        .submit-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: #ffd700;
          border: 1px solid #ffd700;
          color: #000000;
          padding: 0.8rem 2rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .submit-button:hover:not(:disabled) {
          background: #e6c200;
          border-color: #e6c200;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-top: 2px solid #000000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          text-align: center;
          padding: 2rem 0;
        }

        .success-message svg {
          color: #4CAF50;
          margin-bottom: 1rem;
        }

        .success-message h3 {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
          color: #ffd700;
        }

        .success-message p {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
        }

        .reset-button {
          background: rgba(255, 215, 0, 0.1);
          border: 1px solid rgba(255, 215, 0, 0.2);
          color: #ffd700;
          padding: 0.6rem 2rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .reset-button:hover {
          background: rgba(255, 215, 0, 0.2);
        }

        /* Map */
        .map-container {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .map-container h2 {
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          color: #ffd700;
        }

        .map-wrapper {
          flex: 1;
          min-height: 300px;
          border-radius: 8px;
          overflow: hidden;
          background: #1a1a1a;
        }

        .map-wrapper iframe {
          min-height: 300px;
        }

        .map-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .map-info p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .map-link {
          color: #ffd700;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .map-link:hover {
          color: #e6c200;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .form-map-grid {
            grid-template-columns: 1fr;
          }

          .map-wrapper {
            min-height: 250px;
          }
        }

        @media (max-width: 768px) {
          .kontakt-page {
            padding-top: 6rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .kontakt-container {
            padding: 0 1rem 2rem;
          }

          .info-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-container {
            padding: 1.5rem;
          }

          .whatsapp-section {
            padding: 1rem 1.2rem;
            flex-direction: column;
            align-items: stretch;
          }

          .whatsapp-content {
            flex-direction: column;
            text-align: center;
          }

          .whatsapp-button {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .whatsapp-section {
            padding: 1rem;
          }

          .form-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}