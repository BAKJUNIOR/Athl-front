// Normalise un texte pour une comparaison insensible à la casse et aux accents (recherche, filtres).
export function normalizeText(text: string): string {
  return (text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
