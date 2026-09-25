// Fiche détail d'un membre de l'équipe ATHL (/equipe/:id).
import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';
import { map } from 'rxjs';
import { RevealDirective } from '../../components/reveal.directive';
import { getTeamMemberById } from '../../../infrastructure/data/team.data';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-team-detail',
  imports: [RouterLink, RevealDirective, TranslocoPipe],
  templateUrl: './team-detail.component.html',
})
export class TeamDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) },
  );

  readonly member = computed(() => getTeamMemberById(this.id(), this.languageService.lang()));

  constructor() {
    // Id inconnu : on renvoie vers la liste plutôt que d'afficher une fiche vide.
    effect(() => {
      if (this.id() && !this.member()) {
        this.router.navigate(['/equipe']);
      }
    });
  }
}
