export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  photo: string;
  email: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  play_store: string;
  skills: string[];
  years_experience: number;
  apps_in_production: number;
  clients_served: number;
  play_store_apps: number;
}

export interface AppItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  short_description: string;
  full_description: string;
  screenshots: string[];
  tech_stack: string[];
  features: string[];
  download_link: string;
  play_store_link: string;
  category: string;
  featured: boolean;
  order: number;
  created_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  starting_price: string;
  visible: boolean;
  order: number;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  currency: string;
  billing_cycle: string;
  features: string[];
  highlighted: boolean;
  cta_text: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin: string;
  github: string;
  is_lead: boolean;
  order: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  submitted_at?: string;
}

export interface DashboardStats {
  total_apps: number;
  total_services: number;
  active_plans: number;
  contact_submissions: number;
  unread_contacts: number;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
