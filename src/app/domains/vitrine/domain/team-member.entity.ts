// Entité métier "TeamMember" : un membre de l'équipe ATHL affiché sur les pages Équipe / Témoignages.

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  // Optionnelle : le backend ne l'envoie pas encore aujourd'hui (pas de champ bio côté BO).
  // La fiche détail d'un membre l'affiche seulement quand elle est renseignée.
  bio?: string;
}
