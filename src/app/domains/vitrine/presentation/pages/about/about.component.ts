// Page "À propos" du site vitrine ATHL.
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { WorkforceTabsComponent } from '../../components/workforce-tabs/workforce-tabs.component';
import { TeamMembersComponent } from '../../components/team-members/team-members.component';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective, WorkforceTabsComponent, TeamMembersComponent, CtaBannerComponent, TranslocoPipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {}
