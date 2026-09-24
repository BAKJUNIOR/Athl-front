// Source de données du domaine "Popup", branchée sur l'API backend. Chargée une fois au
// démarrage (voir core/initializers) et mise en cache dans un signal : getPopupForPage()
// reste synchrone pour ne pas changer les composants qui le consomment déjà.
import { signal } from '@angular/core';
import { Popup } from '../../domain/popup.entity';
import { PopupApiDto } from '../api/popup.api';

const POPUPS = signal<Popup[]>([]);

function toPopup(dto: PopupApiDto): Popup {
  return {
    id: String(dto.id),
    page: dto.page,
    active: dto.active,
    type: dto.type,
    layout: dto.layout,
    frequency: dto.frequency,
    delayMs: dto.delayMs,
    eyebrow: dto.eyebrow,
    title: dto.title,
    text: dto.text,
    image: dto.image,
    video: dto.video,
    collectEmail: dto.collectEmail,
    ctaLabel: dto.ctaLabel,
    ctaUrl: dto.ctaUrl,
    updatedAt: dto.updatedAt,
  };
}

export function setPopups(list: PopupApiDto[]): void {
  POPUPS.set((list ?? []).map(toPopup));
}

export function getPopupForPage(page: string): Popup | undefined {
  return POPUPS()
    .filter((p) => p.page === page && p.active)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
}
