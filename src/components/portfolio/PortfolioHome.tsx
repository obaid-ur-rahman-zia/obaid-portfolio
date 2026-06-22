"use client";

import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { StackSection } from "./sections/StackSection";
import { ServicesStrip } from "./sections/ServicesStrip";
import { WorksSection } from "./sections/WorksSection";
import { TimelineSection } from "./sections/TimelineSection";
import { ContactSection } from "./sections/ContactSection";
import { SITE } from "@/lib/site";
import type { AppItem, Profile, Service } from "@/types";

interface PortfolioHomeProps {
  profile: Profile;
  apps: AppItem[];
  services: Service[];
}

export function PortfolioHome({ profile, apps, services }: PortfolioHomeProps) {
  const profileWithPhoto = {
    ...profile,
    name: profile.name || SITE.name,
    title: profile.title || SITE.title,
    photo: profile.photo || SITE.photo,
  };

  return (
    <>
      <HeroSection profile={profileWithPhoto} />
      <AboutSection profile={profileWithPhoto} />
      <StackSection profile={profileWithPhoto} />
      <ServicesStrip services={services} />
      <WorksSection apps={apps} />
      <TimelineSection />
      <ContactSection profile={profileWithPhoto} />
    </>
  );
}
