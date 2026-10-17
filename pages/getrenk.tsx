// pages/getraenkekarte.tsx
import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Wine, Beer, GlassWater, Coffee, X, ChevronLeft, ChevronRight, Clock, Utensils, Search, Euro } from 'lucide-react';

interface DrinkItem {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  alcohol: boolean;
  volume: string;
  ingredients: { name: string; amount: string }[];
  prepTime: string;
  price: string;
}

export default function Getraenkekarte() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categories = [
    { id: 'all', name: 'Alle', icon: <GlassWater size={16} /> },
    { id: 'aperitif', name: 'Aperitif', icon: <Wine size={16} /> },
    { id: 'cocktails', name: 'Cocktails', icon: <GlassWater size={16} /> },
    { id: 'biere', name: 'Biere', icon: <Beer size={16} /> },
    { id: 'weine', name: 'Weine', icon: <Wine size={16} /> },
    { id: 'softdrinks', name: 'Softdrinks', icon: <Coffee size={16} /> },
  ];

  const drinkItems: DrinkItem[] = [
    {
      id: 1,
      name: 'Aperol Spritz',
      description: 'Aperol, Prosecco, Soda, Orange - Der italienische Klassiker',
      category: 'aperitif',
      image: '/img/getrenk/aperolSpritz.jpg',
      alcohol: true,
      volume: '0.3l',
      ingredients: [
        { name: 'Aperol', amount: '6 cl' },
        { name: 'Prosecco', amount: '9 cl' },
        { name: 'Soda', amount: '3 cl' },
        { name: 'Orange', amount: '1 Scheibe' },
      ],
      prepTime: '2-3 Min.',
      price: '8,50 CHF',
    },
    {
      id: 2,
      name: 'Campari Soda',
      description: 'Campari mit Soda - Bitter und erfrischend',
      category: 'aperitif',
      image: '/img/getrenk/campariSoda.jpg',
      alcohol: true,
      volume: '0.2l',
      ingredients: [
        { name: 'Campari', amount: '6 cl' },
        { name: 'Soda', amount: '10 cl' },
        { name: 'Zitrone', amount: '1 Scheibe' },
      ],
      prepTime: '1-2 Min.',
      price: '7,50 CHF',
    },
    {
      id: 3,
      name: 'Cuba Libre',
      description: 'Rum, Cola, Limette - Ein zeitloser Klassiker',
      category: 'cocktails',
      image: '/img/getrenk/cubaLibre.jpg',
      alcohol: true,
      volume: '0.4l',
      ingredients: [
        { name: 'Weißer Rum', amount: '5 cl' },
        { name: 'Cola', amount: '15 cl' },
        { name: 'Limette', amount: '1/2 Stück' },
        { name: 'Eis', amount: 'nach Bedarf' },
      ],
      prepTime: '2-3 Min.',
      price: '9,00 CHF',
    },
    {
      id: 4,
      name: 'Espresso Martini',
      description: 'Wodka, Kaffeelikör, Espresso - Wachmacher mit Stil',
      category: 'cocktails',
      image: '/img/getrenk/expresoMartini.jpg',
      alcohol: true,
      volume: '0.2l',
      ingredients: [
        { name: 'Wodka', amount: '4 cl' },
        { name: 'Kaffeelikör', amount: '2 cl' },
        { name: 'Espresso', amount: '3 cl' },
      ],
      prepTime: '3-4 Min.',
      price: '10,50 CHF',
    },
    {
      id: 5,
      name: 'Gin Tonic',
      description: 'Gin, Tonic Water, Gurke, Limette - Klassisch frisch',
      category: 'cocktails',
      image: '/img/getrenk/ginTonic.jpg',
      alcohol: true,
      volume: '0.3l',
      ingredients: [
        { name: 'Gin', amount: '5 cl' },
        { name: 'Tonic Water', amount: '15 cl' },
        { name: 'Gurke', amount: '2 Scheiben' },
        { name: 'Limette', amount: '1/4 Stück' },
      ],
      prepTime: '2-3 Min.',
      price: '9,50 CHF',
    },
    {
      id: 6,
      name: 'Hugo',
      description: 'Prosecco, Holunderblütensirup, Minze, Soda - Fruchtig & leicht',
      category: 'aperitif',
      image: '/img/getrenk/hugo.jpg',
      alcohol: true,
      volume: '0.3l',
      ingredients: [
        { name: 'Prosecco', amount: '10 cl' },
        { name: 'Holunderblütensirup', amount: '2 cl' },
        { name: 'Soda', amount: '5 cl' },
        { name: 'Minze', amount: '4-5 Blätter' },
        { name: 'Limette', amount: '1/4 Stück' },
      ],
      prepTime: '2-3 Min.',
      price: '8,50 CHF',
    },
    {
      id: 7,
      name: 'Mojito',
      description: 'Weißer Rum, Limette, Minze, Zucker, Soda - Erfrischend & belebend',
      category: 'cocktails',
      image: '/img/getrenk/mojito.jpg',
      alcohol: true,
      volume: '0.3l',
      ingredients: [
        { name: 'Weißer Rum', amount: '5 cl' },
        { name: 'Limette', amount: '1/2 Stück' },
        { name: 'Minze', amount: '8-10 Blätter' },
        { name: 'Zucker', amount: '2 TL' },
        { name: 'Soda', amount: '10 cl' },
        { name: 'Eis', amount: 'nach Bedarf' },
      ],
      prepTime: '3-4 Min.',
      price: '9,00 CHF',
    },
    {
      id: 8,
      name: 'Moscow Mule',
      description: 'Wodka, Ginger Beer, Limette - Würzig und erfrischend',
      category: 'cocktails',
      image: '/img/getrenk/moscowMule.jpg',
      alcohol: true,
      volume: '0.3l',
      ingredients: [
        { name: 'Wodka', amount: '5 cl' },
        { name: 'Ginger Beer', amount: '12 cl' },
        { name: 'Limette', amount: '1/2 Stück' },
        { name: 'Eis', amount: 'nach Bedarf' },
      ],
      prepTime: '2-3 Min.',
      price: '9,50 CHF',
    },
    {
      id: 9,
      name: 'Negroni',
      description: 'Gin, Campari, Vermouth Rosso - Der bittere Klassiker',
      category: 'cocktails',
      image: '/img/getrenk/negroni.jpg',
      alcohol: true,
      volume: '0.2l',
      ingredients: [
        { name: 'Gin', amount: '3 cl' },
        { name: 'Campari', amount: '3 cl' },
        { name: 'Vermouth Rosso', amount: '3 cl' },
        { name: 'Orange', amount: '1 Scheibe' },
      ],
      prepTime: '3-4 Min.',
      price: '10,00 CHF',
    },
    {
      id: 10,
      name: 'Vodka Soda',
      description: 'Wodka, Soda, Limette - Leicht und klar',
      category: 'cocktails',
      image: '/img/getrenk/vodkaSoda.jpg',
      alcohol: true,
      volume: '0.3l',
      ingredients: [
        { name: 'Wodka', amount: '5 cl' },
        { name: 'Soda', amount: '15 cl' },
        { name: 'Limette', amount: '1/4 Stück' },
        { name: 'Eis', amount: 'nach Bedarf' },
      ],
      prepTime: '1-2 Min.',
      price: '8,50 CHF',
    },
    {
      id: 11,
      name: 'Whisky Cola',
      description: 'Whisky, Cola - Der Klassiker schlechthin',
      category: 'cocktails',
      image: '/img/getrenk/wiskyCola.jpg',
      alcohol: true,
      volume: '0.4l',
      ingredients: [
        { name: 'Whisky', amount: '5 cl' },
        { name: 'Cola', amount: '15 cl' },
        { name: 'Eis', amount: 'nach Bedarf' },
      ],
      prepTime: '1-2 Min.',
      price: '9,00 CHF',
    },
    {
      id: 12,
      name: 'Whisky Sour',
      description: 'Whisky, Zitronensaft, Zuckersirup, Eiweiß - Sauer und cremig',
      category: 'cocktails',
      image: '/img/getrenk/wiskySour.jpg',
      alcohol: true,
      volume: '0.2l',
      ingredients: [
        { name: 'Whisky', amount: '5 cl' },
        { name: 'Zitronensaft', amount: '3 cl' },
        { name: 'Zuckersirup', amount: '2 cl' },
        { name: 'Eiweiß', amount: '1 Stück' },
        { name: 'Angostura', amount: '2 Spritzer' },
      ],
      prepTime: '3-4 Min.',
      price: '10,50 CHF',
    },
  ];

  // Filtrar por categoría + búsqueda
  const filteredItems = useMemo(() => {
    let items = drinkItems;
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery, drinkItems]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
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
  }, [filteredItems]);

  // Preload images
  useEffect(() => {
    drinkItems.forEach((item, index) => {
      const img = new window.Image();
      img.src = item.image;
      img.onload = () => {
        setPreloadedImages((prev) => new Set(prev).add(index));
      };
    });
  }, []);

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
      setSelectedItem(
        (selectedItem - 1 + filteredItems.length) % filteredItems.length
      );
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
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Getränkekarte</h1>
          <p>Entdecke unsere vielfältige Auswahl an Getränken</p>
          <div className="hero-line"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-wrapper">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Getränk suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Getränk suchen"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Suche löschen"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="categories-wrapper">
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                activeCategory === category.id ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Drinks Grid */}
      {filteredItems.length === 0 ? (
        <div className="no-results">
          <p>Keine Getränke gefunden für „{searchQuery}“</p>
        </div>
      ) : (
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
                className={`drink-item ${
                  visibleItems.includes(index) ? 'visible' : ''
                }`}
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
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="drink-overlay">
                    {item.alcohol ? (
                      <span className="drink-badge alcohol">🍸 Alkohol</span>
                    ) : (
                      <span className="drink-badge non-alcohol">
                        🧃 Alkoholfrei
                      </span>
                    )}
                  </div>
                </div>
                <div className="drink-content">
                  <div className="drink-header">
                    <h3>{item.name}</h3>
                    <span className="drink-volume">{item.volume}</span>
                  </div>
                  <p className="drink-description">{item.description}</p>
                  <div className="drink-price">{item.price}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedItem !== null && filteredItems[selectedItem] && (
        <div className="modal-overlay" onClick={closeModal}>
          <button className="modal-close" onClick={closeModal} aria-label="Schließen">
            <X size={28} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <button
            className="modal-nav prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Vorheriges"
          >
            <ChevronLeft size={28} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
          </button>

          <button
            className="modal-nav next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Nächstes"
          >
            <ChevronRight size={28} color="#ffffff" stroke="#ffffff" strokeWidth={2} />
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
                <span className="modal-volume">{filteredItems[selectedItem].volume}</span>
              </div>
              <p className="modal-description">
                {filteredItems[selectedItem].description}
              </p>

              <div className="modal-section">
                <h3 className="modal-section-title">
                  <Utensils size={16} /> Zutaten & Mengen
                </h3>
                <ul className="ingredients-list">
                  {filteredItems[selectedItem].ingredients.map((ing, i) => (
                    <li key={i} className="ingredient-row">
                      <span className="ingredient-name">{ing.name}</span>
                      <span className="ingredient-amount">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-details">
                <div className="modal-detail-item">
                  <Clock size={16} />
                  <span>Zubereitung: {filteredItems[selectedItem].prepTime}</span>
                </div>
                <div className="modal-detail-item">
                  <Euro size={16} />
                  <span>Preis: {filteredItems[selectedItem].price}</span>
                </div>
              </div>

              <div className="modal-tags">
                {filteredItems[selectedItem].alcohol ? (
                  <span className="modal-tag alcohol">🍸 Alkoholisch</span>
                ) : (
                  <span className="modal-tag non-alcohol">🧃 Alkoholfrei</span>
                )}
                <span className="modal-tag badge">
                  {filteredItems[selectedItem].category}
                </span>
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
          font-family: inherit;
        }

        /* Forzar texto claro en toda la página */
        .getraenkekarte-page,
        .getraenkekarte-page h1,
        .getraenkekarte-page h2,
        .getraenkekarte-page h3,
        .getraenkekarte-page p,
        .getraenkekarte-page span,
        .getraenkekarte-page button,
        .getraenkekarte-page input,
        .getraenkekarte-page li {
          color: #ffffff;
        }

        .hero-section,
        .search-wrapper,
        .categories-wrapper,
        .drinks-grid,
        .no-results,
        .modal-overlay {
          position: relative;
          z-index: 1;
        }

        .hero-section {
          padding: 0rem 2rem 2rem;
          text-align: center;
        }

        .hero-content h1 {
          color: #ffffff !important;
          font-size: 3.5rem;
          font-weight: 300;
          letter-spacing: 4px;
          margin-bottom: 0.5rem;
        }

        .hero-content p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.75) !important;
          font-weight: 300;
        }

        .hero-line {
          width: 50px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          margin: 1rem auto 0;
        }

        /* Search Bar */
        .search-wrapper {
          max-width: 600px;
          margin: 0 auto 1.5rem;
          padding: 0 1.5rem;
        }

        .search-container {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          padding: 0.7rem 1.2rem;
          transition: all 0.3s ease;
        }

        .search-container:focus-within {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
        }

        .search-icon {
          color: rgba(255, 255, 255, 0.5);
          flex-shrink: 0;
          margin-right: 0.6rem;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.95rem;
          color: #ffffff !important;
          font-family: inherit;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .search-clear {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff !important;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .search-clear:hover {
          background: rgba(255, 255, 255, 0.2);
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
          color: rgba(255, 255, 255, 0.7) !important;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.85rem;
          font-family: inherit;
        }

        .category-btn:hover {
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff !important;
        }

        .category-btn.active {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff !important;
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
          gap: 2rem;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.6) !important;
          font-size: 1rem;
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
          width: 75%;
          margin: 0 auto;
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
          padding-bottom: 100%;
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
          background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.6) 0%,
            transparent 100%
          );
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
          color: #ffffff !important;
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
          text-align: center;
        }

        .drink-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          flex-direction: column;
        }

        .drink-header h3 {
          color: #ffffff !important;
          font-size: 1.2rem;
          font-weight: 500;
          margin: 0 0 0.25rem 0;
        }

        .drink-volume {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5) !important;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .drink-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.65) !important;
          line-height: 1.5;
          margin: 0 0 0.75rem 0;
        }

        .drink-price {
          font-size: 1rem;
          font-weight: 500;
          color: #ffd54f !important;
          letter-spacing: 1px;
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
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 44px;
          height: 44px;
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
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-nav:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .modal-nav.prev {
          left: 0.75rem;
        }

        .modal-nav.next {
          right: 0.75rem;
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
          overflow-y: auto;
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
          align-self: start;
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
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .modal-info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 0.9rem;
          padding: 0.5rem 0;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .modal-title {
          font-size: 1.8rem;
          font-weight: 300;
          letter-spacing: 2px;
          color: #ffffff !important;
          margin: 0;
        }

        .modal-volume {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5) !important;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
        }

        .modal-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75) !important;
          margin: 0;
        }

        .modal-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .modal-section-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85) !important;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .ingredients-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .ingredient-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
          padding: 0.45rem 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          border-left: 2px solid rgba(255, 213, 79, 0.4);
        }

        .ingredient-name {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .ingredient-amount {
          color: #ffd54f !important;
          font-weight: 500;
          font-size: 0.82rem;
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
          color: rgba(255, 255, 255, 0.7) !important;
        }

        .modal-detail-item svg {
          color: rgba(255, 255, 255, 0.4);
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
          color: rgba(255, 255, 255, 0.75) !important;
        }

        .modal-tag.alcohol {
          border-color: rgba(255, 200, 0, 0.3);
          color: #ffd54f !important;
        }

        .modal-tag.non-alcohol {
          border-color: rgba(0, 255, 100, 0.3);
          color: #81c784 !important;
        }

        .modal-tag.badge {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6) !important;
        }

        .modal-counter {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.35) !important;
        }

        /* ============ RESPONSIVE ============ */

        @media (max-width: 1024px) {
          .drinks-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .drink-item {
            width: 80%;
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
        }

        @media (max-width: 768px) {
          .getraenkekarte-page {
            padding-top: 5.5rem;
          }

          .hero-section {
            padding: 0.5rem 1rem 1.5rem;
          }

          .hero-content h1 {
            font-size: 2.2rem;
            letter-spacing: 2px;
          }

          .hero-content p {
            font-size: 0.95rem;
          }

          .search-wrapper {
            padding: 0 1rem;
            margin-bottom: 1rem;
          }

          .search-container {
            padding: 0.6rem 1rem;
          }

          .search-input {
            font-size: 0.9rem;
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
            padding: 0.4rem 0.9rem;
            font-size: 0.78rem;
          }

          .drinks-grid {
            grid-template-columns: 1fr 1fr;
            padding: 0 1rem 2rem;
            gap: 1rem;
          }

          .drink-item {
            width: 100%;
          }

          .drink-content {
            padding: 0.9rem 0.7rem;
          }

          .drink-header h3 {
            font-size: 1rem;
          }

          .drink-description {
            font-size: 0.78rem;
            line-height: 1.4;
          }

          .drink-price {
            font-size: 0.9rem;
          }

          .drink-volume {
            font-size: 0.72rem;
          }

          .drink-badge {
            font-size: 0.55rem;
            padding: 0.15rem 0.55rem;
          }

          /* Modal móvil */
          .modal-overlay {
            align-items: flex-start;
            padding-top: 3rem;
            padding-bottom: 2rem;
          }

          .modal-content {
            grid-template-columns: 1fr;
            max-height: 92vh;
            padding: 0.9rem;
            gap: 0.9rem;
            width: 94%;
            overflow-y: auto;
          }

          .modal-image-container {
            aspect-ratio: 4 / 3;
            max-height: 30vh;
          }

          .modal-title {
            font-size: 1.3rem;
            letter-spacing: 1px;
          }

          .modal-description {
            font-size: 0.85rem;
          }

          .ingredient-row {
            font-size: 0.82rem;
            padding: 0.4rem 0.6rem;
          }

          .modal-nav {
            width: 36px;
            height: 36px;
            top: 26%;
          }

          .modal-nav svg {
            width: 20px;
            height: 20px;
          }

          .modal-nav.prev {
            left: 0.4rem;
          }

          .modal-nav.next {
            right: 0.4rem;
          }

          .modal-close {
            width: 36px;
            height: 36px;
            top: 0.6rem;
            right: 0.6rem;
          }

          .modal-close svg {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 1.8rem;
          }

          .drinks-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.8rem;
          }

          .drink-item {
            width: 100%;
          }

          .drink-header h3 {
            font-size: 0.9rem;
          }

          .drink-description {
            font-size: 0.72rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .drink-price {
            font-size: 0.85rem;
          }

          .modal-image-container {
            max-height: 25vh;
          }

          .modal-title {
            font-size: 1.1rem;
          }

          .modal-nav {
            top: 22%;
          }
        }
      `}</style>
    </div>
  );
}