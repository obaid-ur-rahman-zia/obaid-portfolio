-- Obaid Ur Rahman Zia Portfolio — Supabase PostgreSQL
-- Run in Supabase Dashboard → SQL Editor, or via Supabase CLI

-- ========== TABLES ==========

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name VARCHAR(120) DEFAULT 'Obaid Ur Rahman Zia',
  title VARCHAR(160) DEFAULT 'Senior Software Engineer & Product Lead',
  tagline VARCHAR(280) DEFAULT 'I architect and ship scalable software systems — web, AI, and production platforms from design to deployment.',
  bio TEXT DEFAULT 'Software Engineer and Product Lead with 5+ years of experience delivering scalable web, AI-powered, and full-stack applications for clients across Pakistan, Saudi Arabia, and international markets. Currently Product Lead at Visiontillion (vstore.sa), Founder & CEO of Plivix Technologies, and technical manager at Switch2itech with 30+ deployed systems. Delivered 60+ client projects across SaaS, AI, and enterprise software — equally effective as a hands-on IC and as a technical lead who owns products from architecture to deployment.',
  photo VARCHAR(500) DEFAULT '/images/obaid.png',
  email VARCHAR(160) DEFAULT 'obaid107333@gmail.com',
  whatsapp VARCHAR(40) DEFAULT '+923706014905',
  github VARCHAR(500) DEFAULT 'https://github.com/obaid-ur-rahman-zia',
  linkedin VARCHAR(500) DEFAULT 'https://linkedin.com/in/obaid-ur-rahman-zia',
  play_store VARCHAR(500) DEFAULT 'https://plivix-tech.com',
  skills TEXT DEFAULT '["Next.js","React","TypeScript","Node.js","React Native","PostgreSQL","MongoDB","AWS","Docker","Three.js","AI / LLM","n8n","Supabase","Prisma","Web3"]',
  years_experience INTEGER DEFAULT 5,
  apps_in_production INTEGER DEFAULT 60,
  clients_served INTEGER DEFAULT 30,
  play_store_apps INTEGER DEFAULT 6
);

CREATE TABLE IF NOT EXISTS apps (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  icon VARCHAR(500) DEFAULT '',
  short_description VARCHAR(280) DEFAULT '',
  full_description TEXT DEFAULT '',
  screenshots TEXT DEFAULT '[]',
  tech_stack TEXT DEFAULT '[]',
  features TEXT DEFAULT '[]',
  download_link VARCHAR(500) DEFAULT '',
  play_store_link VARCHAR(500) DEFAULT '',
  category VARCHAR(80) DEFAULT 'Productivity',
  featured BOOLEAN DEFAULT FALSE,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT DEFAULT '',
  icon VARCHAR(80) DEFAULT 'smartphone',
  starting_price VARCHAR(40) DEFAULT '',
  visible BOOLEAN DEFAULT TRUE,
  "order" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS plans (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  price VARCHAR(40) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  billing_cycle VARCHAR(40) DEFAULT 'per project',
  features TEXT DEFAULT '[]',
  highlighted BOOLEAN DEFAULT FALSE,
  cta_text VARCHAR(40) DEFAULT 'Get Started'
);

CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(120) DEFAULT '',
  photo VARCHAR(500) DEFAULT '',
  bio TEXT DEFAULT '',
  linkedin VARCHAR(500) DEFAULT '',
  github VARCHAR(500) DEFAULT '',
  is_lead BOOLEAN DEFAULT FALSE,
  "order" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  "read" BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== ROW LEVEL SECURITY ==========

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_profile" ON profile FOR SELECT USING (true);
CREATE POLICY "public_read_apps" ON apps FOR SELECT USING (true);
CREATE POLICY "public_read_visible_services" ON services FOR SELECT USING (visible = true);
CREATE POLICY "public_read_plans" ON plans FOR SELECT USING (true);
CREATE POLICY "public_read_team" ON team_members FOR SELECT USING (true);
CREATE POLICY "public_insert_contacts" ON contact_submissions FOR INSERT WITH CHECK (true);

-- ========== SEED DATA ==========

INSERT INTO profile (
  id, name, title, tagline, bio, photo, email, whatsapp, github, linkedin, play_store,
  skills, years_experience, apps_in_production, clients_served, play_store_apps
) VALUES (
  1,
  'Obaid Ur Rahman Zia',
  'Senior Software Engineer & Product Lead',
  'I architect and ship scalable software systems — web, AI, and production platforms from design to deployment.',
  'Software Engineer and Product Lead with 5+ years of experience delivering scalable web, AI-powered, and full-stack applications for clients across Pakistan, Saudi Arabia, and international markets. Currently Product Lead at Visiontillion (vstore.sa), Founder & CEO of Plivix Technologies, and technical manager at Switch2itech with 30+ deployed systems. Delivered 60+ client projects across SaaS, AI, and enterprise software — equally effective as a hands-on IC and as a technical lead who owns products from architecture to deployment.',
  '/images/obaid.png',
  'obaid107333@gmail.com',
  '+923706014905',
  'https://github.com/obaid-ur-rahman-zia',
  'https://linkedin.com/in/obaid-ur-rahman-zia',
  'https://plivix-tech.com',
  '["Next.js","React","TypeScript","Node.js","React Native","PostgreSQL","MongoDB","AWS","Docker","Three.js","AI / LLM","n8n","Supabase","Prisma","Web3"]',
  5, 60, 30, 6
) ON CONFLICT (id) DO NOTHING;

INSERT INTO plans (id, name, price, currency, billing_cycle, features, highlighted, cta_text) VALUES
('mvp', 'MVP Launch', '$799', 'USD', 'per project',
 '["Single-platform software MVP","Up to 10 screens / pages","Core API + database setup","2 revision rounds","3–4 weeks delivery"]',
 FALSE, 'Get Started'),
('product', 'Product Build', '$2,499', 'USD', 'per project',
 '["Full-stack software product","Auth, dashboard, and admin panel","Cloud deployment + CI/CD","AI or third-party integrations","4 revision rounds","6–8 weeks delivery"]',
 TRUE, 'Most Popular'),
('enterprise', 'Enterprise / Lead', '$5,999+', 'USD', 'per project',
 '["Solo product ownership end-to-end","Multi-tenant or Web3 architecture","AWS / DevOps + AI pipelines","3D, real-time, or complex systems","Priority delivery + post-launch support","Technical leadership included"]',
 FALSE, 'Book a Call')
ON CONFLICT (id) DO NOTHING;

INSERT INTO services (id, title, description, icon, starting_price, visible, "order") VALUES
('svc-fullstack', 'Full-Stack Web Development', 'Production Next.js and React applications with SSR, type-safe APIs, and polished UI — from MVP to scale.', 'globe', 'From $599', TRUE, 0),
('svc-ai', 'AI & Automation', 'LLM integration, AI agents, n8n workflows, and prompt-engineered pipelines for intelligent products.', 'server', 'From $499', TRUE, 1),
('svc-engineering', 'Software Engineering', 'End-to-end product development — architecture, APIs, databases, and polished interfaces for production software.', 'smartphone', 'From $499', TRUE, 2),
('svc-devops', 'Cloud & DevOps', 'AWS infrastructure, VPS administration, Docker, CI/CD, and Dokploy deployments managed end-to-end.', 'database', 'From $399', TRUE, 3),
('svc-3d', '3D & WebGL Development', 'Three.js experiences, Blender pipelines, Meshy.ai integration, and interactive 3D product platforms.', 'palette', 'From $799', TRUE, 4),
('svc-web3', 'Web3 & SaaS Architecture', 'Multi-tenant SaaS, Web2.5 platforms, smart contracts, and wallet auth for next-gen digital products.', 'store', 'From $999', TRUE, 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO apps (id, name, slug, icon, short_description, full_description, screenshots, tech_stack, features, download_link, play_store_link, category, featured, "order") VALUES
('proj-vstore', 'Vstore 3D Print Platform', 'vstore', '/images/apps/default.svg',
 'AI-powered 3D print marketplace with Meshy.ai generation, AWS pipeline, and Blender headless validation.',
 'AI-powered 3D print marketplace built solo as Product Lead at Visiontillion. End-to-end pipeline includes Meshy.ai mesh generation, AWS S3 storage, SQS job queuing, local Python worker with Blender headless repair, two-pass Trimesh validation, weighted printability scoring, and overhang detection. Next.js frontend with Three.js 3D previews.',
 '["/images/apps/screenshots/placeholder.svg"]',
 '["Next.js","Node.js","AWS S3","AWS SQS","Python","Blender","Meshy.ai","Three.js"]',
 '["AI mesh generation pipeline","AWS S3 + SQS job queue","Blender headless repair","Printability scoring","3D preview with Three.js"]',
 'https://vstore.sa', 'https://vstore.sa', 'AI / 3D', TRUE, 0),
('proj-chomperz', 'Chomperz', 'chomperz', '/images/apps/default.svg',
 'Web2.5 idle browser game with NFT multipliers, territory map, wallet auth, and anti-cheat architecture.',
 'Full technical architecture for a Web2.5 idle browser game featuring dual-currency Z-Coin economy, NFT multiplier systems, Territory Map with Crown/Frontier Lands, King of the Hill bidding, Crib decorator, Twitter OAuth + SIWE wallet authentication, and anti-cheat architecture.',
 '["/images/apps/screenshots/placeholder.svg"]',
 '["Next.js","Node.js","MongoDB","Alchemy","PixiJS","Socket.io","Solidity"]',
 '["Web2.5 economy","NFT multipliers","Wallet auth (SIWE)","Real-time multiplayer","Anti-cheat"]',
 'https://chomperz.app', 'https://chomperz.app', 'Web3 / Gaming', TRUE, 1),
('proj-plivix', 'Plivix Technologies', 'plivix', '/images/apps/default.svg',
 'Agency site with SEO optimization ranking on Google first page — services, portfolio, and contact flows.',
 'Full company site for Plivix Technologies boutique software studio. SEO-optimized presence achieving Google first-page ranking. Complete frontend with service pages, portfolio showcase, and contact flows for international clients across US, UK, and Canada.',
 '["/images/apps/screenshots/placeholder.svg"]',
 '["Next.js","Tailwind CSS","Vercel","SEO"]',
 '["First-page Google ranking","Service pages","Portfolio showcase","Contact flows"]',
 'https://plivix-tech.com', 'https://plivix-tech.com', 'Agency', TRUE, 2),
('proj-n4nc', 'N4NoCode', 'n4ncode', '/images/apps/default.svg',
 'AI-powered no-code website builder — generate fully functional sites through natural language prompts.',
 'AI-driven no-code platform that generates fully functional websites through natural language prompts. Features a queue-based job pipeline via Inngest for async generation, end-to-end type-safe APIs with tRPC, and PostgreSQL + Prisma data layer for project persistence and user management.',
 '["/images/apps/screenshots/placeholder.svg"]',
 '["Next.js","React","PostgreSQL","Prisma","Inngest","tRPC"]',
 '["Natural language generation","Async job pipeline","Type-safe tRPC APIs","User project management"]',
 'https://n4nc.space', 'https://n4nc.space', 'AI / SaaS', TRUE, 3),
('proj-softdraw', 'SoftDraw', 'softdraw', '/images/apps/default.svg',
 'Miro-inspired real-time collaborative whiteboard with live cursors and room-based multiplayer canvas.',
 'Miro-inspired real-time collaborative whiteboard with multiplayer canvas, live cursor presence, and room-based collaboration powered by Liveblocks. Clerk handles authentication and user management. Full Prisma-backed persistence for boards and workspace data.',
 '["/images/apps/screenshots/placeholder.svg"]',
 '["Next.js","React","Prisma","Clerk","Liveblocks"]',
 '["Real-time collaboration","Live cursor presence","Room-based boards","Workspace persistence"]',
 'https://softdraw.site', 'https://softdraw.site', 'SaaS', FALSE, 4),
('proj-distribution', 'Distribution Management System', 'distribution-system', '/images/apps/default.svg',
 'Multi-tenant SaaS for distribution, finance, inventory, and accounting — actively used by local shops.',
 'Production-grade multi-tenant distribution and finance management system actively used by multiple shops and clients. Features complete accounting module, purchase and sale management, quotation generation, inventory tracking, and per-tenant reporting dashboards.',
 '["/images/apps/screenshots/placeholder.svg"]',
 '["Next.js","Node.js","PostgreSQL","Multi-Tenant SaaS"]',
 '["Multi-tenant architecture","Accounting module","Inventory tracking","Per-tenant dashboards"]',
 'https://distribution.switch2i.tech', 'https://distribution.switch2i.tech', 'Enterprise SaaS', FALSE, 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO team_members (id, name, role, photo, bio, linkedin, github, is_lead, "order") VALUES
('obaid-lead', 'Obaid Ur Rahman Zia', 'Senior Software Engineer & Product Lead', '/images/obaid.png',
 'Founder of Plivix Technologies, Product Lead at Visiontillion (vstore.sa), and technical manager at Switch2itech. B.S. Software Engineering (CGPA 3.88) from University of Sargodha. General Secretary of SE Spectrum — led 20+ members and organized 15+ technical events.',
 'https://linkedin.com/in/obaid-ur-rahman-zia', 'https://github.com/obaid-ur-rahman-zia', TRUE, 0)
ON CONFLICT (id) DO NOTHING;

INSERT INTO contact_submissions (id, name, email, message, "read", submitted_at) VALUES
('44444444-4444-4444-4444-444444440001', 'Sarah Mitchell', 'sarah@techstartup.io',
 'Hi Obaid, we need a Next.js SaaS MVP with AI integration — budget around $2.5k. Can we schedule a call?', FALSE, NOW() - INTERVAL '1 day'),
('44444444-4444-4444-4444-444444440002', 'Omar Hassan', 'omar@retailco.pk',
 'Looking for a multi-tenant distribution system and ongoing DevOps support for our retail platform.', FALSE, NOW() - INTERVAL '3 days'),
('44444444-4444-4444-4444-444444440003', 'Emily Chen', 'emily@designlab.com',
 'Thanks for the portfolio walkthrough. We''d like a quote for an AI-powered web product with PostgreSQL backend.', TRUE, NOW() - INTERVAL '7 days'),
('44444444-4444-4444-4444-444444440004', 'James Wilson', 'j.wilson@agency.uk',
 'Remote contract: 3-month full-stack feature work on a Web3 platform. Are you available Q2?', FALSE, NOW() - INTERVAL '2 days'),
('44444444-4444-4444-4444-444444440005', 'Fatima Noor', 'fatima.noor@gmail.com',
 'Student project help — need guidance on Next.js architecture and Supabase. Paid consultation?', TRUE, NOW() - INTERVAL '14 days')
ON CONFLICT (id) DO NOTHING;
