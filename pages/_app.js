// pages/_app.js
import '../styles/globals.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import { siteConfig } from '../config/siteConfig'

function MyApp({ Component, pageProps, router }) {
  const isDashboard = router.pathname.startsWith("/dashboard");
  const { site, company, seo, contact, address, business } = siteConfig;
  const ogImageUrl = `${site.baseUrl}${seo.ogImage}`;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <meta name="robots" content={seo.robots} />

        {/* Canonical URL */}
        <link rel="canonical" href={site.baseUrl} />
        <link rel="manifest" href={company.manifest} />
        <link rel="icon" href={company.favicon} />
        <link rel="icon" type="image/png" sizes="32x32" href={company.logoSeo} />
        <link rel="icon" type="image/png" sizes="16x16" href={company.logoSeo} />

        {/* Open Graph */}
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content={seo.ogImageWidth} />
        <meta property="og:image:height" content={seo.ogImageHeight} />
        <meta property="og:image:alt" content={company.logoAlt} />
        <meta property="og:url" content={site.baseUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={company.name} />
        <meta property="og:locale" content={site.localeOg} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* hreflang generado automáticamente desde los locales */}
        {site.locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            href={`${site.baseUrl}/${loc}`}
            hrefLang={loc}
          />
        ))}
        <link rel="alternate" href={site.baseUrl} hrefLang="x-default" />

        {/* Structured Data (schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": business.type,
              name: company.name,
              description: company.tagline,
              address: {
                "@type": "PostalAddress",
                streetAddress: address.street,
                addressLocality: address.city,
                postalCode: address.zip,
                addressCountry: address.country,
              },
              telephone: contact.phone,
              email: contact.email,
              url: site.baseUrl,
              image: ogImageUrl,
              priceRange: business.priceRange,
              servesCuisine: business.servesCuisine,
              openingHours: business.openingHoursSchema,
            }),
          }}
        />
      </Head>

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
    </>
  )
}

export default MyApp