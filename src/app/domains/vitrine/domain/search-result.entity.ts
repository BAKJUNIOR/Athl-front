// Entité métier "SearchResult" : une entrée indexée pour la recherche interne du site.

// Libellé de catégorie déjà traduit dans la langue active (voir getSearchIndex).
export type SearchCategory = string;

export interface SearchResult {
  title: string;
  excerpt: string;
  url: string;
  fragment?: string;
  category: SearchCategory;
}
