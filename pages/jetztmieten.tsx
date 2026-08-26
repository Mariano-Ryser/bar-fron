import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle,
  Send,
  User,
  AtSign,
  MessageSquare,
  FileText
} from 'lucide-react';

import emailjs from '@emailjs/browser';

export default function JetztMieten() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    betreff: '',
    name: '',
    email: '',
    telefon: '',
    text: ''
  });

  const imageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
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

    const refs = [introRef, formRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        betreff: formData.betreff,
        name: formData.name,
        email: formData.email,
        telefon: formData.telefon,
        text: formData.text,
      },
      'YOUR_PUBLIC_KEY'
    );
    
    if (result.status === 200) {
      setSubmitSuccess(true);
      setFormData({
        betreff: '',
        name: '',
        email: '',
        telefon: '',
        text: ''
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  } catch (error) {
    console.error('Error al enviar:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  const handlePhoneClick = () => {
    window.location.href = 'tel:0762275543';
  };

  return (
    <div className="jetztmieten-page">
      {/* Hero Image con Parallax y blur */}
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <div className="hero-image-inner" ref={imageRef}>
            <Image
              src="/img/jetztmieten/jetztmieten1.jpg"
              alt="Salotto Zürich mieten"
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
                Jetzt Offerte
              </h1>
              <p className={`hero-subtitle ${isHeroVisible ? 'visible' : ''}`}>
                anfragen
              </p>
              <div className={`hero-line ${isHeroVisible ? 'visible' : ''}`}></div>
              <p className={`hero-description ${isHeroVisible ? 'visible' : ''}`}>
                Datum sichern – Verfügbarkeiten sind begrenzt!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section - TEXTO COMPLETO */}
      <div 
        ref={introRef}
        data-section="intro"
        className={`intro-section ${visibleSections.has('intro') ? 'visible' : ''}`}
      >
        <div className="intro-content">
          <p className="intro-text">
            Interesse geweckt? Wir freuen uns auf Deine Nachricht! Sende uns Deine unverbindliche 
            Anfrage über das Kontaktformular oder ruf uns einfach an – wir beraten Dich gerne persönlich.
          </p>
          <p className="intro-text highlight">
            Jetzt Datum sichern – Verfügbarkeiten sind begrenzt! Füll einfach das Formular aus – 
            wir senden Dir alle Details zu unserem Angebot, Verfügbarkeiten und Preisen direkt per E-Mail zu.
          </p>
          <div className="intro-features">
            <div className="intro-feature" onClick={handlePhoneClick} style={{ cursor: 'pointer' }}>
              <Phone size={20} color="#ffffff" stroke="#ffffff" />
              <span className="feature-text"> 076 227 55 43</span>
            </div>
            <div className="intro-feature">
              <Calendar size={20} color="#ffffff" stroke="#ffffff" />
              <span className="feature-text">Mo–Fr, 9–17 Uhr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form + Image Section */}
      <div 
        ref={formRef}
        data-section="form"
        className={`form-section ${visibleSections.has('form') ? 'visible' : ''}`}
      >
        <div className="form-grid">
          {/* Form Column */}
          <div className="form-column">
            <h2>Kontaktformular</h2>
            <p className="form-subtitle">Jetzt für Party anfragen</p>
            
            {submitSuccess ? (
              <div className="success-message">
                <CheckCircle size={48} color="#ffd700" stroke="#ffd700" />
                <h3>Vielen Dank!</h3>
                <p>Deine Anfrage wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Dir!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="betreff">
                    <FileText size={18} color="#ffffff" stroke="#ffffff" />
                    Betreff
                  </label>
                  <select
                    id="betreff"
                    name="betreff"
                    value={formData.betreff}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Geburtstagsfeier">Geburtstagsfeier</option>
                    <option value="Firmenanlass">Firmenanlass</option>
                    <option value="Privatparty">Privatparty</option>
                    <option value="Apéro">Apéro</option>
                    <option value="Mittagessen">Mittagessen</option>
                    <option value="Anderes">Anderes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="name">
                    <User size={18} color="#ffffff" stroke="#ffffff" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Dein vollständiger Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <AtSign size={18} color="#ffffff" stroke="#ffffff" />
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="deine@email.ch"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefon">
                    <Phone size={18} color="#ffffff" stroke="#ffffff" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    placeholder="079 123 45 67"
                    value={formData.telefon}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="text">
                    <MessageSquare size={18} color="#ffffff" stroke="#ffffff" />
                    Nachricht
                  </label>
                  <textarea
                    id="text"
                    name="text"
                    rows={5}
                    placeholder="Deine Nachricht an uns..."
                    value={formData.text}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <>
                      <Send size={20} color="#ffffff" stroke="#ffffff" />
                      <span>Anfrage senden</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Image Column */}
          <div className="image-column">
            <div className="image-card">
              <div className="image-wrapper">
                <Image
                  src="/img/jetztmieten/jetztmieten2.jpg"
                  alt="Salotto Zürich Event Location"
                  fill
                  style={{ objectFit: 'cover' }}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="image-overlay-content">
                <div className="image-badge">
                  <Calendar size={24} color="#ffd700" stroke="#ffd700" />
                  <span>Jetzt Datum sichern!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        ref={ctaRef}
        data-section="cta"
        className={`cta-section ${visibleSections.has('cta') ? 'visible' : ''}`}
      >
        <h2>Bereit für Deinen Event?</h2>
        <p>Wir beraten Dich gerne persönlich</p>
        <div className="cta-buttons">
          <button onClick={handlePhoneClick} className="cta-btn primary">
            <Phone size={20} color="#ffffff" stroke="#ffffff" />
            <span className="btn-text">076 227 55 43</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .jetztmieten-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 0rem;
          color: #ffffff;
          overflow: hidden;
          width: 100%;
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
          font-size: 1.5rem;
          color: rgba(255, 215, 0, 0.8);
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
          color: rgba(255, 255, 255, 0.7);
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
          max-width: 900px;
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
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 1.5rem;
        }

        .intro-text.highlight {
          color: rgba(255, 215, 0, 0.8);
          font-size: 1.1rem;
          padding: 1.5rem;
          border: 1px solid rgba(255, 215, 0, 0.15);
          border-radius: 8px;
          background: rgba(255, 215, 0, 0.03);
        }

        .intro-features {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          margin-top: 1.5rem;
        }

        .intro-feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
        }

        .feature-text {
          color: #ffffff;
        }

        .intro-feature svg {
          flex-shrink: 0;
        }

        /* ===== FORM SECTION ===== */
        .form-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* Form Column */
        .form-column h2 {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 2px;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .form-group select,
        .form-group input,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 0.85rem 1rem;
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
          width: 100%;
          box-sizing: border-box;
        }

        .form-group select option {
          background: #1a1a1a;
          color: #ffffff;
        }

        .form-group select:focus,
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(255, 215, 0, 0.4);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-group select::placeholder,
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: rgba(255, 215, 0, 0.15);
          border: 1px solid rgba(255, 215, 0, 0.3);
          color: #ffffff;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
          margin-top: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: rgba(255, 215, 0, 0.25);
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.02);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn span {
          color: #ffffff;
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          text-align: center;
          padding: 3rem 2rem;
          background: rgba(255, 215, 0, 0.05);
          border: 1px solid rgba(255, 215, 0, 0.2);
          border-radius: 12px;
        }

        .success-message h3 {
          font-size: 1.5rem;
          font-weight: 300;
          color: #ffffff;
          margin: 1rem 0 0.5rem;
        }

        .success-message p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1rem;
        }

        /* Image Column */
        .image-column {
          display: flex;
          align-items: center;
        }

        .image-card {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          aspect-ratio: 4/3;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .image-wrapper img {
          transition: transform 0.6s ease;
        }

        .image-card:hover .image-wrapper img {
          transform: scale(1.05);
        }

        .image-overlay-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        }

        .image-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 215, 0, 0.2);
        }

        .image-badge span {
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        /* ===== CTA ===== */
        .cta-section {
          max-width: 800px;
          margin: 0 auto;
          padding: 3rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
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
          color: #ffffff;
        }

        .cta-section p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.05rem;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 2.5rem;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 1px;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-btn.primary {
          background: rgba(255, 215, 0, 0.15);
          border-color: rgba(255, 215, 0, 0.3);
          color: #ffffff;
        }

        .cta-btn.primary:hover {
          background: rgba(255, 215, 0, 0.25);
          border-color: rgba(255, 215, 0, 0.6);
          transform: scale(1.02);
        }

        .cta-btn .btn-text {
          color: #ffffff;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .hero-image-container {
            height: 50vh;
            min-height: 350px;
            max-height: 500px;
          }
          .hero-title { font-size: 3rem; }
          .form-grid { gap: 2.5rem; }
        }

        @media (max-width: 768px) {
          .jetztmieten-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 8rem;
          color: #ffffff;
          overflow: hidden;
          width: 100%;
        }
          .hero-image-container {
            height: 40vh;
            min-height: 300px;
            max-height: 400px;
          }
          .hero-title { font-size: 2.5rem; }
          .hero-subtitle { font-size: 1.2rem; }
          .hero-description { font-size: 1rem; }
          
          .intro-section { 
            padding: 2rem 1.5rem; 
          }
          .intro-text { 
            font-size: 0.95rem; 
            margin-bottom: 1rem;
          }
          .intro-text.highlight { 
            font-size: 1rem; 
            padding: 1rem; 
          }
          .intro-features { 
            flex-direction: column; 
            gap: 0.75rem; 
            align-items: center; 
          }
          
          .form-section { 
            padding: 2rem 1.5rem; 
          }
          .form-grid { 
            grid-template-columns: 1fr; 
            gap: 1.5rem; 
          }
          .form-column h2 { 
            font-size: 1.6rem; 
          }
          .contact-form { 
            gap: 1rem; 
          }
          
          .image-card { 
            aspect-ratio: 16/10; 
          }
          
          .cta-section { 
            padding: 2rem 1.5rem; 
          }
          .cta-section h2 { 
            font-size: 1.6rem; 
          }
          .cta-buttons { 
            flex-direction: column; 
            align-items: center; 
          }
          .cta-btn { 
            width: 100%; 
            justify-content: center; 
            padding: 0.8rem 2rem; 
            font-size: 0.95rem; 
          }
        }

        @media (max-width: 480px) {
          .jetztmieten-page { 
            padding-top: 6rem; 
          }
          
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
            font-size: 1rem; 
          }
          .hero-description { 
            font-size: 0.9rem; 
          }
          
          .intro-section { 
            padding: 1.5rem 1.2rem; 
          }
          .intro-text { 
            font-size: 0.9rem; 
          }
          .intro-text.highlight { 
            font-size: 0.95rem; 
            padding: 0.75rem; 
          }
          .intro-feature { 
            font-size: 0.9rem; 
          }
          
          .form-section { 
            padding: 1.5rem 1.2rem; 
          }
          .form-grid { 
            gap: 1rem; 
          }
          .form-column h2 { 
            font-size: 1.3rem; 
          }
          .form-subtitle { 
            font-size: 0.9rem; 
            margin-bottom: 1.5rem;
          }
          .form-group select,
          .form-group input,
          .form-group textarea { 
            padding: 0.7rem 0.85rem; 
            font-size: 0.9rem; 
          }
          .form-group textarea { 
            min-height: 100px; 
          }
          .submit-btn { 
            padding: 0.8rem 1.6rem; 
            font-size: 0.9rem; 
          }
          
          .image-badge { 
            padding: 0.5rem 1rem; 
          }
          .image-badge span { 
            font-size: 0.85rem; 
          }
          
          .cta-section { 
            padding: 1.5rem 1.2rem; 
          }
          .cta-section h2 { 
            font-size: 1.3rem; 
          }
          .cta-section p { 
            font-size: 0.9rem; 
            margin-bottom: 1.5rem;
          }
          .cta-btn { 
            font-size: 0.85rem; 
            padding: 0.6rem 1.6rem; 
          }
          
          .success-message { 
            padding: 2rem 1.5rem; 
          }
          .success-message h3 { 
            font-size: 1.2rem; 
          }
          .success-message p { 
            font-size: 0.9rem; 
          }
        }
      `}</style>
    </div>
  );
}