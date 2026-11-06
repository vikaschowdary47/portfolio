import {
  siReact, siNextdotjs, siTypescript, siJavascript, siNodedotjs,
  siPython, siSupabase, siPostgresql, siGmail, siClaude,
  siRedux, siTailwindcss, siStorybook, siExpo, siElectron, siGraphql,
  siCloudflareworkers, siGithubactions, siVitest, siJest, siTestinglibrary,
  siGooglegemini, siZod,
} from "simple-icons";

type Brand = { path: string; hex: string };
const BRAND: Record<string, Brand> = {
  React: siReact,
  "Next.js": siNextdotjs,
  "React Native": siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Node.js": siNodedotjs,
  Python: siPython,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  "Gmail API": siGmail,
  "Claude Code": siClaude,
  Redux: siRedux,
  Tailwind: siTailwindcss,
  Storybook: siStorybook,
  "React Native (Expo)": siExpo,
  Electron: siElectron,
  GraphQL: siGraphql,
  "Cloudflare Workers": siCloudflareworkers,
  "GitHub Actions CI/CD": siGithubactions,
  Vitest: siVitest,
  Jest: siJest,
  "React Testing Library": siTestinglibrary,
  "LLM integration (Gemini)": siGooglegemini,
  "Structured output with Zod": siZod,
};

/** Line icons (24x24, stroked) for skills with no brand logo. */
const LINE: Record<string, string> = {
  "REST APIs": "M7 18a4 4 0 010-8 5 5 0 019.6-1A4.5 4.5 0 0117 18H7z",
  AWS: "M4 15c5 3 11 3 16 0M17 13l3 2-3 2M7 9l5-4 5 4M12 5v8",
  "LLM tooling": "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z",
  "Agent spending guardrails": "M12 3l8 3v6c0 4.5-3.3 8-8 9-4.7-1-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5 4.5-5",
  "Prompt & tool design": "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  Playwright: "M3 8l9-4 9 4v8l-9 4-9-4V8zM3 8l9 4 9-4M12 12v8M8.5 14.5l1.5 1.5 3-3",
  "Web application security": "M6 11V8a6 6 0 0112 0v3M5 11h14v10H5zM12 15v2.5",
  "ADAS test-data validation": "M3 12h4l3-7 4 14 3-7h4",
};

// Brands whose colour is near-black / too dark to read on a dark tile.
const needsLight = (hex: string) => parseInt(hex, 16) < 0x333333;

export default function SkillIcon({ name }: { name: string }) {
  const b = BRAND[name];
  if (b) {
    const fill = needsLight(b.hex) ? "currentColor" : `#${b.hex}`;
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" fill={fill} aria-hidden="true">
        <path d={b.path} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={LINE[name] ?? "M12 4v16M4 12h16"} />
    </svg>
  );
}
