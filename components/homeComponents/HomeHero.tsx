import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const isTransitioningRef = useRef(false);

  // Define los elementos del carousel (imágenes y videos)
  const slides = [
    { type: 'image', src: '/img/bar1w.webp', alt: 'Bar Ambiente 1' },
    { type: 'image', src: '/img/bar22.jpg', alt: 'Bar Ambiente 2' },
    { type: 'image', src: '/img/bar33.jpg', alt: 'Bar Ambiente 3' },
    { type: 'image', src: '/img/bar23.jpg', alt: 'Bar Ambiente 4' },
    { type: 'image', src: '/img/bar5.jpg', alt: 'Bar Ambiente 5' },
    { type: 'image', src: '/img/bar44.jpg', alt: 'Bar Ambiente 6' },
    { type: 'video', src: '/img/videoPlato.mp4', alt: 'Video Plato' },
  ];

  useEffect(() => {
    startAutoPlay();
    
    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 300);

    const loadTimer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(contentTimer);
      clearTimeout(loadTimer);
      // Detener todos los videos al desmontar
      Object.values(videoRefs.current).forEach(video => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };
  }, []);

  // Controlar reproducción de videos cuando cambia el slide
  useEffect(() => {
    // Resetear estado del video
    setIsVideoEnded(false);
    
    // Detener todos los videos
    Object.entries(videoRefs.current).forEach(([index, video]) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Reproducir el video actual si existe
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo && slides[currentIndex].type === 'video') {
      currentVideo.play().catch(err => {
        console.log('Autoplay bloqueado:', err);
      });
    }
  }, [currentIndex]);

  // Manejador cuando el video termina
  const handleVideoEnded = () => {
    setIsVideoEnded(true);
    // Esperar un momento y luego pasar al siguiente slide
    setTimeout(() => {
      if (!isTransitioningRef.current) {
        goToNext();
      }
    }, 500); // Pequeña pausa para que se vea el final del video
  };

  const startAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      // Solo cambiar si no estamos en un video o si el video ya terminó
      const currentSlide = slides[currentIndex];
      if (currentSlide.type !== 'video' || isVideoEnded) {
        if (!isTransitioningRef.current) {
          goToNext();
        }
      }
    }, 5000);
  };

  const goToPrevious = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    resetTimer();
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1500);
  };

  const goToNext = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    resetTimer();
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioningRef.current || index === currentIndex) return;
    isTransitioningRef.current = true;
    setCurrentIndex(index);
    resetTimer();
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1500);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      startAutoPlay();
    }
  };

  // Renderizar cada slide (imagen o video)
  const renderSlide = (slide: typeof slides[0], index: number) => {
    const isActive = index === currentIndex;

    if (slide.type === 'video') {
      return (
        <video
          ref={(el) => { videoRefs.current[index] = el; }}
          src={slide.src}
          className="carousel-video"
          muted
          playsInline
          preload="metadata"
          loop={false}
          onEnded={handleVideoEnded}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      );
    } else {
      return (
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          quality={100}
          sizes="100vw"
          className="carousel-image"
          style={{
            objectFit: 'cover',
          }}
        />
      );
    }
  };

  return (
    <section className="hero-carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => {
          const isFirstImage = index === 0 && isFirstLoad;
          const isActive = index === currentIndex;
          
          return (
            <div
              key={index}
              className={`carousel-slide ${isActive ? 'active' : ''} ${isFirstImage ? 'first-load' : ''}`}
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                transition: 'opacity 1.5s ease-in-out',
              }}
            >
              {renderSlide(slide, index)}
              <div className="image-overlay"></div>
              
              {/* Indicador de carga para videos */}
              {slide.type === 'video' && isActive && (
                <div className="video-indicator">
                  <div className="video-progress"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Contenido del hero - Con Logo */}
        <div className={`hero-content ${isContentVisible ? 'visible' : ''}`}>
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
        <div className={`dots-container ${isContentVisible ? 'visible' : ''}`}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Gehe zu Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Botones */}
        <button 
          className={`nav-button prev ${isContentVisible ? 'visible' : ''}`}
          onClick={goToPrevious}
          aria-label="Vorheriges Bild"
          disabled={isTransitioningRef.current}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button 
          className={`nav-button next ${isContentVisible ? 'visible' : ''}`}
          onClick={goToNext}
          aria-label="Nächstes Bild"
          disabled={isTransitioningRef.current}
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
          will-change: transform;
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
          will-change: opacity, transform;
        }

        .carousel-slide.active {
          opacity: 1;
        }

        .carousel-slide:not(.active) {
          opacity: 0;
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
          will-change: transform;
        }

        .carousel-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
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

        /* Video indicator */
        .video-indicator {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          width: 100px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .video-progress {
          height: 100%;
          width: 0%;
          background: white;
          border-radius: 2px;
          animation: videoProgress 5s linear forwards;
        }

        @keyframes videoProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Hero Content - Mejorado */
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
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
        }

        .hero-content.visible {
          opacity: 1;
        }

        /* Logo Container */
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .hero-content.visible .logo-container {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-logo {
          max-width: 400px;
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 30px rgba(0, 0, 0, 0.5));
          animation: logoPulse 4s ease-in-out infinite;
          will-change: filter;
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
          margin: 0;
          opacity: 0;
          transform: translateY(15px);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
          will-change: transform, opacity;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          backface-visibility: hidden;
        }

        .hero-content.visible .hero-subtitle {
          opacity: 1;
          transform: translateY(0);
        }

        /* Dots - Con transición suave */
        .dots-container {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.75rem;
          z-index: 10;
          opacity: 0;
          transition: opacity 1s ease 0.8s;
          will-change: opacity;
        }

        .dots-container.visible {
          opacity: 1;
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
          will-change: transform, background;
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

        /* Botones - Con transición suave */
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
          opacity: 0;
          pointer-events: none;
          will-change: opacity, transform;
        }

        .nav-button.visible {
          opacity: 0.6;
          pointer-events: auto;
        }

        .nav-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
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

          .video-indicator {
            bottom: 60px;
            width: 80px;
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

          .video-indicator {
            bottom: 50px;
            width: 60px;
          }
        }
      `}</style>
    </section>
  );
}