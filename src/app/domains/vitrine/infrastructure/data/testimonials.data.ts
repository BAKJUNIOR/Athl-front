// Source de données du domaine "Testimonial" : dérivée de l'équipe (voir team.data.ts), pas
// d'une ressource séparée — un membre avec une citation renseignée apparaît ici. Repli déjà géré
// par getTeamMembers() (contenu figé si l'API équipe est injoignable/en erreur).
import { Testimonial } from '../../domain/testimonial.entity';
import { Lang } from '../../../../core/services/language.service';
import { getTeamMembers } from './team.data';

export function getTestimonials(lang: Lang): Testimonial[] {
  return getTeamMembers(lang)
    .filter((m) => m.quote)
    .map((m) => ({
      photo: m.photo,
      initials: m.initials ?? '',
      text: m.quote!,
      name: m.name,
      role: m.role,
    }));
}
