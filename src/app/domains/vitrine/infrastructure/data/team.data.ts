// Source de données du domaine "TeamMember", branchée sur l'API Athl_logistics-backend.
// Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un signal :
// getTeamMembers() reste synchrone pour ne pas changer la page Équipe qui le consomme déjà.
import { signal } from '@angular/core';
import { TeamMember } from '../../domain/team-member.entity';
import { Lang } from '../../../../core/services/language.service';
import { TeamMemberApi } from '../api/team.api';

const TEAM = signal<TeamMemberApi[]>([]);

export function setTeamMembers(list: TeamMemberApi[]): void {
  TEAM.set(list ?? []);
}

export function getTeamMembers(lang: Lang): TeamMember[] {
  const en = lang === 'en';
  return [...TEAM()]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((dto) => ({
      name: dto.name,
      role: (en && dto.roleEn) || dto.roleFr,
      photo: dto.photo,
    }));
}
