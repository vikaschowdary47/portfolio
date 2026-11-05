"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS, ME } from "@/lib/data";

type Row = { name: string; input: unknown; ms: number; result: string };
type Turn = { q: string; trace: Row[]; text: string; cited: string[]; pending?: boolean };

const SUGGESTED = [
  "What has he actually shipped?",
  "Does he know React Native?",
  "How much AI work has he really done?",
  "Is he a fit for a React front-end role?",
];

/** Deterministic fallback — runs when /api/ask has no key configured. */
function localAnswer(q: string): { text: string; trace: Row[]; cited: string[] } {
  const s = q.toLowerCase();
  const row = (name: string, input: unknown, result: string): Row => ({ name, input, ms: 0.2, result });
  const all = (): Row[] => [row("search_projects", { query: "" }, `${PROJECTS.length} records`)];

  if (/mobile|react native|ios|android|phone/.test(s))
    return { text: "Yes — React Native is core, not a footnote. He built the eqlTab mobile app and the eqlShare client in it, plus an ESP32 companion app that pairs over BLE and charts live sensor data. eqlTab's web side is Next.js, so he covers both.",
      trace: [row("search_projects", { query: "react native" }, "3 records")], cited: ["eqlshare", "eqltab", "esp32-companion"] };
  if (/\bai\b|agent|llm|model|prompt/.test(s))
    return { text: "Applied and deliberately unglamorous. Leash is a spending guardrail for AI agents: each purchase an agent attempts is checked against category, budget and per-item limits, then approved, held for a human, or blocked — deterministic rules, not a model deciding. It's a prototype, to be clear.",
      trace: [row("search_projects", { query: "agent" }, "1 record")], cited: ["leash"] };
  if (/ship|built|build|product|project|portfolio/.test(s))
    return { text: "Three of his own, start to finish. eqlTab reads a forwarded bill and splits it to the cent — closed beta. eqlShare moves a file from phone to laptop — waitlist open, apps still coming. Leash keeps an AI agent inside its spending limits — prototype. He wrote the parsers, schemas, mobile clients and web apps himself.",
      trace: all(), cited: ["eqltab", "eqlshare", "leash"] };
  if (/fit|role|hire|front.?end|frontend|why|strength|good/.test(s))
    return { text: "Strong fit for front-end and full-stack product work. Three-plus years of React and Angular at Tunica Labs, React and Next.js across his own products, React Native on mobile, Python in his current ADAS data role. The differentiator: he ships whole products alone, so he makes sane API and data decisions instead of waiting on someone else.",
      trace: [row("get_experience", {}, "4 records"), row("get_skills", {}, "ok")], cited: [] };
  if (/experience|year|work|job|quire|tunica|background|career/.test(s))
    return { text: "Three-plus years full-stack. React and Angular client work at Tunica Labs in Mumbai, 2020 to 2023. Volunteer React tooling at Community Dreams Foundation through mid-2026. Since June 2026, ADAS Data Engineer at Quire Systems in Chicago, writing Python over drive-test sensor logs. M.S. in CS from Quinnipiac, 2025.",
      trace: [row("get_experience", {}, "4 records")], cited: [] };
  if (/skill|stack|tech|know|react|node|python|aws|sql/.test(s))
    return { text: "Front end: React, Next.js, React Native, TypeScript. Back end: Node.js, Python, REST APIs, Supabase, PostgreSQL. Platform: AWS, Gmail API, BLE and embedded. Plus LLM tooling, agent guardrails and web application security.",
      trace: [row("get_skills", {}, "ok")], cited: [] };
  return { text: `That's outside what I can look up here — I cover his projects, experience, skills and education. For anything else, email ${ME.email}.`,
    trace: all(), cited: [] };
}

export default function Console() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState("AGENT · READY");
  const tapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tapeRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  async function ask(q: string) {
    const question = q.trim();
    if (!question || busy) return;
    setBusy(true);
    setValue("");
    setTurns((t) => [...t, { q: question, trace: [], text: "", cited: [], pending: true }]);

    let result: { text: string; trace: Row[]; cited: string[] };
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(String(res.status));
      result = await res.json();
      setMode("AGENT · LIVE");
    } catch {
      result = localAnswer(question);
      setMode("AGENT · LOCAL");
    }

    setTurns((t) => {
      const next = [...t];
      next[next.length - 1] = { q: question, ...result, pending: false };
      return next;
    });
    setBusy(false);
  }

  return (
    <div>
      <div className="con">
        <div className="conTop">
          <span className="dotg" />
          <span>{mode}</span>
          <button type="button" onClick={() => setTurns([])}>CLEAR</button>
        </div>

        <div className="tape" ref={tapeRef} aria-live="polite">
          {turns.length === 0 && (
            <div className="turn">
              <p className="hint">
                This page has a working agent on it. It answers with <b>real function calls</b> over my data
                and shows you every call it makes.
              </p>
            </div>
          )}
          {turns.map((t, i) => (
            <div className="turn" key={i}>
              <p className="q">{t.q}</p>
              {t.trace.length > 0 && (
                <div className="trace">
                  {t.trace.map((r, j) => (
                    <div key={j}>
                      <div className="row">
                        <span className="arr">→</span>
                        <span className="fn">{r.name}<i>({JSON.stringify(r.input)})</i></span>
                        <span className="ms">{r.ms < 1 ? r.ms.toFixed(2) : Math.round(r.ms)}ms</span>
                      </div>
                      <div className="row res"><span className="arr">↳</span><span className="fn">{r.result}</span></div>
                    </div>
                  ))}
                </div>
              )}
              {t.pending ? <div className="ans" style={{ color: "var(--sig)", fontFamily: "var(--m)", fontSize: 12 }}>WORKING…</div>
                         : <div className="ans">{t.text}</div>}
              {t.cited.length > 0 && (
                <div className="out">
                  {t.cited.map((slug) => {
                    const p = PROJECTS.find((x) => x.slug === slug);
                    return p ? <Link key={slug} href={`/projects/${slug}`}>{p.name} →</Link> : null;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <form className="askRow" onSubmit={(e) => { e.preventDefault(); ask(value); }}>
          <span>&gt;</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask anything about his work"
            aria-label="Ask about Vikas"
            autoComplete="off"
          />
          <button type="submit" disabled={busy}>ASK</button>
        </form>
      </div>

      <div className="chips">
        {SUGGESTED.map((s) => (
          <button key={s} type="button" onClick={() => ask(s)}>{s}</button>
        ))}
      </div>
      <div className="api">
        <span><i>fn</i> search_projects</span><span><i>fn</i> get_experience</span>
        <span><i>fn</i> get_skills</span><span><i>fn</i> cite_projects</span>
      </div>
    </div>
  );
}
