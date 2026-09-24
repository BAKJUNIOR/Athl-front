// Grille des membres de l'équipe (page Équipe et page À propos), avec flèches si la liste dépasse la fenêtre affichée.
import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../reveal.directive';
import { getTeamMembers } from '../../../infrastructure/data/team.data';
import { LanguageService } from '../../../../../core/services/language.service';

// Nombre de membres affichés simultanément : au-delà, on défile par flèches plutôt que
// de laisser la grille grossir indéfiniment vers le bas à chaque ajout depuis le BO.
const WINDOW_SIZE = 4;

@Component({
  selector: 'app-team-members',
  imports: [RevealDirective, TranslocoPipe],
  template: `
    <section class="team">
      @if (showArrows()) {
        <div class="team__head">
          <div class="arrows">
            <button class="arrow" type="button" [attr.aria-label]="'team.previous' | transloco" (click)="previous()">&larr;</button>
            <button class="arrow arrow--solid" type="button" [attr.aria-label]="'team.next' | transloco" (click)="next()">&rarr;</button>
          </div>
        </div>
      }
      <div class="team__grid">
        @for (member of visibleMembers(); track member.name; let i = $index) {
          <article class="member" [appReveal]="60 + i * 90">
            <div class="member__media"><img [src]="member.photo" [alt]="member.name" loading="lazy" /></div>
            <div class="member__body">
              <div class="member__name">{{ member.name }}</div>
              <div class="member__role">{{ member.role }}</div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
})
export class TeamMembersComponent {
  private readonly languageService = inject(LanguageService);

  readonly members = computed(() => getTeamMembers(this.languageService.lang()));
  private readonly index = signal(0);

  readonly showArrows = computed(() => this.members().length > WINDOW_SIZE);

  readonly visibleMembers = computed(() => {
    const list = this.members();
    if (list.length <= WINDOW_SIZE) return list;
    const start = this.index();
    return Array.from({ length: WINDOW_SIZE }, (_, k) => list[(start + k) % list.length]);
  });

  previous(): void {
    const length = this.members().length;
    this.index.update((i) => (i - 1 + length) % length);
  }

  next(): void {
    const length = this.members().length;
    this.index.update((i) => (i + 1) % length);
  }
}
