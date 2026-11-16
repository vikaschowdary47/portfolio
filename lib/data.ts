export type Step = { title: string; body: string };

export type Project = {
  slug: string;
  /** Toggle: false hides the project from the site and 404s its page. */
  show: boolean;
  name: string;
  status: string;
  live?: boolean;
  tagline: string;
  problem: string;
  built: string;
  steps: Step[];
  stack: string[];
  role: string;
  period: string;
  url?: string;
  host?: string;
  video?: string;
  poster?: string;
  /** Diagram shown on the studio page. */
  preview?: string;
  /** One short, true line of evidence. */
  proof?: string;
};

const ALL_PROJECTS: Project[] = [
  {
    slug: "eqltab",
    show: true,
    name: "eqlTab",
    status: "Closed beta",
    live: true,
    tagline: "Forward a bill. It splits itself.",
    problem:
      "Splitting household bills means somebody reads every bill, does the maths, and chases everyone for their share.",
    built:
      "Forward a bill to the household's own address, or photograph it. eqlTab reads the provider, the amount, the due date and the billing period, splits it to the cent, and shows each member exactly what they owe before it is late.",
    steps: [
      {
        title: "Ingest",
        body: "A Gmail API integration watches a per-household forwarding address and pulls in bill emails as they land.",
      },
      {
        title: "Parse",
        body: "A parser pulls provider, total, due date and billing period out of the email body and any PDF attachment. A photo of a paper bill goes through AI scanning instead. Anything it cannot read clearly is flagged rather than guessed.",
      },
      {
        title: "Split",
        body: "The total is divided to the cent across the Space's members, with the remainder distributed deterministically so the sum always reconciles.",
      },
      {
        title: "Settle",
        body: "Every member sees their own share and its due date. Payments are marked reported, then confirmed by whoever paid — no bank connection required.",
      },
    ],
    stack: [
      "Next.js",
      "React Native",
      "Supabase",
      "Gmail API",
      "AI bill scanning",
      "PostgreSQL",
    ],
    role: "Sole engineer and designer — web, mobile, backend, schema",
    period: "2025 — present",
    url: "https://eqltab.com",
    host: "eqltab.com",
    video: "/eqltab_scrub.mp4",
    poster: "/eqltab.jpg",
    preview: "/prev-eqltab.svg",
    proof: "Closed beta with real households",
  },
  {
    slug: "eqlshare",
    show: true,
    name: "eqlShare",
    status: "Shipping",
    live: true,
    tagline: "Send from your phone. Grab it on your laptop.",
    problem:
      "Moving one file from an iPhone to a Windows laptop is still, somehow, a nuisance.",
    built:
      "Send a file, a link or copied text from one device and it appears on all the others — including a desktop widget you can drag straight into any app. Shipped as iOS and Android apps, a notarized Mac build, and a Windows MSIX package built by CI.",
    steps: [
      {
        title: "Send",
        body: "Drop a file, paste a link or share copied text from the phone — no pairing step, no cable.",
      },
      {
        title: "Relay",
        body: "The payload goes to object storage behind a short-lived code, so the receiving device needs nothing installed to claim it. Storage is abstracted so it can move from Supabase to Cloudflare R2 without touching the clients.",
      },
      {
        title: "Collect",
        body: "Open the laptop and the item is waiting, ready to drag straight into whatever you were doing.",
      },
      {
        title: "Expire",
        body: "Free-account files delete themselves after 24 hours, so nothing accumulates quietly in the background.",
      },
      {
        title: "Ship",
        body: "One GitHub Actions pipeline builds and packages every platform — the Windows MSIX and the notarized Mac app included. Guest shares work without an account and merge into your account when you sign up.",
      },
    ],
    stack: ["React Native", "Supabase", "Cloudflare R2", "GitHub Actions", "Resend"],
    role: "Sole engineer and designer",
    period: "2026 — present",
    url: "https://eqlshare.com",
    host: "eqlshare.com",
    video: "/eqlshare_scrub.mp4",
    poster: "/eqlshare.jpg",
    preview: "/prev-eqlshare.svg",
    proof: "iOS & Android in testing on Google Play · Mac notarized",
  },
  {
    slug: "reunite",
    show: true,
    name: "Reunite",
    status: "Shipping",
    live: true,
    tagline: "Let strangers reach you. Not your number.",
    problem:
      "To be reachable when someone finds your car, your bag or your keys, you normally have to put a phone number on them — and then anyone can call it.",
    built:
      "A QR tag the finder scans in their browser, with no app and no account. The message goes through an AI layer that blocks threats and spam, flags the urgent ones and translates anything that is not in English. Your number and email are never shown.",
    steps: [
      {
        title: "Tag",
        body: "A printed QR tag goes on the windshield, the bag, the laptop or the keys. Car stickers ship today; luggage, laptop, keychain and pet collar tags are next.",
      },
      {
        title: "Scan",
        body: "The finder scans with the phone camera and types a message straight in the browser. No app to install and no account to create — friction here means the message never gets sent.",
      },
      {
        title: "Screen",
        body: "Every message is read by an AI layer first. It blocks abuse and spam, marks the genuinely urgent ones, and translates messages that arrive in another language.",
      },
      {
        title: "Reach",
        body: "The owner gets the message with the contact details still hidden. Location is attached only when the finder chooses to share it.",
      },
    ],
    stack: ["Next.js", "Vercel", "AI screening", "QR codes"],
    role: "Sole engineer, designer and operator — app, tags and fulfilment",
    period: "2026 — present",
    url: "https://getreunite.com",
    host: "getreunite.com",
    preview: "/prev-reunite.svg",
    proof: "Shipping — $10 a tag, sold locally",
  },
  {
    slug: "gainstalk",
    show: true,
    name: "GainsTalk",
    status: "MVP live",
    live: true,
    tagline: "Every client message from every app in one place.",
    problem:
      "An online coach's clients message from Instagram, WhatsApp, email and SMS. The coaching is the easy part; keeping up with the inbox is what actually eats the day.",
    built:
      "A single dashboard that collects client messages from every app, groups them by client, and drafts the reply. The draft is a starting point, not an outbox — nothing sends until the coach approves it.",
    steps: [
      {
        title: "Collect",
        body: "Client messages land in one inbox instead of four apps. Instagram connects first, with WhatsApp to follow.",
      },
      {
        title: "Sort",
        body: "Messages are grouped per client and carry their history, so a reply is written with the full context rather than from a single line.",
      },
      {
        title: "Draft",
        body: "The AI writes a reply in the coach's own voice, using what it knows about that client.",
      },
      {
        title: "Approve",
        body: "The coach edits or accepts. Nothing is ever sent automatically — the replies stay the coach's own words.",
      },
    ],
    stack: ["Next.js", "React", "AI drafting"],
    role: "Sole engineer and designer",
    period: "2026 — present",
    url: "https://gainstalk.com",
    host: "gainstalk.com",
    preview: "/prev-gainstalk.svg",
    proof: "MVP live, Instagram connect next",
  },
  {
    slug: "eqlstats",
    show: true,
    name: "eqlStats",
    status: "In development",
    tagline: "One workspace for everything about a project.",
    problem:
      "The facts about a project scatter: which APIs it uses, who owns the domain, where it deploys, which console link actually opens the right dashboard.",
    built:
      "A single workspace holding all of it, with a shareable link and a per-section toggle so you decide exactly what someone else sees.",
    steps: [
      {
        title: "Collect",
        body: "APIs, domains and their registrars, deploy status and the exact console links for each service — in one place instead of five browser tabs.",
      },
      {
        title: "Share",
        body: "A link anyone can open, with each section switched on or off individually, so a client sees status without seeing credentials or vendors.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Supabase"],
    role: "Sole engineer and designer",
    period: "2026 — present",
  },
  {
    slug: "leash",
    show: true,
    name: "Leash",
    status: "Prototype",
    tagline: "A spending limit for AI agents.",
    problem:
      "An autonomous agent holding a payment card has no natural stopping point.",
    built:
      "Leash sits in front of the card. Every purchase an agent attempts is checked against category, budget and per-item limits, then approved, held for a human, or blocked.",
    steps: [
      {
        title: "Intercept",
        body: "Each attempted purchase arrives as a structured request — merchant, category, amount — before any money moves.",
      },
      {
        title: "Evaluate",
        body: "Deterministic rules, not a model, decide: category must be on the allow-list, the running budget must cover it, and the amount must sit under the per-item limit.",
      },
      {
        title: "Return a verdict",
        body: "Approve, ask-a-human, or block. The ask-a-human path is the interesting one: it keeps an agent useful without making it unsupervised.",
      },
    ],
    stack: ["Rules engine", "Agent tooling", "TypeScript"],
    role: "Built solo for Bolt's Builders Week",
    period: "2026",
    url: "https://leash-ai-spend-contr-yjx7.bolt.host/",
    host: "Leash",
  },
  {
    slug: "esp32-companion",
    show: false,
    name: "ESP32 companion app",
    status: "Hardware",
    tagline: "A phone client for a microcontroller.",
    problem:
      "A custom ESP32 build produced camera frames and heart-rate readings with nowhere useful to look at them.",
    built:
      "A React Native app that pairs with the board over BLE, streams the sensor data off it, and charts it live on the phone.",
    steps: [
      {
        title: "Pair",
        body: "BLE discovery and connection handling, including the reconnection cases that make or break a hardware companion app.",
      },
      {
        title: "Stream",
        body: "Camera capture and heart-rate readings come off the microcontroller as a continuous feed rather than polled snapshots.",
      },
      {
        title: "Chart",
        body: "Readings render live on the phone, so the board's behaviour is visible while you are still holding it.",
      },
    ],
    stack: ["React Native", "BLE", "ESP32"],
    role: "Sole engineer",
    period: "2025",
  },
  {
    slug: "web-security-research",
    show: false,
    name: "Web security research",
    status: "M.S. thesis work",
    tagline: "Where modern web apps quietly give themselves away.",
    problem:
      "Web application threat classes move faster than the guidance written about them.",
    built:
      "Graduate research at Quinnipiac University on web application security and emerging threat classes, as part of the M.S. in Computer Science.",
    steps: [
      {
        title: "Survey",
        body: "Catalogued current web application threat classes and how they present in modern single-page and server-rendered stacks.",
      },
      {
        title: "Analyse",
        body: "Examined where conventional mitigations stop matching the way applications are actually built today.",
      },
    ],
    stack: ["AppSec", "Research"],
    role: "Graduate researcher",
    period: "2023 — 2025",
  },
];

export const EXPERIENCE = [
  {
    org: "Quire Systems",
    role: "Data Engineer",
    when: "Jun 2026 — present",
    where: "Chicago, IL",
    what: "Writes the scripts that process drive-test data and supports on-road driver-assistance testing. Python over large, messy real-world sensor logs.",
  },
  {
    org: "Community Dreams Foundation",
    role: "Full-stack developer (volunteer)",
    when: "Sep 2025 — Jul 2026",
    where: "Remote",
    what: "Built and shipped internal React tooling for a distributed volunteer team.",
  },
  {
    org: "Tunica Labs",
    role: "Full-stack developer",
    when: "Sep 2020 — Jul 2023",
    where: "Mumbai, India",
    what: "Nearly three years of client product work in React and Angular — responsive web apps, REST integration, and the front-end architecture behind them.",
  },
  {
    org: "Quinnipiac University",
    role: "M.S. Computer Science",
    when: "2023 — May 2025",
    where: "Hamden, CT",
    what: "Master's degree. Research focused on web application security and emerging threats.",
  },
];

export const SKILLS: Record<string, string[]> = {
  "Front end": [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Redux",
    "Tailwind",
    "Storybook",
  ],
  "Mobile & desktop": ["React Native (Expo)", "Electron"],
  "Back end": [
    "Node.js",
    "Python",
    "REST APIs",
    "GraphQL",
    "Supabase",
    "PostgreSQL",
  ],
  Platform: ["AWS", "Cloudflare Workers", "GitHub Actions CI/CD", "Gmail API"],
  Testing: ["Vitest", "Jest", "React Testing Library", "Playwright"],
  AI: [
    "Claude Code",
    "LLM integration (Gemini)",
    "Structured output with Zod",
    "Agent spending guardrails",
  ],
  "Security & data": ["Web application security", "ADAS test-data validation"],
};

/** Back-of-card proof for each skill. Edit freely; missing skills just show the name on both sides. */
export const SKILL_NOTES: Record<string, string> = {
  React: "Tunica Labs client work, plus eqlTab and eqlShare",
  "Next.js": "eqlTab web app and this portfolio",
  "React Native (Expo)": "eqlTab mobile, eqlShare client, ESP32 app",
  TypeScript: "eqlShare, Leash and this site",
  Python: "Drive-test sensor logs at Quire Systems",
  Supabase: "Backend for eqlShare",
  "Claude Code": "Daily driver for building and shipping my products",
  "Agent spending guardrails": "Leash: budget and category limits",
  "Web application security": "Graduate research on web threat classes",
};

export const ME = {
  name: "Vikas Chowdary",
  legalName: "Vikas Chowdary Chimmili",
  title: "AI-focused full-stack engineer",
  email: "vikaschowdary.dev@gmail.com",
  location: "Chicago, Illinois",
  site: "https://vikaschowdary.com",
  github: "https://github.com/vikaschowdary47/",
  linkedin: "https://www.linkedin.com/in/vikaschowdary",
  // sameAs is the strongest signal Google uses to tie this site to *you* as a person.
  // Every URL here must be a profile that links back to vikaschowdary.com.
  sameAs: [
    "https://github.com/vikaschowdary47",
    "https://www.linkedin.com/in/vikaschowdary",
  ],
};

/** Only projects with show: true. */
export const PROJECTS = ALL_PROJECTS.filter((p) => p.show);

export const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
