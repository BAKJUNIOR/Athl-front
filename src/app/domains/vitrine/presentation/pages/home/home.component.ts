// Page d'accueil du site vitrine ATHL.
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { WorkforceTabsComponent } from '../../components/workforce-tabs/workforce-tabs.component';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { TestimonialCarouselComponent } from '../../components/testimonial-carousel/testimonial-carousel.component';
import { getServices } from '../../../infrastructure/data/services.data';
import { getShots } from '../../../infrastructure/data/projects.data';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RevealDirective, WorkforceTabsComponent, CtaBannerComponent, TestimonialCarouselComponent, TranslocoPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly languageService = inject(LanguageService);

  readonly services = computed(() => getServices(this.languageService.lang()));

  // Chantiers : vrais projets publiés depuis le back-office s'il y en a, sinon photos de repli.
  private static readonly FALLBACK_SITES = [
    { image: 'images/proj-1.png', titleKey: 'home.projects.sites.steel' },
    { image: 'images/proj-2.png', titleKey: 'home.projects.sites.lifting' },
    { image: 'images/proj-4.png', titleKey: 'home.projects.sites.interior' },
    { image: 'images/proj-5.png', titleKey: 'home.projects.sites.port' },
    { image: 'images/card-construction.jpg', titleKey: 'home.projects.sites.building' },
  ];
  readonly activeSite = signal(0);
  readonly sites = computed(() => {
    const real = getShots(this.languageService.lang()).slice(0, 5);
    return real.length
      ? real.map((s) => ({ image: s.image, title: s.title, caption: s.caption, titleKey: '' }))
      : HomeComponent.FALLBACK_SITES.map((s) => ({ ...s, title: '', caption: '' }));
  });

}
