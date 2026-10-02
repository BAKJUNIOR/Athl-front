// Page "Contact" du site vitrine ATHL.
// Le formulaire s'appuie sur l'API "devis" existante (POST /api/v1/quotes) : il n'y a pas
// d'endpoint dédié aux messages de contact côté back, le libellé de service permet de les
// distinguer des vraies demandes de devis dans le back-office.
import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { RevealDirective } from '../../components/reveal.directive';
import { getSiteContact } from '../../../infrastructure/data/site-contact.data';
import { getContactPage } from '../../../infrastructure/data/contact-page.data';
import { QuoteApi } from '../../../infrastructure/api/quote.api';
import { LanguageService } from '../../../../../core/services/language.service';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, RevealDirective, TranslocoPipe],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly transloco = inject(TranslocoService);
  private readonly quoteApi = inject(QuoteApi);
  private readonly languageService = inject(LanguageService);

  readonly contact = computed(() => getSiteContact(this.languageService.lang()));
  readonly page = computed(() => getContactPage(this.languageService.lang()));

  readonly mapUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${encodeURIComponent(this.contact().mapLocation)}&output=embed`,
    ),
  );

  protected readonly status = signal('');
  protected readonly isValid = signal(false);
  protected readonly sending = signal(false);

  telHref(phone: string): string {
    return `tel:${phone.replace(/\s+/g, '')}`;
  }

  onSubmit(event: Event, form: HTMLFormElement): void {
    event.preventDefault();
    const missing = Array.from(form.querySelectorAll<HTMLInputElement>('[required]')).filter((el) =>
      el.type === 'checkbox' ? !el.checked : !el.value,
    );
    if (missing.length) {
      this.status.set(this.transloco.translate('common.form.missingRequired'));
      this.isValid.set(false);
      missing[0].focus();
      return;
    }

    const name = (form.querySelector('#c-nom') as HTMLInputElement).value;
    const email = (form.querySelector('#c-email') as HTMLInputElement).value;
    const phone = (form.querySelector('#c-tel') as HTMLInputElement).value;
    const subject = (form.querySelector('#c-sujet') as HTMLInputElement).value;
    const message = (form.querySelector('#c-msg') as HTMLTextAreaElement).value;
    const description = [subject ? `Sujet : ${subject}` : '', email ? `E-mail : ${email}` : '', '', message].filter((l) => l !== undefined).join('\n');

    this.sending.set(true);
    this.status.set('');

    this.quoteApi.create({ serviceLabel: 'Message de contact', name, phone, description }).subscribe({
      next: () => {
        this.sending.set(false);
        this.isValid.set(true);
        this.status.set(this.transloco.translate('common.form.sent'));
        form.reset();
      },
      error: () => {
        this.sending.set(false);
        this.isValid.set(false);
        this.status.set(this.transloco.translate('common.form.sendError'));
      },
    });
  }
}
