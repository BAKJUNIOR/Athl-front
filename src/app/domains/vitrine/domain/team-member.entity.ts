// Entité métier "TeamMember" : un membre de l'équipe ATHL affiché sur les pages Équipe / Témoignages.

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  // La fiche détail d'un membre l'affiche seulement quand elle est renseignée.
  bio?: string;
  // Si renseignée, ce membre apparaît aussi dans le carrousel de témoignages de l'accueil
  // (voir testimonials.data.ts, qui filtre getTeamMembers() sur ce champ).
  quote?: string;
  initials?: string;
}
