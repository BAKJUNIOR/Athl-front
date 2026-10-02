// MOCK temporaire pour la refonte de la page Projets (galerie groupée par service + fiche
// détail) : aucun appel API ici, volontairement. À remplacer par la vraie source de données
// (voir projects.data.ts) une fois la vue validée — voir discussion sur les tables projects/services.
import { Lang } from '../../../../core/services/language.service';

export interface ProjectServiceMock {
  slug: string;
  titleFr: string;
  titleEn: string;
}

export interface ProjectItemMock {
  slug: string;
  serviceSlug: string;
  titleFr: string;
  titleEn: string;
  locationFr: string;
  locationEn: string;
  typologyFr: string;
  typologyEn: string;
  year: string;
  images: string[];
  descriptionFr: [string, string];
  descriptionEn: [string, string];
}

export const MOCK_PROJECT_SERVICES: ProjectServiceMock[] = [
  { slug: 'construction', titleFr: 'Construction & rénovation', titleEn: 'Construction & Renovation' },
  { slug: 'import-logistique', titleFr: 'Import & logistique', titleEn: 'Import & Logistics' },
  { slug: 'mobilite-vtc-livraison', titleFr: 'Mobilité, VTC & Livraison', titleEn: 'Mobility, Ride-hailing & Delivery' },
];

export const MOCK_PROJECTS: ProjectItemMock[] = [
  // ---- Construction & rénovation ----
  {
    slug: 'villa-les-rivages',
    serviceSlug: 'construction',
    titleFr: 'Villa Les Rivages',
    titleEn: 'Villa Les Rivages',
    locationFr: 'Cocody, Abidjan',
    locationEn: 'Cocody, Abidjan',
    typologyFr: 'Villa',
    typologyEn: 'Villa',
    year: '2023',
    images: ['images/proj-1.png', 'images/construction1.jpg', 'images/chantier3.jpg'],
    descriptionFr: [
      "Construction neuve d'une villa R+1 à Cocody, pensée pour une famille recherchant à la fois intimité et ouverture sur l'extérieur. Le chantier a couvert le terrassement, le gros œuvre et les finitions, livrés clé en main.",
      "Une attention particulière a été portée à la gestion des délais malgré la saison des pluies, grâce à une planification serrée des équipes et des approvisionnements. Le résultat : une livraison conforme au calendrier initial.",
    ],
    descriptionEn: [
      'New-build R+1 villa in Cocody, designed for a family seeking both privacy and openness to the outdoors. The site covered groundwork, structural works and finishing, delivered turnkey.',
      'Particular attention was paid to schedule management despite the rainy season, thanks to tight planning of crews and supplies. The result: a handover that met the original timeline.',
    ],
  },
  {
    slug: 'residence-koumassi',
    serviceSlug: 'construction',
    titleFr: 'Résidence Koumassi',
    titleEn: 'Koumassi Residence',
    locationFr: 'Koumassi, Abidjan',
    locationEn: 'Koumassi, Abidjan',
    typologyFr: 'Immeuble résidentiel',
    typologyEn: 'Residential building',
    year: '2022',
    images: ['images/proj-2.png', 'images/chantier4.jpg', 'images/chantier5.jpg'],
    descriptionFr: [
      "Immeuble résidentiel R+3 de 12 logements à Koumassi, livré pour un promoteur privé. ATHL a assuré le gros œuvre complet ainsi que l'approvisionnement en matériaux tout au long du chantier.",
      "Un chef de chantier dédié a supervisé les équipes au quotidien, avec un contrôle qualité continu à chaque étape — structure, cloisons, réseaux — jusqu'à la réception finale.",
    ],
    descriptionEn: [
      '12-unit R+3 residential building in Koumassi, delivered for a private developer. ATHL handled the full structural works as well as materials sourcing throughout the project.',
      'A dedicated site manager supervised the teams daily, with ongoing quality control at every stage — structure, partitions, utilities — through to final handover.',
    ],
  },
  {
    slug: 'tour-plateau-affaires',
    serviceSlug: 'construction',
    titleFr: 'Tour Plateau Affaires',
    titleEn: 'Plateau Business Tower',
    locationFr: 'Plateau, Abidjan',
    locationEn: 'Plateau, Abidjan',
    typologyFr: 'Immeuble de bureaux',
    typologyEn: 'Office building',
    year: '2024',
    images: ['images/proj-4.png', 'images/construction.jpg', 'images/chantier2.jpg'],
    descriptionFr: [
      "Réhabilitation complète d'un immeuble de bureaux au Plateau : mise aux normes électriques, nouvelles façades et réaménagement intérieur des plateaux pour s'adapter aux usages actuels.",
      "Le chantier s'est déroulé en site occupé par phases, pour permettre aux locataires déjà installés de continuer leur activité sans interruption pendant les travaux.",
    ],
    descriptionEn: [
      'Full refurbishment of an office building in Plateau: electrical upgrades, new façades and interior reconfiguration of the floors to match current usage.',
      'The works were carried out in an occupied building, phase by phase, so existing tenants could keep working without interruption during construction.',
    ],
  },
  {
    slug: 'villa-riviera-golf',
    serviceSlug: 'construction',
    titleFr: 'Villa Riviera Golf',
    titleEn: 'Riviera Golf Villa',
    locationFr: 'Riviera Golf, Abidjan',
    locationEn: 'Riviera Golf, Abidjan',
    typologyFr: 'Villa',
    typologyEn: 'Villa',
    year: '2021',
    images: ['images/card-construction.jpg', 'images/construction1.jpg'],
    descriptionFr: [
      "Villa de standing en bordure du golf de la Riviera, construite sur deux niveaux avec piscine et jardin paysager. Le projet a été mené en co-conception avec un cabinet d'architecture local.",
      "ATHL a pris en charge l'ensemble du second œuvre et les finitions haut de gamme, dans le respect strict du cahier des charges esthétique du client.",
    ],
    descriptionEn: [
      'High-end villa by the Riviera Golf course, built over two levels with a pool and landscaped garden. The project was co-designed with a local architecture firm.',
      'ATHL handled all the finishing works to a high-end standard, strictly following the client’s design brief.',
    ],
  },
  // ---- Import & logistique ----
  {
    slug: 'entrepot-vridi',
    serviceSlug: 'import-logistique',
    titleFr: 'Entrepôt Vridi',
    titleEn: 'Vridi Warehouse',
    locationFr: 'Zone portuaire, Abidjan',
    locationEn: 'Port area, Abidjan',
    typologyFr: 'Entrepôt logistique',
    typologyEn: 'Logistics warehouse',
    year: '2023',
    images: ['images/import.jpg', 'images/import2.jpg'],
    descriptionFr: [
      "Mise en place d'un entrepôt de stockage de 2 000 m² près du port d'Abidjan, pour centraliser la réception et la redistribution de matériaux importés vers nos chantiers.",
      "L'organisation du site a été pensée pour fluidifier le déchargement des conteneurs et réduire les délais entre arrivée de marchandise et départ vers les chantiers clients.",
    ],
    descriptionEn: [
      'Set-up of a 2,000 m² storage warehouse near the port of Abidjan, to centralize the receiving and redistribution of imported materials to our project sites.',
      'The site layout was designed to speed up container unloading and reduce the time between goods arrival and dispatch to client sites.',
    ],
  },
  {
    slug: 'hub-importation-yopougon',
    serviceSlug: 'import-logistique',
    titleFr: "Hub d'importation Yopougon",
    titleEn: 'Yopougon Import Hub',
    locationFr: 'Yopougon, Abidjan',
    locationEn: 'Yopougon, Abidjan',
    typologyFr: 'Plateforme de stockage',
    typologyEn: 'Storage platform',
    year: '2022',
    images: ['images/import3.jpg', 'images/import.jpg'],
    descriptionFr: [
      "Plateforme de stockage et de distribution de matériaux importés (acier, équipements, finitions) pour approvisionner plusieurs chantiers simultanément dans la zone ouest d'Abidjan.",
      "Un système de suivi des stocks a été mis en place pour donner une visibilité en temps réel sur les volumes disponibles à chaque chef de chantier.",
    ],
    descriptionEn: [
      'Storage and distribution platform for imported materials (steel, equipment, finishings) to supply several sites simultaneously in western Abidjan.',
      'A stock-tracking system was put in place to give each site manager real-time visibility on available volumes.',
    ],
  },
  {
    slug: 'livraison-chantier-chu',
    serviceSlug: 'import-logistique',
    titleFr: 'Approvisionnement chantier CHU',
    titleEn: 'Hospital Site Supply',
    locationFr: 'Treichville, Abidjan',
    locationEn: 'Treichville, Abidjan',
    typologyFr: 'Approvisionnement chantier',
    typologyEn: 'Site supply',
    year: '2024',
    images: ['images/import2.jpg', 'images/import3.jpg'],
    descriptionFr: [
      "Organisation de l'approvisionnement complet en matériaux d'un chantier hospitalier à Treichville, avec des contraintes fortes de délais et de traçabilité.",
      "Chaque livraison a été planifiée pour ne pas perturber l'activité du site, déjà partiellement en service pendant les travaux.",
    ],
    descriptionEn: [
      'Full materials supply organization for a hospital construction site in Treichville, under tight deadline and traceability requirements.',
      'Every delivery was scheduled so as not to disrupt site activity, already partly in service during the works.',
    ],
  },
  // ---- Mobilité, VTC & Livraison ----
  {
    slug: 'flotte-entreprise-partenaire',
    serviceSlug: 'mobilite-vtc-livraison',
    titleFr: 'Flotte dédiée — Partenaire industriel',
    titleEn: 'Dedicated Fleet — Industrial Partner',
    locationFr: 'Abidjan',
    locationEn: 'Abidjan',
    typologyFr: 'Gestion de flotte',
    typologyEn: 'Fleet management',
    year: '2024',
    images: ['images/vtc-mobilite.jpg', 'images/pillar-mobility.jpg'],
    descriptionFr: [
      "Mise à disposition et gestion d'une flotte de véhicules dédiée pour les déplacements quotidiens des équipes d'un partenaire industriel basé à Abidjan.",
      "ATHL assure l'entretien, le suivi kilométrique et le remplacement des véhicules, pour une disponibilité continue sans gestion interne côté client.",
    ],
    descriptionEn: [
      "Provision and management of a dedicated vehicle fleet for the daily travel needs of an industrial partner's teams based in Abidjan.",
      'ATHL handles maintenance, mileage tracking and vehicle replacement, ensuring continuous availability with no internal management needed on the client side.',
    ],
  },
  {
    slug: 'deploiement-vtc-premium',
    serviceSlug: 'mobilite-vtc-livraison',
    titleFr: 'Déploiement VTC Premium',
    titleEn: 'Premium Ride-hailing Rollout',
    locationFr: 'Cocody, Abidjan',
    locationEn: 'Cocody, Abidjan',
    typologyFr: 'Service VTC',
    typologyEn: 'Ride-hailing service',
    year: '2023',
    images: ['images/pillar-mobility.jpg', 'images/vtc-mobilite.jpg'],
    descriptionFr: [
      "Lancement d'un service de VTC premium sur Abidjan, avec chauffeurs professionnels et véhicules haut de gamme, pour une clientèle d'affaires et d'hôtellerie.",
      "Le service a été conçu pour garantir ponctualité et discrétion, avec réservation à l'avance pour les trajets réguliers.",
    ],
    descriptionEn: [
      'Launch of a premium ride-hailing service in Abidjan, with professional drivers and premium vehicles, for a business and hospitality clientele.',
      'The service was designed to guarantee punctuality and discretion, with advance booking available for recurring trips.',
    ],
  },
];

export function getMockProjectServices(lang: Lang): { slug: string; title: string }[] {
  const en = lang === 'en';
  return MOCK_PROJECT_SERVICES.map((s) => ({ slug: s.slug, title: en ? s.titleEn : s.titleFr }));
}

export interface ProjectItemView {
  slug: string;
  serviceSlug: string;
  title: string;
  location: string;
  typology: string;
  year: string;
  images: string[];
  thumbnail: string;
  description: [string, string];
}

function toView(p: ProjectItemMock, lang: Lang): ProjectItemView {
  const en = lang === 'en';
  return {
    slug: p.slug,
    serviceSlug: p.serviceSlug,
    title: en ? p.titleEn : p.titleFr,
    location: en ? p.locationEn : p.locationFr,
    typology: en ? p.typologyEn : p.typologyFr,
    year: p.year,
    images: p.images,
    thumbnail: p.images[0],
    description: en ? p.descriptionEn : p.descriptionFr,
  };
}

export function getMockProjectsByService(serviceSlug: string, lang: Lang): ProjectItemView[] {
  return MOCK_PROJECTS.filter((p) => p.serviceSlug === serviceSlug).map((p) => toView(p, lang));
}

export function getMockProjectBySlug(slug: string, lang: Lang): ProjectItemView | undefined {
  const dto = MOCK_PROJECTS.find((p) => p.slug === slug);
  return dto ? toView(dto, lang) : undefined;
}
