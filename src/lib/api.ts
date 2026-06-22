import axios from "axios";
import type {
  AppItem,
  ContactSubmission,
  DashboardStats,
  Plan,
  Profile,
  Service,
  TeamMember,
  TokenResponse,
} from "@/types";

const API_URL = "/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// Public
export const getProfile = () => api.get<Profile>("/profile").then((r) => r.data);
export const getApps = () => api.get<AppItem[]>("/apps").then((r) => r.data);
export const getApp = (slug: string) => api.get<AppItem>(`/apps/${slug}`).then((r) => r.data);
export const getServices = () => api.get<Service[]>("/services").then((r) => r.data);
export const getPlans = () => api.get<Plan[]>("/plans").then((r) => r.data);
export const getTeam = () => api.get<TeamMember[]>("/team").then((r) => r.data);
export const submitContact = (data: { name: string; email: string; message: string }) =>
  api.post("/contact", data);

// Auth
export const login = (email: string, password: string) =>
  api.post<TokenResponse>("/auth/login", { email, password }).then((r) => r.data);

// Admin
export const getStats = () => api.get<DashboardStats>("/admin/stats").then((r) => r.data);
export const adminGetApps = () => api.get<AppItem[]>("/admin/apps").then((r) => r.data);
export const adminCreateApp = (data: Partial<AppItem>) =>
  api.post<AppItem>("/admin/apps", data).then((r) => r.data);
export const adminUpdateApp = (id: string, data: Partial<AppItem>) =>
  api.put<AppItem>(`/admin/apps/${id}`, data).then((r) => r.data);
export const adminDeleteApp = (id: string) => api.delete(`/admin/apps/${id}`);
export const adminGetServices = () => api.get<Service[]>("/admin/services").then((r) => r.data);
export const adminCreateService = (data: Partial<Service>) =>
  api.post<Service>("/admin/services", data).then((r) => r.data);
export const adminUpdateService = (id: string, data: Partial<Service>) =>
  api.put<Service>(`/admin/services/${id}`, data).then((r) => r.data);
export const adminDeleteService = (id: string) => api.delete(`/admin/services/${id}`);
export const adminGetPlans = () => api.get<Plan[]>("/admin/plans").then((r) => r.data);
export const adminUpdatePlan = (id: string, data: Partial<Plan>) =>
  api.put<Plan>(`/admin/plans/${id}`, data).then((r) => r.data);
export const adminGetTeam = () => api.get<TeamMember[]>("/admin/team").then((r) => r.data);
export const adminGetProfile = () => api.get<Profile>("/admin/profile").then((r) => r.data);
export const adminUpdateProfile = (data: Partial<Profile>) =>
  api.put<Profile>("/admin/profile", data).then((r) => r.data);
export const adminGetContacts = () =>
  api.get<ContactSubmission[]>("/admin/contacts").then((r) => r.data);
export const adminMarkContactRead = (id: string) =>
  api.patch<ContactSubmission>(`/admin/contacts/${id}/read`).then((r) => r.data);
