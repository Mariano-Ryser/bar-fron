import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const images = [
    { src: '/img/bar1w.webp', alt: 'Bar Ambiente 1' },
    { src: '/img/bar2.jpg', alt: 'Bar Ambiente 2' },
    { src: '/img/bar3.jpg', alt: 'Bar Ambiente 3' },
    { src: '/img/bar4.jpg', alt: 'Bar Ambiente 4' },
    { src: '/img/bar5.jpg', alt: 'Bar Ambiente 5' }
  ];

  useEffect(() => {
    startAutoPlay();
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(timer);
    };
  }, []);

  const startAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetTimer();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetTimer();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      startAutoPlay();
    }
  };

  return (
    <section className="hero-carousel">
      <div className="carousel-container">
        {images.map((image, index) => {
          const isFirstImage = index === 0 && isFirstLoad;
          
          return (
            <div
              key={index}
              className={`carousel-slide ${index === currentIndex ? 'active' : ''} ${isFirstImage ? 'first-load' : ''}`}
              style={{
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 2 : 1,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                quality={100}
                sizes="100vw"
                className="carousel-image"
                style={{
                  objectFit: 'cover',
                }}
              />
              <div className="image-overlay"></div>
            </div>
          );
        })}

        {/* Contenido del hero - Con Logo */}
        <div className="hero-content">
          <div className="logo-container">
            <img
              src="/img/logo-salotto.png" 
              alt="Salotto Logo"
              className="hero-logo"
            />
          </div>
          <h2 className="hero-subtitle">BAR | RESTAURANT | EVENTLOCATION</h2>
        </div>

        {/* Dots */}
        <div className="dots-container">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Gehe zu Bild ${index + 1}`}
            />
          ))}
        </div>

        {/* Botones */}
        <button 
          className="nav-button prev"
          onClick={goToPrevious}
          aria-label="Vorheriges Bild"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button 
          className="nav-button next"
          onClick={goToNext}
          aria-label="Nächstes Bild"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <style jsx>{`
        .hero-carousel {
          width: 100%;
          height: 80vh;
          position: relative;
          overflow: hidden;
          margin-top: 0;
          background: #000;
        }

        .carousel-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          transition: opacity 1.5s ease-in-out, transform 8s ease-in-out;
          transform: scale(1);
        }

        .carousel-slide.active {
          opacity: 1;
          transform: scale(1);
        }

        .carousel-slide:not(.active) {
          opacity: 0;
          transform: scale(1.1);
        }

        .carousel-slide.first-load {
          animation: blurFadeIn 2s ease-out forwards;
        }

        @keyframes blurFadeIn {
          0% {
            opacity: 0;
            filter: blur(20px);
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: scale(1);
          }
        }

        .carousel-image {
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 10s ease-in-out;
        }

        .carousel-slide.active .carousel-image {
          animation: slowZoom 10s ease-in-out infinite;
        }

        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 3;
        }

        /* Hero Content */
        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          color: #ffffff;
          width: 90%;
          max-width: 900px;
          pointer-events: none;
          animation: fadeInContent 2s ease-out;
        }

        @keyframes fadeInContent {
          0% {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        /* Logo Container */
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .hero-logo {
          max-width: 400px;
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 30px rgba(0, 0, 0, 0.5));
          animation: logoPulse 4s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% {
            filter: drop-shadow(0 4px 30px rgba(0, 0, 0, 0.5));
          }
          50% {
            filter: drop-shadow(0 4px 50px rgba(255, 255, 255, 0.1));
          }
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 8px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
          color: rgba(255, 255, 255, 0.9);
          animation: fadeInUp 2.5s ease-out;
          margin: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Dots */
        .dots-container {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
          z-index: 10;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 0;
        }

        .dot:hover {
          transform: scale(1.3);
          background: rgba(255, 255, 255, 0.6);
        }

        .dot.active {
          background: #ffffff;
          border-color: #ffffff;
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        /* Botones */
        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
          pointer-events: auto;
        }

        .nav-button:hover {
          background: rgba(255, 255, 255, 0.15);
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .nav-button.prev {
          left: 2rem;
        }

        .nav-button.next {
          right: 2rem;
        }

        .nav-button svg {
          width: 24px;
          height: 24px;
          stroke: #ffffff;
          stroke-width: 2;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-logo {
            max-width: 320px;
          }

          .hero-subtitle {
            font-size: 1.2rem;
            letter-spacing: 6px;
          }
        }

        @media (max-width: 768px) {
          .hero-logo {
            max-width: 250px;
          }

          .hero-subtitle {
            font-size: 1rem;
            letter-spacing: 4px;
          }

          .nav-button {
            width: 45px;
            height: 45px;
          }

          .nav-button svg {
            width: 20px;
            height: 20px;
          }

          .nav-button.prev {
            left: 1rem;
          }

          .nav-button.next {
            right: 1rem;
          }

          .dots-container {
            bottom: 1.5rem;
            gap: 0.5rem;
          }

          .dot {
            width: 10px;
            height: 10px;
          }

          .logo-container {
            margin-bottom: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-logo {
            max-width: 180px;
          }

          .hero-subtitle {
            font-size: 0.75rem;
            letter-spacing: 3px;
          }

          .nav-button {
            width: 38px;
            height: 38px;
          }

          .nav-button svg {
            width: 16px;
            height: 16px;
          }

          .nav-button.prev {
            left: 0.5rem;
          }

          .nav-button.next {
            right: 0.5rem;
          }

          .dots-container {
            bottom: 1rem;
            gap: 0.4rem;
          }

          .dot {
            width: 8px;
            height: 8px;
          }

          .logo-container {
            margin-bottom: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}