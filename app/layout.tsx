import type { Metadata } from "next";
import ToTop from "@/components/ToTop";
import { ME, PROJECTS, EXPERIENCE } from "@/lib/data";
import "./globals.css";

const DESC =
  `${ME.name} (${ME.legalName}) is an ${ME.title} in ${ME.location}. ` +
  `He builds products end to end — eqlTab splits household bills from a forwarded email, ` +
  `eqlShare moves files between your devices, and Leash keeps AI agents inside their spending limits.`;

export const metadata: Metadata = {
  metadataBase: new URL(ME.site),
  title: { default: `${ME.name} — ${ME.title}`, template: `%s — ${ME.name}` },
  description: DESC,
  applicationName: ME.name,
  authors: [{ name: ME.name, url: ME.site }],
  creator: ME.name,
  publisher: ME.name,
  keywords: [
    ME.name, ME.legalName, "vikaschowdary", "Vikas Chowdary developer",
    "full-stack engineer Chicago", "React developer Chicago", "AI engineer",
    "eqlTab", "eqlShare", "Leash", "React Native", "Next.js",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: ME.site,
    siteName: ME.name,
    title: `${ME.name} — ${ME.title}`,
    description: DESC,
    locale: "en_US",
    firstName: "Vikas",
    lastName: "Chowdary",
  },
  twitter: { card: "summary_large_image", title: `${ME.name} — ${ME.title}`, description: DESC },
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // After deploying, verify ownership in Google Search Console and paste the token here:
  // verification: { google: "xxxxxxxx" },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${ME.site}/#person`,
  name: ME.name,
  alternateName: [ME.legalName, "vikaschowdary.chimmili"],
  givenName: "Vikas",
  familyName: "Chowdary Chimmili",
  jobTitle: ME.title,
  description: DESC,
  email: `mailto:${ME.email}`,
  url: ME.site,
  image: `${ME.site}/logo-512.png`,
  sameAs: ME.sameAs,
  address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL", addressCountry: "US" },
  worksFor: { "@type": "Organization", name: EXPERIENCE[0].org },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Quinnipiac University" },
  knowsAbout: [
    "React", "Next.js", "React Native", "TypeScript", "Node.js", "Python",
    "Supabase", "PostgreSQL", "AWS", "AI agents", "LLM tooling", "Web application security",
  ],
  owns: PROJECTS.filter((p) => p.url).map((p) => ({ "@type": "SoftwareApplication", name: p.name, url: p.url })),
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${ME.site}/#website`,
  url: ME.site,
  name: `${ME.name} — ${ME.title}`,
  description: DESC,
  inLanguage: "en-US",
  publisher: { "@id": `${ME.site}/#person` },
};

// Applies the saved theme before first paint so an explicit choice never flashes.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('vc-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
      </head>
      <body>{children}<ToTop /></body>
    </html>
  );
}
