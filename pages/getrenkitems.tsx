import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Wine, Coffee, Beer, Martini, GlassWater, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DrinkItem {
  name: string;
  description?: string;
  price?: string;
  price30?: string;
  price50?: string;
  priceBottle?: string;
}

interface DrinkSection {
  title: string;
  icon: React.ReactNode;
  note?: string;
  items: DrinkItem[];
  isVolumeTable?: boolean;
}

export default function Getraenkekarte() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections: DrinkSection[] = [
    {
      title: 'Kaffee & Tee',
      icon: <Coffee size={22} strokeWidth={1.8} />,
      note: 'Unseren Kaffee liefert die Rösterei Café Noir aus dem Kreis 5',
      items: [
        { name: 'Espresso', price: '4.50' },
        { name: 'Espresso doppio', price: '5.00' },
        { name: 'Café Americano', price: '5.00' },
        { name: 'Cappuccino', price: '5.50' },
        { name: 'Diverse Tees', price: '5.00' },
      ],
    },
    {
      title: 'Softdrinks & Fruchtsäfte',
      icon: <GlassWater size={22} strokeWidth={1.8} />,
      isVolumeTable: true,
      items: [
        { name: 'Mineral & Tafelwasser', price30: '4.00', price50: '6.00' },
        { name: 'Softdrinks offen · Cola, Cola Zero, Citro, Tonic, Ginger Ale', price30: '5.00', price50: '7.00' },
        { name: 'Fruchtsäfte (Apfel, Orange)', price30: '5.00', price50: '8.00' },
        { name: 'Club Mate 33 cl', price50: '6.00' },
        { name: 'Based Ice Tea Hibiscus Mint 33 cl', price50: '6.00' },
        { name: 'Based Ice Tea Matcha Lemon 33 cl', price50: '6.00' },
      ],
    },
    {
      title: 'Biere',
      icon: <Beer size={22} strokeWidth={1.8} />,
      note: 'Bierspezialitäten aus regionaler Brauerei (Bier Paul)',
      items: [
        { name: 'Paul 01 Spezial Stange / Panaché 33 cl · 4.6%', price: '6.00' },
        { name: 'Paul 01 Spezial Gross 50 cl', price: '9.00' },
        { name: 'Paul Spezial Saisonal 33 cl', price: '7.00' },
        { name: 'Leermond Alkoholfrei 33 cl', price: '6.00' },
      ],
    },
    {
      title: 'Shots (2 cl)',
      icon: <Martini size={22} strokeWidth={1.8} />,
      items: [
        { name: 'Hierbas Ibicencas', price: '6.00' },
        { name: 'Berliner Luft', price: '6.00' },
        { name: 'Sambuca con mosca', price: '6.00' },
      ],
    },
    {
      title: 'Apéro & Spritz',
      icon: <Wine size={22} strokeWidth={1.8} />,
      items: [
        { name: 'Aperol Spritz · Aperol, Prosecco', price: '13.00' },
        { name: 'Impero, Soda, Orange', price: '' },
        { name: 'Hugo · Prosecco, Holunderblütensirup, Minze, Limette', price: '13.00' },
        { name: 'Campari Spritz', price: '13.00' },
        { name: 'Martini Spritz', price: '13.00' },
      ],
    },
    {
      title: 'Longdrinks & Cocktails',
      icon: <Martini size={22} strokeWidth={1.8} />,
      items: [
        { name: 'Gin Tonic · mit Tanqueray', price: '16.00' },
        { name: 'Wodka Tonic · mit Stolichnaya', price: '16.00' },
        { name: 'Whisky Cola · mit Jameson', price: '16.00' },
        { name: 'Rum Cola · mit Pampero Especial', price: '16.00' },
        { name: 'Moscow Mule · Stolichnaya, Ginger Beer, Limette', price: '17.00' },
        { name: 'Amaretto Sour', price: '18.00' },
        { name: 'Negroni · Campari, Gin, Vermouth Rosso', price: '18.00' },
        { name: 'Espresso Martini · Café Noir Espresso, Wodka, Kahlúa', price: '18.00' },
      ],
    },
    {
      title: 'Weine & Schaumweine',
      icon: <Wine size={22} strokeWidth={1.8} />,
      isVolumeTable: true,
      items: [
        { name: 'Impero Prosecco · Treviso DOC Brut, Venetien, Italien 11.5%', price30: '9.00', priceBottle: '63.00' },
        { name: 'Cesari Pinot Grigio · delle Venezie, Venetien, Italien', price30: '7.50', priceBottle: '52.50' },
        { name: 'Monte Velho Branco · Herdade do Esporão, Alentejo, Portugal', price30: '7.00', priceBottle: '49.00' },
        { name: 'Amalaya Malbec · Salta, Calchaqui Valley, Argentinien', price30: '9.00', priceBottle: '63.00' },
        { name: 'Monte Velho Tinto · Herdade do Esporão, Alentejo, Portugal', price30: '8.00', priceBottle: '56.00' },
      ],
    },
    {
      title: 'Aperitif & Digestif',
      icon: <Sparkles size={22} strokeWidth={1.8} />,
      note: 'Portionen 4 cl',
      items: [
        { name: 'Ramazzotti / Averna / Braulio 21-28%', price: '8.00' },
        { name: 'Campari / Fernet Branca 23-28%', price: '8.00' },
        { name: 'Martini Bianco 16.0%', price: '8.00' },
        { name: 'Pastis 51 45.0%', price: '10.00' },
        { name: 'Sambuca Molinari 40.0%', price: '9.00' },
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Getränkekarte · Salotto Zürich</title>
        <meta name="description" content="Getränkekarte der Salotto Bar Café Eventlocation in Zürich-West." />
      </Head>

      <div className="getraenkekarte-page">
        {/* HEADER */}
        <header className={`page-header ${isVisible ? 'visible' : ''}`}>
          <Link href="/apero" className="back-link">
            <ArrowLeft size={18} strokeWidth={2} />
            <span>Zurück zum Apéro</span>
          </Link>
          <div className="header-content">
            <p className="header-eyebrow">Salotto Zürich</p>
            <h1 className="header-title">Getränkekarte</h1>
            <div className="header-line" />
          </div>
        </header>

        {/* CONTENT */}
        <main className="menu-container">
          <div className="menu-grid">
            {sections.map((section, idx) => (
              <section
                key={section.title}
                className="menu-section"
                style={{ animationDelay: `${0.1 + idx * 0.08}s` }}
              >
                <div className="section-header">
                  <span className="section-icon">{section.icon}</span>
                  <h2 className="section-title">{section.title}</h2>
                </div>

                {section.note && (
                  <p className="section-note">{section.note}</p>
                )}

                {section.isVolumeTable ? (
                  <table className="drink-table volume-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>{section.title.includes('Weine') ? '1 dl' : '30 cl'}</th>
                        <th>{section.title.includes('Weine') ? 'Flasche' : '50 cl'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item, i) => (
                        <tr key={i}>
                          <td className="drink-name">{item.name}</td>
                          <td className="drink-price">{item.price30 || '—'}</td>
                          <td className="drink-price">{item.price50 || item.priceBottle || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <ul className="drink-list">
                    {section.items.map((item, i) => (
                      <li key={i} className="drink-item">
                        <span className="drink-name">{item.name}</span>
                        {item.price && (
                          <span className="drink-dots" />
                        )}
                        {item.price && (
                          <span className="drink-price">{item.price}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* FOOTER INFO */}
          <footer className="menu-footer">
            <p>Salotto Zürich · Hardturmstrasse 169, 8005 Zürich</p>
            <p>Alle Preise in CHF inkl. 8.1% MWST</p>
          </footer>
        </main>

        <style jsx>{`
          /* ============ BASE ============ */
          .getraenkekarte-page {
            background: #000;
            min-height: 100vh;
            color: #fff;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            padding-bottom: 4rem;
          }

          /* ============ HEADER ============ */
          .page-header {
            position: relative;
            padding: 7rem 2rem 3rem;
            max-width: 1400px;
            margin: 0 auto;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
          }

          .page-header.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: rgba(255, 255, 255, 0.5);
            text-decoration: none;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            transition: color 0.3s ease, transform 0.3s ease;
            margin-bottom: 2.5rem;
          }

          .back-link:hover {
            color: rgba(255, 255, 255, 0.9);
            transform: translateX(-4px);
          }

          .header-content {
            text-align: center;
          }

          .header-eyebrow {
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 6px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.45);
            margin: 0 0 1rem;
          }

          .header-title {
            font-size: clamp(2.2rem, 5vw, 3.8rem);
            font-weight: 500;
            letter-spacing: 3px;
            line-height: 1.1;
            margin: 0;
            color: #fff;
            text-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
          }

          .header-line {
            width: 70px;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            margin: 1.6rem auto 0;
          }

          /* ============ MENU CONTAINER ============ */
          .menu-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .menu-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem 4rem;
            margin-top: 2rem;
          }

          /* ============ SECTION ============ */
          .menu-section {
            opacity: 0;
            transform: translateY(24px);
            animation: sectionIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
          }

          @keyframes sectionIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .section-header {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            padding-bottom: 0.9rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 1rem;
          }

          .section-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.85);
            flex-shrink: 0;
            transition: transform 0.3s ease, background 0.3s ease;
          }

          .menu-section:hover .section-icon {
            transform: scale(1.08) rotate(-4deg);
            background: rgba(255, 255, 255, 0.08);
          }

          .section-title {
            font-size: 1.15rem;
            font-weight: 500;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #fff;
            margin: 0;
          }

          .section-note {
            font-size: 0.88rem;
            color: rgba(255, 255, 255, 0.45);
            font-style: italic;
            margin: 0 0 1rem;
            line-height: 1.5;
          }

          /* ============ DRINK LIST ============ */
          .drink-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .drink-item {
            display: flex;
            align-items: baseline;
            gap: 0.6rem;
            font-size: 1rem;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.88);
          }

          .drink-item .drink-name {
            flex-shrink: 0;
            max-width: 75%;
          }

          .drink-item .drink-dots {
            flex: 1;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.18);
            margin-bottom: 0.25rem;
            min-width: 1rem;
          }

          .drink-item .drink-price {
            flex-shrink: 0;
            font-weight: 500;
            color: #fff;
            font-variant-numeric: tabular-nums;
          }

          /* ============ VOLUME TABLE ============ */
          .volume-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 1rem;
          }

          .volume-table thead th {
            text-align: right;
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.45);
            padding-bottom: 0.6rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .volume-table thead th:first-child {
            text-align: left;
          }

          .volume-table tbody td {
            padding: 0.55rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.88);
            vertical-align: top;
          }

          .volume-table tbody td.drink-name {
            text-align: left;
            line-height: 1.5;
            padding-right: 1rem;
          }

          .volume-table tbody td.drink-price {
            text-align: right;
            font-weight: 500;
            color: #fff;
            font-variant-numeric: tabular-nums;
            white-space: nowrap;
            width: 70px;
          }

          /* ============ FOOTER ============ */
          .menu-footer {
            text-align: center;
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.85rem;
            letter-spacing: 0.5px;
          }

          .menu-footer p {
            margin: 0.3rem 0;
          }

          /* ============ RESPONSIVE ============ */
          @media (max-width: 1024px) {
            .menu-grid {
              grid-template-columns: 1fr;
              gap: 2.5rem;
            }

            .menu-container {
              padding: 0 1.8rem;
            }

            .page-header {
              padding: 6rem 1.8rem 2.5rem;
            }
          }

          @media (max-width: 768px) {
            .page-header {
              padding: 8rem 1.2rem 2rem;
            }

            .menu-container {
              padding: 0 1.2rem;
            }

            .section-title {
              font-size: 1.05rem;
            }

            .drink-item {
              font-size: 0.95rem;
            }

            .volume-table tbody td.drink-price {
              width: 60px;
              font-size: 0.95rem;
            }
          }

          @media (max-width: 480px) {
            .page-header {
              padding: 6rem 1rem 1.8rem;
            }

            .menu-container {
              padding: 0 1rem;
            }

            .header-title {
              font-size: 2rem;
              letter-spacing: 2px;
            }

            .header-eyebrow {
              letter-spacing: 4px;
              font-size: 0.7rem;
            }

            .section-header {
              gap: 0.7rem;
            }

            .section-icon {
              width: 36px;
              height: 36px;
            }

            .section-title {
              font-size: 0.98rem;
              letter-spacing: 1.5px;
            }

            .drink-item {
              font-size: 0.92rem;
            }

            .drink-item .drink-name {
              max-width: 70%;
            }

            .volume-table {
              font-size: 0.92rem;
            }

            .volume-table tbody td.drink-price {
              width: 55px;
              font-size: 0.9rem;
            }
          }

          /* ============ ACCESSIBILITY ============ */
          @media (prefers-reduced-motion: reduce) {
            .page-header,
            .menu-section {
              animation: none !important;
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}