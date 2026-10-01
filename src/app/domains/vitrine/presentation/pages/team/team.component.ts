// Page dédiée "Équipe" (/equipe) : la direction et les équipes ATHL, chacune menant vers sa fiche détail.
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { getTeamMembers } from '../../../infrastructure/data/team.data';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-team',
  imports: [RouterLink, RevealDirective, TranslocoPipe],
  templateUrl: './team.component.html',
})
export class TeamComponent {
  private readonly languageService = inject(LanguageService);

  readonly members = computed(() => getTeamMembers(this.languageService.lang()));
  // Les 2 premiers (ordre défini côté BO/backend) sont mis en avant en haut de page,
  // le reste de l'équipe s'affiche ensuite en grille.
  readonly leaders = computed(() => this.members().slice(0, 2));
  readonly rest = computed(() => this.members().slice(2));
}
