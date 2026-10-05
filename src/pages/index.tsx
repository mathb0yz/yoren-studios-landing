import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Head>
        <title>{`${site.name} — Landing pages y tiendas online`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={site.description} />
        <meta name="theme-color" content="#0b0b0d" />
        <meta name="keywords" content="landing pages, tiendas online, sitios web, diseño web, agencia de desarrollo" />
        <link rel="canonical" href={site.url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:title" content={`${site.name} — ${site.tagline}`} />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={site.url} />
        <meta property="og:image" content={`${site.url}/og-image.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${site.name} — ${site.tagline}`} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={`${site.url}/og-image.svg`} />
      </Head>

      <Navbar />

      <main>
        <Hero />
        <Portfolio />
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: site.name,
            url: site.url,
            email: site.email,
            description: site.description,
            areaServed: "Worldwide",
            foundingDate: String(site.founded),
            sameAs: site.url
          })
        }}
      />
    </>
  );
}