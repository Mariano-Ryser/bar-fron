🍷 Salotto - Restaurant & Eventlocation Website
📖 Descripción del Proyecto
Salotto es un sitio web moderno para un restaurante y eventlocation en Zürich. El proyecto está construido con Next.js y utiliza CSS-in-JS con el sistema de estilos styled-jsx para un desarrollo modular y mantenible.

El sitio web presenta una experiencia de usuario elegante y fluida, con animaciones suaves, efectos parallax, y un diseño responsivo que se adapta perfectamente a todos los dispositivos.

🏗️ Tecnologías Utilizadas
Tecnología	Versión	Propósito
Next.js	14.x	Framework de React para renderizado del lado del servidor y enrutamiento
React	18.x	Biblioteca para construir interfaces de usuario
TypeScript	5.x	Tipado estático para un código más robusto
styled-jsx	-	CSS-in-JS para estilos a nivel de componente
Lucide React	-	Biblioteca de iconos SVG
EmailJS	-	Servicio para envío de correos desde el formulario de contacto
🚀 Estructura del Proyecto
text
salotto/
├── pages/                        # Páginas del sitio (Next.js routing)
│   ├── index.tsx                 # Homepage con carousel hero
│   ├── apero.tsx                 # Página de Apéro & Apéro Riche
│   ├── firmenevents.tsx          # Página de Firmenevents
│   ├── geburtstag.tsx            # Página de Geburtstagsfeier
│   ├── jetztmieten.tsx           # Página de contacto / formulario
│   ├── mittagessen.tsx           # Página de Mittagessen
│   ├── konditionen.tsx           # Página de Konditionen
│   └── _app.tsx                  # Componente principal de la aplicación
│
├── components/                   # Componentes reutilizables
│   ├── Footer.tsx                # Footer del sitio
│   └── HomeHero.tsx              # Hero carousel de la página principal
│
├── public/
│   ├── img/                      # Imágenes del sitio
│   │   ├── bar*.jpg/webp         # Imágenes del bar
│   │   ├── apero/                # Imágenes de la sección Apéro
│   │   ├── geburtstag/           # Imágenes de la sección Geburtstag
│   │   ├── jetztmieten/          # Imágenes de la sección Jetzt Mieten
│   │   └── logo-salotto.png      # Logo del sitio
│   └── pdf/                      # Documentos PDF descargables
│       ├── getraenkekarte.pdf
│       └── apero-food-karte.pdf
│
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
└── README.md                     # Este archivo
🎨 Sistema de Estilos
styled-jsx
El proyecto utiliza styled-jsx para el estilado de componentes. Este enfoque ofrece:

Aislamiento de estilos: Los estilos son específicos del componente, evitando conflictos CSS globales.

CSS nativo: Se utiliza CSS puro dentro de los componentes.

Soporte de SCSS: Permite usar sintaxis anidada y variables.

Ejemplo de uso:
tsx
export default function Component() {
  return (
    <div className="container">
      <h1>Hola Mundo</h1>
      
      <style jsx>{`
        .container {
          background: #000;
          padding: 2rem;
        }
        
        h1 {
          color: #ffffff;
          font-size: 2rem;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
📱 Diseño Responsivo
El sitio está completamente optimizado para dispositivos móviles, tablets y desktop.

Breakpoints utilizados:
Breakpoint	Dispositivo
1024px	Desktop pequeño / Tablet horizontal
768px	Tablet vertical
480px	Móvil
Características responsivas:
Grid layouts que se adaptan a diferentes tamaños de pantalla

Hero full-screen con ajuste de altura en móvil

Imágenes con object-fit: cover para mantener proporciones

Menús y navegación que se reorganizan en móvil

Formularios con inputs optimizados para touch

🎯 Componentes Principales
1. HomeHero
Carousel de imágenes con efecto parallax y navegación.

tsx
<HomeHero />
Características:

Slider automático (5 segundos)

Efecto de zoom lento en imágenes

Navegación con dots y flechas

Logo animado con pulse

Links de navegación principales

2. Footer
Footer con información de contacto, horarios y enlaces.

Características:

Logo y descripción de la marca

Información de contacto (teléfono, email, dirección)

Horarios de apertura

Enlaces a políticas de privacidad

📄 Páginas
Home (index.tsx)
Página principal con hero carousel.

Apéro (apero.tsx)
Información sobre Apéro y Apéro Riche para hasta 60 personas.

Descripción del servicio

Características destacadas

PDF descargables (Getränkekarte, Food-Karte)

Galería de imágenes

Links a Konditionen y Jetzt mieten

Firmenevents (firmenevents.tsx)
Página para eventos corporativos.

Lista de tipos de eventos

Sección con imagen y llamada a la acción

Formulario de contacto

Geburtstag (geburtstag.tsx)
Página para cumpleaños y fiestas privadas.

Características destacadas con iconos

Secciones con imágenes

Links a Konditionen y Jetzt mieten

Jetzt Mieten (jetztmieten.tsx)
Formulario de contacto para solicitar ofertas.

Formulario con campos: Betreff, Name, Email, Telefon, Nachricht

Integración con EmailJS

Teléfono de contacto

Mensaje de éxito

🎨 Paleta de Colores
Color	Uso
#000000	Fondo principal
#ffffff	Texto principal
#ffd700 / #fbff0d	Acentos y hover (dorado)
rgba(255,255,255,0.7)	Texto secundario
rgba(255,255,255,0.3)	Separadores y elementos sutiles
🔧 Instalación y Configuración
1. Clonar el repositorio
bash
git clone https://github.com/tu-usuario/salotto.git
cd salotto
2. Instalar dependencias
bash
npm install
# o
yarn install
3. Configurar EmailJS
En pages/jetztmieten.tsx, reemplazar las variables:

tsx
const result = await emailjs.send(
  'YOUR_SERVICE_ID',    // Reemplazar con tu Service ID
  'YOUR_TEMPLATE_ID',   // Reemplazar con tu Template ID
  {
    betreff: formData.betreff,
    name: formData.name,
    email: formData.email,
    telefon: formData.telefon,
    text: formData.text,
  },
  'YOUR_PUBLIC_KEY'     // Reemplazar con tu Public Key
);
4. Ejecutar en desarrollo
bash
npm run dev
# o
yarn dev
5. Construir para producción
bash
npm run build
npm start
# o
yarn build
yarn start
🗂️ Imágenes y Recursos
Las imágenes del sitio se encuentran en public/img/.

Estructura de imágenes:
text
public/img/
├── bar*.jpg/webp          # Imágenes del carousel home
├── apero/
│   ├── apero1.webp
│   ├── apero2.webp
│   ├── apero3.webp
│   └── apero4.webp
├── geburtstag/
│   ├── party1.webp
│   ├── party2.webp
│   └── party3.webp
├── jetztmieten/
│   ├── jetztmieten1.jpg
│   └── jetztmieten2.jpg
├── event-1.png            # Imagen hero firmenevents
├── event-2.jpg            # Imagen sección firmenevents
└── logo-salotto.png       # Logo principal
PDFs descargables:
text
public/pdf/
├── getraenkekarte.pdf
└── apero-food-karte.pdf
🔄 Dependencias Principales
json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "lucide-react": "^0.300.0",
    "@emailjs/browser": "^3.0.0"
  }
}
📈 Mejoras Futuras
□ Implementar sistema de reservas online
□ Galería de eventos con filtros
□ Blog de noticias y eventos
□ Sistema de comentarios y reseñas
□ Integración con Google Maps avanzada
□ Modo oscuro/claro
□ Internacionalización (i18n) para soporte multilingüe
👨‍💻 Equipo de Desarrollo
Este proyecto fue desarrollado por Stockercloud para Salotto Zürich.

📄 Licencia
© 2026 Salotto. Todos los derechos reservados.

🤝 Contribuciones
Para sugerencias o reportes de errores, por favor contactar al equipo de desarrollo.

Última actualización: 2026

This response is AI-generated, for reference only.
