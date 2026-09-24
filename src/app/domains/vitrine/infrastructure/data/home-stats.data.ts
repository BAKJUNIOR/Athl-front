// Source de données des 3 compteurs animés (accueil, À propos), branchée sur l'API
// backend. Chargée une fois au démarrage (voir core/initializers) et mise en cache dans un
// signal : getHomeStat() reste synchrone pour ne pas changer les pages qui le consomment déjà.
import { signal } from '@angular/core';
import { HomeStatApiDto } from '../api/home-stats.api';

const HOME_STATS = signal<HomeStatApiDto[]>([]);

// Valeurs de secours si l'API n'a pas encore répondu (évite un "0" le temps du premier chargement).
const FALLBACK: Record<HomeStatApiDto['key'], HomeStatApiDto> = {
  sites_delivered: { key: 'sites_delivered', label: '', value: 2193, decimals: 0, suffix: '+' },
  project_value: { key: 'project_value', label: '', value: 3.16, decimals: 2, suffix: ' M€' },
  asset_value: { key: 'asset_value', label: '', value: 121.2, decimals: 1, suffix: ' M€' },
};

export function setHomeStats(list: HomeStatApiDto[]): void {
  HOME_STATS.set(list ?? []);
}

export function getHomeStat(key: HomeStatApiDto['key']): HomeStatApiDto {
  return HOME_STATS().find((s) => s.key === key) ?? FALLBACK[key];
}
