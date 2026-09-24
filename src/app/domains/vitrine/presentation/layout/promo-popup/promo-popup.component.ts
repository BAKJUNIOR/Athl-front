// Popup marketing pilotée par page — montée une seule fois dans le layout du site.
// Elle ne propose AUCUN choix au visiteur : à chaque navigation, on regarde s'il existe une popup active
// pour la page courante (getPopupForPage) et, si oui, on l'affiche telle qu'elle a été configurée
// (type, disposition, contenu, fréquence). Le jour où le BO existera, seule la source de données change
// (infrastructure/api/popup.api.ts à la place du mock) — ce composant restera identique.
import { Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuoteModalService } from '../../services/quote-modal.service';
import { getPopupForPage } from '../../../infrastructure/data/popups.data';

const SEEN_PREFIX = 'athl_popup_seen_';

@Component({
  selector: 'app-promo-popup',
  template: `
    @if (popup(); as p) {
      <div class="modal promo-popup" [class.promo-popup--split]="p.layout === 'image_left'" [class.promo-popup--video]="p.type === 'video'" [class.is-open]="isOpen()" [hidden]="!isOpen()">
        <div class="modal__backdrop" (click)="close()"></div>
        <div class="modal__card promo-popup__card" role="dialog" aria-modal="true" aria-labelledby="promo-title">
          <button class="modal__close" type="button" aria-label="Fermer" (click)="close()">&#215;</button>

          @if (p.type === 'image') {
            <div class="promo-popup__media promo-popup__media--full">
              <img [src]="p.image" [alt]="p.title" />
            </div>
            @if (p.title || p.ctaLabel) {
              <div class="promo-popup__body promo-popup__body--overlay">
                @if (p.title) { <h2 id="promo-title">{{ p.title }}</h2> }
                @if (p.ctaLabel) {
                  <div class="promo-popup__actions">
                    <button class="btn btn--light" type="button" (click)="onCta(p)">{{ p.ctaLabel }}</button>
                  </div>
                }
              </div>
            }
          }

          @if (p.type === 'image_text') {
            @if (p.image) {
              <div class="promo-popup__media">
                <img [src]="p.image" [alt]="p.title" />
              </div>
            }
            <div class="promo-popup__body">
              @if (p.eyebrow) { <div class="modal__eyebrow">{{ p.eyebrow }}</div> }
              <h2 id="promo-title">{{ p.title }}</h2>
              @if (p.text) { <p>{{ p.text }}</p> }

              @if (p.collectEmail) {
                @if (!subscribed()) {
                  <form class="promo-popup__form" (submit)="subscribe($event)">
                    <div class="field field--full">
                      <label for="promo-email">Adresse e-mail <span class="req">*</span></label>
                      <input id="promo-email" name="email" type="email" required placeholder="vous@exemple.com" />
                    </div>
                    <div class="promo-popup__actions">
                      <button class="btn btn--light" type="submit">{{ p.ctaLabel || "S'inscrire" }}</button>
                      <button class="btn btn--ghost" type="button" (click)="close()">Plus tard</button>
                    </div>
                  </form>
                } @else {
                  <p class="promo-popup__success">Merci, votre inscription est enregistrée !</p>
                }
              } @else if (p.ctaLabel) {
                <div class="promo-popup__actions">
                  <button class="btn btn--light" type="button" (click)="onCta(p)">{{ p.ctaLabel }}</button>
                  <button class="btn btn--ghost" type="button" (click)="close()">Non merci</button>
                </div>
              }
            </div>
          }

          @if (p.type === 'video') {
            <div class="promo-popup__media promo-popup__media--video">
              @if (playing() && p.video) {
                <video [src]="p.video" controls autoplay playsinline></video>
              } @else {
                <button class="promo-popup__video-trigger" type="button" aria-label="Lire la vidéo" (click)="playVideo()">
                  <img [src]="p.image" [alt]="p.title" />
                  <span class="promo-popup__play" aria-hidden="true">&#9658;</span>
                </button>
              }
            </div>
            <div class="promo-popup__body">
              @if (p.eyebrow) { <div class="modal__eyebrow">{{ p.eyebrow }}</div> }
              <h2 id="promo-title">{{ p.title }}</h2>
              @if (p.text) { <p>{{ p.text }}</p> }
              @if (p.ctaLabel) {
                <div class="promo-popup__actions">
                  <button class="btn btn--light" type="button" (click)="onCta(p)">{{ p.ctaLabel }}</button>
                  <button class="btn btn--ghost" type="button" (click)="close()">Fermer</button>
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class PromoPopupComponent {
  private readonly router = inject(Router);
  private readonly quoteModal = inject(QuoteModalService);

  private readonly currentPage = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.pageFromUrl(this.router.url)),
    ),
    { initialValue: this.pageFromUrl(this.router.url) },
  );

  protected readonly popup = computed(() => getPopupForPage(this.currentPage()));

  protected readonly isOpen = signal(false);
  protected readonly subscribed = signal(false);
  protected readonly playing = signal(false);

  constructor() {
    effect((onCleanup) => {
      const p = this.popup();
      this.isOpen.set(false);
      this.subscribed.set(false);
      this.playing.set(false);
      if (!p) return;
      if (p.frequency === 'once_per_visitor' && localStorage.getItem(SEEN_PREFIX + p.id)) return;

      const timer = setTimeout(() => {
        this.isOpen.set(true);
        if (p.frequency === 'once_per_visitor') localStorage.setItem(SEEN_PREFIX + p.id, '1');
      }, p.delayMs);
      onCleanup(() => clearTimeout(timer));
    });
  }

  private pageFromUrl(url: string): string {
    return url.split('?')[0].split('#')[0].replace(/^\//, '').split('/')[0];
  }

  close(): void {
    this.isOpen.set(false);
    this.playing.set(false);
  }

  playVideo(): void {
    this.playing.set(true);
  }

  onCta(p: { ctaUrl?: string }): void {
    this.isOpen.set(false);
    if (p.ctaUrl) {
      this.router.navigateByUrl(p.ctaUrl);
    } else {
      this.quoteModal.open();
    }
  }

  subscribe(event: Event): void {
    event.preventDefault();
    this.subscribed.set(true);
  }
}
