import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import SideBar from '../components/dashboard/sideBar/sideBarAdmin'
import { DashboardProvider } from '../contexts/DashboardContext'
import { AuthProvider } from '../components/auth/AuthProvider'
import { LanguageProvider } from '../contexts/LanguageContext'
import { ToastProvider } from '../contexts/ToastContext'

function MyApp({ Component, pageProps, router }) {
  const isDashboard = router.pathname.startsWith("/dashboard");
  const baseUrl = "https://www.salotto.ch"; // ✅ Actualizado a Salotto

  return (
    <>
      <Head>
        <title>Salotto | Bar | Restaurant | Eventlocation</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="Salotto - Ihre Eventlocation in Zürich. Bar, Restaurant und Events in einzigartiger Atmosphäre." />
        <meta name="robots" content="index, follow" />
              
        {/* Canonical URL */}
        <link rel="canonical" href={baseUrl} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/img/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/logo80.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/logo80.png" />
        
        {/* Open Graph Tags - Actualizado para Salotto */}
        <meta property="og:title" content="Salotto – Bar | Restaurant | Eventlocation" />
        <meta property="og:description" content="Ihre Eventlocation in Zürich. Genuss, Events und Gastfreundschaft in einzigartiger Atmosphäre." />
        <meta property="og:image" content={`${baseUrl}/img/logo80.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Salotto - Bar & Restaurant" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Salotto" />
        <meta property="og:locale" content="de_CH" />
        
        {/* Twitter Card Tags - Actualizado para Salotto */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Salotto – Bar | Restaurant | Eventlocation" />
        <meta name="twitter:description" content="Ihre Eventlocation in Zürich. Genuss, Events und Gastfreundschaft in einzigartiger Atmosphäre." />
        <meta name="twitter:image" content={`${baseUrl}/img/logo80.png`} />
        
        {/* ✅ CORREGIDO: hreflang → hrefLang */}
        <link rel="alternate" href="https://www.salotto.ch/de" hrefLang="de" />
        <link rel="alternate" href="https://www.salotto.ch/en" hrefLang="en" />
        <link rel="alternate" href="https://www.salotto.ch" hrefLang="x-default" />

        {/* Structured Data - Actualizado para Salotto */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Salotto",
              "description": "Bar, Restaurant und Eventlocation in Zürich",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Hardturmstrasse 169",
                "addressLocality": "Zürich",
                "postalCode": "8005",
                "addressCountry": "CH"
              },
              "telephone": "+41 78 874 79 74",
              "email": "info@salotto.ch",
              "url": baseUrl,
              "priceRange": "€€",
              "servesCuisine": "International",
              "openingHours": "Mo-Th 11:00-23:00, Fr-Sa 11:00-01:00, Su 11:00-22:00"
            })
          }}
        />
      </Head>
      
      <AuthProvider>
        <LanguageProvider>
          <ToastProvider>
            {isDashboard ? (
              <DashboardProvider>
                <SideBar>
                  <Component {...pageProps} />
                </SideBar>
              </DashboardProvider>
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </ToastProvider>
        </LanguageProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp