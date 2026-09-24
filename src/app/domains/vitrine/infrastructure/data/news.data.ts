// Actualités affichées sur /actualites et /actualites/:slug.
// Contenu statique à éditer directement ici en attendant un module d'actualités côté back-office.
// Les entrées ci-dessous sont des exemples à remplacer par de vraies nouvelles ATHL.
import { Lang } from '../../../../core/services/language.service';

export interface NewsQuote {
  text: string;
  name: string;
  role: string;
}

export interface NewsItem {
  slug: string;
  image: string;
  date: string;
  category: string;
  featured: boolean;
  title: string;
  excerpt: string;
  body: string[];
  quote: NewsQuote | null;
}

interface NewsItemDto {
  slug: string;
  image: string;
  date: string;
  featured: boolean;
  categoryFr: string;
  categoryEn: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
  bodyFr: string[];
  bodyEn?: string[];
  quoteFr?: { text: string; name: string; role: string } | null;
  quoteEn?: { text: string; name: string; role: string } | null;
}

const NEWS: NewsItemDto[] = [
  {
    slug: 'livraison-chantier-abidjan',
    image: 'images/proj-2.png',
    date: '2026-08-20',
    featured: true,
    categoryFr: 'Chantiers',
    categoryEn: 'Sites',
    titleFr: 'Livraison d’un nouveau chantier à Abidjan',
    titleEn: 'Delivery of a new site in Abidjan',
    excerptFr: 'Structure métallique et levage : un chantier livré dans les délais, sans incident, par nos équipes BTP.',
    excerptEn: 'Steel structure and lifting: a site delivered on schedule, incident-free, by our construction teams.',
    bodyFr: [
      'Nos équipes BTP viennent de livrer un nouveau chantier de structure métallique à Abidjan, dans les délais fixés avec le client et sans le moindre incident de sécurité.',
      'Le projet a mobilisé chefs de chantier, ouvriers qualifiés et équipes de levage pendant plusieurs mois, avec un suivi quotidien de la planification et de la sécurité sur site.',
      'Cette livraison illustre l’organisation qui structure chacun de nos chantiers : un encadrement resserré, des méthodes éprouvées et une coordination constante avec nos équipes logistiques pour l’approvisionnement en matériaux.',
    ],
    quoteFr: {
      text: 'Tenir les délais sans transiger sur la sécurité, c’est exactement ce que nos équipes ont démontré sur ce chantier.',
      name: 'Direction des opérations',
      role: 'ATHL — Pôle Construction & rénovation',
    },
  },
  {
    slug: 'flotte-mobilite-vtc',
    image: 'images/pillar-mobility.jpg',
    date: '2026-07-14',
    featured: true,
    categoryFr: 'Mobilité & VTC',
    categoryEn: 'Mobility & ride-hailing',
    titleFr: 'ATHL renforce sa flotte Mobilité & VTC',
    titleEn: 'ATHL expands its Mobility & ride-hailing fleet',
    excerptFr: 'De nouveaux véhicules pour accompagner la demande croissante de nos clients particuliers et entreprises.',
    excerptEn: 'New vehicles to support growing demand from our individual and corporate clients.',
    bodyFr: [
      'Face à la demande croissante de nos clients particuliers et entreprises, ATHL renforce sa flotte dédiée à la mobilité et au transport VTC.',
      'Les nouveaux véhicules viennent élargir notre capacité de location et de mise à disposition de chauffeurs, tout en maintenant le niveau d’entretien et de suivi qui caractérise notre flotte.',
      'Cet investissement s’inscrit dans la continuité de notre pôle Mobilité, pensé pour accompagner aussi bien les déplacements professionnels que les besoins ponctuels de nos clients.',
    ],
    quoteFr: null,
  },
  {
    slug: 'recrutement-chantiers',
    image: 'images/card-construction.jpg',
    date: '2026-06-02',
    featured: false,
    categoryFr: 'Recrutement',
    categoryEn: 'Careers',
    titleFr: 'Nouvelle campagne de recrutement sur nos chantiers',
    titleEn: 'New hiring campaign across our sites',
    excerptFr: 'Ouvriers qualifiés, chefs de chantier, chauffeurs : ATHL recrute pour accompagner sa croissance.',
    excerptEn: 'Skilled workers, site managers, drivers: ATHL is hiring to support its growth.',
    bodyFr: [
      'ATHL ouvre une nouvelle campagne de recrutement pour renforcer ses équipes terrain : ouvriers qualifiés, chefs de chantier, chauffeurs et logisticiens.',
      'Chaque poste est encadré dès l’intégration, avec une formation aux méthodes et aux règles de sécurité qui structurent nos chantiers comme nos opérations logistiques.',
      'Les candidatures sont ouvertes dès maintenant sur notre page Carrières.',
    ],
    quoteFr: null,
  },
  {
    slug: 'import-nouveaux-partenaires',
    image: 'images/proj-5.png',
    date: '2026-05-11',
    featured: false,
    categoryFr: 'Import & logistique',
    categoryEn: 'Import & logistics',
    titleFr: 'Import & logistique : nouveaux partenaires en Chine et en Turquie',
    titleEn: 'Import & logistics: new partners in China and Turkey',
    excerptFr: 'ATHL élargit son réseau d’approvisionnement pour sécuriser les délais de livraison de matériaux.',
    excerptEn: 'ATHL expands its sourcing network to secure material delivery lead times.',
    bodyFr: [
      'ATHL élargit son réseau de fournisseurs avec de nouveaux partenaires en Chine et en Turquie, dans la continuité de ses opérations d’importation directe de matériaux.',
      'Cet élargissement vise à sécuriser les délais de livraison et à diversifier les sources d’approvisionnement pour nos chantiers comme pour nos clients.',
      'Notre chaîne d’approvisionnement reste pilotée depuis Abidjan, du premier contact fournisseur jusqu’à la livraison finale.',
    ],
    quoteFr: {
      text: 'Diversifier nos partenaires à l’import, c’est garantir à nos clients des délais tenus, même quand la demande augmente.',
      name: 'Direction Import & logistique',
      role: 'ATHL — Pôle Import & logistique',
    },
  },
  {
    slug: 'securite-chantiers-bilan',
    image: 'images/bg-2.jpg',
    date: '2026-04-03',
    featured: false,
    categoryFr: 'Entreprise',
    categoryEn: 'Company',
    titleFr: 'Sécurité sur nos chantiers : le bilan de l’année',
    titleEn: 'Site safety: this year’s results',
    excerptFr: 'Formations, équipements et encadrement renforcé : où en est ATHL sur la sécurité de ses équipes terrain.',
    excerptEn: 'Training, equipment and closer supervision: where ATHL stands on field-team safety.',
    bodyFr: [
      'La sécurité de nos équipes terrain reste une priorité constante : équipements de protection, formations régulières et encadrement resserré sur chaque chantier.',
      'Cette rigueur est ce qui nous permet de tenir nos délais sans jamais transiger sur la sécurité de nos ouvriers, chefs de chantier, chauffeurs et logisticiens.',
    ],
    quoteFr: null,
  },
  {
    slug: 'nouveau-depot-materiaux',
    image: 'images/proj-1.png',
    date: '2026-02-18',
    featured: false,
    categoryFr: 'Chantiers',
    categoryEn: 'Sites',
    titleFr: 'Ouverture d’un nouveau dépôt de matériaux à Abidjan',
    titleEn: 'A new materials depot opens in Abidjan',
    excerptFr: 'Un espace de stockage supplémentaire pour fluidifier l’approvisionnement de nos chantiers.',
    excerptEn: 'Extra storage capacity to streamline supply to our sites.',
    bodyFr: [
      'ATHL ouvre un nouveau dépôt de matériaux à Abidjan, pensé pour raccourcir les délais entre réception des importations et livraison sur chantier.',
      'Ce nouvel espace vient compléter notre chaîne logistique, du port jusqu’au dernier kilomètre.',
    ],
    quoteFr: null,
  },
];

export function getNews(lang: Lang): NewsItem[] {
  const en = lang === 'en';
  return NEWS.map((n) => ({
    slug: n.slug,
    image: n.image,
    date: n.date,
    featured: n.featured,
    category: en ? n.categoryEn : n.categoryFr,
    title: en ? n.titleEn : n.titleFr,
    excerpt: en ? n.excerptEn : n.excerptFr,
    body: en ? n.bodyEn ?? n.bodyFr : n.bodyFr,
    quote: (en ? n.quoteEn ?? n.quoteFr : n.quoteFr) ?? null,
  }));
}

export function getNewsBySlug(slug: string, lang: Lang): NewsItem | undefined {
  return getNews(lang).find((n) => n.slug === slug);
}

export function getNewsCategories(lang: Lang): string[] {
  return Array.from(new Set(getNews(lang).map((n) => n.category)));
}
