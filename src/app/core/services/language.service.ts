// Gère la langue active du site (FR/EN) : préférence mémorisée (localStorage), français par défaut.
import { Injectable, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type Lang = 'fr' | 'en';

const STORAGE_KEY = 'athl-lang';

export function resolveInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    // stockage indisponible : on retombe sur le français par défaut.
  }
  return 'fr';
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);

  readonly lang = signal<Lang>(resolveInitialLang());

  toggle(): void {
    this.setLang(this.lang() === 'fr' ? 'en' : 'fr');
  }

  setLang(lang: Lang): void {
    this.transloco.setActiveLang(lang);
    this.lang.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // stockage indisponible : la préférence ne sera pas mémorisée.
    }
  }
}
