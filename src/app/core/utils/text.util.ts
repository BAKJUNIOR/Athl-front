// Normalise un texte pour une comparaison insensible à la casse et aux accents (recherche, filtres).
export function normalizeText(text: string): string {
  return (text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Nettoie un libellé court saisi dans le BO (nom, poste) : espaces multiples ou en bord,
// espaces collés aux parenthèses, ponctuation traînante — ex. "Cédric," -> "Cédric",
// "( ATHL)" -> "(ATHL)".
export function cleanLabel(text: string | null | undefined): string {
  return (text ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim()
    .replace(/[\s,;:]+$/, '');
}
