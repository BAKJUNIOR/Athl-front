// Source de données du bandeau "Nos partenaires" (au-dessus du footer), branchée sur l'API
// backend. Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un
// signal : getPartnersSection() reste synchrone pour ne pas changer les pages qui le consomment.
import { signal } from '@angular/core';
import { PartnersSectionApiDto } from '../api/partners.api';
import { Lang } from '../../../../core/services/language.service';

export interface Partner {
  name: string;
  logo?: string;
}

export interface PartnersSection {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  partners: Partner[];
}

// Repli identique à ce qui était codé en dur avant le passage par le BO — les logos
// ci-dessous sont des marques tierces, à remplacer/confirmer par vos vrais partenaires.
const FALLBACK_PARTNERS: Partner[] = [
  { name: 'Suzuki', logo: 'images/partners/suzuki.svg' },
  { name: 'Toyota', logo: 'images/partners/toyota.svg' },
  { name: 'Caterpillar', logo: 'images/partners/caterpillar.svg' },
  { name: 'DHL', logo: 'images/partners/dhl.svg' },
  { name: 'Volvo', logo: 'images/partners/volvo.svg' },
  { name: 'Hyundai', logo: 'images/partners/hyundai.svg' },
];

const FALLBACK: Record<Lang, PartnersSection> = {
  fr: {
    eyebrow: 'Ils nous font confiance',
    title: 'Nos partenaires',
    subtitle: 'Des fournisseurs, transporteurs et partenaires de confiance qui nous accompagnent sur chaque chantier et chaque livraison.',
    ctaLabel: 'Devenir partenaire',
    partners: FALLBACK_PARTNERS,
  },
  en: {
    eyebrow: 'They trust us',
    title: 'Our partners',
    subtitle: 'Suppliers, carriers and trusted partners supporting us on every site and every delivery.',
    ctaLabel: 'Become a partner',
    partners: FALLBACK_PARTNERS,
  },
};

const PARTNERS_SECTION = signal<PartnersSectionApiDto | null>(null);

export function setPartnersSection(dto: PartnersSectionApiDto | null): void {
  PARTNERS_SECTION.set(dto);
}

export function getPartnersSection(lang: Lang): PartnersSection {
  const dto = PARTNERS_SECTION();
  const fb = FALLBACK[lang];
  if (!dto) return fb;

  const en = lang === 'en';
  return {
    eyebrow: (en ? dto.eyebrowEn : dto.eyebrowFr) || fb.eyebrow,
    title: (en ? dto.titleEn : dto.titleFr) || fb.title,
    subtitle: (en ? dto.subtitleEn : dto.subtitleFr) || fb.subtitle,
    ctaLabel: (en ? dto.ctaLabelEn : dto.ctaLabelFr) || fb.ctaLabel,
    partners: dto.partners.length
      ? dto.partners.map((p) => ({ name: p.name, logo: p.logo ?? undefined }))
      : fb.partners,
  };
}
