// Page "Demander un devis" (formulaire complet, accessible directement via /devis).
// Soumet directement à l'API backend (POST /api/v1/quotes) : les pièces jointes sont uploadées
// vers Cloudinary côté client au préalable, seules leurs URLs sont envoyées au backend.
import { Component, ViewChild, inject, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { forkJoin, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { RevealDirective } from '../../components/reveal.directive';
import { FileDropComponent } from '../../components/file-drop/file-drop.component';
import { QuoteApi } from '../../../infrastructure/api/quote.api';
import { CloudinaryUploadService } from '../../../../../core/services/cloudinary-upload.service';

@Component({
  selector: 'app-quote',
  imports: [RevealDirective, FileDropComponent, TranslocoPipe],
  templateUrl: './quote.component.html',
})
export class QuoteComponent {
  private readonly transloco = inject(TranslocoService);
  private readonly quoteApi = inject(QuoteApi);
  private readonly cloudinary = inject(CloudinaryUploadService);

  protected readonly status = signal('');
  protected readonly isValid = signal(false);
  protected readonly sending = signal(false);
  private files: FileList | null = null;

  @ViewChild('filesDrop') private filesDrop?: FileDropComponent;

  onFilesChange(files: FileList | null): void {
    this.files = files;
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

    const serviceLabel = (form.querySelector('#q-service') as HTMLSelectElement).value;
    const name = (form.querySelector('#q-nom') as HTMLInputElement).value;
    const phone = (form.querySelector('#q-tel') as HTMLInputElement).value;
    const description = (form.querySelector('#q-desc') as HTMLTextAreaElement).value;

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
