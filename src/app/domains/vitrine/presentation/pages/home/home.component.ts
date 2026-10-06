// Page d'accueil du site vitrine ATHL.
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { WorkforceTabsComponent } from '../../components/workforce-tabs/workforce-tabs.component';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
import { TestimonialCarouselComponent } from '../../components/testimonial-carousel/testimonial-carousel.component';
import { getServices } from '../../../infrastructure/data/services.data';
import { getFeaturedShots } from '../../../infrastructure/data/projects.data';
import { getHomeHero, getHomePillar } from '../../../infrastructure/data/home-page.data';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RevealDirective, WorkforceTabsComponent, CtaBannerComponent, TestimonialCarouselComponent, TranslocoPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly languageService = inject(LanguageService);

  readonly hero = computed(() => getHomeHero(this.languageService.lang()));

  // Images de fond : une seule visible, dans l'ordre défini dans le BO (glisser-déposer),
  // 6 s chacune puis fondu vers la suivante, quel que soit leur nombre.
  private static readonly HERO_SLIDE_MS = 6000;
  readonly activeHeroImage = signal(0);
  readonly pillarConstruction = computed(() => getHomePillar('construction', this.languageService.lang()));
  readonly pillarMobility = computed(() => getHomePillar('mobility', this.languageService.lang()));
  readonly pillarImport = computed(() => getHomePillar('import', this.languageService.lang()));

  readonly services = computed(() => getServices(this.languageService.lang()));

  // Projets mis en avant (case "Mis en avant sur l'accueil" cochée dans le BO) UNIQUEMENT —
  // pas de repli sur du contenu inventé : si rien n'est coché, la section entière est masquée
  // (voir home.component.html).
  readonly activeSite = signal(0);
  readonly sites = computed(() =>
    getFeaturedShots(this.languageService.lang())
      .slice(0, 5)
      .map((s) => ({ image: s.image, title: s.title, caption: s.caption })),
  );

  constructor() {
    const timer = setInterval(() => {
      const count = this.hero().images.length;
      this.activeHeroImage.update((i) => (count > 1 ? (i + 1) % count : 0));
    }, HomeComponent.HERO_SLIDE_MS);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

}
