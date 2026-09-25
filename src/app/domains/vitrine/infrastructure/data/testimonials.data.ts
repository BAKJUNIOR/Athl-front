// Source de données statique pour le domaine "Testimonial". Les noms ne sont pas traduits ; texte et fonction le sont.
import { Testimonial } from '../../domain/testimonial.entity';
import { Lang } from '../../../../core/services/language.service';

const TESTIMONIALS_FR: Testimonial[] = [
  {
    photo: 'images/team-dg.jpg',
    initials: 'EN',
    text: '« De la première visite à la livraison, tout était documenté et dans le budget. Les équipes ont traité le chantier comme le leur. »',
    name: 'Emmanuel N’GUESSAN,',
    role: 'Directeur Général Group',
  },
  {
    photo: 'images/team-comm.jpg',
    initials: 'BC',
    text: '« L’équipe a dépassé nos attentes à chaque étape. Communication claire, planning respecté, et un bâtiment dont nos équipes sont fières. »',
    name: 'Beugré Alain Cédric,',
    role: 'Responsable Communication Group',
  },
  {
    photo: 'images/team-admin.jpg',
    initials: 'ET',
    text: '« ATHL a mené une rénovation complexe avec professionnalisme et précision. Leur souci du détail et leur culture sécurité font vraiment la différence. »',
    name: 'Elisabeth TUO,',
    role: 'Responsable Administrative et Comptable Group',
  },
  {
    photo: 'images/team_geran.jpeg',
    initials: 'GE',
    text: '« ATHL, c’est une équipe qui tient parole : chaque chantier est mené avec la même exigence, du premier brief à la remise des clés. »',
    name: 'Gnohéré Johannel Rosalyn Elisée,',
    role: 'Gérant / Managing Director',
  },
];

const TESTIMONIALS_EN: Testimonial[] = [
  {
    photo: 'images/team-dg.jpg',
    initials: 'EN',
    text: '“From the first visit to handover, everything was documented and on budget. The teams treated the site as if it were their own.”',
    name: 'Emmanuel N’GUESSAN,',
    role: 'Group Chief Executive Officer',
  },
  {
    photo: 'images/team-comm.jpg',
    initials: 'BC',
    text: '“The team exceeded our expectations at every stage. Clear communication, the schedule was met, and a building our teams are proud of.”',
    name: 'Beugré Alain Cédric,',
    role: 'Group Communications Manager',
  },
  {
    photo: 'images/team-admin.jpg',
    initials: 'ET',
    text: '“ATHL carried out a complex renovation with professionalism and precision. Their attention to detail and safety culture really make the difference.”',
    name: 'Elisabeth TUO,',
    role: 'Group Administration & Accounting Manager',
  },
  {
    photo: 'images/team_geran.jpeg',
    initials: 'GE',
    text: '“ATHL is a team that keeps its word: every project is run with the same rigor, from the first brief to the final handover.”',
    name: 'Gnohéré Johannel Rosalyn Elisée,',
    role: 'Managing Director',
  },
];

const TESTIMONIALS_BY_LANG: Record<Lang, Testimonial[]> = { fr: TESTIMONIALS_FR, en: TESTIMONIALS_EN };

export function getTestimonials(lang: Lang): Testimonial[] {
  return TESTIMONIALS_BY_LANG[lang];
}
