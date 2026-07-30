import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Wine, Beer, GlassWater, Coffee, X, ChevronLeft, ChevronRight, Clock, Utensils } from 'lucide-react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  type: 'rising' | 'floating';
  floatOffset: number;
  floatSpeed: number;
  rotation: number;
  rotationSpeed: number;
  hueShift: number;
}

export default function Getraenkekarte() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Bubble background state
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);

  // Colores base con saturación media-alta para que se vean bien
  const baseColors = [
    { r: 183, g: 255, b: 100 },  // Verde lima
    { r: 255, g: 200, b: 50 },   // Amarillo dorado
    { r: 200, g: 100, b: 255 },  // Violeta
    { r: 100, g: 255, b: 200 },  // Verde menta
    { r: 255, g: 150, b: 100 },  // Naranja coral
    { r: 100, g: 200, b: 255 },  // Azul cielo
    { r: 255, g: 100, b: 150 },  // Rosa
    { r: 200, g: 200, b: 255 },  // Lavanda
  ];

  // Bubble background effects
  useEffect(() => {
    const createBubbles = () => {
      if (!containerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      isMobileRef.current = isMobile;
      
      const count = isMobile ? 6 : 10 + Math.floor(Math.random() * 6);
      
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < count; i++) {
        const isRising = isMobile ? Math.random() > 0.5 : Math.random() > 0.4;
        const size = isMobile 
          ? 30 + Math.random() * 30
          : 40 + Math.random() * 90;
        
        const color = baseColors[Math.floor(Math.random() * baseColors.length)];
        
        newBubbles.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: size,
          speed: isRising ? 0.95 + Math.random() * 0.3 : 0.02 + Math.random() * 0.04,
          opacity: isMobile 
            ? 0.25 + Math.random() * 9.4
            : 0.35 + Math.random() * 1.45,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
          type: isRising ? 'rising' : 'floating',
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.002 + Math.random() * 0.004,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          hueShift: 0,
        });
      }
      setBubbles(newBubbles);
    };

    createBubbles();

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile !== isMobileRef.current) {
        isMobileRef.current = isMobile;
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
  }, []);

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
          let newSize = bubble.size;
          let newOpacity = bubble.opacity;
          
          // Efecto de brillo suave - solo varía la intensidad ligeramente
          const brightness = 0.85 + 0.15 * Math.sin(bubble.hueShift * Math.PI * 3);
          
          // Extraer colores base
          const colorMatch = bubble.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
          let baseR = 183, baseG = 255, baseB = 100;
          if (colorMatch) {
            baseR = parseInt(colorMatch[1]);
            baseG = parseInt(colorMatch[2]);
            baseB = parseInt(colorMatch[3]);
          }
          
          // Mantener los colores vivos sin que se vuelvan grises
          const r = Math.min(255, Math.round(baseR * brightness));
          const g = Math.min(255, Math.round(baseG * brightness));
          const b = Math.min(255, Math.round(baseB * brightness));
          const newColor = `rgba(${r}, ${g}, ${b}, 0.6)`;
          
          if (bubble.type === 'rising') {
            newY = bubble.y - bubble.speed * delta * 0.02;
            newSize = bubble.size * (1 - (1 - newY / (window.innerHeight + bubble.size)) * 0.3);
            newOpacity = bubble.opacity * (0.5 + 0.5 * (newY / (window.innerHeight + bubble.size)));
            
            if (newY < -bubble.size) {
              newY = window.innerHeight + bubble.size;
              const isMobile = window.innerWidth < 768;
              newSize = isMobile 
                ? 30 + Math.random() * 80 
                : 40 + Math.random() * 140;
              newOpacity = isMobile 
                ? 0.25 + Math.random() * 9.4
                : 0.35 + Math.random() * 1.45;
              const newColorObj = baseColors[Math.floor(Math.random() * baseColors.length)];
              return {
                ...bubble,
                y: newY,
                x: Math.random() * window.innerWidth,
                size: newSize,
                opacity: newOpacity,
                rotation: Math.random() * 360,
                color: `rgba(${newColorObj.r}, ${newColorObj.g}, ${newColorObj.b}, 0.6)`,
                hueShift: 0,
              };
            }
          } else {
            newY = bubble.y + Math.sin(bubble.floatOffset) * 0.05;
            const floatX = Math.cos(bubble.floatOffset * 0.7) * 0.03;
            let newX = bubble.x + floatX * delta * 0.1;
            
            if (newX < 0) newX = 0;
            if (newX > window.innerWidth) newX = window.innerWidth;
            
            if (newY < 0) newY = 0;
            if (newY > window.innerHeight) newY = window.innerHeight;
            
            const newFloatOffset = bubble.floatOffset + bubble.floatSpeed * delta * 0.1;
            
            return {
              ...bubble,
              x: newX,
              y: newY,
              floatOffset: newFloatOffset,
              rotation: bubble.rotation + bubble.rotationSpeed * delta * 0.1,
              hueShift: bubble.hueShift + delta * 0.0003,
              color: newColor,
            };
          }
          
          return {
            ...bubble,
            y: newY,
            size: newSize,
            opacity: newOpacity,
            rotation: bubble.rotation + bubble.rotationSpeed * delta * 0.1,
            hueShift: bubble.hueShift + delta * 0.0003,
            color: newColor,
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

  // Resto del código igual...
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

  useEffect(() => {
    drinkItems.forEach((item, index) => {
      const img = new window.Image();
      img.src = item.image;
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(index));
      };
    });
  }, []);

  const categories = [
    { id: 'all', name: 'Alle', icon: <GlassWater size={16} /> },
    { id: 'aperitif', name: 'Aperitif', icon: <Wine size={16} /> },
    { id: 'cocktails', name: 'Cocktails', icon: <GlassWater size={16} /> },
    { id: 'biere', name: 'Biere', icon: <Beer size={16} /> },
    { id: 'weine', name: 'Weine', icon: <Wine size={16} /> },
    { id: 'softdrinks', name: 'Softdrinks', icon: <Coffee size={16} /> },
  ];

  const drinkItems = [
    {
      id: 1,
      name: 'Aperol Spritz',
      description: 'Aperol, Prosecco, Soda, Orange - Der italienische Klassiker',
      price: '9.50',
      category: 'aperitif',
      image: '/img/aperol-spritz.png',
      alcohol: true,
      volume: '0.3l',
      ingredients: 'Aperol, Prosecco, Soda, Orange',
      prepTime: '2-3 Min.'
    },
    {
      id: 2,
      name: 'Hugo',
      description: 'Prosecco, Holunderblütensirup, Minze, Soda - Fruchtig & leicht',
      price: '9.00',
      category: 'aperitif',
      image: '/img/hugo.png',
      alcohol: true,
      volume: '0.3l',
      ingredients: 'Prosecco, Holunderblütensirup, Minze, Soda',
      prepTime: '2-3 Min.'
    },
    {
      id: 3,
      name: 'Mojito',
      description: 'Weißer Rum, Limette, Minze, Zucker, Soda - Erfrischend & belebend',
      price: '12.00',
      category: 'cocktails',
      image: '/img/mojito.png',
      alcohol: true,
      volume: '0.3l',
      ingredients: 'Weißer Rum, Limette, Minze, Zucker, Soda',
      prepTime: '3-4 Min.'
    },
    {
      id: 4,
      name: 'Cuba Libre',
      description: 'Rum, Cola, Limette - Ein zeitloser Klassiker',
      price: '10.00',
      category: 'cocktails',
      image: '/img/cuba-libre.png',
      alcohol: true,
      volume: '0.4l',
      ingredients: 'Rum, Cola, Limette',
      prepTime: '2-3 Min.'
    },
    {
      id: 5,
      name: 'IPA',
      description: 'India Pale Ale mit intensiver Hopfennote und fruchtigen Aromen',
      price: '6.00',
      category: 'biere',
      image: '/img/ipa.png',
      alcohol: true,
      volume: '0.4l',
      ingredients: 'Wasser, Gerstenmalz, Hopfen, Hefe',
      prepTime: 'Sofort serviert'
    },
    {
      id: 6,
      name: 'Lager Bier',
      description: 'Klares, erfrischendes Bier mit ausgewogenem Geschmack',
      price: '4.50',
      category: 'biere',
      image: '/img/lager.png',
      alcohol: true,
      volume: '0.5l',
      ingredients: 'Wasser, Gerstenmalz, Hopfen, Hefe',
      prepTime: 'Sofort serviert'
    },
    {
      id: 7,
      name: 'Cola',
      description: 'Cola - Erfrischend und belebend',
      price: '4.50',
      category: 'softdrinks',
      image: '/img/cola.png',
      alcohol: false,
      volume: '0.5l',
      ingredients: 'Cola-Sirup, Kohlensäure',
      prepTime: 'Sofort serviert'
    },
  ];

  const filteredItems = activeCategory === 'all' 
    ? drinkItems 
    : drinkItems.filter(item => item.category === activeCategory);

  const openModal = (index: number) => {
    setSelectedItem(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedItem !== null) {
      setSelectedItem((selectedItem - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const goToNext = () => {
    if (selectedItem !== null) {
      setSelectedItem((selectedItem + 1) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem !== null) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, filteredItems.length]);

  return (
    <div className="getraenkekarte-page">
      {/* Bubble Background */}
      <div ref={containerRef} className="bubble-background">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`bubble ${bubble.type === 'floating' ? 'floating' : 'rising'}`}
            style={{
              left: `${bubble.x}px`,
              top: `${bubble.y}px`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              opacity: bubble.opacity,
              transform: `rotate(${bubble.rotation}deg)`,
              background: `radial-gradient(
                circle at 30% 30%,
                rgba(255, 255, 255, 0.9) 0%,
                ${bubble.color} 60%,
                rgba(0, 0, 0, 0.1) 100%
              )`,
              boxShadow: `
                inset -10px -10px 30px rgba(255, 255, 255, 0.3),
                inset 5px 5px 20px rgba(255, 255, 255, 0.5),
                0 0 40px ${bubble.color}
              `,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Getränkekarte</h1>
          <p>Entdecke unsere vielfältige Auswahl an Getränken</p>
          <div className="hero-line"></div>
        </div>
      </div>

      {/* Categories */}
      <div className="categories-wrapper">
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Drinks Grid */}
      <div className="drinks-grid">
        {filteredItems.map((item, index) => {
          const refCallback = (el: HTMLDivElement | null) => {
            itemRefs.current[index] = el;
          };

          return (
            <div
              key={item.id}
              ref={refCallback}
              data-index={index}
              className={`drink-item ${visibleItems.includes(index) ? 'visible' : ''}`}
              onClick={() => openModal(index)}
            >
              <div className="drink-image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="drink-img"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="drink-overlay">
                  {item.alcohol && (
                    <span className="drink-badge alcohol">🍸 Alkohol</span>
                  )}
                  {!item.alcohol && (
                    <span className="drink-badge non-alcohol">🧃 Alkoholfrei</span>
                  )}
                </div>
              </div>
              <div className="drink-content">
                <div className="drink-header">
                  <h3>{item.name}</h3>
                  <div className="drink-info">
                    <span className="drink-price">€ {item.price}</span>
                    <span className="drink-volume">{item.volume}</span>
                  </div>
                </div>
                <p className="drink-description">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedItem !== null && filteredItems[selectedItem] && (
        <div className="modal-overlay" onClick={closeModal}>
          <button className="modal-close" onClick={closeModal}>
            <X size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <button className="modal-nav prev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
            <ChevronLeft size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <button className="modal-nav next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
            <ChevronRight size={40} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-container">
              <Image
                src={filteredItems[selectedItem].image}
                alt={filteredItems[selectedItem].name}
                fill
                className="modal-image"
                style={{ objectFit: 'cover' }}
                quality={100}
                priority={true}
                sizes="(max-width: 768px) 90vw, 50vw"
              />
              {!preloadedImages.has(selectedItem) && (
                <div className="modal-loading">
                  <div className="spinner"></div>
                </div>
              )}
            </div>
            <div className="modal-info">
              <div className="modal-header">
                <h2 className="modal-title">{filteredItems[selectedItem].name}</h2>
                <div className="modal-price-info">
                  <span className="modal-price">€ {filteredItems[selectedItem].price}</span>
                  <span className="modal-volume">{filteredItems[selectedItem].volume}</span>
                </div>
              </div>
              <p className="modal-description">{filteredItems[selectedItem].description}</p>
              <div className="modal-details">
                <div className="modal-detail-item">
                  <Utensils size={16} />
                  <span>Zutaten: {filteredItems[selectedItem].ingredients}</span>
                </div>
                <div className="modal-detail-item">
                  <Clock size={16} />
                  <span>Zubereitung: {filteredItems[selectedItem].prepTime}</span>
                </div>
              </div>
              <div className="modal-tags">
                {filteredItems[selectedItem].alcohol ? (
                  <span className="modal-tag alcohol">🍸 Alkoholisch</span>
                ) : (
                  <span className="modal-tag non-alcohol">🧃 Alkoholfrei</span>
                )}
                <span className="modal-tag badge">{filteredItems[selectedItem].category}</span>
              </div>
              <span className="modal-counter">
                {selectedItem + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .getraenkekarte-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 8rem;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

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
          backdrop-filter: blur(1px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: none;
        }

        .bubble::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 20%;
          width: 30%;
          height: 20%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.6) 0%,
            transparent 70%
          );
          transform: rotate(-30deg);
        }

        .bubble::after {
          content: '';
          position: absolute;
          bottom: 20%;
          right: 20%;
          width: 15%;
          height: 12%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0.3) 0%,
            transparent 70%
          );
          transform: rotate(20deg);
        }

        .bubble.floating {
          animation: gentleFloat 12s ease-in-out infinite;
        }

        @keyframes gentleFloat {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(5px, -8px) scale(1.02) rotate(2deg); }
          50% { transform: translate(-3px, -4px) scale(0.98) rotate(-1deg); }
          75% { transform: translate(8px, 2px) scale(1.01) rotate(3deg); }
        }

        .hero-section,
        .categories-wrapper,
        .drinks-grid,
        .modal-overlay {
          position: relative;
          z-index: 1;
        }

        .hero-section {
          padding: 0rem 2rem 3rem;
          text-align: center;
        }

        .hero-content h1 {
          color: #ffffff;
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
          background: rgba(255, 255, 255, 0.3);
          margin: 1rem auto 0;
        }

        .categories-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          margin-bottom: 2rem;
        }

        .categories-container {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1.5rem;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
        }

        .category-btn:hover {
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }

        .category-btn.active {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }

        .category-icon {
          display: flex;
          align-items: center;
        }

        .drinks-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 3rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .drink-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.6s ease;
          cursor: pointer;
        }

        .drink-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .drink-item:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .drink-image {
          position: relative;
          width: 100%;
          padding-bottom: 75%;
          overflow: hidden;
        }

        .drink-img {
          transition: transform 0.5s ease;
        }

        .drink-item:hover .drink-img {
          transform: scale(1.05);
        }

        .drink-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 0.75rem;
        }

        .drink-badge {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 0.2rem 0.8rem;
          border-radius: 50px;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .drink-badge.alcohol {
          background: rgba(255, 200, 0, 0.15);
          border-color: rgba(255, 200, 0, 0.2);
        }

        .drink-badge.non-alcohol {
          background: rgba(0, 255, 100, 0.1);
          border-color: rgba(0, 255, 100, 0.15);
        }

        .drink-content {
          padding: 1.25rem;
        }

        .drink-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .drink-header h3 {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
          flex: 1;
        }

        .drink-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          margin-left: 0.75rem;
        }

        .drink-price {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .drink-volume {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .drink-description {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          margin: 0;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-close:hover {
          transform: rotate(90deg) scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 50px;
          height: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-nav:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-50%) scale(1.1);
        }

        .modal-nav.prev {
          left: 1.5rem;
        }

        .modal-nav.next {
          right: 1.5rem;
        }

        .modal-content {
          position: relative;
          width: 92%;
          max-width: 1000px;
          max-height: 90vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          background: #0a0a0a;
          border-radius: 14px;
          overflow: hidden;
          padding: 1.5rem;
        }

        .modal-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: 55vh;
          border-radius: 10px;
          overflow: hidden;
          background: #1a1a1a;
        }

        .modal-image {
          transition: transform 0.3s ease;
        }

        .modal-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        .spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .modal-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.5rem 0;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 300;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .modal-price-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
          white-space: nowrap;
        }

        .modal-price {
          font-size: 1.6rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .modal-volume {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
        }

        .modal-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .modal-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-detail-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .modal-detail-item svg {
          color: rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
        }

        .modal-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .modal-tag {
          font-size: 0.7rem;
          padding: 0.2rem 0.8rem;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
        }

        .modal-tag.alcohol {
          border-color: rgba(255, 200, 0, 0.3);
          color: #FFD54F;
        }

        .modal-tag.non-alcohol {
          border-color: rgba(0, 255, 100, 0.3);
          color: #81C784;
        }

        .modal-tag.badge {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
        }

        .modal-counter {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.25);
        }

        @media (max-width: 768px) {
          .bubble::before {
            width: 25%;
            height: 18%;
            top: 12%;
            left: 18%;
          }
          .bubble::after {
            width: 12%;
            height: 10%;
            bottom: 18%;
            right: 18%;
          }
        }

        @media (max-width: 1024px) {
          .drinks-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.2rem;
          }

          .modal-content {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            padding: 1rem;
          }

          .modal-image-container {
            max-height: 45vh;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .modal-price {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 768px) {
          .getraenkekarte-page {
            padding-top: 6rem;
          }

          .hero-section {
            padding: 0.5rem 1rem 2rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .categories-wrapper {
            padding: 0 1rem;
            margin-bottom: 1.5rem;
          }

          .drinks-grid {
            grid-template-columns: 1fr 1fr;
            padding: 0 1rem 2rem;
            gap: 0.8rem;
          }

          .modal-content {
            grid-template-columns: 1fr;
            max-height: 95vh;
            padding: 1rem;
            gap: 1rem;
            width: 95%;
          }

          .modal-image-container {
            aspect-ratio: 4 / 3;
            max-height: 35vh;
          }

          .modal-title {
            font-size: 1.3rem;
          }

          .modal-price {
            font-size: 1.2rem;
          }

          .modal-nav {
            width: 40px;
            height: 40px;
          }

          .modal-nav svg {
            width: 24px;
            height: 24px;
          }

          .modal-close {
            width: 40px;
            height: 40px;
            top: 0.8rem;
            right: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .drinks-grid {
            grid-template-columns: 1fr;
          }

          .modal-image-container {
            max-height: 30vh;
          }

          .modal-title {
            font-size: 1.1rem;
          }

          .modal-price {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}