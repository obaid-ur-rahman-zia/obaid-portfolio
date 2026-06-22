import type { AppItem, Plan, Profile, Service, TeamMember } from "@/types";
import { SITE } from "@/lib/site";

export const fallbackProfile: Profile = {
  name: "Obaid Ur Rahman Zia",
  title: "Senior Software Engineer & Product Lead",
  tagline:
    "I architect and ship scalable software systems — web, AI, and production platforms from design to deployment.",
  bio: "Software Engineer and Product Lead with 5+ years of experience delivering scalable web, AI-powered, and full-stack applications for clients across Pakistan, Saudi Arabia, and international markets. Currently Product Lead at Visiontillion (vstore.sa), Founder & CEO of Plivix Technologies, and technical manager at Switch2itech with 30+ deployed systems. Delivered 60+ client projects across SaaS, AI, and enterprise software — equally effective as a hands-on IC and as a technical lead who owns products from architecture to deployment.",
  photo: SITE.photo,
  email: "obaid107333@gmail.com",
  whatsapp: "+923706014905",
  github: SITE.github,
  linkedin: SITE.linkedin,
  play_store: SITE.website,
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "React Native",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Three.js",
    "AI / LLM",
    "n8n",
    "Supabase",
    "Prisma",
    "Web3",
  ],
  years_experience: 5,
  apps_in_production: 60,
  clients_served: 30,
  play_store_apps: 6,
};

export const fallbackApps: AppItem[] = [
  {
    id: "proj-vstore",
    name: "Vstore 3D Print Platform",
    slug: "vstore",
    icon: "/images/apps/default.svg",
    short_description:
      "AI-powered 3D print marketplace with Meshy.ai generation, AWS pipeline, and Blender headless validation.",
    full_description:
      "AI-powered 3D print marketplace built solo as Product Lead at Visiontillion. End-to-end pipeline includes Meshy.ai mesh generation, AWS S3 storage, SQS job queuing, local Python worker with Blender headless repair, two-pass Trimesh validation, weighted printability scoring, and overhang detection. Next.js frontend with Three.js 3D previews.",
    screenshots: ["/images/apps/screenshots/placeholder.svg"],
    tech_stack: ["Next.js", "Node.js", "AWS S3", "AWS SQS", "Python", "Blender", "Meshy.ai", "Three.js"],
    features: [
      "AI mesh generation pipeline",
      "AWS S3 + SQS job queue",
      "Blender headless repair",
      "Printability scoring",
      "3D preview with Three.js",
    ],
    download_link: "https://vstore.sa",
    play_store_link: "https://vstore.sa",
    category: "AI / 3D",
    featured: true,
    order: 0,
  },
  {
    id: "proj-chomperz",
    name: "Chomperz",
    slug: "chomperz",
    icon: "/images/apps/default.svg",
    short_description:
      "Web2.5 idle browser game with NFT multipliers, territory map, wallet auth, and anti-cheat architecture.",
    full_description:
      "Full technical architecture for a Web2.5 idle browser game featuring dual-currency Z-Coin economy, NFT multiplier systems, Territory Map with Crown/Frontier Lands, King of the Hill bidding, Crib decorator, Twitter OAuth + SIWE wallet authentication, and anti-cheat architecture.",
    screenshots: ["/images/apps/screenshots/placeholder.svg"],
    tech_stack: ["Next.js", "Node.js", "MongoDB", "Alchemy", "PixiJS", "Socket.io", "Solidity"],
    features: ["Web2.5 economy", "NFT multipliers", "Wallet auth (SIWE)", "Real-time multiplayer", "Anti-cheat"],
    download_link: "https://chomperz.app",
    play_store_link: "https://chomperz.app",
    category: "Web3 / Gaming",
    featured: true,
    order: 1,
  },
  {
    id: "proj-plivix",
    name: "Plivix Technologies",
    slug: "plivix",
    icon: "/images/apps/default.svg",
    short_description:
      "Agency site with SEO optimization ranking on Google first page — services, portfolio, and contact flows.",
    full_description:
      "Full company site for Plivix Technologies boutique software studio. SEO-optimized presence achieving Google first-page ranking. Complete frontend with service pages, portfolio showcase, and contact flows for international clients across US, UK, and Canada.",
    screenshots: ["/images/apps/screenshots/placeholder.svg"],
    tech_stack: ["Next.js", "Tailwind CSS", "Vercel", "SEO"],
    features: ["First-page Google ranking", "Service pages", "Portfolio showcase", "Contact flows"],
    download_link: "https://plivix-tech.com",
    play_store_link: "https://plivix-tech.com",
    category: "Agency",
    featured: true,
    order: 2,
  },
  {
    id: "proj-n4nc",
    name: "N4NoCode",
    slug: "n4ncode",
    icon: "/images/apps/default.svg",
    short_description:
      "AI-powered no-code website builder — generate fully functional sites through natural language prompts.",
    full_description:
      "AI-driven no-code platform that generates fully functional websites through natural language prompts. Features a queue-based job pipeline via Inngest for async generation, end-to-end type-safe APIs with tRPC, and PostgreSQL + Prisma data layer for project persistence and user management.",
    screenshots: ["/images/apps/screenshots/placeholder.svg"],
    tech_stack: ["Next.js", "React", "PostgreSQL", "Prisma", "Inngest", "tRPC"],
    features: ["Natural language generation", "Async job pipeline", "Type-safe tRPC APIs", "User project management"],
    download_link: "https://n4nc.space",
    play_store_link: "https://n4nc.space",
    category: "AI / SaaS",
    featured: true,
    order: 3,
  },
  {
    id: "proj-softdraw",
    name: "SoftDraw",
    slug: "softdraw",
    icon: "/images/apps/default.svg",
    short_description:
      "Miro-inspired real-time collaborative whiteboard with live cursors and room-based multiplayer canvas.",
    full_description:
      "Miro-inspired real-time collaborative whiteboard with multiplayer canvas, live cursor presence, and room-based collaboration powered by Liveblocks. Clerk handles authentication and user management. Full Prisma-backed persistence for boards and workspace data.",
    screenshots: ["/images/apps/screenshots/placeholder.svg"],
    tech_stack: ["Next.js", "React", "Prisma", "Clerk", "Liveblocks"],
    features: ["Real-time collaboration", "Live cursor presence", "Room-based boards", "Workspace persistence"],
    download_link: "https://softdraw.site",
    play_store_link: "https://softdraw.site",
    category: "SaaS",
    featured: false,
    order: 4,
  },
  {
    id: "proj-distribution",
    name: "Distribution Management System",
    slug: "distribution-system",
    icon: "/images/apps/default.svg",
    short_description:
      "Multi-tenant SaaS for distribution, finance, inventory, and accounting — actively used by local shops.",
    full_description:
      "Production-grade multi-tenant distribution and finance management system actively used by multiple shops and clients. Features complete accounting module, purchase and sale management, quotation generation, inventory tracking, and per-tenant reporting dashboards.",
    screenshots: ["/images/apps/screenshots/placeholder.svg"],
    tech_stack: ["Next.js", "Node.js", "PostgreSQL", "Multi-Tenant SaaS"],
    features: ["Multi-tenant architecture", "Accounting module", "Inventory tracking", "Per-tenant dashboards"],
    download_link: "https://distribution.switch2i.tech",
    play_store_link: "https://distribution.switch2i.tech",
    category: "Enterprise SaaS",
    featured: false,
    order: 5,
  },
];

export const fallbackServices: Service[] = [
  {
    id: "svc-fullstack",
    title: "Full-Stack Web Development",
    description:
      "Production Next.js and React applications with SSR, type-safe APIs, and polished UI — from MVP to scale.",
    icon: "globe",
    starting_price: "From $599",
    visible: true,
    order: 0,
  },
  {
    id: "svc-ai",
    title: "AI & Automation",
    description:
      "LLM integration, AI agents, n8n workflows, and prompt-engineered pipelines for intelligent products.",
    icon: "server",
    starting_price: "From $499",
    visible: true,
    order: 1,
  },
  {
    id: "svc-engineering",
    title: "Software Engineering",
    description:
      "End-to-end product development — architecture, APIs, databases, and polished interfaces for production software.",
    icon: "smartphone",
    starting_price: "From $499",
    visible: true,
    order: 2,
  },
  {
    id: "svc-devops",
    title: "Cloud & DevOps",
    description:
      "AWS infrastructure, VPS administration, Docker, CI/CD, and Dokploy deployments managed end-to-end.",
    icon: "database",
    starting_price: "From $399",
    visible: true,
    order: 3,
  },
  {
    id: "svc-3d",
    title: "3D & WebGL Development",
    description:
      "Three.js experiences, Blender pipelines, Meshy.ai integration, and interactive 3D product platforms.",
    icon: "palette",
    starting_price: "From $799",
    visible: true,
    order: 4,
  },
  {
    id: "svc-web3",
    title: "Web3 & SaaS Architecture",
    description:
      "Multi-tenant SaaS, Web2.5 platforms, smart contracts, and wallet auth for next-gen digital products.",
    icon: "store",
    starting_price: "From $999",
    visible: true,
    order: 5,
  },
];

export const fallbackPlans: Plan[] = [
  {
    id: "mvp",
    name: "MVP Launch",
    price: "$799",
    currency: "USD",
    billing_cycle: "per project",
    features: [
      "Single-platform software MVP",
      "Up to 10 screens / pages",
      "Core API + database setup",
      "2 revision rounds",
      "3–4 weeks delivery",
    ],
    highlighted: false,
    cta_text: "Get Started",
  },
  {
    id: "product",
    name: "Product Build",
    price: "$2,499",
    currency: "USD",
    billing_cycle: "per project",
    features: [
      "Full-stack software product",
      "Auth, dashboard, and admin panel",
      "Cloud deployment + CI/CD",
      "AI or third-party integrations",
      "4 revision rounds",
      "6–8 weeks delivery",
    ],
    highlighted: true,
    cta_text: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise / Lead",
    price: "$5,999+",
    currency: "USD",
    billing_cycle: "per project",
    features: [
      "Solo product ownership end-to-end",
      "Multi-tenant or Web3 architecture",
      "AWS / DevOps + AI pipelines",
      "3D, real-time, or complex systems",
      "Priority delivery + post-launch support",
      "Technical leadership included",
    ],
    highlighted: false,
    cta_text: "Book a Call",
  },
];

export const fallbackTeam: TeamMember[] = [
  {
    id: "obaid-lead",
    name: "Obaid Ur Rahman Zia",
    role: "Senior Software Engineer & Product Lead",
    photo: SITE.photo,
    bio: "Founder of Plivix Technologies, Product Lead at Visiontillion (vstore.sa), and technical manager at Switch2itech. B.S. Software Engineering (CGPA 3.88) from University of Sargodha. General Secretary of SE Spectrum — led 20+ members and organized 15+ technical events.",
    linkedin: SITE.linkedin,
    github: SITE.github,
    is_lead: true,
    order: 0,
  },
];
