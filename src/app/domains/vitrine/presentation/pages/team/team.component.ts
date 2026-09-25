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
}
