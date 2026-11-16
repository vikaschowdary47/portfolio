import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { PROJECTS, ME } from "@/lib/data";

const DESC = `Projects built end to end by ${ME.name} — ${PROJECTS.filter((p) => p.live)
  .map((p) => p.name)
  .join(", ")} and more.`;

export const metadata: Metadata = {
  title: "Projects",
  description: DESC,
  alternates: { canonical: "/projects" },
  openGraph: { title: `Projects — ${ME.name}`, description: DESC, type: "website" },
};

function Card({ slug, name, status, live, tagline, problem, stack }: (typeof PROJECTS)[number]) {
  return (
    <Link className="pcard" href={`/projects/${slug}`}>
      <h3>
        {name} <span className={`state${live ? "" : " q"}`}>{status}</span>
      </h3>
      <p>
        {tagline} {problem}
      </p>
      <div className="kv">
        {stack.slice(0, 5).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <span className="more">Read the case study →</span>
    </Link>
  );
}

export default function ProjectsIndex() {
  const shipped = PROJECTS.filter((p) => p.live);
  const other = PROJECTS.filter((p) => !p.live);

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Projects by ${ME.name}`,
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

      <header className="phead">
        <div className="wrap">
          <Link href="/" className="back">
            ← Home
          </Link>
          <h1 style={{ marginTop: 16 }}>Projects</h1>
          <p className="tagline">
            Things I designed, built and shipped myself — the parts most people hand off included.
          </p>
        </div>
      </header>

      <main className="wrap">
        <section style={{ paddingTop: 10 }}>
          <div className="shead">
            <h2>Live products</h2>
            <span className="n">{shipped.length}</span>
          </div>
          <div className="plist">
            {shipped.map((p) => (
              <Card key={p.slug} {...p} />
            ))}
          </div>
        </section>

        {other.length > 0 && (
          <section>
            <div className="shead">
              <h2>Experiments &amp; research</h2>
              <span className="n">{other.length}</span>
            </div>
            <div className="plist">
              {other.map((p) => (
                <Card key={p.slug} {...p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <section className="end">
        <div className="wrap">
          <h2>Want the detail?</h2>
          <p>Happy to walk through the architecture, the trade-offs, or why any of it is built the way it is.</p>
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
