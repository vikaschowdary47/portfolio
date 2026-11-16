import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { PROJECTS, ME } from "@/lib/data";

const LIVE = PROJECTS.filter((p) => p.live);
const LAB = PROJECTS.filter((p) => !p.live);

const DESC = `${LIVE.length} products designed, built and shipped end to end by ${ME.name} — ${LIVE.map(
  (p) => p.name
).join(", ")}.`;

export const metadata: Metadata = {
  title: "Studio",
  description: DESC,
  alternates: { canonical: "/projects" },
  openGraph: { title: `Studio — ${ME.name}`, description: DESC, type: "website" },
};

export default function Studio() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Products by ${ME.name}`,
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      description: p.tagline,
      url: `${ME.site}/projects/${p.slug}`,
    })),
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <header className="studioHead">
        <div className="wrap">
          <Link href="/" className="back">
            ← Vikas Chowdary
          </Link>
          <h1 style={{ marginTop: 18 }}>
            {LIVE.length} products.
            <br />
            All live. All built solo.
          </h1>
          <p className="sub">
            I take an idea from blank repo to shipped product — including the parts most people hand off.
          </p>
          <div className="stats">
            <div>
              <b>{LIVE.length}</b>
              <span>Live products</span>
            </div>
            <div>
              <b>1</b>
              <span>Person building them</span>
            </div>
            <div>
              <b>3+</b>
              <span>Years full-stack</span>
            </div>
            <div>
              <b>$10</b>
              <span>First thing sold</span>
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        {LIVE.map((p) => (
          <article className="work" key={p.slug} id={p.slug}>
            <div className="workTxt">
              <h3>
                {p.name} <span className="state on">{p.status}</span>
              </h3>
              <p className="line">{p.tagline}</p>
              <p>{p.built}</p>
              {p.proof && <span className="proof">{p.proof}</span>}
              <div className="workLinks">
                <Link className="go" href={`/projects/${p.slug}`}>
                  How it works →
                </Link>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.host}
                  </a>
                )}
              </div>
              <div className="kv">
                {p.stack.slice(0, 5).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
            {p.preview && (
              <Link className="workShot" href={`/projects/${p.slug}`} aria-label={`${p.name} case study`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.preview} alt={`How ${p.name} works`} width={880} height={550} loading="lazy" />
              </Link>
            )}
          </article>
        ))}

        {LAB.length > 0 && (
          <section style={{ paddingBottom: 60 }}>
            <div className="lab">
              <h2>Also built</h2>
              <span>{LAB.length}</span>
            </div>
            <div className="mini">
              {LAB.map((p) => (
                <Link key={p.slug} href={`/projects/${p.slug}`}>
                  <b>{p.name}</b>
                  <p>{p.tagline}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <section className="end">
        <div className="wrap">
          <h2>Building something?</h2>
          <p>I am open to full-stack and AI product roles, and happy to talk through any of this.</p>
          <div>
            <span className="mail">{ME.email}</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>{ME.legalName.toUpperCase()}</span>
          <span>CHICAGO, IL</span>
        </div>
      </footer>
    </>
  );
}
