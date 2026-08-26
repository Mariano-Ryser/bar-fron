// utils/preloadDashboardSimple.js
let hasPreloaded = false;

export function preloadPublicPagesOnce() {
  if (typeof window === 'undefined' || hasPreloaded) return;
  
  hasPreloaded = true;
  
  const dashboardPages = [
    '/firmenevents',
    '/apero',
    '/geburtstag',
    '/speisekarte',
    '/mittagessen',
    '/galerie',
    '/jetztmieten',
    '/getrenk',
    '/konditionen',
  ];
   
  console.log('🚀 ...');
  
  dashboardPages.forEach((page, index) => {
    setTimeout(() => {
      // Precargar con Next.js
      if (window.next && window.next.router) {
        window.next.router.prefetch(page);
      }
      // Hacer fetch para forzar compilación
      fetch(page, { method: 'HEAD' }).catch(() => {});
    }, index * 300); // 500ms entre cada página
  }
);
}