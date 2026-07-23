import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Utensils, Clock } from 'lucide-react';

export default function Speisekarte() {
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
    menuItems.forEach((item, index) => {
      const img = new window.Image();
      img.src = item.image;
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(index));
      };
    });
  }, []);

  const categories = [
    { id: 'all', name: 'Alle' },
    { id: 'vorspeisen', name: 'Vorspeisen' },
    { id: 'hauptgerichte', name: 'Hauptgerichte' },
    { id: 'vegetarisch', name: 'Vegetarisch' },
    { id: 'Salat', name: 'Salat' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'specials', name: 'Specials' },
  ];

  const menuItems = [
    // Vorspeisen
    {
      id: 1,
      name: 'Salotto Platte',
      description: 'Eine Auswahl an italienischen Spezialitäten: Parmaschinken, Salami, Oliven, eingelegtes Gemüse und frisches Ciabatta',
      price: '18.50',
      category: 'vorspeisen',
      image: '/img/antipasti.jpg',
      isVegetarian: true,
      isGlutenFree: false,
      badge: 'Vegetarisch',
      ingredients: 'Parmaschinken, Salami, Oliven, eingelegtes Gemüse, Ciabatta',
      prepTime: '15-20 Min.'
    },
    {
      id: 2,
      name: 'Trüffel Risotto',
      description: 'Cremiges Risotto mit frischem Trüffel, Parmigiano Reggiano und einem Hauch von Weißwein',
      price: '22.00',
      category: 'vorspeisen',
      image: '/img/risotto.jpg',
      isVegetarian: true,
      isGlutenFree: true,
      badge: 'Vegetarisch',
      ingredients: 'Risotto, Trüffel, Parmigiano Reggiano, Weißwein',
      prepTime: '25-30 Min.'
    },
    {
      id: 3,
      name: 'Vitello Tonnato',
      description: 'Dünn geschnittenes Kalbfleisch mit einer delikaten Thunfisch-Kapern-Sauce, serviert mit Rucola',
      price: '24.50',
      category: 'vorspeisen',
      image: '/img/vitello.jpg',
      isVegetarian: false,
      isGlutenFree: true,
      badge: 'Klassiker',
      ingredients: 'Kalbfleisch, Thunfisch, Kapern, Rucola',
      prepTime: '20-25 Min.'
    },

    // Hauptgerichte
    {
      id: 4,
      name: 'Geschmorte Rinderbacke',
      description: 'Zart geschmorte Rinderbacke an Rotwein-Sauce mit Kartoffelgratin und saisonalem Gemüse',
      price: '34.00',
      category: 'hauptgerichte',
      image: '/img/rinderbacke.jpg',
      isVegetarian: false,
      isGlutenFree: true,
      badge: 'Chef´s Choice',
      ingredients: 'Rinderbacke, Rotwein-Sauce, Kartoffelgratin, saisonales Gemüse',
      prepTime: '30-40 Min.'
    },
    {
      id: 5,
      name: 'Lachsfilet vom Grill',
      description: 'Frisches Lachsfilet mit einer Zitronen-Dill-Kruste, serviert mit Spargel und Kartoffelpüree',
      price: '32.50',
      category: 'hauptgerichte',
      image: '/img/lachs.jpg',
      isVegetarian: false,
      isGlutenFree: true,
      badge: 'Fisch',
      ingredients: 'Lachsfilet, Zitrone, Dill, Spargel, Kartoffelpüree',
      prepTime: '20-25 Min.'
    },
    {
      id: 6,
      name: 'Truffel-Pasta',
      description: 'Frische Tagliatelle mit schwarzem Trüffel, Pilzen und einer leichten Sahne-Sauce',
      price: '28.00',
      category: 'hauptgerichte',
      image: '/img/pasta.jpg',
      isVegetarian: true,
      isGlutenFree: false,
      badge: 'Vegetarisch',
      ingredients: 'Tagliatelle, Trüffel, Pilze, Sahne-Sauce',
      prepTime: '15-20 Min.'
    },
    {
      id: 7,
      name: 'Salotto Burger',
      description: 'Saftiger Rindfleisch-Burger mit karamellisierten Zwiebeln, Cheddar, Bacon und hausgemachter Sauce',
      price: '26.00',
      category: 'hauptgerichte',
      image: '/img/burger.jpg',
      isVegetarian: false,
      isGlutenFree: false,
      badge: 'Signature',
      ingredients: 'Rindfleisch, karamellisierte Zwiebeln, Cheddar, Bacon, hausgemachte Sauce',
      prepTime: '20-25 Min.'
    },

    // Desserts
    // {
    //   id: 8,
    //   name: 'Tiramisu Klassik',
    //   description: 'Hausgemachtes Tiramisu mit Mascarpone, Espresso und Kakao – ein italienischer Klassiker',
    //   price: '12.00',
    //   category: 'desserts',
    //   image: '/img/tiramisu.jpg',
    //   isVegetarian: true,
    //   isGlutenFree: false,
    //   badge: 'Dessert',
    //   ingredients: 'Mascarpone, Espresso, Kakao, Löffelbiskuits',
    //   prepTime: '10-15 Min.'
    // },
    // {
    //   id: 9,
    //   name: 'Schokoladen-Fondant',
    //   description: 'Warmes Schokoladenkuchenherz mit flüssigem Kern, serviert mit Vanilleeis und Beeren',
    //   price: '14.00',
    //   category: 'desserts',
    //   image: '/img/fondant.jpg',
    //   isVegetarian: true,
    //   isGlutenFree: false,
    //   badge: 'Dessert',
    //   ingredients: 'Schokolade, Vanilleeis, Beeren',
    //   prepTime: '15-20 Min.'
    // },

    // Specials
    // {
    //   id: 10,
    //   name: 'Fischplatte Salotto',
    //   description: 'Eine Auswahl an frischen Fischen und Meeresfrüchten, gegrillt mit mediterranen Kräutern',
    //   price: '42.00',
    //   category: 'specials',
    //   image: '/img/fischplatte.jpg',
    //   isVegetarian: false,
    //   isGlutenFree: true,
    //   badge: 'Special',
    //   ingredients: 'Frische Fische, Meeresfrüchte, mediterrane Kräuter',
    //   prepTime: '30-40 Min.'
    // },
    // {
    //   id: 11,
    //   name: 'Steak Tasting',
    //   description: 'Verschiedene Steak-Sorten vom Grill mit Beilagen und selbstgewählten Saucen',
    //   price: '48.00',
    //   category: 'specials',
    //   image: '/img/steak.jpg',
    //   isVegetarian: false,
    //   isGlutenFree: true,
    //   badge: 'Special',
    //   ingredients: 'Steak-Sorten, Beilagen, Saucen',
    //   prepTime: '25-35 Min.'
    // },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

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
    <div className="speisekarte-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Speisekarte</h1>
          <p>Entdecke unsere kulinarischen Kreationen</p>
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
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredItems.map((item, index) => {
          const refCallback = (el: HTMLDivElement | null) => {
            itemRefs.current[index] = el;
          };

          return (
            <div
              key={item.id}
              ref={refCallback}
              data-index={index}
              className={`menu-item ${visibleItems.includes(index) ? 'visible' : ''}`}
              onClick={() => openModal(index)}
            >
              <div className="menu-item-image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="menu-image"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="menu-item-overlay">
                  <span className="menu-badge">{item.badge}</span>
                </div>
              </div>
              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="menu-price">€ {item.price}</span>
                </div>
                <p className="menu-description">{item.description}</p>
                <div className="menu-tags">
                  {item.isVegetarian && (
                    <span className="tag vegetarian">🌱 Vegetarisch</span>
                  )}
                  {item.isGlutenFree && (
                    <span className="tag gluten-free">🌾 Glutenfrei</span>
                  )}
                </div>
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
                <span className="modal-price">€ {filteredItems[selectedItem].price}</span>
              </div>
              <p className="modal-description">{filteredItems[selectedItem].description}</p>
              <div className="modal-details">
                <div className="modal-detail-item">
                  <Utensils size={16} />
                  <span>{filteredItems[selectedItem].ingredients}</span>
                </div>
                <div className="modal-detail-item">
                  <Clock size={16} />
                  <span>Zubereitung: {filteredItems[selectedItem].prepTime}</span>
                </div>
              </div>
              <div className="modal-tags">
                {filteredItems[selectedItem].isVegetarian && (
                  <span className="modal-tag vegetarian">🌱 Vegetarisch</span>
                )}
                {filteredItems[selectedItem].isGlutenFree && (
                  <span className="modal-tag gluten-free">🌾 Glutenfrei</span>
                )}
                <span className="modal-tag badge">{filteredItems[selectedItem].badge}</span>
              </div>
              <span className="modal-counter">
                {selectedItem + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .speisekarte-page {
          background: #000000;
          min-height: 100vh;
          padding-top: 8rem;
          color: #ffffff;
        }

        /* Hero - Sin mucho margin */
        .hero-section {
          padding: 1rem 2rem 3rem;
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
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
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

        /* Menu Grid */
        .menu-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .menu-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.6s ease;
          cursor: pointer;
        }

        .menu-item.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .menu-item:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .menu-item-image {
          position: relative;
          width: 100%;
          padding-bottom: 60%;
          overflow: hidden;
        }

        .menu-image {
          transition: transform 0.5s ease;
        }

        .menu-item:hover .menu-image {
          transform: scale(1.05);
        }

        .menu-item-overlay {
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

        .menu-badge {
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

        .menu-item-content {
          padding: 1.25rem;
        }

        .menu-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .menu-item-header h3 {
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }

        .menu-price {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
          margin-left: 0.75rem;
        }

        .menu-description {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .menu-tags {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .tag {
          font-size: 0.65rem;
          padding: 0.1rem 0.6rem;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.6);
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

        .modal-price {
          font-size: 1.6rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          white-space: nowrap;
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

        .modal-tag.vegetarian {
          border-color: rgba(76, 175, 80, 0.3);
          color: #81C784;
        }

        .modal-tag.gluten-free {
          border-color: rgba(255, 152, 0, 0.3);
          color: #FFB74D;
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
          .speisekarte-page {
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
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }

          .menu-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem 2rem;
            gap: 1rem;
          }

          .menu-item-image {
            padding-bottom: 55%;
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

          .menu-item-header h3 {
            font-size: 0.95rem;
          }

          .menu-price {
            font-size: 0.95rem;
          }

          .menu-description {
            font-size: 0.8rem;
          }

          .menu-item-content {
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