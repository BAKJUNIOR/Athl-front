// Coquille visuelle du site vitrine : halo décoratif, header, contenu de page, footer et modal devis globale.
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PartnersComponent } from '../components/partners/partners.component';
import { QuoteModalComponent } from './quote-modal/quote-modal.component';
import { PromoPopupComponent } from './promo-popup/promo-popup.component';

@Component({
  selector: 'app-vitrine-layout',
  imports: [RouterOutlet, HeaderComponent, PartnersComponent, FooterComponent, QuoteModalComponent, PromoPopupComponent],
  template: `
    <div class="page">
      <div class="glow" aria-hidden="true"></div>
      <div class="hairline" aria-hidden="true"></div>

      <div class="wrap">
        <app-header />
        <router-outlet />
        <app-partners />
        <app-footer />
      </div>
    </div>

    <app-quote-modal />
    <app-promo-popup />
  `,
})
export class VitrineLayoutComponent {}
