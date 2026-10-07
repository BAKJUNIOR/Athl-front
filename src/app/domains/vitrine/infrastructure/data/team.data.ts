// Source de données du domaine "TeamMember", branchée sur l'API Athl_logistics-backend.
// Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un signal :
// getTeamMembers() reste synchrone pour ne pas changer la page Équipe qui le consomme déjà.
//
// Repli sur contenu figé UNIQUEMENT si l'API est injoignable ou en erreur (apiFailed=true) —
// jamais si elle répond simplement avec une liste vide (ça, c'est un état normal : l'admin a pu
// retirer tout le monde depuis le BO, et afficher un faux contenu serait trompeur).
import { signal } from '@angular/core';
import { TeamMember } from '../../domain/team-member.entity';
import { Lang } from '../../../../core/services/language.service';
import { TeamMemberApi } from '../api/team.api';
import { cleanLabel } from '../../../../core/utils/text.util';

const TEAM = signal<TeamMemberApi[]>([]);
const TEAM_API_FAILED = signal(false);

// Contenu réel déjà présent en production au moment de l'écriture de ce repli (voir /api/v1/team),
// pour ne jamais afficher une page Équipe vide si le backend est momentanément indisponible.
const FALLBACK_TEAM: TeamMemberApi[] = [
  {
    id: 1,
    name: 'Emmanuel N’GUESSAN',
    roleFr: 'Directeur Général Group',
    roleEn: 'Group Chief Executive Officer',
    photo: 'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790269226/team/xpvczo5f2xpzd5mlwoiw.jpg',
    sortOrder: 1,
    updatedAt: '',
    quoteFr: '« De la première visite à la livraison, tout était documenté et dans le budget. Les équipes ont traité le chantier comme le leur. »',
    quoteEn: '“From the first visit to handover, everything was documented and on budget. The teams treated the site as if it were their own.”',
    initials: 'EN',
    bioFr: 'Emmanuel est le Directeur Général du Groupe ATHL. Il pilote la stratégie globale de l’entreprise et veille à la cohérence des activités de construction, de logistique et d’importation de matériaux portées par les équipes.\n\nSous sa direction, ATHL s’est développé en gardant la même exigence sur chaque chantier : respect des délais, maîtrise du budget et accompagnement des clients du premier contact jusqu’à la livraison.',
    bioEn: 'Emmanuel is the Group Chief Executive Officer of ATHL. He drives the company’s overall strategy and ensures consistency across its construction, logistics and materials import activities.\n\nUnder his leadership, ATHL has grown while keeping the same rigor on every project: respecting deadlines, managing budgets carefully, and supporting clients from first contact through to handover.',
  },
  {
    id: 2,
    name: 'Gnohéré Johannel Rosalyn Elisée',
    roleFr: 'Gérant / Managing Director (ATHL)',
    roleEn: 'Gérant / Managing Director (ATHL)',
    photo: 'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790335382/team/vtntccaxbjx190li4nhx.jpg',
    sortOrder: 2,
    updatedAt: '',
    quoteFr: '« ATHL, c’est une équipe qui tient parole : chaque chantier est mené avec la même exigence, du premier brief à la remise des clés. »',
    quoteEn: '“ATHL is a team that keeps its word: every project is run with the same rigor, from the first brief to the final handover.”',
    initials: 'GE',
    bioFr: 'Gnohéré est Gérant d’ATHL, en charge de la gestion opérationnelle quotidienne de l’entreprise. Il coordonne les équipes sur le terrain pour garantir que chaque projet avance dans les règles de l’art et dans le respect des engagements pris auprès des clients.\n\nIl est particulièrement attaché à la qualité d’exécution et à la sécurité sur les chantiers, deux piliers qui guident l’ensemble des interventions d’ATHL.',
    bioEn: 'Gnohéré is the Managing Director of ATHL, responsible for the company’s day-to-day operations. He coordinates teams on the ground to ensure every project moves forward to a high standard and in line with commitments made to clients.\n\nHe places particular emphasis on execution quality and site safety, two pillars that guide all of ATHL’s work.',
  },
  {
    id: 3,
    name: 'Elisabeth TUO',
    roleFr: 'Responsable administrative et Comptable',
    roleEn: 'Responsable administrative et Comptable',
    photo: 'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790336694/team/il2u1lciymlojelb7rya.jpg',
    sortOrder: 3,
    updatedAt: '',
    quoteFr: '« ATHL a mené une rénovation complexe avec professionnalisme et précision. Leur souci du détail et leur culture sécurité font vraiment la différence. »',
    quoteEn: '“ATHL carried out a complex renovation with professionalism and precision. Their attention to detail and safety culture really make the difference.”',
    initials: 'ET',
    bioFr: 'Elisabeth est Responsable Administrative et Comptable chez ATHL. Elle supervise la gestion financière et administrative de l’entreprise, garantissant la rigueur nécessaire au bon fonctionnement de chaque projet.\n\nSon attention au détail et sa rigueur contribuent directement à la fiabilité d’ATHL vis-à-vis de ses clients et de ses partenaires.',
    bioEn: 'Elisabeth is the Administration and Accounting Manager at ATHL. She oversees the company’s financial and administrative management, ensuring the rigor needed for every project to run smoothly.\n\nHer attention to detail and thoroughness directly contribute to ATHL’s reliability with clients and partners alike.',
  },
  {
    id: 4,
    name: 'Beugré Alain Cédric',
    roleFr: 'Responsable Communication Group',
    roleEn: 'Responsable Communication Group',
    photo: 'https://res.cloudinary.com/drfq0bt4z/image/upload/v1790336776/team/wctpegvhyfxgrx2ctkix.jpg',
    sortOrder: 4,
    updatedAt: '',
    quoteFr: '« L’équipe a dépassé nos attentes à chaque étape. Communication claire, planning respecté, et un bâtiment dont nos équipes sont fières. »',
    quoteEn: '“The team exceeded our expectations at every stage. Clear communication, the schedule was met, and a building our teams are proud of.”',
    initials: 'BC',
    bioFr: 'Alain Cédric est Responsable Communication du Groupe ATHL. Il porte la voix de l’entreprise, valorise le travail des équipes et veille à ce que chaque projet mené par ATHL soit visible et bien compris par ses clients et partenaires.\n\nIl travaille en lien étroit avec l’ensemble des équipes pour partager les réalisations d’ATHL et renforcer la relation de confiance avec ses clients.',
    bioEn: 'Alain Cédric is the Group Communications Manager at ATHL. He carries the company’s voice, highlights the team’s work, and ensures that every project ATHL delivers is clearly communicated to clients and partners.\n\nHe works closely with all teams to share ATHL’s achievements and strengthen trust with its clients.',
  },
];

export function setTeamMembers(list: TeamMemberApi[], apiFailed = false): void {
  TEAM.set(list ?? []);
  TEAM_API_FAILED.set(apiFailed);
}

export function getTeamMembers(lang: Lang): TeamMember[] {
  const en = lang === 'en';
  const source = TEAM_API_FAILED() ? FALLBACK_TEAM : TEAM();
  return [...source]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((dto) => ({
      id: dto.id,
      name: cleanLabel(dto.name),
      role: cleanLabel((en && dto.roleEn) || dto.roleFr),
      photo: dto.photo,
      bio: (en && dto.bioEn) || dto.bioFr || undefined,
      quote: (en && dto.quoteEn) || dto.quoteFr || undefined,
      initials: dto.initials,
    }));
}

export function getTeamMemberById(id: number, lang: Lang): TeamMember | undefined {
  return getTeamMembers(lang).find((m) => m.id === id);
}
