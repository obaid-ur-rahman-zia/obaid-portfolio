import type {
  AppItem,
  ContactSubmission,
  Plan,
  Profile,
  Service,
  TeamMember,
} from "@/types";

export function parseJsonList(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === "string") {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function dumpJsonList(list: string[] | undefined | null): string {
  return JSON.stringify(list ?? []);
}

type DbRow = Record<string, unknown>;

export function mapProfile(row: DbRow): Profile {
  return {
    name: String(row.name ?? ""),
    title: String(row.title ?? ""),
    tagline: String(row.tagline ?? ""),
    bio: String(row.bio ?? ""),
    photo: String(row.photo ?? ""),
    email: String(row.email ?? ""),
    whatsapp: String(row.whatsapp ?? ""),
    github: String(row.github ?? ""),
    linkedin: String(row.linkedin ?? ""),
    play_store: String(row.play_store ?? ""),
    skills: parseJsonList(row.skills),
    years_experience: Number(row.years_experience ?? 0),
    apps_in_production: Number(row.apps_in_production ?? 0),
    clients_served: Number(row.clients_served ?? 0),
    play_store_apps: Number(row.play_store_apps ?? 0),
  };
}

export function mapApp(row: DbRow): AppItem {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    slug: String(row.slug ?? ""),
    icon: String(row.icon ?? ""),
    short_description: String(row.short_description ?? ""),
    full_description: String(row.full_description ?? ""),
    screenshots: parseJsonList(row.screenshots),
    tech_stack: parseJsonList(row.tech_stack),
    features: parseJsonList(row.features),
    download_link: String(row.download_link ?? ""),
    play_store_link: String(row.play_store_link ?? ""),
    category: String(row.category ?? "Productivity"),
    featured: Boolean(row.featured),
    order: Number(row.order ?? 0),
    created_at: row.created_at ? String(row.created_at) : undefined,
  };
}

export function mapService(row: DbRow): Service {
  return {
    id: String(row.id),
    title: String(row.title ?? ""),
    description: String(row.description ?? ""),
    icon: String(row.icon ?? "smartphone"),
    starting_price: String(row.starting_price ?? ""),
    visible: Boolean(row.visible ?? true),
    order: Number(row.order ?? 0),
  };
}

export function mapPlan(row: DbRow): Plan {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    price: String(row.price ?? ""),
    currency: String(row.currency ?? "USD"),
    billing_cycle: String(row.billing_cycle ?? "per project"),
    features: parseJsonList(row.features),
    highlighted: Boolean(row.highlighted),
    cta_text: String(row.cta_text ?? "Get Started"),
  };
}

export function mapTeamMember(row: DbRow): TeamMember {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    role: String(row.role ?? ""),
    photo: String(row.photo ?? ""),
    bio: String(row.bio ?? ""),
    linkedin: String(row.linkedin ?? ""),
    github: String(row.github ?? ""),
    is_lead: Boolean(row.is_lead),
    order: Number(row.order ?? 0),
  };
}

export function mapContact(row: DbRow): ContactSubmission {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    message: String(row.message ?? ""),
    read: Boolean(row.read),
    submitted_at: row.submitted_at ? String(row.submitted_at) : undefined,
  };
}

export function newId(): string {
  return crypto.randomUUID();
}

export function applyPartialUpdate(
  target: Record<string, unknown>,
  data: Record<string, unknown>,
  jsonFields: Set<string> = new Set()
) {
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    if (jsonFields.has(key) && Array.isArray(value)) {
      target[key] = dumpJsonList(value as string[]);
    } else {
      target[key] = value;
    }
  }
}
