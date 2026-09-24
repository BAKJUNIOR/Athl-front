// Page "À propos" du site vitrine ATHL.
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { WorkforceTabsComponent } from '../../components/workforce-tabs/workforce-tabs.component';
import { TeamMembersComponent } from '../../components/team-members/team-members.component';
import { StatCounterComponent } from '../../components/stat-counter/stat-counter.component';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { getHomeStat } from '../../../infrastructure/data/home-stats.data';

@Component({
  selector: 'app-about',
  imports: [RouterLink, RevealDirective, WorkforceTabsComponent, TeamMembersComponent, StatCounterComponent, CtaBannerComponent, TranslocoPipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly sitesDelivered = computed(() => getHomeStat('sites_delivered'));
  readonly projectValue = computed(() => getHomeStat('project_value'));
  readonly assetValue = computed(() => getHomeStat('asset_value'));
}
