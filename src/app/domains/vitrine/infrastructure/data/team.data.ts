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
      name: dto.name,
      role: (en && dto.roleEn) || dto.roleFr,
      photo: dto.photo,
      bio: (en && dto.bioEn) || dto.bioFr || undefined,
      quote: (en && dto.quoteEn) || dto.quoteFr || undefined,
      initials: dto.initials,
    }));
}

export function getTeamMemberById(id: number, lang: Lang): TeamMember | undefined {
  return getTeamMembers(lang).find((m) => m.id === id);
}
