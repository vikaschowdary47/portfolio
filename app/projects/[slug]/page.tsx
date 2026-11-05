import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import ScrubScene from "@/components/ScrubScene";
import Reveal from "@/components/Reveal";
import { PROJECTS, bySlug, ME } from "@/lib/data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.name} — ${p.tagline}`,
    description: `${p.problem} ${p.built}`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} — ${p.tagline}`, description: p.built, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  const ld = {
    "@context": "https://schema.org",
    "@type": p.url ? "SoftwareApplication" : "CreativeWork",
    name: p.name,
    headline: p.tagline,
    description: `${p.problem} ${p.built}`,
    url: p.url ?? `${ME.site}/projects/${p.slug}`,
    ...(p.url ? { applicationCategory: "WebApplication", operatingSystem: "Web, iOS, Android" } : {}),
    author: { "@type": "Person", "@id": `${ME.site}/#person`, name: ME.name },
    creator: { "@type": "Person", "@id": `${ME.site}/#person`, name: ME.name },
    keywords: p.stack.join(", "),
    mainEntityOfPage: `${ME.site}/projects/${p.slug}`,
  };

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ME.name, item: ME.site },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${ME.site}/#projects` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${ME.site}/projects/${p.slug}` },
    ],
  };

  return (
    <>
      <Nav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <header className="phead">
        <div className="wrap">
          <Link href="/#projects" style={{ fontFamily: "var(--m)", fontSize: 12, color: "var(--sig)", textDecoration: "none" }}>
            ← All projects
          </Link>
          <h1 style={{ marginTop: 18 }}>{p.name}</h1>
          <p className="tagline">{p.tagline}</p>
          <dl className="meta">
            <div><dt className="lbl">Status</dt><dd>{p.status}</dd></div>
            <div><dt className="lbl">Role</dt><dd>{p.role}</dd></div>
            <div><dt className="lbl">Period</dt><dd>{p.period}</dd></div>
            <div><dt className="lbl">Stack</dt><dd>{p.stack.join(" · ")}</dd></div>
            {p.url && (
              <div><dt className="lbl">Live</dt><dd><a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--sig)" }}>{p.host}</a></dd></div>
            )}
          </dl>
        </div>
      </header>

      <main className="wrap">
        {p.video ? (
          <ScrubScene project={p} />
        ) : (
          <section style={{ paddingBlock: "20px 10px" }}>
            <span className="lbl">The problem</span>
            <Reveal className="big" text={p.problem} />
            <div style={{ height: 26 }} />
            <span className="lbl">What I built</span>
            <Reveal className="big" text={p.built} />
          </section>
        )}

        <section>
          <div className="shead"><h2>How it works</h2><span className="n">{p.steps.length} steps</span></div>
          <div className="steps">
            {p.steps.map((s, n) => (
              <div className="step" key={s.title}>
                <b><span style={{ color: "var(--sig)", fontFamily: "var(--m)", fontSize: 12, marginRight: 10 }}>
                  {String(n + 1).padStart(2, "0")}</span>{s.title}</b>
                <p>{s.body}</p>
              </div>
            ))}
          </div>

          <div className="pnav">
            <Link href={`/projects/${prev.slug}`}>← {prev.name}</Link>
            <Link href={`/projects/${next.slug}`}>{next.name} →</Link>
          </div>
        </section>
      </main>

      <section className="end">
        <div className="wrap">
          <h2>Want the detail?</h2>
          <p>Happy to walk through the architecture, the trade-offs, or why it is built this way.</p>
          <div><span className="mail">{ME.email}</span></div>
        </div>
      </section>

      <footer><div className="wrap"><span>{ME.legalName.toUpperCase()}</span><span>CHICAGO, IL</span></div></footer>
    </>
  );
}
