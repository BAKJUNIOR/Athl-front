// Ordre d'affichage des 3 métiers partout sur le site : Construction, VTC & Livraison, Import & logistique.
// Reconnu d'après le nom (ou le slug) saisi dans le BO, pour ne pas dépendre de l'ordre renvoyé par
// l'API ni des numéros ; un libellé non reconnu passe après les 3 métiers.
import { normalizeText } from '../../../../core/utils/text.util';

const ORDER: RegExp[] = [
  /construct|renov|batiment|building/,
  /vtc|mobil|livraison|ride|delivery|transport/,
  /import|logisti|fret|freight/,
];

export function businessLineRank(...labels: (string | null | undefined)[]): number {
  const text = normalizeText(labels.filter(Boolean).join(' '));
  const index = ORDER.findIndex((pattern) => pattern.test(text));
  return index === -1 ? ORDER.length : index;
}

/** Copie triée dans l'ordre des métiers ; à rang égal, l'ordre d'origine est conservé. */
export function sortByBusinessLine<T>(items: readonly T[], labels: (item: T) => (string | null | undefined)[]): T[] {
  return [...items].sort((a, b) => businessLineRank(...labels(a)) - businessLineRank(...labels(b)));
}
