// Bloc « Bienvenue chez ATHL » : présentation des métiers par onglets (accueil et page À propos).
// Le contenu vient de la ressource "À propos" du BO (voir about-page.data.ts) — c'est la MÊME
// donnée qui alimente ce bloc sur les deux pages (édité une seule fois dans le BO), et elle est
// distincte des fiches Services même si elle décrit les mêmes 3 métiers.
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../reveal.directive';
import { StatCounterComponent } from '../stat-counter/stat-counter.component';
import { getAboutPage } from '../../../infrastructure/data/about-page.data';
import { getFeaturedProjectImage } from '../../../infrastructure/data/projects.data';
import { LanguageService } from '../../../../../core/services/language.service';

// Icônes des onglets : décoratives et liées à la position (1er/2e/3e onglet), pas au contenu —
// pas de champ "icône" côté BO pour l'instant.
const TAB_ICONS = [
  'M4 21V9l8-5 8 5v12M9 21v-6h6v6',
  'M6 28l3.2-10.4A4 4 0 0 1 13 15h22a4 4 0 0 1 3.8 2.6L42 28',
  'M3 10l9-5 9 5-9 5-9-5ZM3 10v7l9 5 9-5v-7M12 15v7',
];

@Component({
  selector: 'app-workforce-tabs',
  imports: [RouterLink, RevealDirective, StatCounterComponent, TranslocoPipe],
  template: `
    <section class="about-block" id="workforce">
      <div class="about-block__media" appReveal>
        <div class="about-block__frame">
          @for (t of tabs(); track t.number; let i = $index) {
            <img [src]="t.heroImage" [alt]="t.title" [class.is-on]="activeTab() === i" />
          }
        </div>
        @for (t of activeTabList(); track t.number) {
          <div class="about-block__badge">
            <div class="about-block__badge-num">{{ t.number }}</div>
            <div class="about-block__badge-label">{{ t.title }}</div>
          </div>
        }
        <div class="about-block__small">
          @for (t of tabs(); track t.number; let i = $index) {
            <img [src]="t.image" alt="" aria-hidden="true" [class.is-on]="activeTab() === i" [class.is-zoom]="t.image === t.heroImage" />
          }
        </div>
        <div class="about-block__bar"></div>
      </div>

      <div class="about-block__content" [appReveal]="140">
        <div class="about-block__eyebrow">
          <span></span>{{ intro().eyebrow }}
        </div>
        <h2>{{ intro().title }}</h2>
        <p class="lead">{{ intro().lead }}</p>

        <div class="about-tabs" role="tablist">
          @for (t of tabs(); track t.number; let i = $index) {
            <button
              type="button"
              role="tab"
              class="about-tab"
              [class.is-on]="activeTab() === i"
              [attr.aria-selected]="activeTab() === i"
              (click)="activeTab.set(i)"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path [attr.d]="tabIcons[i % tabIcons.length]" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ t.title }}
            </button>
          }
        </div>

        @for (t of activeTabList(); track t.number) {
          <div class="about-panel">
            <h3>{{ t.title }}</h3>
            <p>{{ t.lead }}</p>
            <ul class="about-panel__list">
              @for (b of t.bullets.slice(0, 4); track b) {
                <li>{{ b }}</li>
              }
            </ul>
          </div>

          <div class="about-block__lower">
            <div class="about-block__lower-left">
              <div class="about-block__features">
                @for (stat of t.stats.slice(0, 3); track stat.label) {
                  <div class="about-block__feature">
                    <span class="about-block__feature-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
                          stroke="currentColor"
                          stroke-width="1.8"
                          stroke-linejoin="round"
                        />
                        <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <div class="about-block__feature-num">
                        <app-stat-counter [to]="stat.value" [decimals]="stat.decimals" [suffix]="stat.suffix" />
                      </div>
                      <div class="about-block__feature-label">{{ stat.label }}</div>
                    </div>
                  </div>
                }
              </div>

              <a class="btn btn--light about-block__cta" routerLink="/services">{{ 'common.learnMore' | transloco }}</a>
            </div>

            <button type="button" class="about-block__video" (click)="videoOpen.set(true)" [attr.aria-label]="'home.workforce.playCta' | transloco">
              <img [src]="videoImage()" [attr.alt]="'home.workforce.videoAlt' | transloco" />
              <span class="about-block__play" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
              </span>
            </button>
          </div>
        }
      </div>
    </section>

    @if (videoOpen()) {
      <div class="video-lightbox" (click)="videoOpen.set(false)">
        <button type="button" class="video-lightbox__close" (click)="videoOpen.set(false)" [attr.aria-label]="'common.close' | transloco">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
        </button>
        <video class="video-lightbox__video" [src]="videoSrc" controls autoplay (click)="$event.stopPropagation()"></video>
      </div>
    }
  `,
})
export class WorkforceTabsComponent {
  private readonly languageService = inject(LanguageService);

  readonly tabIcons = TAB_ICONS;
  readonly activeTab = signal(0);

  private readonly page = computed(() => getAboutPage(this.languageService.lang()));
  readonly intro = computed(() => this.page().workforce);
  readonly tabs = computed(() => this.page().workforceTabs);
  readonly activeTabList = computed(() => {
    const list = this.tabs();
    const tab = list[this.activeTab()];
    return tab ? [tab] : [];
  });

  // Toujours la même vignette, quel que soit l'onglet actif (voir composant) — le projet
  // marqué "à la une" dans le BO, avec repli sur l'image statique si la galerie est vide.
  readonly videoImage = computed(() => getFeaturedProjectImage() ?? 'images/proj-2.png');

  readonly videoSrc = 'images/video_athl.mp4';
  readonly videoOpen = signal(false);
}
