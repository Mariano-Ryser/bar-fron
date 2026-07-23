import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Wine, Beer, GlassWater, Coffee, X, ChevronLeft, ChevronRight, Clock, Utensils } from 'lucide-react';

export default function Getraenkekarte() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
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

  // Precarga de imágenes para el modal
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
    // Aperitif
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

    // Cocktails
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

    // Biere
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

    // Softdrinks
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

  // Keyboard navigation
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
            loading={index === 0 ? "eager" : "lazy"} // 👈 Solo la primera imagen carga eager
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
        }

        /* Hero */
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

        /* Categories */
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

        /* Drinks Grid */
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

        /* Modal */
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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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

        /* Responsive */
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
            margin-bottom: 0.3rem;
          }

          .hero-content p {
            font-size: 1rem;
          }

          .hero-line {
            width: 40px;
            margin: 0.75rem auto 0;
          }

          .categories-wrapper {
            padding: 0 1rem;
            margin-bottom: 1.5rem;
          }

          .categories-container {
            gap: 0.4rem;
            padding-bottom: 1rem;
          }

          .category-btn {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }

          .drinks-grid {
            grid-template-columns: 1fr 1fr;
            padding: 0 1rem 2rem;
            gap: 0.8rem;
          }

          .drink-image {
            padding-bottom: 60%;
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

          .modal-description {
            font-size: 0.85rem;
          }

          .modal-detail-item {
            font-size: 0.8rem;
          }

          .modal-nav {
            width: 40px;
            height: 40px;
          }

          .modal-nav svg {
            width: 24px;
            height: 24px;
          }

          .modal-nav.prev {
            left: 0.5rem;
          }

          .modal-nav.next {
            right: 0.5rem;
          }

          .modal-close {
            width: 40px;
            height: 40px;
            top: 0.8rem;
            right: 0.8rem;
          }

          .modal-close svg {
            width: 28px;
            height: 28px;
          }

          .modal-info {
            gap: 0.5rem;
            padding: 0;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-content p {
            font-size: 0.9rem;
          }

          .drinks-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .drink-header h3 {
            font-size: 1rem;
          }

          .drink-price {
            font-size: 0.95rem;
          }

          .drink-description {
            font-size: 0.8rem;
          }

          .drink-content {
            padding: 0.75rem;
          }

          .modal-image-container {
            aspect-ratio: 4 / 3;
            max-height: 30vh;
          }

          .modal-title {
            font-size: 1.1rem;
          }

          .modal-price {
            font-size: 1rem;
          }

          .modal-description {
            font-size: 0.8rem;
          }

          .modal-detail-item {
            font-size: 0.75rem;
          }

          .modal-tag {
            font-size: 0.6rem;
            padding: 0.15rem 0.6rem;
          }

          .modal-nav {
            width: 34px;
            height: 34px;
          }

          .modal-nav svg {
            width: 20px;
            height: 20px;
          }

          .modal-close {
            width: 34px;
            height: 34px;
          }

          .modal-close svg {
            width: 22px;
            height: 22px;
          }
        }
      `}</style>
    </div>
  );
}