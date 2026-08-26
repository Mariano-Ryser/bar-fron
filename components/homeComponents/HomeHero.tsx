import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function HomeHero() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const isTransitioningRef = useRef(false);

  // ============================================
  // SLIDES
  // ============================================

  const slides = [
    {
      type: 'image',
      src: '/img/bar33.jpg',
      alt: 'Bar Ambiente 3',
    },
    {
      type: 'image',
      src: '/img/bar23.jpg',
      alt: 'Bar Ambiente 4',
    },
    {
      type: 'image',
      src: '/img/bar1w.webp',
      alt: 'Bar Ambiente 1',
    },
    {
      type: 'image',
      src: '/img/bar5.jpg',
      alt: 'Bar Ambiente 5',
    },
    {
      type: 'image',
      src: '/img/bar22.jpg',
      alt: 'Bar Ambiente 2',
    },
    {
      type: 'image',
      src: '/img/bar44.jpg',
      alt: 'Bar Ambiente 6',
    },

    // {
    //   type: 'video',
    //   src: '/img/videoPlato.mp4',
    //   alt: 'Video Plato',
    // },
  ];

  // ============================================
  // NAVIGATION LINKS
  // ============================================

  const navLinks = [
    {
      href: '/firmenevents',
      text: 'Eventlocation',
    },
    {
      href: '/geburtstag',
      text: 'Geburtstag',
    },
    {
      href: '/apero',
      text: 'Apéro',
    },
    {
      href: '/mittagessen',
      text: 'Mittagessen',
    },
    {
      href: '/jetztmieten',
      text: 'Jetzt mieten',
    },
    {
      href: '/konditionen',
      text: 'Konditionen',
    },
  ];

  // ============================================
  // INITIAL LOAD
  // ============================================

  useEffect(() => {
    startAutoPlay();

    const contentTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 300);

    const loadTimer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2500);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      clearTimeout(contentTimer);
      clearTimeout(loadTimer);

      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };
  }, []);

  // ============================================
  // VIDEO CONTROL
  // ============================================

  useEffect(() => {
    setIsVideoEnded(false);

    Object.entries(videoRefs.current).forEach(([index, video]) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const currentVideo = videoRefs.current[currentIndex];

    if (
      currentVideo &&
      slides[currentIndex].type === 'video'
    ) {
      currentVideo.play().catch((err) => {
        console.log('Autoplay bloqueado:', err);
      });
    }
  }, [currentIndex]);

  const handleVideoEnded = () => {
    setIsVideoEnded(true);

    setTimeout(() => {
      if (!isTransitioningRef.current) {
        goToNext();
      }
    }, 500);
  };

  // ============================================
  // AUTOPLAY
  // ============================================

  const startAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      const currentSlide = slides[currentIndex];

      if (
        currentSlide.type !== 'video' ||
        isVideoEnded
      ) {
        if (!isTransitioningRef.current) {
          goToNext();
        }
      }
    }, 5000);
  };

  // ============================================
  // SLIDE NAVIGATION
  // ============================================

  const goToPrevious = () => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;

    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

    resetTimer();

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1500);
  };

  const goToNext = () => {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;

    setCurrentIndex(
      (prev) => (prev + 1) % slides.length
    );

    resetTimer();

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1500);
  };

  const goToSlide = (index: number) => {
    if (
      isTransitioningRef.current ||
      index === currentIndex
    ) {
      return;
    }

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

  // ============================================
  // ROUTING
  // ============================================

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  // ============================================
  // RENDER SLIDE
  // ============================================

  const renderSlide = (
    slide: typeof slides[0],
    index: number
  ) => {
    const isActive = index === currentIndex;

    if (slide.type === 'video') {
      return (
        <video
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
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
    }

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
  };

  // ============================================
  // JSX
  // ============================================

  return (
    <section className="hero-carousel">

      <div className="carousel-container">

        {/* =====================================
            SLIDES
        ====================================== */}

        {slides.map((slide, index) => {
          const isFirstImage =
            index === 0 && isFirstLoad;

          const isActive =
            index === currentIndex;

          return (
            <div
              key={index}
              className={`
                carousel-slide
                ${isActive ? 'active' : ''}
                ${isFirstImage ? 'first-load' : ''}
              `}
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                transition:
                  'opacity 1.5s ease-in-out',
              }}
            >
              {renderSlide(slide, index)}

              <div className="image-overlay" />

              {/* VIDEO INDICATOR */}

              {slide.type === 'video' &&
                isActive && (
                  <div className="video-indicator">
                    <div className="video-progress" />
                  </div>
                )}
            </div>
          );
        })}

        {/* =====================================
            HERO CONTENT
        ====================================== */}

        <div
          className={`
            hero-content
            ${isContentVisible ? 'visible' : ''}
          `}
        >

          {/* LOGO */}

          <div className="logo-container">

            <img
              src="/img/logo-salotto.png"
              alt="Salotto Logo"
              className="hero-logo"
            />

          </div>

          {/* ===================================
              NAVIGATION
          ==================================== */}

          <div className="hero-links">

            {navLinks.map((link, index) => (

              <span
                key={index}
                className="hero-link-wrapper"
              >

                <button
                  onClick={() =>
                    handleNavigation(link.href)
                  }
                  className="hero-link"
                  style={{
                    animationDelay:
                      `${0.1 * index}s`,
                  }}
                >

                  {/* 
                    IMPORTANTE:
                    SOLO ESTE SPAN SE ESCALA
                  */}

                  <span className="hero-link-text">
                    {link.text}
                  </span>

                </button>

                {index <
                  navLinks.length - 1 && (
                  <span className="hero-separator">
                    |
                  </span>
                )}

              </span>

            ))}

          </div>

        </div>

        {/* =====================================
            DOTS
        ====================================== */}

        <div
          className={`
            dots-container
            ${isContentVisible ? 'visible' : ''}
          `}
        >

          {slides.map((_, index) => (

            <button
              key={index}
              className={`
                dot
                ${
                  index === currentIndex
                    ? 'active'
                    : ''
                }
              `}
              onClick={() =>
                goToSlide(index)
              }
              aria-label={`Gehe zu Slide ${
                index + 1
              }`}
            />

          ))}

        </div>

        {/* =====================================
            PREVIOUS BUTTON
        ====================================== */}

        <button
          className={`
            nav-button
            prev
            ${isContentVisible ? 'visible' : ''}
          `}
          onClick={goToPrevious}
          aria-label="Vorheriges Bild"
          disabled={isTransitioningRef.current}
        >

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>

        </button>

        {/* =====================================
            NEXT BUTTON
        ====================================== */}

        <button
          className={`
            nav-button
            next
            ${isContentVisible ? 'visible' : ''}
          `}
          onClick={goToNext}
          aria-label="Nächstes Bild"
          disabled={isTransitioningRef.current}
        >

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>

        </button>

      </div>

      {/* =========================================
          STYLES
      ========================================== */}

      <style jsx>{`

        /* ========================================
           HERO
        ======================================== */

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

        /* ========================================
           SLIDES
        ======================================== */

        .carousel-slide {
          position: absolute;
          inset: 0;
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
          animation:
            blurFadeIn
            2s
            ease-out
            forwards;
        }

        @keyframes blurFadeIn {

          0% {
            opacity: 0;
            filter: blur(20px);
            transform: scale(1.15);
          }

          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }

        }

        /* ========================================
           IMAGE
        ======================================== */

        .carousel-image {
          width: 100%;
          height: 100%;
          position: relative;
          transition:
            transform
            10s
            ease-in-out;
          will-change: transform;
        }

        .carousel-slide.active
        .carousel-image {
          animation:
            slowZoom
            10s
            ease-in-out
            infinite;
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

        /* ========================================
           VIDEO
        ======================================== */

        .carousel-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #000;
        }

        /* ========================================
           OVERLAY
        ======================================== */

        .image-overlay {
          position: absolute;
          inset: 0;
          background:
            rgba(0, 0, 0, 0.4);
          z-index: 3;
        }

        /* ========================================
           VIDEO PROGRESS
        ======================================== */

        .video-indicator {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform:
            translateX(-50%);
          z-index: 4;
          width: 100px;
          height: 3px;
          background:
            rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .video-progress {
          height: 100%;
          width: 0%;
          background: white;
          border-radius: 2px;
          animation:
            videoProgress
            5s
            linear
            forwards;
        }

        @keyframes videoProgress {

          0% {
            width: 0%;
          }

          100% {
            width: 100%;
          }

        }

        /* ========================================
           HERO CONTENT
        ======================================== */

        .hero-content {
          position: absolute;

          top: 50%;
          left: 50%;

          transform:
            translate(-50%, -50%);

          z-index: 10;

          text-align: center;

          color: #fff;

          width: 90%;
          max-width: 900px;

          pointer-events: none;

          opacity: 0;

          transition:
            opacity
            1.5s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            );

          will-change: opacity;
        }

        .hero-content.visible {
          opacity: 1;
        }

        /* ========================================
           LOGO
        ======================================== */

        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;

          margin-bottom: 0;

          opacity: 0;

          transform:
            translateY(260px);

          transition:
            all
            1.2s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            );

          will-change:
            transform,
            opacity;
        }

        .hero-content.visible
        .logo-container {
          opacity: 1;

          transform:
            translateY(0);
        }

        .hero-logo {
          max-width: 500px;
          width: 100%;
          height: auto;

          filter:
            drop-shadow(
              0 4px 30px
              rgba(0, 0, 0, 0.5)
            );

          animation:
            logoPulse
            4s
            ease-in-out
            infinite;

          will-change: filter;
        }

        @keyframes logoPulse {

          0%,
          100% {
            filter:
              drop-shadow(
                0 4px 30px
                rgba(0, 0, 0, 0.5)
              );
          }

          50% {
            filter:
              drop-shadow(
                0 4px 50px
                rgba(255, 255, 255, 0.1)
              );
          }

        }

        /* ========================================
           NAVIGATION CONTAINER
        ======================================== */

        .hero-links {

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 0;

          flex-wrap: wrap;

          opacity: 0;

          transition:
            opacity
            1s
            cubic-bezier(
              0.4,
              0,
              0.2,
              1
            )
            0.3s;

          pointer-events: auto;

          /*
            IMPORTANTE:
            El tamaño del contenedor
            no cambia al hacer hover.
          */

          position: relative;

          overflow: visible;
        }

        .hero-content.visible
        .hero-links {
          opacity: 1;
        }

        /* ========================================
           EACH LINK
        ======================================== */

        .hero-link-wrapper {

          display: flex;

          align-items: center;

          gap: 0;

          position: relative;

          /*
            Evita que el flexbox
            cambie el tamaño del elemento.
          */

          flex-shrink: 0;
        }

        /* ========================================
           BUTTON
        ======================================== */

        .hero-link {

          color: #fff;

          background: transparent;

          border: none;

          text-decoration: none;

          /*
            ESTE FONT-SIZE NUNCA CAMBIA
          */

          font-size: 1.7rem;

          font-weight: 600;

          letter-spacing: 2px;

          padding:
            0.7rem
            0.7rem;

          cursor: pointer;

          text-shadow:
            0 2px 10px
            rgba(0, 0, 0, 0.5);

          /*
            IMPORTANTE:
            solo animamos opacity.
          */

          opacity: 0;

          animation:
            linkFadeIn
            0.6s
            ease
            forwards;

          white-space: nowrap;

          font-family: inherit;

          /*
            EL BUTTON NO SE ESCALA
          */

          transform: none;

          position: relative;

          /*
            Espacio estable
          */

          display: inline-flex;

          align-items: center;

          justify-content: center;

          flex-shrink: 0;
        }

        /* ========================================
           LINK TEXT
        ======================================== */

        .hero-link-text {
color:white;
          display: inline-block;

          /*
            AQUÍ ocurre el crecimiento.
            Como es transform,
            NO cambia el layout.
          */

          transform:
            scale(1);

          transform-origin:
            center center;

          transition:
            transform
            0.25s
            ease,
            color
            0.25s
            ease,
            text-shadow
            0.25s
            ease;

          will-change: transform;

        }

        /* ========================================
           HOVER
        ======================================== */

        .hero-link:hover
        .hero-link-text {

          transform:
            scale(1.02);

          color:
            #fbff0d;

          text-shadow:
            0 2px 20px
            rgba(
              255,
              255,
              255,
              0.43
            );
        }

        /* ========================================
           ACTIVE
        ======================================== */

        .hero-link:active
        .hero-link-text {

          transform:
            scale(0.98);
        }

        /* ========================================
           LINK FADE IN
        ======================================== */

        @keyframes linkFadeIn {

          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }

        }

        /* ========================================
           SEPARATOR
        ======================================== */

        .hero-separator {

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 1.1rem;

          font-weight: 300;

          padding:
            0 0.25rem;

          user-select: none;

          flex-shrink: 0;
        }

        /* ========================================
           DOTS
        ======================================== */

        .dots-container {

          position: absolute;

          bottom: 2.5rem;

          left: 50%;

          transform:
            translateX(-50%);

          display: flex;

          gap: 0.75rem;

          z-index: 10;

          opacity: 0;

          transition:
            opacity
            1s
            ease
            0.8s;

          will-change: opacity;
        }

        .dots-container.visible {
          opacity: 1;
        }

        .dot {

          width: 12px;
          height: 12px;

          border-radius: 50%;

          background:
            rgba(
              255,
              255,
              255,
              0.3
            );

          border:
            2px solid
            rgba(
              255,
              255,
              255,
              0.2
            );

          cursor: pointer;

          transition:
            all
            0.4s
            ease;

          padding: 0;

          will-change:
            transform,
            background;
        }

        .dot:hover {

          transform:
            scale(1.3);

          background:
            rgba(
              255,
              255,
              255,
              0.6
            );
        }

        .dot.active {

          background: #fff;

          border-color: #fff;

          transform:
            scale(1.2);

          box-shadow:
            0 0 20px
            rgba(
              255,
              255,
              255,
              0.3
            );
        }

        /* ========================================
           NAV BUTTONS
        ======================================== */

        .nav-button {

          position: absolute;

          top: 50%;

          transform:
            translateY(-50%);

          background:
            rgba(
              0,
              0,
              0,
              0.3
            );

          backdrop-filter:
            blur(8px);

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.15
            );

          color: #fff;

          width: 55px;
          height: 55px;

          border-radius: 50%;

          cursor: pointer;

          transition:
            all
            0.3s
            ease;

          z-index: 10;

          display: flex;

          align-items: center;

          justify-content: center;

          opacity: 0;

          pointer-events: none;

          will-change:
            opacity,
            transform;
        }

        .nav-button.visible {

          opacity: 0.6;

          pointer-events: auto;
        }

        .nav-button:hover:not(:disabled) {

          background:
            rgba(
              255,
              255,
              255,
              0.15
            );

          opacity: 1;

          transform:
            translateY(-50%)
            scale(1.1);

          border-color:
            rgba(
              255,
              255,
              255,
              0.3
            );
        }

        .nav-button:disabled {

          opacity: 0.3;

          cursor:
            not-allowed;
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

          stroke: #fff;

          stroke-width: 2;
        }

        /* ========================================
           RESPONSIVE
        ======================================== */

        @media (max-width: 1024px) {

          .hero-logo {
            max-width: 320px;
          }

          .hero-link {
            font-size: 1.2rem;
            padding:
              0.4rem
              0.6rem;
            letter-spacing: 1.5px;
          }

          .hero-separator {
            font-size: 1rem;
          }

        }

        /* ========================================
           TABLET
        ======================================== */

        @media (max-width: 768px) {

          .hero-logo {
            max-width: 250px;
          }

          .logo-container {
            margin-bottom: 1.5rem;
          }

          .hero-link {
            font-size: 1rem;

            padding:
              0.4rem
              0.3rem;

            letter-spacing: 0.5px;
          }

          .hero-link-text {
            transform:
              scale(1);
          }

          .hero-link:hover
          .hero-link-text {

            transform:
              scale(1.08);
          }

          .hero-separator {

            font-size: 0.85rem;

            padding:
              0 0.15rem;
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

          .video-indicator {

            bottom: 60px;

            width: 80px;
          }

        }

        /* ========================================
           MOBILE
        ======================================== */

        @media (max-width: 480px) {

          .hero-logo {
            max-width: 180px;
          }

          .logo-container {
            margin-bottom: 0;
          }

          .hero-link {

            font-size: 1rem;

            padding:
              0.4rem
              0.3rem;

            letter-spacing: 0.5px;
          }

          .hero-link:hover
          .hero-link-text {

            transform:
              scale(1.1);
          }

          .hero-separator {

            font-size: 0.6rem;

            padding:
              0 0.1rem;
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

          .video-indicator {

            bottom: 50px;

            width: 60px;
          }

        }

      `}</style>

    </section>
  );
}