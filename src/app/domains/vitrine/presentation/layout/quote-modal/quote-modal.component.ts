// Modal "Demander un devis", ouvrable depuis n'importe quelle page via QuoteModalService.
// Soumet directement à l'API backend (POST /api/v1/quotes) : les pièces jointes sont uploadées
// vers Cloudinary côté client au préalable, seules leurs URLs sont envoyées au backend.
import { Component, ViewChild, effect, inject, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FileDropComponent } from '../../components/file-drop/file-drop.component';
import { QuoteModalService } from '../../services/quote-modal.service';
import { QuoteApi } from '../../../infrastructure/api/quote.api';
import { CloudinaryUploadService } from '../../../../../core/services/cloudinary-upload.service';

@Component({
  selector: 'app-quote-modal',
  imports: [FileDropComponent, TranslocoPipe],
  template: `
    <div class="modal" [class.is-open]="quoteModal.isOpen()" [hidden]="!quoteModal.isOpen()">
      <div class="modal__backdrop" (click)="quoteModal.close()"></div>
      <div class="modal__card" role="dialog" aria-modal="true" aria-labelledby="devis-title">
        <button class="modal__close" type="button" [attr.aria-label]="'common.close' | transloco" (click)="quoteModal.close()">&#215;</button>
        <div class="modal__head">
          <div class="modal__eyebrow">{{ 'quote.eyebrow' | transloco }}</div>
          <h2 id="devis-title">{{ 'quote.title' | transloco }}</h2>
          <p>{{ 'quote.subtitle' | transloco }}</p>
        </div>

        <div class="form-loading-wrap">
        <form #form class="form form--modal" [class.is-sending]="sending()" novalidate (submit)="onSubmit($event, form)">
          @if (status(); as message) {
            <p class="form__status" [class.is-err]="!isValid()" [class.is-ok]="isValid()" role="status">
              <span>{{ message }}</span>
              <button type="button" class="form__status-close" aria-label="Fermer" (click)="status.set('')">&times;</button>
            </p>
          }
          <div class="field field--full">
            <label for="m-service">{{ 'quote.form.service' | transloco }} <span class="req">*</span></label>
            <select id="m-service" name="Service" required [value]="quoteModal.preselectedService()" (change)="onServiceChange($event)">
              <option value="">{{ 'quote.form.chooseService' | transloco }}</option>
              <option value="Réalisation de projets de construction">{{ 'common.services.construction' | transloco }}</option>
              <option value="Rénovation &amp; aménagement">{{ 'common.services.renovation' | transloco }}</option>
              <option value="VTC, mobilité &amp; livraison">{{ 'common.services.mobility' | transloco }}</option>
              <option value="Importation de matériaux">{{ 'common.services.import' | transloco }}</option>
            </select>
          </div>

          <div class="field">
            <label for="m-nom">{{ 'common.form.fullName' | transloco }} <span class="req">*</span></label>
            <input id="m-nom" name="Nom" type="text" required autocomplete="name" [placeholder]="'common.form.fullNamePlaceholder' | transloco" />
          </div>
          <div class="field">
            <label for="m-tel">{{ 'common.form.phone' | transloco }} <span class="req">*</span></label>
            <input id="m-tel" name="Téléphone" type="tel" required autocomplete="tel" placeholder="+225 07 00 00 00 00" />
          </div>

          <div class="field field--full">
            <label for="m-desc">{{ 'quote.form.project' | transloco }} <span class="req">*</span></label>
            <textarea id="m-desc" name="Description" rows="4" required [placeholder]="'quote.form.projectPlaceholder' | transloco"></textarea>
          </div>

          <div class="field field--full">
            <label for="m-files">{{ 'quote.form.files' | transloco }} <span class="opt">({{ 'common.form.optional' | transloco }})</span></label>
            <app-file-drop
              #filesDrop
              name="Documents"
              [multiple]="true"
              [compact]="true"
              [label]="'quote.form.dropLabel' | transloco"
              [browseLabel]="'quote.form.dropBrowseShort' | transloco"
              [hint]="'quote.form.dropHint' | transloco"
              (filesChange)="onFilesChange($event)"
            />
          </div>

          <div class="field field--full check">
            <input id="m-ok" name="Consentement" type="checkbox" value="Oui" required checked />
            <label for="m-ok">{{ 'quote.form.consent' | transloco }} <span class="req">*</span></label>
          </div>

          <div class="field field--full form__foot">
            <button class="btn btn--light" type="submit" [disabled]="sending()">{{ 'quote.form.submit' | transloco }}</button>
            <a class="btn btn--ghost" href="tel:+2250778095858">{{ 'common.form.callUs' | transloco }} : +225 07 78 09 58 58</a>
          </div>
        </form>
        @if (sending()) {
          <div class="form-loading__overlay" role="status" aria-live="polite" aria-busy="true">
            <span class="spinner" aria-hidden="true"></span>
          </div>
        }
        </div>
      </div>
    </div>
  `,
})
export class QuoteModalComponent {
  protected readonly quoteModal = inject(QuoteModalService);
  private readonly quoteApi = inject(QuoteApi);
  private readonly cloudinary = inject(CloudinaryUploadService);
  private readonly transloco = inject(TranslocoService);

  protected readonly status = signal('');
  protected readonly isValid = signal(false);
  protected readonly sending = signal(false);
  private files: FileList | null = null;

  @ViewChild('filesDrop') private filesDrop?: FileDropComponent;

  constructor() {
    effect(() => {
      document.body.classList.toggle('modal-lock', this.quoteModal.isOpen());
    });
  }

  onFilesChange(files: FileList | null): void {
    this.files = files;
  }

  // [value] est un binding à sens unique : sans ceci, tout cycle de détection de changement
  // déclenché ailleurs (ex: déposer un fichier) réapplique preselectedService() et efface la
  // sélection manuelle de l'utilisateur juste avant l'envoi.
  onServiceChange(event: Event): void {
    this.quoteModal.preselectedService.set((event.target as HTMLSelectElement).value);
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

    const serviceLabel = (form.querySelector('#m-service') as HTMLSelectElement).value;
    const name = (form.querySelector('#m-nom') as HTMLInputElement).value;
    const phone = (form.querySelector('#m-tel') as HTMLInputElement).value;
    const description = (form.querySelector('#m-desc') as HTMLTextAreaElement).value;

    this.sending.set(true);
    this.status.set('');

    const uploads$ = this.files?.length
      ? forkJoin(Array.from(this.files).map((f) => this.cloudinary.upload(f, 'quotes').pipe(catchError(() => of(null)))))
      : of([] as ({ secure_url: string } | null)[]);

    uploads$
      .pipe(
        switchMap((results) => {
          const attachments = results.filter((r): r is { secure_url: string } => !!r).map((r) => r.secure_url);
          return this.quoteApi.create({ serviceLabel, name, phone, description, attachments });
        }),
      )
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.isValid.set(true);
          this.status.set(this.transloco.translate('common.form.sent'));
          form.reset();
          this.files = null;
          this.filesDrop?.reset();
        },
        error: () => {
          this.sending.set(false);
          this.isValid.set(false);
          this.status.set(this.transloco.translate('common.form.sendError'));
        },
      });
  }
}
