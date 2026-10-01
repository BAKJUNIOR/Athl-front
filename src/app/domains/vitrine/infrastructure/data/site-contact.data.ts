// Source de données des coordonnées du site (footer + page Contact), branchée sur l'API backend.
// Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un signal.
import { signal } from '@angular/core';
import { SiteContactApiDto } from '../api/site-contact.api';
import { Lang } from '../../../../core/services/language.service';

// Forme publique consommée par les pages : footerAbout est déjà résolu dans la langue
// active (contrairement au DTO API qui garde les 2 champs Fr/En séparés).
export interface SiteContact {
  phone1: string;
  phone2: string;
  phone3: string;
  address: string;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  tiktokUrl: string | null;
  contactEmail: string;
  footerAbout: string;
  mapLocation: string;
}

const FALLBACK: SiteContactApiDto = {
  phone1: '+225 07 78 09 58 58',
  phone2: '+225 07 09 99 33 47',
  phone3: '+225 07 58 60 16 27',
  address: "Abidjan, Côte d'Ivoire",
  facebookUrl: 'https://www.facebook.com/people/Africa-Gold-Talent-Consulting/100088839685373/',
  youtubeUrl: 'https://www.youtube.com/@ATHL-LOGISTIQUE',
  instagramUrl: null,
  linkedinUrl: 'https://www.linkedin.com/company/africa-talent-habitat-logistique-athl/',
  tiktokUrl: 'https://www.tiktok.com/@africatalentconsulting',
  contactEmail: 'contact@athl.com',
  footerAboutFr: 'Africa Talent Habitat & Logistique — construction, rénovation, mobilité et importation de matériaux, portées par des équipes qualifiées.',
  footerAboutEn: 'Africa Talent Habitat & Logistics — construction, renovation, mobility and import of materials, delivered by skilled teams.',
  mapLocation: "Abidjan, Côte d'Ivoire",
};

const SITE_CONTACT = signal<SiteContactApiDto>(FALLBACK);

export function setSiteContact(contact: SiteContactApiDto | null): void {
  SITE_CONTACT.set(contact ?? FALLBACK);
}

export function getSiteContact(lang: Lang): SiteContact {
  const dto = SITE_CONTACT();
  const en = lang === 'en';
  return {
    phone1: dto.phone1,
    phone2: dto.phone2,
    phone3: dto.phone3,
    address: dto.address,
    facebookUrl: dto.facebookUrl,
    youtubeUrl: dto.youtubeUrl,
    instagramUrl: dto.instagramUrl,
    linkedinUrl: dto.linkedinUrl,
    tiktokUrl: dto.tiktokUrl || FALLBACK.tiktokUrl,
    contactEmail: dto.contactEmail || FALLBACK.contactEmail!,
    footerAbout: (en ? dto.footerAboutEn : dto.footerAboutFr) || (en ? FALLBACK.footerAboutEn! : FALLBACK.footerAboutFr!),
    mapLocation: dto.mapLocation || FALLBACK.mapLocation!,
  };
}
