// config/siteConfig.ts

// ============================================
// TIPOS
// ============================================

export type HeroSlide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

export type HeroLink = {
  href: string;
  text: string;
};

export type NavItem = {
  href: string;
  text: string;
};

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
};

// ============================================
// CONFIG
// ============================================

export const siteConfig = {
  // ====== SITE (URL base, dominio) ======
  site: {
    baseUrl: "https://www.salotto.ch",
    domain: "salotto.ch",
    locales: ["de", "en"] as const,
    defaultLocale: "de",
    localeOg: "de_CH", // formato Open Graph
  },

  // ====== IDENTIDAD ======
  company: {
    name: "Salotto",
    legalName: "Salotto GmbH",
    tagline: "Bar | Restaurant | Eventlocation",
    slogan: "Ihre Eventlocation in Zürich",
    logo: "/img/logo-salotto.png", 
    logoAlt: "Salotto - Bar & Restaurant",
    logoSeo: "/img/S.png", 
    favicon: "/img/favicon.ico",
    manifest: "/manifest.json",
  },

  // ====== SEO ======
  seo: {
    title: "Salotto | Bar | Restaurant | Eventlocation",
    description:
      "Salotto - Ihre Eventlocation in Zürich. Bar, Restaurant und Events in einzigartiger Atmosphäre.",
    ogTitle: "Salotto – Bar | Restaurant | Eventlocation",
    ogDescription:
      "Ihre Eventlocation in Zürich. Genuss, Events und Gastfreundschaft in einzigartiger Atmosphäre.",
    ogImage: "/img/logo80.png",
    ogImageWidth: "1200",
    ogImageHeight: "630",
    robots: "index, follow",
    keywords: "Salotto, Bar, Restaurant, Eventlocation, Zürich, Events",
  },

  // ====== CONTACTO ======
  contact: {
    phone: "+41 76 227 55 43",
    phoneHref: "tel:+41762275543",
    email: "info@salotto.ch",
    emailHref: "mailto:info@salotto.ch",
  },

  // ====== DIRECCIÓN ======
  address: {
    street: "Hardturmstrasse 169",
    zip: "8005",
    city: "Zürich",
    country: "CH",
    countryName: "Schweiz",
    mapsUrl: "https://www.google.com/maps/place/Salotto+Bar+I+Lunch+I+Eventlocation/@47.3933226,8.5087277,671m/data=!3m1!1e3!4m15!1m8!3m7!1s0x47900a48ae02bb3d:0xa1205263669fd54e!2sHardturmstrasse+169,+8005+Z%C3%BCrich!3b1!8m2!3d47.3933226!4d8.5113026!16s%2Fg%2F11q2x8smfb!3m5!1s0x47900a48ad4fe49d:0x40c09eb32643d4f4!8m2!3d47.393454!4d8.511219!16s%2Fg%2F1jglsnd9t?entry=ttu",
  },
footer: {
  brandText:
    "Willkommen im Salotto – Ihre Location für unvergessliche Momente. Genuss, Events und Gastfreundschaft in einzigartiger Atmosphäre.",
  columns: {
    company: {
      title: "Unternehmen",
      items: [
        { key: "Datenschutz", route: "/informativePages/termsPage" },
      ],
    },
    openingHours: {
      title: "Öffnungszeiten",
      items: [
        { day: "Montag - Freitag", hours: "10:00 - 15:00" },
        { day: "Privatanlässe auf Anfrage", hours: "" },
      ],
    },
    contact: {
      title: "Kontakt",
    },
  },
  legal: {
    copyright: (year: number) => `© ${year} Salotto. Alle Rechte vorbehalten.`,
    links: [
      { text: "Datenschutz", route: "/informativePages/termsPage" },
    ],
  },
},
  // ====== NEGOCIO (para schema.org) ======
  business: {
    type: "Restaurant", // "Restaurant" | "BarOrPub" | "CafeOrCoffeeShop" ...
    priceRange: "€€",
    servesCuisine: "International",
    openingHoursSchema:
      "Mo-Th 11:00-23:00, Fr-Sa 11:00-01:00, Su 11:00-22:00",
    openingHours: {
      monday: "11:00 - 23:00",
      tuesday: "11:00 - 23:00",
      wednesday: "11:00 - 23:00",
      thursday: "11:00 - 23:00",
      friday: "11:00 - 01:00",
      saturday: "11:00 - 01:00",
      sunday: "11:00 - 22:00",
    },
  },

  // ====== REDES SOCIALES ======
  social: {
    instagram: "https://instagram.com/salotto", // ajústalo
    facebook: "",
    tiktok: "",
  },

  // ====== NAVEGACIÓN (Header) ======
  nav: [
  { href: "/mittagessen",  text: "Mittagessen" },
  { href: "/firmenevents", text: "Eventlocation" },
  { href: "/geburtstag",   text: "Geburtstag" },
  { href: "/apero",     text: "Apéro" },
  { href: "/galerie",   text: "Galerie" },
  // { href: "/jetztmieten", text: "Jetzt mieten" },
  ] as NavItem[],

  // ====== PÁGINAS ======
  pages: {
    galerie: {
      seo: {
        title: "Galerie",
        description:
          "Entdecken Sie unsere Galerie – Ein Blick in die Salotto Location in Zürich.",
        url: "/galerie",
      },
      hero: {
        title: "Unsere Galerie",
        subtitle: "Ein Blick in die Salotto Location",
      },
      labels: {
        category: "Ambiente",
        viewHint: "Klicken zum Vergrößern",
      },
      images: [
        { id: 1,  src: "/img/gallery-1.jpg",  alt: "Salotto Ambiente 1" },
        { id: 2,  src: "/img/gallery-2.jpg",  alt: "Salotto Ambiente 2" },
        { id: 3,  src: "/img/gallery-3.jpg",  alt: "Salotto Ambiente 3" },
        { id: 4,  src: "/img/gallery-4.webp", alt: "Salotto Ambiente 4" },
        { id: 5,  src: "/img/gallery-5.jpg",  alt: "Salotto Ambiente 5" },
        { id: 6,  src: "/img/gallery-6.jpg",  alt: "Salotto Ambiente 6" },
        { id: 7,  src: "/img/gallery-7.jpg",  alt: "Salotto Ambiente 7" },
        { id: 8,  src: "/img/gallery-8.jpg",  alt: "Salotto Ambiente 8" },
        { id: 9,  src: "/img/gallery-9.jpg",  alt: "Salotto Ambiente 9" },
        { id: 10, src: "/img/gallery-10.jpg", alt: "Salotto Ambiente 10" },
        { id: 11, src: "/img/gallery-11.jpg", alt: "Salotto Ambiente 11" },
        { id: 12, src: "/img/gallery-12.jpg", alt: "Salotto Ambiente 12" },
      ] as GalleryImage[],
    },
    mittagessen: {
    seo: {
      title: "Mittagessen",
      description:
        "Mittagessen im Salotto Zürich – Frisch, vielfältig & täglich wechselnd. Warme und kalte Küche, vor Ort oder zum Mitnehmen.",
      url: "/mittagessen",
      image: "/img/mittag/mittag1.png", // 👈 opcional, para OG image
    },
    hero: {
      title: "Lunch Time",
      subtitle: "Mittagessen im Salotto",
      description: "🍽️ Frisch, vielfältig & täglich wechselnd",
      image: "/img/mittag/mittag1.png",
      imageAlt: "Mittagessen Salotto Zürich",
    },
    intro: {
      text: "Ob für eine schnelle Mittagspause, ein entspanntes Essen vor Ort oder zum Mitnehmen – bei uns findet jeder etwas Passendes. Unsere Küche bietet täglich frische, abwechslungsreiche Gerichte mit vegetarischen und fleischhaltigen Optionen.",
      features: [
        { icon: "clock",    text: "Täglich wechselndes Menü" },
        { icon: "utensils", text: "Vegetarische & fleischhaltige Optionen" },
        { icon: "coffee",   text: "Vor Ort oder zum Mitnehmen" },
      ],
    },
    warmeKueche: {
      title: "Warme Küche",
      image: "/img/mittag/mittag3.webp",
      imageAlt: "Warme Küche Salotto",
      items: [
        "Penne Bolognese, Pomodoro oder Pesto",
        "Vegetarisches Thai Curry",
        "Thai Curry mit Poulet",
        "Chili con Carne",
        "Tagessuppe",
        "Gnocchi (Pomodoro oder Bolognese)",
        "Wochenravioli (vegetarisch)",
        "Tagesmenü vegetarisch oder mit Fleisch",
      ],
    },
    kalteKueche: {
      title: "Kalte Küche",
      subtitle: "Unsere saisonal wechselnden Sommersalate",
      image: "/img/mittag/mittag2.webp",
      imageAlt: "Kalte Küche Salotto",
      items: [
        "Griechischer Salat",
        "Linsen-Gemüse-Salat",
        "Taboulé-Salat (vegetarisch oder mit Chicken)",
        "Caesar Salat",
      ],
    },
    reservation: {
      title: "Tischreservationen",
      text: "Reservationen für das Mittagessen nehmen wir gerne telefonisch am selben Tag entgegen.",
      hours: "Mo – Fr, 10 – 15 Uhr",
      // 👇 El teléfono es específico de esta página,
      //    distinto al general del negocio
      phone: "076 227 55 43",
      phoneHref: "tel:0762275543",
      buttonText: "Jetzt anrufen",
    },
  },

  },

  // ====== HOME (Hero) ======
  home: {
    hero: {
      // Duración de cada slide de imagen (ms)
      slideDuration: 5000,

      // Slides del carrusel
      slides: [
        { type: "image", src: "/img/bar44.png",  alt: "Bar Ambiente 6" },
        { type: "image", src: "/img/bar1w.webp", alt: "Bar Ambiente 1" },
        { type: "image", src: "/img/bar23.jpg",  alt: "Bar Ambiente 4" },
        { type: "image", src: "/img/bar33.jpg",  alt: "Bar Ambiente 3" },
        { type: "image", src: "/img/bar5.jpg",   alt: "Bar Ambiente 5" },
        { type: "image", src: "/img/bar22.jpg",  alt: "Bar Ambiente 2" },

        // Descomenta cuando lo necesites:
        // { type: "video", src: "/img/videoPlato.mp4", alt: "Video Plato" },
      ] as HeroSlide[],

      // Links del hero (los que van debajo del logo)
      links: [
        { href: "/firmenevents", text: "Eventlocation" },
        { href: "/geburtstag",   text: "Geburtstag" },
       { href: "/apero",      text: "Apéro" },
        { href: "/mittagessen",  text: "Mittagessen" },
        { href: "/jetztmieten", text: "Jetzt mieten" },
        { href: "/konditionen", text: "Konditionen" },
      ] as HeroLink[],
    },
  },


} as const;