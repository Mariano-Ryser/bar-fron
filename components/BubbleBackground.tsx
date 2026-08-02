// components/BubbleBackground.tsx
import { useEffect, useRef, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'rising' | 'floating' | 'random';
  floatOffset: number;
  floatSpeed: number;
  rotation: number;
  rotationSpeed: number;
  targetX: number;
  targetY: number;
  moveSpeed: number;
}

interface BubbleBackgroundProps {
  className?: string;
  bubbleCount?: number;
  minSize?: number;
  maxSize?: number;
  opacity?: number;
  speedMultiplier?: number;
}

export default function BubbleBackground({
  className = '',
  bubbleCount = 5,
  minSize = 20,
  maxSize = 300,
  opacity = 1.0,
  speedMultiplier = 2.9,
}: BubbleBackgroundProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);

  // Crear burbuja individual
  const createSingleBubble = (width: number, height: number, isMobile: boolean) => {
    // Tipos distribuidos uniformemente
    const types: ('rising' | 'floating' | 'random')[] = ['random', 'rising', 'floating'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const size = isMobile 
      ? minSize * 0.6 + Math.random() * (maxSize * 0.4)
      : minSize + Math.random() * (maxSize - minSize);
    
    let speed: number;
    if (type === 'rising') {
      speed = (0.1 + Math.random() * 0.25) * speedMultiplier;
    } else if (type === 'random') {
      speed = (0.05 + Math.random() * 0.15) * speedMultiplier;
    } else {
      speed = (0.005 + Math.random() * 0.03) * speedMultiplier;
    }
    
    return {
      id: Date.now() + Math.random() * 1000 + Math.random() * 1000,
      x: 10 + Math.random() * (width - 20),
      y: 10 + Math.random() * (height - 20),
      size: size,
      speed: speed,
      opacity: opacity * (0.7 + Math.random() * 0.6),
      type: type,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: 0.0005 + Math.random() * 0.003,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      targetX: 10 + Math.random() * (width - 20),
      targetY: 10 + Math.random() * (height - 20),
      moveSpeed: 0.1 + Math.random() * 0.4,
    };
  };

  // Crear burbujas iniciales
  useEffect(() => {
    const createBubbles = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      isMobileRef.current = isMobile;
      
      const count = Math.min(bubbleCount, 5);
      
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < count; i++) {
        const bubble = createSingleBubble(width, height, isMobile);
        newBubbles.push(bubble);
      }
      setBubbles(newBubbles);
    };

    createBubbles();

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile !== isMobileRef.current) {
        isMobileRef.current = isMobile;
        // Recrear burbujas al cambiar de tamaño
        createBubbles();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bubbleCount]);

  // Animar burbujas
  useEffect(() => {
    if (bubbles.length === 0) return;

    let lastTime = 0;
    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      setBubbles(prevBubbles => {
        return prevBubbles.map(bubble => {
          let newY = bubble.y;
          let newX = bubble.x;
          
          if (bubble.type === 'rising') {
            // Burbuja ascendente
            newY = bubble.y - bubble.speed * delta * 0.05;
            
            // Si sale por arriba, reaparece abajo
            if (newY < -bubble.size) {
              newY = window.innerHeight + bubble.size;
              newX = 10 + Math.random() * (window.innerWidth - 20);
              return {
                ...bubble,
                y: newY,
                x: newX,
                rotation: Math.random() * 360,
              };
            }
          } else if (bubble.type === 'random') {
            // Burbuja con movimiento aleatorio
            const dx = bubble.targetX - bubble.x;
            const dy = bubble.targetY - bubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 5) {
              // Nuevo destino aleatorio
              return {
                ...bubble,
                targetX: 20 + Math.random() * (window.innerWidth - 40),
                targetY: 20 + Math.random() * (window.innerHeight - 40),
                x: bubble.x + (dx / distance) * bubble.moveSpeed * delta * 0.03,
                y: bubble.y + (dy / distance) * bubble.moveSpeed * delta * 0.03,
                rotation: bubble.rotation + bubble.rotationSpeed * delta * 0.05,
              };
            } else {
              // Moverse hacia el destino
              const speed = Math.min(bubble.moveSpeed * delta * 0.03, distance);
              return {
                ...bubble,
                x: bubble.x + (dx / distance) * speed,
                y: bubble.y + (dy / distance) * speed,
                rotation: bubble.rotation + bubble.rotationSpeed * delta * 0.05,
              };
            }
          } else {
            // Burbuja flotante (movimiento suave)
            newY = bubble.y + Math.sin(bubble.floatOffset) * 0.03;
            const floatX = Math.cos(bubble.floatOffset * 0.7) * 0.02;
            newX = bubble.x + floatX * delta * 0.05;
            
            // Mantener dentro de la pantalla
            if (newX < -bubble.size) newX = window.innerWidth + bubble.size;
            if (newX > window.innerWidth + bubble.size) newX = -bubble.size;
            if (newY < -bubble.size) newY = window.innerHeight + bubble.size;
            if (newY > window.innerHeight + bubble.size) newY = -bubble.size;
            
            const newFloatOffset = bubble.floatOffset + bubble.floatSpeed * delta * 0.05;
            
            return {
              ...bubble,
              x: newX,
              y: newY,
              floatOffset: newFloatOffset,
              rotation: bubble.rotation + bubble.rotationSpeed * delta * 0.05,
            };
          }
          
          return {
            ...bubble,
            y: newY,
            x: newX,
            rotation: bubble.rotation + bubble.rotationSpeed * delta * 0.05,
          };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bubbles.length]);

  return (
    <div ref={containerRef} className={`bubble-background ${className}`}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`bubble ${bubble.type === 'floating' ? 'floating' : ''} ${bubble.type === 'random' ? 'random' : ''}`}
          style={{
            left: `${bubble.x}px`,
            top: `${bubble.y}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: Math.max(0, Math.min(1, bubble.opacity)),
            transform: `rotate(${bubble.rotation}deg)`,
            background: `radial-gradient(
              circle at 25% 25%,
              rgba(255, 255, 255, 0.5) 0%,
              rgba(255, 255, 255, 0.15) 40%,
              rgba(255, 255, 255, 0.05) 70%,
              transparent 100%
            )`,
            border: `2px solid rgba(255, 255, 255, 0.25)`,
            boxShadow: `
              inset -10px -10px 40px rgba(255, 255, 255, 0.15),
              inset 5px 5px 30px rgba(255, 255, 255, 0.25),
              0 0 60px rgba(255, 255, 255, 0.08)
            `,
          }}
        >
          <div className="bubble-reflection-top" />
          <div className="bubble-reflection-bottom" />
        </div>
      ))}

      <style jsx>{`
        .bubble-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          transition: none;
          backdrop-filter: blur(1px);
        }

        .bubble-reflection-top {
          position: absolute;
          top: 12%;
          left: 18%;
          width: 35%;
          height: 22%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.6) 0%,
            transparent 70%
          );
          transform: rotate(-35deg);
        }

        .bubble-reflection-bottom {
          position: absolute;
          bottom: 15%;
          right: 15%;
          width: 15%;
          height: 12%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 70%
          );
          transform: rotate(25deg);
        }

        .bubble.floating {
          animation: gentleFloat 15s ease-in-out infinite;
        }

        .bubble.random {
          animation: randomPulse 8s ease-in-out infinite;
        }

        @keyframes gentleFloat {
          0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg); 
          }
          25% { 
            transform: translate(3px, -5px) scale(1.01) rotate(2deg); 
          }
          50% { 
            transform: translate(-2px, -3px) scale(0.99) rotate(-1deg); 
          }
          75% { 
            transform: translate(5px, 2px) scale(1.005) rotate(3deg); 
          }
        }

        @keyframes randomPulse {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
          }
          50% { 
            transform: scale(1.02) rotate(2deg); 
          }
        }

        @media (max-width: 768px) {
          .bubble-reflection-top {
            top: 10%;
            left: 15%;
            width: 25%;
            height: 15%;
          }
          .bubble-reflection-bottom {
            bottom: 12%;
            right: 12%;
            width: 10%;
            height: 8%;
          }
        }
      `}</style>
    </div>
  );
}