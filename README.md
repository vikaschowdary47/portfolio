# vikaschowdary.com

Personal site and project case studies. Next.js 15 (App Router), TypeScript, Motion.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

## Routes

| Route | What it is |
|---|---|
| `/` | Hero, the agent console, project index, experience, skills |
| `/projects/[slug]` | Full case study per project — statically generated |
| `/api/ask` | The agent endpoint (Anthropic tool-use loop) |
| `/sitemap.xml` | Generated from `lib/data.ts` |

Current slugs: `eqltab`, `eqlshare`, `leash`, `esp32-companion`, `web-security-research`.

## The one file that matters

`lib/data.ts` is the single source of truth. Every page, the sitemap, and the agent's
tools all read from it. Add a project there and its page, its card, its sitemap entry
and the agent's knowledge of it all appear — no other file to touch.

## The agent

`/api/ask` runs a real Anthropic tool-use loop with four tools over your own data:
`search_projects`, `get_experience`, `get_skills`, `cite_projects`. The client renders
each call it made, with timings, so a visitor watches it work.

Set the key to turn it on:

```bash
cp .env.example .env.local
# add ANTHROPIC_API_KEY=sk-ant-...
```

Without a key the endpoint returns 501 and the console falls back to a deterministic
local answer engine — the site still works, it just isn't a live model. The status
chip reads LOCAL instead of LIVE.

In Vercel, add `ANTHROPIC_API_KEY` under Settings → Environment Variables.

## The scroll-scrubbed video

`components/ScrubScene.tsx` pins the media and drives `video.currentTime` from scroll
progress. This only feels smooth because the clips in `public/` are encoded with every
frame a keyframe. If you replace them, encode the same way:

```bash
ffmpeg -i input.mov -an -vf "scale=1100:-2,fps=20" \
  -c:v libx264 -preset slow -crf 30 -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart public/yourproject_scrub.mp4
```

Two gotchas already handled, don't undo them:
- `html` uses `overflow-x: clip`, not `hidden`. `hidden` silently breaks `position: sticky`.
- `.sceneGrid` uses `align-items: stretch`. `start` collapses the column and the pin has no range.

## Deploy

Push to GitHub, import in Vercel, add the env var. The domain is already pointed there.

Do not commit the raw `.mov` screen recordings — `.gitignore` excludes them.

## SEO

### What the code already does

- `app/layout.tsx` — title template, description naming both "Vikas Chowdary" and "Vikas Chowdary Chimmili", canonical URL, Open Graph + Twitter cards, `robots` with `max-image-preview:large`, icons.
- `app/opengraph-image.tsx` / `twitter-image.tsx` — the social preview card, generated at build time. No static image to keep in sync.
- `app/robots.ts` → `/robots.txt`, pointing at the sitemap.
- `app/sitemap.ts` → `/sitemap.xml`, generated from `lib/data.ts`, so new projects appear automatically.
- JSON-LD on every page: `Person` (with `alternateName`, `sameAs`, `owns`) + `WebSite`; each project page adds `SoftwareApplication` and a `BreadcrumbList`.
- Per-page `generateMetadata` with its own title, description and canonical.

### What the code cannot do

Ranking for your own name is mostly decided off the page. In order of impact:

1. **Fill in `ME.sameAs` in `lib/data.ts`.** It currently has GitHub only. Add your LinkedIn URL. `sameAs` is how Google ties this domain to you as an entity, and LinkedIn is usually the incumbent top result for a name search.
2. **Link back from every profile.** LinkedIn website field, GitHub profile website field, the footer of eqltab.com and eqlshare.com. Links *into* the domain are the single biggest factor, and these are the ones you control outright.
3. **Google Search Console** — verify the domain, submit `https://vikaschowdary.com/sitemap.xml`, then use "Request indexing" on the homepage. Without this you wait for a crawl; with it you usually get indexed in days. Paste the verification token into `metadata.verification.google` in `app/layout.tsx`.
4. **Use one spelling of your name everywhere.** "Vikas Chowdary" on LinkedIn, GitHub, the site, your resume. Mixed spellings split the signal.
5. **Be patient.** A brand-new domain for a personal name typically takes a few weeks to a couple of months to settle, and longer if others share the name.
