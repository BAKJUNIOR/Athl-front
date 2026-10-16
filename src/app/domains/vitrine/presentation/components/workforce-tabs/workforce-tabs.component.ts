import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../reveal.directive';
import { StatCounterComponent } from '../stat-counter/stat-counter.component';
import { getAboutPage } from '../../../infrastructure/data/about-page.data';
import { LanguageService } from '../../../../../core/services/language.service';
import { parseVideoUrl, VideoSource } from '../../../../../core/utils/video-url.util';
import { normalizeText } from '../../../../../core/utils/text.util';


// Icônes des onglets (tracés 24x24, style trait) choisies d'après le nom du métier saisi dans le BO,
// pour suivre le métier même si l'ordre des onglets change ; repli sur la position sinon.
const TAB_ICONS = {
  // Casque de chantier
  construction: 'M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2zM10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5M4 15v-3a6 6 0 0 1 6-6M14 6a6 6 0 0 1 6 6v3',
  // Voiture
  mobility: 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2M9 17h6M5 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  // Cargo
  import: 'M12 10.2V14M12 2v3M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6M19.4 20A11.6 11.6 0 0 0 21 14l-8.2-3.6a2 2 0 0 0-1.6 0L3 14a11.6 11.6 0 0 0 2.8 7.8M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
} as const;
const TAB_ICON_ORDER = [TAB_ICONS.construction, TAB_ICONS.mobility, TAB_ICONS.import];

// Onglet Import & logistique : ni bloc statistiques ni numéro dans le badge sur le site.
function isImport(title: string): boolean {
  return /import|logisti/.test(normalizeText(title));
}

function tabIcon(title: string, index: number): string {
  const t = normalizeText(title);
  if (/construct|renov|batiment|building/.test(t)) return TAB_ICONS.construction;
  if (/mobil|vtc|livraison|transport|delivery|ride/.test(t)) return TAB_ICONS.mobility;
  if (/import|logisti|fret|freight/.test(t)) return TAB_ICONS.import;
  return TAB_ICON_ORDER[index % TAB_ICON_ORDER.length];
}

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
            @if (!isImport(t.title)) {
              <div class="about-block__badge-num">{{ t.number }}</div>
            }
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
                <path [attr.d]="tabIcon(t.title, i)" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>{{ t.title }}</span>
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
              <!-- Statistiques masquées pour Import & logistique (elles restent saisissables dans le BO). -->
              @if (!isImport(t.title)) {
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
              }

              <a class="btn btn--light about-block__cta" routerLink="/services">{{ 'common.learnMore' | transloco }}</a>
            </div>

            <!-- Vidéo propre à l'onglet (lien saisi dans le BO), vignette = sa petite photo ; masquée sans lien valide. -->
            @if (activeVideo()) {
              <button type="button" class="about-block__video" (click)="videoOpen.set(true)" [attr.aria-label]="'home.workforce.playCta' | transloco">
                <img [src]="t.image || t.heroImage" [attr.alt]="'home.workforce.videoAlt' | transloco" />
                <span class="about-block__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                </span>
              </button>
            }
          </div>
        }
      </div>
    </section>

    @if (videoOpen() && activeVideo(); as video) {
      <div class="video-lightbox" (click)="videoOpen.set(false)">
        <button type="button" class="video-lightbox__close" (click)="videoOpen.set(false)" [attr.aria-label]="'common.close' | transloco">
          <svg viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
        </button>
        @if (video.kind === 'file') {
          <video class="video-lightbox__video" [src]="video.fileUrl" controls autoplay playsinline (click)="$event.stopPropagation()"></video>
        } @else {
          <iframe
            class="video-lightbox__video video-lightbox__frame"
            [src]="embedUrl()"
            title="Vidéo"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowfullscreen
            (click)="$event.stopPropagation()"
          ></iframe>
        }
      </div>
    }
  `,
})
export class WorkforceTabsComponent {
  private readonly languageService = inject(LanguageService);

  readonly tabIcon = tabIcon;
  readonly isImport = isImport;
  readonly activeTab = signal(0);

  private readonly page = computed(() => getAboutPage(this.languageService.lang()));
  readonly intro = computed(() => this.page().workforce);
  readonly tabs = computed(() => this.page().workforceTabs);
  readonly activeTabList = computed(() => {
    const list = this.tabs();
    const tab = list[this.activeTab()];
    return tab ? [tab] : [];
  });

  private readonly sanitizer = inject(DomSanitizer);
  readonly videoOpen = signal(false);
  // Vidéo de l'onglet actif : lien du BO converti en lecteur YouTube/Vimeo ou fichier (voir video-url.util).
  readonly activeVideo = computed((): VideoSource | null => parseVideoUrl(this.activeTabList()[0]?.videoUrl));
  // URL d'iframe reconstruite par parseVideoUrl à partir de l'identifiant seul, donc sûre à intégrer.
  readonly embedUrl = computed((): SafeResourceUrl | null => {
    const video = this.activeVideo();
    return video && video.kind !== 'file' ? this.sanitizer.bypassSecurityTrustResourceUrl(video.embedUrl) : null;
  });

  @HostListener('document:keydown.escape')
  closeVideo(): void {
    this.videoOpen.set(false);
  }
}
