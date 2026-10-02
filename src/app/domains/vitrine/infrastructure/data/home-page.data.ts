// Source de données du contenu de la page d'accueil, branchée sur l'API backend.
// Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un signal.
// Repli, champ par champ, sur le contenu qui était codé en dur dans home.component.html/i18n
// si la ressource n'est pas encore disponible (même filet de sécurité que about-page.data.ts).
import { signal } from '@angular/core';
import { HomePageApiDto } from '../api/home-page.api';
import { Lang } from '../../../../core/services/language.service';

const HOME_PAGE = signal<HomePageApiDto | null>(null);

export function setHomePage(dto: HomePageApiDto | null): void {
  HOME_PAGE.set(dto);
}

export interface HomeHero {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  images: string[];
}

export interface HomePillar {
  lead: string;
  image: string;
}

const FALLBACK_HERO_IMAGES = ['images/hero-cover.jpg', 'images/bg-2.jpg', 'images/bg-1.jpg', 'images/bg-3.jpg', 'images/bg-4.jpg'];

const FALLBACK: Record<Lang, { hero: HomeHero; construction: HomePillar; mobility: HomePillar; import: HomePillar }> = {
  fr: {
    hero: {
      titleLine1: "L'expertise qui bâtit.",
      titleLine2: 'La logistique qui accélère.',
      subtitle:
        "Africa Talent Habitat & Logistique : des équipes qualifiées, des méthodes éprouvées et une chaîne d'approvisionnement maîtrisée, du premier plan à la livraison.",
      images: FALLBACK_HERO_IMAGES,
    },
    construction: {
      lead: 'Chantiers neufs, rénovations, approvisionnement : nos équipes mènent vos travaux du premier coup de pioche à la livraison.',
      image: 'images/card-construction.jpg',
    },
    mobility: {
      lead: 'Véhicules, chauffeurs, livraisons : des solutions de mobilité fiables pour vos trajets, professionnels comme personnels.',
      image: 'images/pillar-mobility.jpg',
    },
    import: {
      lead: "De la Chine à l'Europe jusqu'à vos chantiers : nous importons et livrons vos matériaux de A à Z.",
      image: 'images/import.jpg',
    },
  },
  en: {
    hero: {
      titleLine1: 'The expertise that builds.',
      titleLine2: 'The logistics that accelerate.',
      subtitle:
        'Africa Talent Habitat & Logistics: skilled teams, proven methods and a tightly managed supply chain, from the first drawing to delivery.',
      images: FALLBACK_HERO_IMAGES,
    },
    construction: {
      lead: 'New builds, renovations, materials supply: our teams run your projects from first dig to handover.',
      image: 'images/card-construction.jpg',
    },
    mobility: {
      lead: 'Vehicles, drivers, deliveries: reliable mobility solutions for your trips, professional or personal.',
      image: 'images/pillar-mobility.jpg',
    },
    import: {
      lead: 'From China and Europe to your site: we import and deliver your materials end to end.',
      image: 'images/import.jpg',
    },
  },
};

export function getHomeHero(lang: Lang): HomeHero {
  const dto = HOME_PAGE();
  const fb = FALLBACK[lang].hero;
  if (!dto) return fb;
  const en = lang === 'en';
  return {
    titleLine1: (en ? dto.heroTitleLine1En : dto.heroTitleLine1Fr) || fb.titleLine1,
    titleLine2: (en ? dto.heroTitleLine2En : dto.heroTitleLine2Fr) || fb.titleLine2,
    subtitle: (en ? dto.heroSubtitleEn : dto.heroSubtitleFr) || fb.subtitle,
    images: dto.heroImages?.length ? dto.heroImages : fb.images,
  };
}

export function getHomePillar(key: 'construction' | 'mobility' | 'import', lang: Lang): HomePillar {
  const dto = HOME_PAGE();
  const fb = FALLBACK[lang][key];
  if (!dto) return fb;
  const en = lang === 'en';
  const leadFr = key === 'construction' ? dto.pillarConstructionLeadFr : key === 'mobility' ? dto.pillarMobilityLeadFr : dto.pillarImportLeadFr;
  const leadEn = key === 'construction' ? dto.pillarConstructionLeadEn : key === 'mobility' ? dto.pillarMobilityLeadEn : dto.pillarImportLeadEn;
  const image = key === 'construction' ? dto.pillarConstructionImage : key === 'mobility' ? dto.pillarMobilityImage : dto.pillarImportImage;
  return {
    lead: (en ? leadEn : leadFr) || fb.lead,
    image: image || fb.image,
  };
}
