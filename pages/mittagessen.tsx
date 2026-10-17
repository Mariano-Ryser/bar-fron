import { useRouter } from 'next/router';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import {
  Clock,
  Utensils,
  Soup,
  Salad,
  Phone,
  Coffee,
} from 'lucide-react';
import Seo from '../components/Seo/Seo';
import { siteConfig } from '../config/siteConfig';

const ICONS: Record<string, any> = {
  clock: Clock,
  utensils: Utensils,
  coffee: Coffee,
};

export default function Mittagessen() {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const introRef = useRef<HTMLDivElement>(null);
  const warmeRef = useRef<HTMLDivElement>(null);
  const kalteRef = useRef<HTMLDivElement>(null);
  const reservationRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { seo, hero, intro, warmeKueche, kalteKueche, reservation } =
    siteConfig.pages.mittagessen;

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

    const refs = [introRef, warmeRef, kalteRef, reservationRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleReservationClick = () => {
    window.location.href = reservation.phoneHref;
  };

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        url={seo.url}
        image={seo.image}
      />

      <div className="mittagessen-page">
        {/* HERO */}
        <div className="hero-image-container">
          <div className="hero-image-wrapper">
            <div className="hero-image-inner" ref={imageRef}>
              <Image
                src={hero.image}
                alt={hero.imageAlt}
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
                <p
                  className={`hero-eyebrow ${
                    isHeroVisible ? 'visible' : ''
                  }`}
                >
                  Salotto Zürich
                </p>
                <h1
                  className={`hero-title ${isHeroVisible ? 'visible' : ''}`}
                >
                  {hero.title}
                </h1>
                <p
                  className={`hero-subtitle ${
                    isHeroVisible ? 'visible' : ''
                  }`}
                >
                  {hero.subtitle}
                </p>
                <div
                  className={`hero-line ${isHeroVisible ? 'visible' : ''}`}
                />
                <p
                  className={`hero-description ${
                    isHeroVisible ? 'visible' : ''
                  }`}
                >
                  {hero.description}
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
            <p className="intro-text">{intro.text}</p>
            <div className="intro-features">
              {intro.features.map((f, i) => {
                const Icon = ICONS[f.icon] ?? Clock;
                return (
                  <div
                    key={i}
                    className="intro-feature"
                    style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                  >
                    <span className="feature-icon">
                      <Icon size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                    </span>
                    <span className="feature-text">{f.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* WARME KÜCHE */}
        <div
          ref={warmeRef}
          data-section="warme"
          className={`section-with-image ${
            visibleSections.has('warme') ? 'visible' : ''
          }`}
        >
          <div className="section-text">
            <span className="section-eyebrow">01 — Warme Küche</span>
            <h2 className="section-title">
              <span className="title-icon">
                <Soup size={26} color="#ffd700" stroke="#ffd700" strokeWidth={1.8} />
              </span>
              <span className="title-text">{warmeKueche.title}</span>
            </h2>
            <div className="menu-items">
              {warmeKueche.items.map((item, i) => (
                <div
                  key={i}
                  className="menu-item"
                  style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                >
                  <span className="menu-dot">•</span>
                  <span className="menu-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="section-image">
            <Image
              src={warmeKueche.image}
              alt={warmeKueche.imageAlt}
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* KALTE KÜCHE */}
        <div
          ref={kalteRef}
          data-section="kalte"
          className={`section-with-image reverse ${
            visibleSections.has('kalte') ? 'visible' : ''
          }`}
        >
          <div className="section-text">
            <span className="section-eyebrow">02 — Kalte Küche</span>
            <h2 className="section-title">
              <span className="title-icon">
                <Salad size={26} color="#ffd700" stroke="#ffd700" strokeWidth={1.8} />
              </span>
              <span className="title-text">{kalteKueche.title}</span>
            </h2>
            {kalteKueche.subtitle && (
              <p className="section-subtitle">{kalteKueche.subtitle}</p>
            )}
            <div className="menu-items">
              {kalteKueche.items.map((item, i) => (
                <div
                  key={i}
                  className="menu-item"
                  style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                >
                  <span className="menu-dot">•</span>
                  <span className="menu-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="section-image">
            <Image
              src={kalteKueche.image}
              alt={kalteKueche.imageAlt}
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* RESERVATION */}
        <div
          ref={reservationRef}
          data-section="reservation"
          className={`reservation-section ${
            visibleSections.has('reservation') ? 'visible' : ''
          }`}
        >
          <div className="reservation-content">
            <div className="reservation-icon-wrapper">
              <Phone size={38} color="#ffd700" stroke="#ffd700" strokeWidth={1.6} />
            </div>
            <span className="section-eyebrow center">03 — Reservation</span>
            <h2 className="reservation-title">{reservation.title}</h2>
            <p className="reservation-text">{reservation.text}</p>
            <div className="reservation-details">
              <div className="reservation-detail">
                <Clock size={18} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                <span className="detail-text">{reservation.hours}</span>
              </div>
              <div className="reservation-detail">
                <Phone size={18} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
                <span className="detail-text">{reservation.phone}</span>
              </div>
            </div>
            <button onClick={handleReservationClick} className="reservation-btn">
              <Phone size={20} color="#ffffff" stroke="#ffffff" strokeWidth={1.8} />
              <span className="btn-text">{reservation.buttonText}</span>
            </button>
          </div>
        </div>

        <style jsx>{`
          /* ============ BASE ============ */
          .mittagessen-page {
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
            max-width: 900px;
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
            font-size: 1.08rem;
            line-height: 1.85;
            color: rgba(255, 255, 255, 0.88);
            margin: 0 0 2.2rem;
            font-weight: 400;
          }

          .intro-features {
            display: flex;
            justify-content: center;
            gap: 2.5rem;
            flex-wrap: wrap;
          }

          .intro-feature {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1rem;
            opacity: 0;
            transform: translateY(16px);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }

          .intro-section.visible .intro-feature {
            opacity: 1;
            transform: translateY(0);
          }

          .feature-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            flex-shrink: 0;
          }

          .feature-text {
            color: #fff;
            font-weight: 400;
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

          .section-with-image.reverse {
            direction: rtl;
          }

          .section-with-image.reverse .section-text {
            direction: ltr;
          }

          .section-text {
            direction: ltr;
          }

          /* Subrayado animado en los títulos de sección */
          .section-title {
            font-size: clamp(1.6rem, 3vw, 2.2rem);
            font-weight: 500;
            letter-spacing: 1px;
            margin: 0 0 1.8rem;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            position: relative;
            padding-bottom: 1rem;
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s;
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
            transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
          }

          .section-with-image.visible .section-title::after {
            width: 90px;
          }

          .title-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.08);
            border: 1px solid rgba(255, 215, 0, 0.2);
            flex-shrink: 0;
          }

          .title-text {
            display: inline-block;
          }

          /* Eyebrow editorial arriba del título */
          .section-eyebrow {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.4);
            margin-bottom: 0.8rem;
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
          }

          .section-with-image.visible .section-eyebrow {
            opacity: 1;
            transform: translateX(0);
          }

          .section-eyebrow.center {
            display: block;
            text-align: center;
            transform: translateY(-10px);
          }

          .reservation-section.visible .section-eyebrow.center {
            transform: translateY(0);
          }

          .section-subtitle {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.7);
            margin: 0 0 1.6rem;
            font-weight: 400;
            line-height: 1.6;
          }

          .menu-items {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
          }

          .menu-item {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            font-size: 1.02rem;
            line-height: 1.55;
            padding: 0.3rem 0;
            opacity: 0;
            transform: translateX(-16px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }

          .section-with-image.visible .menu-item {
            opacity: 1;
            transform: translateX(0);
          }

          .section-with-image.reverse.visible .menu-item {
            animation: menuSlideRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          @keyframes menuSlideRight {
            from {
              opacity: 0;
              transform: translateX(16px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .section-with-image.reverse .menu-item {
            transform: translateX(16px);
          }

          .menu-text {
            color: rgba(255, 255, 255, 0.92);
            font-weight: 400;
          }

          .menu-dot {
            color: #ffd700;
            font-size: 1.15rem;
            line-height: 1.5;
            flex-shrink: 0;
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

          /* ============ RESERVATION ============ */
          .reservation-section {
            max-width: 800px;
            margin: 0 auto;
            padding: 4.5rem 2rem;
            text-align: center;
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .reservation-section.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .reservation-content {
            position: relative;
          }

          .reservation-icon-wrapper {
            margin: 0 auto 1.4rem;
            width: 82px;
            height: 82px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.08);
            border: 1px solid rgba(255, 215, 0, 0.22);
            animation: pulseGlow 2.4s ease-in-out infinite;
          }

          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.18);
            }
            50% {
              box-shadow: 0 0 0 14px rgba(255, 215, 0, 0);
            }
          }

          .reservation-title {
            font-size: clamp(1.7rem, 3vw, 2.2rem);
            font-weight: 500;
            letter-spacing: 1px;
            color: #fff;
            margin: 0 0 1rem;
            position: relative;
            display: inline-block;
            padding-bottom: 1rem;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
          }

          .reservation-section.visible .reservation-title {
            opacity: 1;
            transform: translateY(0);
          }

          .reservation-title::after {
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

          .reservation-section.visible .reservation-title::after {
            width: 90px;
          }

          .reservation-text {
            font-size: 1.05rem;
            color: rgba(255, 255, 255, 0.85);
            line-height: 1.85;
            margin: 0 0 2rem;
            font-weight: 400;
          }

          .reservation-details {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-bottom: 2.2rem;
            flex-wrap: wrap;
          }

          .reservation-detail {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.02rem;
            font-weight: 400;
          }

          .detail-text {
            color: #fff;
          }

          .reservation-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(255, 215, 0, 0.12);
            border: 1px solid rgba(255, 215, 0, 0.3);
            color: #fff;
            padding: 1rem 3rem;
            border-radius: 50px;
            font-size: 1.02rem;
            font-weight: 500;
            letter-spacing: 0.8px;
            cursor: pointer;
            transition: background 0.3s ease, transform 0.3s ease,
              box-shadow 0.3s ease, border-color 0.3s ease;
          }

          .reservation-btn:hover {
            background: rgba(255, 215, 0, 0.24);
            border-color: rgba(255, 215, 0, 0.6);
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(255, 215, 0, 0.15);
          }

          .btn-text {
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

            .intro-features {
              gap: 1.8rem;
            }
          }

          @media (max-width: 768px) {
            .mittagessen-page {
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
              padding: 3rem 1.4rem;
            }

            .intro-text {
              font-size: 1rem;
            }

            .intro-features {
              flex-direction: column;
              gap: 0.9rem;
              align-items: center;
            }

            .section-with-image {
              grid-template-columns: 1fr;
              gap: 1.8rem;
              padding: 3rem 1.4rem;
            }

            .section-with-image.reverse {
              direction: ltr;
            }

            .section-with-image.reverse .section-text {
              transform: none;
            }

            .section-image {
              aspect-ratio: 16/10;
            }

            .menu-item {
              font-size: 0.98rem;
            }

            .reservation-section {
              padding: 3rem 1.4rem;
            }

            .reservation-icon-wrapper {
              width: 68px;
              height: 68px;
            }

            .reservation-icon-wrapper svg {
              width: 30px;
              height: 30px;
            }

            .reservation-details {
              flex-direction: column;
              gap: 0.9rem;
              align-items: center;
            }

            .reservation-btn {
              padding: 0.9rem 2.2rem;
              font-size: 0.98rem;
            }
          }

          @media (max-width: 480px) {
            .mittagessen-page {
              padding-top: 6rem;
            }

            .hero-image-container {
              height: 38vh;
              min-height: 260px;
              max-height: 360px;
            }

            .section-title {
              font-size: 1.35rem;
              gap: 0.6rem;
            }

            .title-icon {
              width: 38px;
              height: 38px;
            }

            .title-icon svg {
              width: 20px;
              height: 20px;
            }

            .menu-item {
              font-size: 0.92rem;
            }

            .reservation-text {
              font-size: 0.98rem;
            }

            .reservation-detail {
              font-size: 0.95rem;
            }

            .reservation-btn {
              padding: 0.75rem 1.8rem;
              font-size: 0.92rem;
            }

            .intro-text {
              font-size: 0.95rem;
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
            .intro-feature,
            .section-with-image,
            .section-text,
            .section-title,
            .section-title::after,
            .section-eyebrow,
            .menu-item,
            .section-image,
            .reservation-section,
            .reservation-icon-wrapper,
            .reservation-title,
            .reservation-title::after,
            .reservation-content {
              animation: none !important;
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
            .section-title::after,
            .reservation-title::after {
              width: 90px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}