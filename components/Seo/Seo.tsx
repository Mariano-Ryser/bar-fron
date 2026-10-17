// components/Seo.tsx
import Head from "next/head";
import { siteConfig } from "../../config/siteConfig";

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
};

export default function Seo({
  title,
  description,
  image,
  url,
  type = "website",
}: SeoProps) {
  const { site, company, seo, contact, address, business } = siteConfig;

  const fullTitle = title ? ` ${company.name} | ${title}` : seo.title;
  const fullDesc = description ?? seo.description;
  const fullImage = `${site.baseUrl}${image ?? seo.ogImage}`;
  const fullUrl = url ? `${site.baseUrl}${url}` : site.baseUrl;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:locale" content={site.localeOg} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image" content={fullImage} />
    </Head>
  );
}