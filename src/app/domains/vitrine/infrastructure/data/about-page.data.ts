// Source de données du contenu de la page /a-propos, branchée sur l'API backend.
// Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un signal.
// Repli sur le texte qui était codé en dur dans about.component.html si la ressource n'est
// pas encore disponible (même filet de sécurité que pour site-contact.data.ts).
import { signal } from '@angular/core';
import { AboutPageApiDto } from '../api/about-page.api';
import { Lang } from '../../../../core/services/language.service';

const ABOUT_PAGE = signal<AboutPageApiDto | null>(null);

export function setAboutPage(dto: AboutPageApiDto | null): void {
  ABOUT_PAGE.set(dto);
}

const FALLBACK: Record<Lang, AboutPageContent> = {
  fr: {
    workforce: {
      eyebrow: 'Bienvenue chez ATHL',
      title: 'Nous assumons chaque projet. Nous livrons des résultats plus solides',
      lead:
        "Africa Talent Habitat & Logistique réunit des professionnels expérimentés, des méthodes éprouvées et une culture de la responsabilité pour livrer des projets qui traversent le temps. De la construction et la rénovation à la mobilité et à l'importation de matériaux, nos équipes travaillent avec clarté, rigueur et savoir-faire.",
    },
    workforceTabs: [
      {
        number: '01',
        title: 'Construction & rénovation',
        image: 'images/team-review.jpg',
        heroImage: 'images/team-lead.png',
        lead: "L'expertise qui bâtit, la logistique qui accélère. ATHL vous accompagne de la construction à la livraison de vos matériaux et solutions de transport.",
        bullets: ['Construction', 'Rénovation & réhabilitation', 'Approvisionnement en matériaux', 'Gestion immobilière'],
        stats: [
          { label: 'Chantiers livrés', value: 0, decimals: 0, suffix: '+' },
          { label: 'Valeur de projets', value: 0, decimals: 2, suffix: ' M€' },
          { label: "Valeur d'actifs", value: 0, decimals: 1, suffix: ' M€' },
        ],
      },
      {
        number: '02',
        title: 'Mobilité, VTC & Livraison',
        image: 'images/pillar-mobility.jpg',
        heroImage: 'images/pillar-mobility.jpg',
        lead: "Construire l'avenir, accompagner le mouvement. Location de véhicules et solutions de mobilité pour particuliers et entreprises.",
        bullets: ['Location courte et longue durée', 'Transport professionnel', 'Service VTC Premium', 'Gestion de flotte pour entreprises'],
        stats: [
          { label: 'Véhicules gérés', value: 0, decimals: 0, suffix: '+' },
          { label: 'Courses réalisées', value: 0, decimals: 0, suffix: '+' },
          { label: 'Chauffeurs actifs', value: 0, decimals: 0, suffix: '+' },
        ],
      },
      {
        number: '03',
        title: 'Import & logistique',
        image: 'images/svc-4.png',
        heroImage: 'images/hero-1.png',
        lead: "Votre partenaire pour bâtir, approvisionner et avancer. Importation directe et distribution de matériaux depuis la Chine, la Turquie, le Maroc et l'Europe.",
        bullets: ['Importation directe', 'Vente & distribution', 'Livraison sur chantier', 'Traitement de commandes spéciales'],
        stats: [
          { label: 'Conteneurs importés', value: 0, decimals: 0, suffix: '+' },
          { label: 'Commandes traitées', value: 0, decimals: 0, suffix: '+' },
          { label: 'Tonnes livrées', value: 0, decimals: 0, suffix: '+' },
        ],
      },
    ],
    hero: {
      eyebrow: 'À propos',
      title: 'Africa Talent Habitat & Logistique',
      lead: "L'expertise qui bâtit, la logistique qui accélère. Un groupe ivoirien qui réunit construction, rénovation, mobilité et importation de matériaux.",
    },
    pillarsSection: {
      eyebrow: 'Ce que nous faisons',
      title: 'Nos 3 métiers',
      lead: "Un seul partenaire pour bâtir, approvisionner et avancer : construction & rénovation, mobilité, VTC & livraison, import & logistique.",
    },
    pillars: [
      {
        title: 'Construction & rénovation',
        image: 'images/chantier2.jpg',
        bullets: ['Construction', 'Rénovation & réhabilitation', 'Approvisionnement en matériaux', 'Gestion immobilière'],
      },
      {
        title: 'Mobilité, VTC & Livraison',
        image: 'images/vtc-mobilite.jpg',
        bullets: ['Location courte et longue durée', 'Transport professionnel', 'Service VTC Premium', 'Gestion de flotte pour entreprises'],
      },
      {
        title: 'Import & logistique',
        image: 'images/import3.jpg',
        bullets: ['Importation directe', 'Vente & distribution', 'Livraison sur chantier', 'Traitement de commandes spéciales'],
      },
    ],
    teamSection: {
      eyebrow: 'Nos équipes',
      title: 'Des visages derrière chaque projet',
      lead: 'Une direction proche du terrain, joignable et engagée sur chacun de nos chantiers comme sur nos opérations logistiques.',
    },
    ground: {
      title: 'Nos équipes terrain',
      lead: "Ouvriers qualifiés, chefs de chantier, chauffeurs et logisticiens : chaque métier est encadré, formé et suivi. C'est cette organisation qui nous permet de tenir les délais sans transiger sur la sécurité.",
      ctaLabel: 'Rejoindre nos équipes',
      images: ['images/chantier3.jpg', 'images/chantier4.jpg', 'images/construction1.jpg'],
      roles: [{ label: 'Ouvriers qualifiés' }, { label: 'Chefs de chantier' }, { label: 'Chauffeurs' }, { label: 'Logisticiens' }],
    },
    commitments: [
      { title: 'Sécurité avant tout', text: 'Équipements de protection et procédures strictes sur chaque chantier.' },
      { title: 'Formation continue', text: 'Chaque métier est formé et suivi tout au long des projets.' },
      { title: 'Encadrement de proximité', text: "Des chefs d'équipe présents sur le terrain, pas seulement sur le papier." },
    ],
    values: {
      title: 'Ce qui nous engage',
      backgroundImage: 'images/construction.jpg',
      items: [
        { label: 'Talent', text: 'Des équipes qualifiées, formées et encadrées — le premier matériau de chaque projet.' },
        { label: 'Habitat', text: 'Construire et rénover des lieux durables, pensés pour ceux qui vont les vivre.' },
        { label: 'Logistique', text: "Maîtriser la chaîne d'approvisionnement et la mobilité pour tenir les délais." },
        { label: 'Sécurité', text: "Aucune livraison n'excuse un risque : la sécurité conditionne chaque décision de chantier." },
      ],
    },
  },
  en: {
    workforce: {
      eyebrow: 'Welcome to ATHL',
      title: 'We own every project. We deliver sturdier results',
      lead:
        'Africa Talent Habitat & Logistics brings together experienced professionals, proven methods and a culture of accountability to deliver projects built to last. From construction and renovation to mobility and the import of materials, our teams work with clarity, rigour and know-how.',
    },
    workforceTabs: [
      {
        number: '01',
        title: 'Construction & renovation',
        image: 'images/team-review.jpg',
        heroImage: 'images/team-lead.png',
        lead: 'The expertise that builds, the logistics that accelerates. ATHL supports you from construction to delivering your materials and transport solutions.',
        bullets: ['Construction', 'Renovation & rehabilitation', 'Material supply', 'Property management'],
        stats: [
          { label: 'Sites delivered', value: 0, decimals: 0, suffix: '+' },
          { label: 'Project value', value: 0, decimals: 2, suffix: ' M€' },
          { label: 'Asset value', value: 0, decimals: 1, suffix: ' M€' },
        ],
      },
      {
        number: '02',
        title: 'Mobility, ride-hailing & delivery',
        image: 'images/pillar-mobility.jpg',
        heroImage: 'images/pillar-mobility.jpg',
        lead: 'Building the future, supporting the movement. Vehicle rental and mobility solutions for individuals and businesses.',
        bullets: ['Short and long-term rental', 'Professional transport', 'Premium ride-hailing service', 'Fleet management for businesses'],
        stats: [
          { label: 'Vehicles managed', value: 0, decimals: 0, suffix: '+' },
          { label: 'Rides completed', value: 0, decimals: 0, suffix: '+' },
          { label: 'Active drivers', value: 0, decimals: 0, suffix: '+' },
        ],
      },
      {
        number: '03',
        title: 'Import & logistics',
        image: 'images/svc-4.png',
        heroImage: 'images/hero-1.png',
        lead: 'Your partner to build, supply and move forward. Direct import and distribution of materials from China, Turkey, Morocco and Europe.',
        bullets: ['Direct import', 'Sales & distribution', 'Delivery to site', 'Special order handling'],
        stats: [
          { label: 'Containers imported', value: 0, decimals: 0, suffix: '+' },
          { label: 'Orders processed', value: 0, decimals: 0, suffix: '+' },
          { label: 'Tonnes delivered', value: 0, decimals: 0, suffix: '+' },
        ],
      },
    ],
    hero: {
      eyebrow: 'About',
      title: 'Africa Talent Habitat & Logistics',
      lead: 'The expertise that builds, the logistics that accelerate. An Ivorian group bringing together construction, renovation, mobility and the import of materials.',
    },
    pillarsSection: {
      eyebrow: 'What we do',
      title: 'Our 3 core businesses',
      lead: 'One partner to build, supply and move forward: construction & renovation, mobility, ride-hailing & delivery, import & logistics.',
    },
    pillars: [
      {
        title: 'Construction & renovation',
        image: 'images/chantier2.jpg',
        bullets: ['Construction', 'Renovation & rehabilitation', 'Material supply', 'Property management'],
      },
      {
        title: 'Mobility, ride-hailing & delivery',
        image: 'images/vtc-mobilite.jpg',
        bullets: ['Short and long-term rental', 'Professional transport', 'Premium ride-hailing service', 'Fleet management for businesses'],
      },
      {
        title: 'Import & logistics',
        image: 'images/import3.jpg',
        bullets: ['Direct import', 'Sales & distribution', 'Delivery to site', 'Special order handling'],
      },
    ],
    teamSection: {
      eyebrow: 'Our teams',
      title: 'The faces behind every project',
      lead: 'A leadership close to the field, reachable and involved on every one of our sites and logistics operations.',
    },
    ground: {
      title: 'Our field teams',
      lead: 'Skilled workers, site managers, drivers and logistics staff: every trade is supervised, trained and monitored. This organisation is what lets us meet deadlines without compromising on safety.',
      ctaLabel: 'Join our teams',
      images: ['images/chantier3.jpg', 'images/chantier4.jpg', 'images/construction1.jpg'],
      roles: [{ label: 'Skilled workers' }, { label: 'Site managers' }, { label: 'Drivers' }, { label: 'Logistics staff' }],
    },
    commitments: [
      { title: 'Safety first', text: 'Protective equipment and strict procedures on every site.' },
      { title: 'Continuous training', text: 'Every trade is trained and monitored throughout each project.' },
      { title: 'Close supervision', text: 'Team leaders present on the ground, not just on paper.' },
    ],
    values: {
      title: 'What drives us',
      backgroundImage: 'images/construction.jpg',
      items: [
        { label: 'Talent', text: 'Skilled, trained and supervised teams — the first material of every project.' },
        { label: 'Habitat', text: 'Building and renovating lasting places, designed for the people who will live in them.' },
        { label: 'Logistics', text: 'Mastering the supply chain and mobility to keep to deadlines.' },
        { label: 'Safety', text: 'No delivery excuses a risk: safety drives every decision on site.' },
      ],
    },
  },
};

export interface AboutWorkforceStat {
  label: string;
  value: number;
  decimals: number;
  suffix: string;
}

export interface AboutWorkforceTab {
  number: string;
  title: string;
  image: string;
  heroImage: string;
  /** Lien saisi dans le BO (YouTube, Vimeo ou .mp4) ; absent = pas de vidéo sur cet onglet. */
  videoUrl?: string | null;
  lead: string;
  bullets: string[];
  stats: AboutWorkforceStat[];
}

export interface AboutPillar {
  title: string;
  image: string;
  bullets: string[];
}

export interface AboutGroundRole {
  label: string;
}

export interface AboutCommitment {
  title: string;
  text: string;
}

export interface AboutValue {
  label: string;
  text: string;
}

export interface AboutPageContent {
  workforce: { eyebrow: string; title: string; lead: string };
  workforceTabs: AboutWorkforceTab[];
  hero: { eyebrow: string; title: string; lead: string };
  pillarsSection: { eyebrow: string; title: string; lead: string };
  pillars: AboutPillar[];
  teamSection: { eyebrow: string; title: string; lead: string };
  ground: { title: string; lead: string; ctaLabel: string; images: string[]; roles: AboutGroundRole[] };
  commitments: AboutCommitment[];
  values: { title: string; backgroundImage: string; items: AboutValue[] };
}

export function getAboutPage(lang: Lang): AboutPageContent {
  const dto = ABOUT_PAGE();
  const fb = FALLBACK[lang];
  if (!dto) return fb;

  const en = lang === 'en';
  return {
    workforce: {
      eyebrow: (en ? dto.workforceEyebrowEn : dto.workforceEyebrowFr) || fb.workforce.eyebrow,
      title: (en ? dto.workforceTitleEn : dto.workforceTitleFr) || fb.workforce.title,
      lead: (en ? dto.workforceLeadEn : dto.workforceLeadFr) || fb.workforce.lead,
    },
    workforceTabs: dto.workforceTabs.length
      ? dto.workforceTabs.map((t) => ({
          number: t.number || '',
          title: (en ? t.titleEn : t.titleFr) || '',
          image: t.image || '',
          heroImage: t.heroImage || t.image || '',
          videoUrl: t.videoUrl || null,
          lead: (en ? t.leadEn : t.leadFr) || '',
          bullets: [t.bullet1Fr && (en ? t.bullet1En : t.bullet1Fr), t.bullet2Fr && (en ? t.bullet2En : t.bullet2Fr), t.bullet3Fr && (en ? t.bullet3En : t.bullet3Fr), t.bullet4Fr && (en ? t.bullet4En : t.bullet4Fr)].filter((b): b is string => !!b),
          stats: (t.stats ?? []).map((s) => ({
            label: (en ? s.labelEn : s.labelFr) || '',
            value: s.value,
            decimals: s.decimals,
            suffix: s.suffix ?? '',
          })),
        }))
      : fb.workforceTabs,
    hero: {
      eyebrow: (en ? dto.heroEyebrowEn : dto.heroEyebrowFr) || fb.hero.eyebrow,
      title: (en ? dto.heroTitleEn : dto.heroTitleFr) || fb.hero.title,
      lead: (en ? dto.heroLeadEn : dto.heroLeadFr) || fb.hero.lead,
    },
    pillarsSection: {
      eyebrow: (en ? dto.pillarsEyebrowEn : dto.pillarsEyebrowFr) || fb.pillarsSection.eyebrow,
      title: (en ? dto.pillarsTitleEn : dto.pillarsTitleFr) || fb.pillarsSection.title,
      lead: (en ? dto.pillarsLeadEn : dto.pillarsLeadFr) || fb.pillarsSection.lead,
    },
    pillars: dto.pillars.length
      ? dto.pillars.map((p) => ({
          title: (en ? p.titleEn : p.titleFr) || '',
          image: p.image || '',
          bullets: [p.bullet1Fr && (en ? p.bullet1En : p.bullet1Fr), p.bullet2Fr && (en ? p.bullet2En : p.bullet2Fr), p.bullet3Fr && (en ? p.bullet3En : p.bullet3Fr), p.bullet4Fr && (en ? p.bullet4En : p.bullet4Fr)].filter((b): b is string => !!b),
        }))
      : fb.pillars,
    teamSection: {
      eyebrow: (en ? dto.teamEyebrowEn : dto.teamEyebrowFr) || fb.teamSection.eyebrow,
      title: (en ? dto.teamTitleEn : dto.teamTitleFr) || fb.teamSection.title,
      lead: (en ? dto.teamLeadEn : dto.teamLeadFr) || fb.teamSection.lead,
    },
    ground: {
      title: (en ? dto.groundTitleEn : dto.groundTitleFr) || fb.ground.title,
      lead: (en ? dto.groundLeadEn : dto.groundLeadFr) || fb.ground.lead,
      ctaLabel: (en ? dto.groundCtaLabelEn : dto.groundCtaLabelFr) || fb.ground.ctaLabel,
      images: dto.groundImages.length ? dto.groundImages : fb.ground.images,
      roles: dto.groundRoles.length ? dto.groundRoles.map((r) => ({ label: (en ? r.labelEn : r.labelFr) || '' })) : fb.ground.roles,
    },
    commitments: dto.commitments.length
      ? dto.commitments.map((c) => ({ title: (en ? c.titleEn : c.titleFr) || '', text: (en ? c.textEn : c.textFr) || '' }))
      : fb.commitments,
    values: {
      title: (en ? dto.valuesTitleEn : dto.valuesTitleFr) || fb.values.title,
      backgroundImage: dto.valuesBackgroundImage || fb.values.backgroundImage,
      items: dto.values.length
        ? dto.values.map((v) => ({ label: (en ? v.labelEn : v.labelFr) || '', text: (en ? v.textEn : v.textFr) || '' }))
        : fb.values.items,
    },
  };
}
