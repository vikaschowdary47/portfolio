import Link from "next/link";
import Nav from "@/components/Nav";
import Console from "@/components/Console";
import SkillIcon from "@/components/SkillIcon";
import { PROJECTS, EXPERIENCE, SKILLS, SKILL_NOTES, ME } from "@/lib/data";

/** Set to true to show the AI agent console in the hero. */
const SHOW_AGENT = false;

export default function Home() {
  return (
    <>
      <Nav />
      <header className="hero">
        <div className={`wrap heroGrid${SHOW_AGENT ? " withAgent" : ""}`}>
          <div>
            <h1>
              <span>Vikas</span>
              <span>Chowdary</span>
            </h1>
            <p className="role">{ME.title}</p>
            <p className="lede">
              I ship products end to end. <b>eqlTab</b> reads a forwarded bill
              and splits it to the cent. <b>eqlShare</b> moves a file from your
              phone to your laptop. <b>Leash</b> keeps an AI agent inside its
              spending limits.
            </p>
            <dl className="idfacts">
              <div>
                <dt className="lbl">Now</dt>
                <dd>
                  <em>Quire Systems</em> ·Data Engineer
                </dd>
              </div>
              <div>
                <dt className="lbl">Exp</dt>
                <dd>3+ yrs · React / Node / Python</dd>
              </div>
              <div>
                <dt className="lbl">Degree</dt>
                <dd>
                  M.S. CS · <em>Quinnipiac</em> 2025
                </dd>
              </div>
              <div>
                <dt className="lbl">Email</dt>
                <dd>
                  <em>{ME.email}</em>
                </dd>
              </div>
            </dl>
          </div>
          {SHOW_AGENT && <Console />}
        </div>
      </header>

      <main className="wrap">
        <section id="projects">
          <div className="shead">
            <h2>Projects</h2>
            <span className="n">{PROJECTS.length} shipped / in progress</span>
          </div>
          <div className="plist">
            {PROJECTS.map((p) => (
              <Link className="pcard" key={p.slug} href={`/projects/${p.slug}`}>
                <h3>
                  {p.name}{" "}
                  <span className={`state${p.live ? "" : " q"}`}>
                    {p.status}
                  </span>
                </h3>
                <p>
                  {p.tagline} {p.problem}
                </p>
                <div className="kv">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <span className="more">Read the case study →</span>
              </Link>
            ))}
          </div>
        </section>

        <section id="experience">
          <div className="shead">
            <h2>Experience</h2>
            <span className="n">2020 — present</span>
          </div>
          {EXPERIENCE.map((e) => (
            <div className="job" key={e.org}>
              <time>{e.when}</time>
              <div>
                <b>
                  {e.org} — {e.role}
                </b>
                <p>
                  {e.what} {e.where}.
                </p>
              </div>
            </div>
          ))}
        </section>

        <section id="skills">
          <div className="shead">
            <h2>Skills</h2>
          </div>
          <div className="skTop">
            <h3 className="skTitle">Technologies <em>I build with</em></h3>
            <p className="skSub">A modern toolkit for building, shipping, and scaling products.</p>
          </div>
          <ul className="skTiles">
            {Object.values(SKILLS).flat().map((s) => (
              <li key={s} tabIndex={0} className="skCard">
                <span className="skFace skFront">
                  <span className="skIc"><SkillIcon name={s} /></span>
                  {s}
                </span>
                <span className="skFace skBack">
                  <b>{s}</b>
                  {SKILL_NOTES[s] ?? "Used across my projects"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <section className="end" id="contact">
        <div className="wrap">
          <h2>Let&apos;s talk.</h2>
          <p>
            Open to full-stack and AI product roles. Email is fastest — or ask
            the agent what I&apos;d bring to your team.
          </p>
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
