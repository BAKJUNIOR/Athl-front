// Source de données du domaine "Service", branchée sur l'API Athl_logistics-backend.
// La liste résumée est chargée une fois au démarrage (voir core/initializers) et mise en cache
// ici dans un signal : getServices()/nextService() restent synchrones pour ne pas changer les
// pages qui les consomment déjà (accueil, page Services, recherche). Le détail complet d'un
// service (prestations, étapes, galerie) n'est en revanche pas dans ce résumé : la page
// /services/:slug le récupère à la demande via ServiceApi.getBySlug (voir service-detail.component.ts).
//
// Repli sur contenu figé UNIQUEMENT si l'API est injoignable ou en erreur — jamais si elle
// répond simplement avec une liste vide (état normal : l'admin a pu dépublier tous les services,
// afficher un faux contenu serait trompeur).
import { signal } from '@angular/core';
import { Service } from '../../domain/service.entity';
import { Lang } from '../../../../core/services/language.service';
import { ServiceApi, ServiceDetailApi, ServiceSummaryApi } from '../api/service.api';

const SUMMARIES = signal<ServiceSummaryApi[]>([]);
const SUMMARIES_API_FAILED = signal(false);

// Contenu réel déjà publié en base au moment de l'écriture de ce repli (voir /api/v1/services),
// pour ne jamais afficher une page Services vide si le backend est momentanément indisponible.
const FALLBACK_SERVICES: ServiceDetailApi[] = [
  {
    id: 1,
    slug: 'construction',
    number: '01',
    titleFr: 'Construction & rénovation',
    titleEn: 'Construction & Renovation',
    shortTitleFr: 'Construction',
    shortTitleEn: 'Construction',
    leadFr: "L'expertise qui bâtit, la logistique qui accélère. ATHL vous accompagne de la construction à la livraison de vos matériaux et solutions de transport.",
    leadEn: 'The expertise that builds, the logistics that accelerate. ATHL supports you from construction through to material delivery and transport solutions.',
    image: 'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790324821/services/sjeq7787qhlzefxongfn.jpg',
    heroImage: 'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790324833/services/dlminwwqy6z0xrajyhrc.jpg',
    status: 'published',
    updatedAt: '',
    gallery: [
      'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790324873/services/gallery/ymqw1mwpagfpopffaehl.jpg',
      'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790324883/services/gallery/vzptlp0pvlmpboynmc0w.jpg',
      'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790324893/services/gallery/v2rx5px2w3ah47fx2clg.jpg',
    ],
    prestations: [
      { titleFr: 'Construction', titleEn: 'Construction', descriptionFr: 'Gros œuvre, structure métallique et bâtiment neuf, du terrassement à la livraison.', descriptionEn: 'Structural works, steel-frame builds and new construction, from groundwork to handover.' },
      { titleFr: 'Rénovation & réhabilitation', titleEn: 'Renovation & rehabilitation', descriptionFr: 'Remise à neuf, extension et réhabilitation de bâtiments existants, résidentiels comme commerciaux.', descriptionEn: 'Refurbishment, extensions and rehabilitation of existing buildings, residential and commercial.' },
      { titleFr: 'Approvisionnement en matériaux', titleEn: 'Materials sourcing', descriptionFr: 'Achat, transport et livraison des matériaux de chantier dans les délais prévus.', descriptionEn: 'Sourcing, transport and on-site delivery of construction materials, on schedule.' },
      { titleFr: 'Gestion immobilière', titleEn: 'Property management', descriptionFr: 'Suivi et entretien des biens bâtis pour en préserver la valeur dans la durée.', descriptionEn: 'Follow-up and maintenance of built assets to preserve their value over time.' },
    ],
    process: [
      { number: '01', titleFr: 'Diagnostic & devis', titleEn: 'Assessment & quote', descriptionFr: 'Visite du site, analyse du besoin et proposition chiffrée.', descriptionEn: 'Site visit, needs analysis and priced proposal.' },
      { number: '02', titleFr: 'Planification', titleEn: 'Planning', descriptionFr: 'Choix des équipes, du matériel et calendrier de chantier.', descriptionEn: 'Crew and equipment allocation, project schedule.' },
      { number: '03', titleFr: 'Exécution & suivi', titleEn: 'Execution & monitoring', descriptionFr: 'Travaux encadrés par un chef de chantier, contrôle qualité continu.', descriptionEn: 'Works supervised by a site manager, ongoing quality control.' },
      { number: '04', titleFr: 'Livraison & garantie', titleEn: 'Handover & warranty', descriptionFr: 'Réception du chantier et suivi post-livraison.', descriptionEn: 'Site handover and post-delivery follow-up.' },
    ],
  },
  {
    id: 2,
    slug: 'import-logistique',
    number: '02',
    titleFr: 'Import & logistique',
    titleEn: 'Import & Logistics',
    shortTitleFr: 'Import',
    shortTitleEn: 'Import',
    leadFr: "Un seul partenaire pour approvisionner vos chantiers : importation directe, vente & distribution et livraison, partout en Côte d'Ivoire.",
    leadEn: 'One partner to supply your projects: direct import, sales & distribution and delivery, across Côte d’Ivoire.',
    image: 'https://res.cloudinary.com/olisqkki/image/upload/v1790861031/about-page/nrq7j2ydc0mkqeucyig1.jpg',
    heroImage: 'https://res.cloudinary.com/olisqkki/image/upload/v1790861031/about-page/nrq7j2ydc0mkqeucyig1.jpg',
    status: 'draft',
    updatedAt: '',
    gallery: [],
    prestations: [
      { titleFr: 'Importation directe', titleEn: 'Direct import', descriptionFr: "Achat et importation directe de matériaux et équipements depuis nos zones d'approvisionnement (Europe, Turquie, Maroc, Chine).", descriptionEn: 'Direct purchase and import of materials and equipment from our supply regions (Europe, Turkey, Morocco, China).' },
      { titleFr: 'Vente & distribution', titleEn: 'Sales & distribution', descriptionFr: 'Mise à disposition et distribution des matériaux importés auprès de nos clients professionnels.', descriptionEn: 'Supply and distribution of imported materials to our professional clients.' },
      { titleFr: 'Livraison sur chantier', titleEn: 'Delivery to site', descriptionFr: "Acheminement des marchandises jusqu'au chantier ou au point de livraison convenu, dans les délais.", descriptionEn: 'Delivery of goods to the site or agreed drop-off point, on schedule.' },
      { titleFr: 'Traitement de commandes spéciales', titleEn: 'Special order handling', descriptionFr: 'Prise en charge de commandes spécifiques, hors catalogue standard, sur devis.', descriptionEn: 'Handling of specific, off-catalogue orders, on quote.' },
    ],
    process: [
      { number: '01', titleFr: 'Analyse du besoin', titleEn: 'Needs analysis', descriptionFr: 'Identification des matériaux, volumes et délais nécessaires.', descriptionEn: 'Identifying the materials, volumes and timelines needed.' },
      { number: '02', titleFr: 'Sourcing & commande', titleEn: 'Sourcing & ordering', descriptionFr: 'Sélection des fournisseurs et passation des commandes.', descriptionEn: 'Selecting suppliers and placing orders.' },
      { number: '03', titleFr: 'Transport & suivi', titleEn: 'Transport & tracking', descriptionFr: "Acheminement supervisé, suivi en temps réel de l'expédition.", descriptionEn: 'Supervised transport, real-time shipment tracking.' },
      { number: '04', titleFr: 'Livraison & réception', titleEn: 'Delivery & handover', descriptionFr: 'Livraison sur site et contrôle de conformité à la réception.', descriptionEn: 'On-site delivery and compliance check on receipt.' },
    ],
  },
  {
    id: 3,
    slug: 'mobilite-vtc-livraison',
    number: '03',
    titleFr: 'Mobilité, VTC & Livraison',
    titleEn: 'Mobility, Ride-hailing & Delivery',
    shortTitleFr: 'Mobilité',
    shortTitleEn: 'Mobility',
    leadFr: 'Des solutions de mobilité fiables pour vos équipes et vos clients : location de véhicules, VTC premium et livraison, en courte comme en longue durée.',
    leadEn: 'Reliable mobility solutions for your teams and clients: vehicle rental, premium ride-hailing and delivery, short or long term.',
    image: 'images/vtc-mobilite.jpg',
    heroImage: 'https://res.cloudinary.com/olisqkki/image/upload/v1790860737/about-page/qc14rm06vgwywegjd9fw.jpg',
    status: 'draft',
    updatedAt: '',
    gallery: ['images/vtc-mobilite.jpg', 'images/pillar-mobility.jpg'],
    prestations: [
      { titleFr: 'Location courte et longue durée', titleEn: 'Short and long-term rental', descriptionFr: 'Location de véhicules adaptée à vos besoins ponctuels ou réguliers.', descriptionEn: 'Vehicle rental tailored to your one-off or recurring needs.' },
      { titleFr: 'Transport professionnel', titleEn: 'Professional transport', descriptionFr: "Transport de personnes et de marchandises pour le compte d'entreprises.", descriptionEn: 'Transport of people and goods on behalf of businesses.' },
      { titleFr: 'Service VTC Premium', titleEn: 'Premium ride-hailing service', descriptionFr: 'Chauffeurs professionnels et véhicules haut de gamme, à la demande.', descriptionEn: 'Professional drivers and premium vehicles, on demand.' },
      { titleFr: 'Gestion de flotte pour entreprises', titleEn: 'Fleet management for businesses', descriptionFr: 'Suivi, entretien et mise à disposition d’une flotte dédiée à votre activité.', descriptionEn: 'Tracking, maintenance and provision of a fleet dedicated to your business.' },
    ],
    process: [
      { number: '01', titleFr: 'Prise de contact', titleEn: 'Initial contact', descriptionFr: 'Expression du besoin : type de véhicule, durée, trajet.', descriptionEn: 'Needs expressed: vehicle type, duration, route.' },
      { number: '02', titleFr: 'Réservation', titleEn: 'Booking', descriptionFr: 'Confirmation du véhicule ou du chauffeur disponible.', descriptionEn: 'Confirmation of the available vehicle or driver.' },
      { number: '03', titleFr: 'Prise en charge', titleEn: 'Pickup', descriptionFr: "Véhicule ou chauffeur mis à disposition à l'heure convenue.", descriptionEn: 'Vehicle or driver made available at the agreed time.' },
      { number: '04', titleFr: 'Suivi & facturation', titleEn: 'Tracking & billing', descriptionFr: 'Suivi du trajet et facturation claire en fin de prestation.', descriptionEn: 'Trip tracking and clear billing at the end of service.' },
    ],
  },
];

/** Appelé une seule fois au démarrage de l'app (voir core/initializers/initializers.ts). */
export function loadServices(api: ServiceApi) {
  return api.list();
}

export function setServiceSummaries(list: ServiceSummaryApi[], apiFailed = false): void {
  SUMMARIES.set(list ?? []);
  SUMMARIES_API_FAILED.set(apiFailed);
}

function summaryToService(dto: ServiceSummaryApi, lang: Lang): Service {
  const en = lang === 'en';
  return {
    slug: dto.slug,
    number: dto.number,
    title: (en && dto.titleEn) || dto.titleFr,
    shortTitle: (en && dto.shortTitleEn) || dto.shortTitleFr || dto.titleFr,
    lead: (en && dto.leadEn) || dto.leadFr,
    image: dto.image ?? '',
    heroImage: dto.heroImage ?? dto.image ?? '',
    prestations: (dto.prestations ?? []).map((p) => ({
      title: (en && p.titleEn) || p.titleFr,
      description: (en && p.descriptionEn) || p.descriptionFr,
    })),
    // Non fourni par le résumé — seule la page détail en a réellement besoin (voir plus haut).
    process: [],
    gallery: [],
  };
}

export function mapServiceDetail(dto: ServiceDetailApi, lang: Lang): Service {
  const en = lang === 'en';
  return {
    slug: dto.slug,
    number: dto.number,
    title: (en && dto.titleEn) || dto.titleFr,
    shortTitle: (en && dto.shortTitleEn) || dto.shortTitleFr || dto.titleFr,
    lead: (en && dto.leadEn) || dto.leadFr,
    image: dto.image ?? '',
    heroImage: dto.heroImage ?? dto.image ?? '',
    prestations: dto.prestations.map((p) => ({
      title: (en && p.titleEn) || p.titleFr,
      description: (en && p.descriptionEn) || p.descriptionFr,
    })),
    process: dto.process.map((s) => ({
      number: s.number,
      title: (en && s.titleEn) || s.titleFr,
      description: (en && s.descriptionEn) || s.descriptionFr,
    })),
    gallery: dto.gallery ?? [],
  };
}

export function getServices(lang: Lang): Service[] {
  const source = SUMMARIES_API_FAILED() ? FALLBACK_SERVICES : SUMMARIES();
  return source.map((dto) => summaryToService(dto, lang));
}

export function nextService(slug: string, lang: Lang): Service {
  const services = getServices(lang);
  const index = services.findIndex((service) => service.slug === slug);
  return services[(index + 1) % services.length];
}

/** Repli pour la page détail (/services/:slug) quand l'API est injoignable/en erreur — voir
 *  service-detail.component.ts. Ne couvre que les slugs connus au moment de l'écriture. */
export function getFallbackServiceDetail(slug: string, lang: Lang): Service | undefined {
  const dto = FALLBACK_SERVICES.find((s) => s.slug === slug);
  return dto ? mapServiceDetail(dto, lang) : undefined;
}
