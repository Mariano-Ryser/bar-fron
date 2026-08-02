// components/MusicPlayer.tsx
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';

interface MusicPlayerProps {
  className?: string;
  autoPlay?: boolean;
  volume?: number;
  songPath?: string;
}

export default function MusicPlayer({
  className = '',
  autoPlay = false,
  volume = 0.3,
  songPath = '/music/DarkTechnominimal.mp3' 
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar audio
  useEffect(() => {
    const audio = new Audio(songPath);
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoaded(true);
      if (autoPlay) {
        audio.play().catch(() => {
          // Auto-play bloqueado por el navegador
          console.log('Auto-play blocked, user interaction needed');
        });
        setIsPlaying(true);
      }
    };

    audio.addEventListener('canplaythrough', handleCanPlay);

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, [songPath, volume, autoPlay]);

  // Toggle play/pause
  const togglePlay = () => {
    if (!audioRef.current || !isLoaded) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.log('Playback error:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Keyboard shortcut: Spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' && !e.repeat) {
        // No interceptar si estamos en un input o textarea
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isLoaded]);

  return (
    <>
      <audio ref={audioRef} preload="auto" />
      
      <div 
        className={`music-player ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          zIndex: 999,
        }}
      >
        <button
          onClick={togglePlay}
          className="music-button"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          title={isPlaying ? 'Pausar (Espacio)' : 'Reproducir (Espacio)'}
        >
          {/* Icono de música con animación */}
          <div className={`music-icon-wrapper ${isPlaying ? 'playing' : ''}`}>
            <Music size={20} className="music-icon" />
            {isPlaying && (
              <div className="sound-waves">
                <span className="wave wave1"></span>
                <span className="wave wave2"></span>
                <span className="wave wave3"></span>
              </div>
            )}
          </div>
          
          {/* Botón de play/pause central */}
          <div className="play-button">
            {isPlaying ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}
          </div>
        </button>

        {/* Tooltip con estado */}
        <div className={`status-tooltip ${isHovered ? 'visible' : ''}`}>
          <span className="status-text">
            {isPlaying ? '🎵 Reproduciendo' : '⏸ Pausado'}
          </span>
          <span className="status-hint">Espacio</span>
        </div>
      </div>

      <style jsx>{`
        .music-player {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .music-button {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .music-button:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: scale(1.05);
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .music-button:active {
          transform: scale(0.95);
        }

        .music-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .music-icon {
          transition: all 0.6s ease;
          opacity: 0.5;
        }

        .music-icon-wrapper.playing .music-icon {
          opacity: 1;
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Ondas de sonido - solo visibles cuando reproduce */
        .sound-waves {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .wave {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          opacity: 0;
          width: 100%;
          height: 100%;
        }

        .music-icon-wrapper.playing .wave {
          animation: waveExpand 2.5s ease-out infinite;
        }

        .wave1 {
          animation-delay: 0s;
        }
        .wave2 {
          animation-delay: 0.8s;
        }
        .wave3 {
          animation-delay: 1.6s;
        }

        @keyframes waveExpand {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.2);
            opacity: 0;
          }
        }

        .play-button {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .music-button:hover .play-button {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .play-button svg {
          opacity: 0.8;
          transition: all 0.3s ease;
        }

        .music-button:hover .play-button svg {
          opacity: 1;
        }

        /* Tooltip de estado */
        .status-tooltip {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-tooltip.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .status-text {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        .status-hint {
          font-size: 0.55rem;
          color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.06);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        /* Responsive para móvil */
        @media (max-width: 768px) {
          .music-player {
            bottom: 1.5rem;
            left: 1.5rem;
          }

          .music-button {
            width: 44px;
            height: 44px;
          }

          .music-button svg {
            width: 18px;
            height: 18px;
          }

          .play-button {
            width: 20px;
            height: 20px;
            bottom: -3px;
            right: -3px;
          }

          .play-button svg {
            width: 14px;
            height: 14px;
          }

          .status-tooltip {
            padding: 0.3rem 0.6rem;
            bottom: calc(100% + 8px);
          }

          .status-text {
            font-size: 0.6rem;
          }

          .status-hint {
            font-size: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .music-player {
            bottom: 1rem;
            left: 1rem;
          }

          .music-button {
            width: 38px;
            height: 38px;
          }

          .music-button svg {
            width: 16px;
            height: 16px;
          }

          .play-button {
            width: 18px;
            height: 18px;
            bottom: -2px;
            right: -2px;
          }

          .play-button svg {
            width: 12px;
            height: 12px;
          }
        }

        /* Soporte para dark mode */
        @media (prefers-color-scheme: dark) {
          .music-button {
            background: rgba(0, 0, 0, 0.4);
            border-color: rgba(255, 255, 255, 0.08);
          }

          .music-button:hover {
            background: rgba(255, 255, 255, 0.08);
          }
        }
      `}</style>
    </>
  );
}