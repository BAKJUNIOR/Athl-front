// Index de recherche statique : agrège le contenu existant (pages, services, équipe, offres d'emploi)
// pour la recherche interne du site. À terme, pourra être remplacé par un vrai back-office indexé.
import { SearchResult } from '../../domain/search-result.entity';
import { getServices } from './services.data';
import { getTeamMembers } from './team.data';
import { getJobOffers } from './jobs.data';
import { Lang } from '../../../../core/services/language.service';

const STATIC_PAGES: Record<Lang, SearchResult[]> = {
  fr: [
    { title: 'Accueil', excerpt: "L'expertise qui bâtit, la logistique qui accélère.", url: '/', category: 'Page' },
    { title: 'À propos', excerpt: 'Africa Talent Habitat & Logistique : qui nous sommes, nos valeurs, nos équipes.', url: '/a-propos', category: 'Page' },
    { title: 'Actualités', excerpt: 'Chantiers livrés, partenariats et recrutements ATHL.', url: '/actualites', category: 'Page' },
    { title: 'Projets', excerpt: 'Nos chantiers et réalisations à Abidjan et en Côte d’Ivoire.', url: '/projets', category: 'Page' },
    { title: 'Services', excerpt: 'Construction, rénovation, mobilité et importation de matériaux.', url: '/services', category: 'Page' },
    { title: 'Carrières', excerpt: 'Rejoindre les équipes ATHL : offres et candidature spontanée.', url: '/carrieres', category: 'Page' },
    { title: 'Demander un devis', excerpt: 'Quatre champs suffisent, réponse sous 48 h ouvrées.', url: '/devis', category: 'Page' },
    { title: 'Contact', excerpt: 'Téléphone, adresse et réseaux sociaux ATHL.', url: '/contact', category: 'Page' },
  ],
  en: [
    { title: 'Home', excerpt: 'The expertise that builds, the logistics that accelerate.', url: '/', category: 'Page' },
    { title: 'About', excerpt: 'Africa Talent Habitat & Logistics: who we are, our values, our teams.', url: '/a-propos', category: 'Page' },
    { title: 'News', excerpt: 'Completed sites, partnerships and hiring campaigns at ATHL.', url: '/actualites', category: 'Page' },
    { title: 'Projects', excerpt: 'Our sites and completed projects in Abidjan and Côte d’Ivoire.', url: '/projets', category: 'Page' },
    { title: 'Services', excerpt: 'Construction, renovation, mobility and import of materials.', url: '/services', category: 'Page' },
    { title: 'Careers', excerpt: 'Join the ATHL teams: openings and spontaneous applications.', url: '/carrieres', category: 'Page' },
    { title: 'Request a quote', excerpt: 'Four fields are enough, we reply within 48 business hours.', url: '/devis', category: 'Page' },
    { title: 'Contact', excerpt: 'Phone, address and ATHL social media.', url: '/contact', category: 'Page' },
  ],
};

const CATEGORY_LABEL: Record<Lang, { service: SearchResult['category']; team: SearchResult['category']; job: SearchResult['category'] }> = {
  fr: { service: 'Service', team: 'Équipe', job: 'Emploi' },
  en: { service: 'Service', team: 'Team', job: 'Job' },
};

export function getSearchIndex(lang: Lang): SearchResult[] {
  const labels = CATEGORY_LABEL[lang];

  const serviceResults: SearchResult[] = getServices(lang).map((service) => ({
    title: service.title,
    excerpt: service.lead,
    url: `/services/${service.slug}`,
    category: labels.service,
  }));

  const teamResults: SearchResult[] = getTeamMembers(lang).map((member) => ({
    title: member.name,
    excerpt: member.role,
    url: '/a-propos',
    category: labels.team,
  }));

  const jobResults: SearchResult[] = getJobOffers(lang).map((job) => ({
    title: job.title,
    excerpt: job.description,
    url: '/carrieres',
    fragment: job.id,
    category: labels.job,
  }));

  return [...STATIC_PAGES[lang], ...serviceResults, ...teamResults, ...jobResults];
}
