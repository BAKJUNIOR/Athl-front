// Bloc « Bienvenue chez ATHL » : présentation des 3 métiers par onglets (accueil et page À propos).
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../reveal.directive';
import { StatCounterComponent } from '../stat-counter/stat-counter.component';
import { getHomeStat } from '../../../infrastructure/data/home-stats.data';

@Component({
  selector: 'app-workforce-tabs',
  imports: [RouterLink, RevealDirective, StatCounterComponent, TranslocoPipe],
  template: `
    <section class="about-block" id="workforce">
      <div class="about-block__media" appReveal>
        <div class="about-block__frame">
          @for (t of tabs; track t.key; let i = $index) {
            <img
              [src]="t.main"
              [attr.alt]="'home.pillars.' + t.key + '.imageAlt' | transloco"
              [class.is-on]="activeTab() === i"
            />
          }
        </div>
        @for (t of currentTab(); track t.key) {
          <div class="about-block__badge">
            <div class="about-block__badge-num">0{{ activeTab() + 1 }}</div>
            <div class="about-block__badge-label">
              {{ 'home.pillars.' + t.key + '.title' | transloco }}
            </div>
          </div>
        }
        <div class="about-block__small">
          @for (t of tabs; track t.key; let i = $index) {
            <img
              [src]="t.small"
              alt=""
              aria-hidden="true"
              [class.is-on]="activeTab() === i"
              [class.is-zoom]="t.small === t.main"
            />
          }
        </div>
        <div class="about-block__bar"></div>
      </div>

      <div class="about-block__content" [appReveal]="140">
        <div class="about-block__eyebrow">
          <span></span>{{ 'home.workforce.eyebrow' | transloco }}
        </div>
        <h2>{{ 'home.workforce.title' | transloco }}</h2>
        <p class="lead">{{ 'home.workforce.lead' | transloco }}</p>

        <div class="about-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            class="about-tab"
            [class.is-on]="activeTab() === 0"
            [attr.aria-selected]="activeTab() === 0"
            (click)="activeTab.set(0)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 21V9l8-5 8 5v12M9 21v-6h6v6"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              /></svg
            >{{ 'home.pillars.btp.title' | transloco }}
          </button>
          <button
            type="button"
            role="tab"
            class="about-tab"
            [class.is-on]="activeTab() === 1"
            [attr.aria-selected]="activeTab() === 1"
            (click)="activeTab.set(1)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <g
                transform="translate(-4 -8) scale(0.55)"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M6 28l3.2-10.4A4 4 0 0 1 13 15h22a4 4 0 0 1 3.8 2.6L42 28" />
                <rect x="4" y="28" width="40" height="10" rx="3" />
                <circle cx="13" cy="38" r="3.5" />
                <circle cx="35" cy="38" r="3.5" />
              </g></svg
            >{{ 'home.pillars.mobility.title' | transloco }}
          </button>
          <button
            type="button"
            role="tab"
            class="about-tab"
            [class.is-on]="activeTab() === 2"
            [attr.aria-selected]="activeTab() === 2"
            (click)="activeTab.set(2)"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 10l9-5 9 5-9 5-9-5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
              <path
                d="M3 10v7l9 5 9-5v-7M12 15v7"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              /></svg
            >{{ 'home.pillars.import.title' | transloco }}
          </button>
        </div>

        @for (t of currentTab(); track t.key) {
          <div class="about-panel">
            <h3>{{ 'home.pillars.' + t.key + '.title' | transloco }}</h3>
            <p>{{ 'home.pillars.' + t.key + '.lead' | transloco }}</p>
            <ul class="about-panel__list">
              @for (n of bulletIndexes; track n) {
                <li>{{ 'home.pillars.' + t.key + '.items.' + n | transloco }}</li>
              }
            </ul>
          </div>
        }

        <div class="about-block__lower">
          <div class="about-block__lower-left">
            <div class="about-block__features">
              <div class="about-block__feature">
                <span class="about-block__feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linejoin="round"
                    />
                    <path
                      d="m9 12 2 2 4-4"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <div class="about-block__feature-num">
                    <app-stat-counter
                      [to]="sitesDelivered().value"
                      [decimals]="sitesDelivered().decimals"
                      [suffix]="sitesDelivered().suffix"
                    />
                  </div>
                  <div class="about-block__feature-label">
                    {{ 'common.stats.sitesDelivered' | transloco }}
                  </div>
                </div>
              </div>
              <div class="about-block__feature">
                <span class="about-block__feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 19V10M10 19V5M16 19v-7M22 19H2"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <div class="about-block__feature-num">
                    <app-stat-counter
                      [to]="projectValue().value"
                      [decimals]="projectValue().decimals"
                      [suffix]="projectValue().suffix"
                    />
                  </div>
                  <div class="about-block__feature-label">
                    {{ 'common.stats.projectValue' | transloco }}
                  </div>
                </div>
              </div>
              <div class="about-block__feature">
                <span class="about-block__feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 21V9l8-5 8 5v12M9 21v-6h6v6"
                      stroke="currentColor"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <div class="about-block__feature-num">
                    <app-stat-counter
                      [to]="assetValue().value"
                      [decimals]="assetValue().decimals"
                      [suffix]="assetValue().suffix"
                    />
                  </div>
                  <div class="about-block__feature-label">
                    {{ 'common.stats.assetValue' | transloco }}
                  </div>
                </div>
              </div>
            </div>

            <a class="btn btn--light about-block__cta" routerLink="/services">{{
              'common.learnMore' | transloco
            }}</a>
          </div>

          <a
            class="about-block__video"
            routerLink="/projets"
            [attr.aria-label]="'home.workforce.playCta' | transloco"
          >
            <img src="images/proj-2.png" [attr.alt]="'home.workforce.videoAlt' | transloco" />
            <span class="about-block__play" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class WorkforceTabsComponent {
  readonly tabs = [
    { key: 'btp', main: 'images/team-lead.png', small: 'images/team-review.jpg' },
    { key: 'mobility', main: 'images/pillar-mobility.jpg', small: 'images/pillar-mobility.jpg' },
    { key: 'import', main: 'images/hero-1.png', small: 'images/svc-4.png' },
  ] as const;
  readonly activeTab = signal(0);
  readonly currentTab = computed(() => [this.tabs[this.activeTab()]]);
  readonly bulletIndexes = [0, 1, 2, 3];

  readonly sitesDelivered = computed(() => getHomeStat('sites_delivered'));
  readonly projectValue = computed(() => getHomeStat('project_value'));
  readonly assetValue = computed(() => getHomeStat('asset_value'));
}
