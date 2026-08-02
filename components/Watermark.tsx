// components/Watermark.tsx
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface WatermarkProps {
  className?: string;
  opacity?: number;
  size?: number;
  blurAmount?: number;
  duration?: number;
  delay?: number;
}

export default function Watermark({ 
  className = '', 
  opacity = 0.06, // Opacidad final (invisible)
  size = 200,
  blurAmount = 2,
  duration = 10000,
  delay = 0
}: WatermarkProps) {
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = watermarkRef.current;
    if (!element) return;

    // Iniciar después del delay
    const timer = setTimeout(() => {
      // Animación: invisible -> visible -> invisible
      const animation = element.animate(
        [
          { 
            filter: `blur(${blurAmount}px) grayscale(100%)`,
            opacity: 0 // Comienza invisible
          },
          { 
            filter: `blur(0px) grayscale(100%)`,
            opacity: 1, // Se vuelve completamente visible
            offset: 0.3
          },
          { 
            filter: `blur(0px) grayscale(100%)`,
            opacity: 1, // Permanece visible
            offset: 0.6
          },
          { 
            filter: `blur(${blurAmount}px) grayscale(100%)`,
            opacity: 0 // Vuelve a ser invisible
          }
        ],
        {
          duration: duration,
          iterations: 1,
          easing: 'ease-in-out',
          fill: 'forwards'
        }
      );

      // Opcional: ocultar completamente después de la animación
      animation.onfinish = () => {
        if (element) {
          element.style.display = 'none';
        }
      };
    }, delay);

    // Cleanup
    return () => {
      clearTimeout(timer);
      element.getAnimations().forEach(animation => animation.cancel());
    };
  }, [opacity, blurAmount, duration, delay]);

  return (
    <div 
      ref={watermarkRef}
      className={`watermark-container ${className}`}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 0,
        top: '50%',
        left: '90%',
        transform: 'translate(-50%, -50%)',
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0, // Comienza completamente invisible
        filter: `blur(${blurAmount}px) grayscale(100%)`
      }}
    >
      <Image
        src="/img/logo80.png"
        alt="Salotto Logo"
        fill
        style={{
          objectFit: 'contain',
          filter: 'grayscale(100%) brightness(0.7)'
        }}
        priority
      />
    </div>
  );
}