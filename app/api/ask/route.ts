import Anthropic from "@anthropic-ai/sdk";
import { PROJECTS, EXPERIENCE, SKILLS, ME } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 30;

type TraceRow = { name: string; input: unknown; ms: number; result: string };

const SYSTEM = `You are the hiring agent on ${ME.name}'s portfolio site. A recruiter or engineering manager is asking about him.

RULES
1. Answer ONLY from what the tools return. Never invent an employer, date, metric, user count or client.
2. If the tools do not cover it, say so in one line and suggest emailing ${ME.email}.
3. Call search_projects / get_experience / get_skills before answering anything factual. Call cite_projects with the slugs you referenced.
4. Two to four short sentences. No bullets, no headings, no markdown. Write like a sharp colleague vouching for him.
5. Never oversell: eqlTab is in closed beta, eqlShare is a waitlist with the apps still coming, Leash is a prototype. Say so where it matters.
6. Call him Vikas.`;

const TOOLS: Anthropic.Tool[] = [
  { name: "search_projects", description: "Search Vikas's projects by keyword, technology or name. Returns full records.",
    input_schema: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } },
  { name: "get_experience", description: "Vikas's full work history and education, most recent first.",
    input_schema: { type: "object", properties: {} } },
  { name: "get_skills", description: "Vikas's skills grouped by area.",
    input_schema: { type: "object", properties: {} } },
  { name: "cite_projects", description: "Record which project slugs this answer refers to, so the page can link them.",
    input_schema: { type: "object", properties: { slugs: { type: "array", items: { type: "string" } } }, required: ["slugs"] } },
];

function runTool(name: string, input: any, cited: string[]) {
  switch (name) {
    case "search_projects": {
      const q = String(input?.query ?? "").toLowerCase();
      const hits = PROJECTS.filter((p) =>
        `${p.name} ${p.tagline} ${p.problem} ${p.built} ${p.stack.join(" ")} ${p.status}`.toLowerCase().includes(q));
      const rows = (hits.length ? hits : PROJECTS).map((p) => ({
        slug: p.slug, name: p.name, status: p.status, url: p.url ?? null,
        tagline: p.tagline, problem: p.problem, built: p.built, stack: p.stack, role: p.role, period: p.period,
      }));
      return { data: rows, label: `${rows.length} record${rows.length === 1 ? "" : "s"}` };
    }
    case "get_experience": return { data: EXPERIENCE, label: `${EXPERIENCE.length} records` };
    case "get_skills": return { data: SKILLS, label: "ok" };
    case "cite_projects": {
      const slugs: string[] = Array.isArray(input?.slugs) ? input.slugs : [];
      slugs.forEach((s) => { if (!cited.includes(s)) cited.push(s); });
      return { data: { ok: true }, label: slugs.join(", ") || "none" };
    }
    default: return { data: { error: "unknown tool" }, label: "unknown tool" };
  }
}

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ error: "no_key" }, { status: 501 });

  let question = "";
  try { question = String((await req.json())?.question ?? "").slice(0, 500); } catch { /* ignore */ }
  if (!question.trim()) return Response.json({ error: "empty" }, { status: 400 });

  const client = new Anthropic({ apiKey: key });
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: question }];
  const trace: TraceRow[] = [];
  const cited: string[] = [];
  let text = "";

  for (let turn = 0; turn < 6; turn++) {
    const res = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 700,
      system: SYSTEM,
      tools: TOOLS,
      messages,
    });

    text = res.content.filter((b): b is Anthropic.TextBlock => b.type === "text").map((b) => b.text).join("").trim();
    const calls = res.content.filter((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
    if (!calls.length) break;

    messages.push({ role: "assistant", content: res.content });
    const results: Anthropic.ToolResultBlockParam[] = calls.map((c) => {
      const t0 = performance.now();
      const out = runTool(c.name, c.input, cited);
      trace.push({ name: c.name, input: c.input, ms: +(performance.now() - t0).toFixed(2), result: out.label });
      return { type: "tool_result", tool_use_id: c.id, content: JSON.stringify(out.data) };
    });
    messages.push({ role: "user", content: results });
  }

  return Response.json({ text, trace, cited });
}
