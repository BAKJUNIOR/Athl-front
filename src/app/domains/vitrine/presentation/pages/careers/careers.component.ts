import { Component, ElementRef, ViewChild, computed, inject, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { JobOffer, deadlineStatus, daysUntilDeadline } from '../../../domain/job-offer.entity';
import { getJobDomains, getJobOffers } from '../../../infrastructure/data/jobs.data';
import { RevealDirective } from '../../components/reveal.directive';
import { FileDropComponent } from '../../components/file-drop/file-drop.component';
import { normalizeText } from '../../../../../core/utils/text.util';
import { formatLocalizedDate } from '../../../../../core/utils/date.util';
import { LanguageService } from '../../../../../core/services/language.service';
import { ApplicationApi } from '../../../infrastructure/api/application.api';
import { CloudinaryUploadService } from '../../../../../core/services/cloudinary-upload.service';

@Component({
  selector: 'app-careers',
  imports: [RevealDirective, FileDropComponent, TranslocoPipe],
  templateUrl: './careers.component.html',
})
export class CareersComponent {
  private readonly languageService = inject(LanguageService);
  private readonly transloco = inject(TranslocoService);
  private readonly applicationApi = inject(ApplicationApi);
  private readonly cloudinary = inject(CloudinaryUploadService);

  readonly jobs = computed(() => getJobOffers(this.languageService.lang()));
  readonly domains = computed(() => getJobDomains(this.languageService.lang()));

  readonly search = signal('');
  readonly activeTag = signal<number | ''>('');
  readonly expanded = signal<ReadonlySet<string>>(new Set());
  readonly sharedJobId = signal('');
  readonly preselectedPoste = signal('');

  readonly filteredJobs = computed(() => {
    const query = normalizeText(this.search().trim());
    const tag = this.activeTag();
    return this.jobs().filter((job) => {
      const matchesTag = !tag || job.domain.id === tag;
      const matchesQuery =
        !query ||
        normalizeText(`${job.title} ${job.description} ${job.meta} ${job.domain.label}`).includes(query);
      return matchesTag && matchesQuery;
    });
  });

  readonly jobCountKey = computed(() =>
    this.filteredJobs().length > 1 ? 'careers.filters.countPlural' : 'careers.filters.countSingular',
  );

  protected readonly status = signal('');
  protected readonly isValid = signal(false);
  protected readonly sending = signal(false);
  private cvFile: File | null = null;

  @ViewChild('candidature') private candidatureSection?: ElementRef<HTMLElement>;
  @ViewChild('cvDrop') private cvDrop?: FileDropComponent;

  isExpanded(job: JobOffer): boolean {
    return this.expanded().has(job.id);
  }

  toggle(job: JobOffer): void {
    const next = new Set(this.expanded());
    if (next.has(job.id)) {
      next.delete(job.id);
    } else {
      next.add(job.id);
    }
    this.expanded.set(next);
  }

  selectTag(tag: number | ''): void {
    this.activeTag.set(tag);
  }

  clearSearch(): void {
    this.search.set('');
  }

  deadlineStatus(job: JobOffer) {
    return deadlineStatus(job);
  }

  formattedDate(iso: string): string {
    return formatLocalizedDate(iso, this.languageService.lang());
  }

  deadlineNote(job: JobOffer): { key: string; days: number } | null {
    const days = daysUntilDeadline(job);
    if (days < 0) return null;
    if (days === 0) return { key: 'careers.deadline.lastDay', days };
    if (days <= 10) return { key: 'careers.deadline.daysLeft', days };
    return null;
  }

  applyTo(job: JobOffer): void {
    this.preselectedPoste.set(job.title);
    this.expanded.update((set) => new Set(set).add(job.id));
    setTimeout(() => {
      this.candidatureSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  // [value] est un binding à sens unique : sans ceci, tout cycle de détection de changement
  // déclenché ailleurs (ex: choisir le CV) réapplique preselectedPoste() et efface la sélection
  // manuelle de l'utilisateur juste avant l'envoi.
  onPosteChange(event: Event): void {
    this.preselectedPoste.set((event.target as HTMLSelectElement).value);
  }

  share(job: JobOffer): void {
    const url = `${location.origin}${location.pathname}#${job.id}`;
    const payload = {
      title: `ATHL — ${job.title}`,
      text: this.transloco.translate('careers.share.text', { title: job.title }),
      url,
    };

    if (navigator.share) {
      navigator.share(payload).catch(() => {});
      return;
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => this.flashShared(job.id))
        .catch(() => this.flashShared(job.id));
    }
  }

  private flashShared(jobId: string): void {
    this.sharedJobId.set(jobId);
    setTimeout(() => this.sharedJobId.set(''), 2200);
  }

  onCvChange(files: FileList | null): void {
    this.cvFile = files?.length ? files[0] : null;
  }

  onApplySubmit(event: Event, form: HTMLFormElement): void {
    event.preventDefault();
    const missing = Array.from(form.querySelectorAll<HTMLInputElement>('[required]')).filter((el) =>
      el.type === 'checkbox' ? !el.checked : !el.value,
    );
    if (missing.length || !this.cvFile) {
      this.status.set(this.transloco.translate('common.form.missingRequired'));
      this.isValid.set(false);
      missing[0]?.focus();
      return;
    }

    const name = (form.querySelector('#f-nom') as HTMLInputElement).value;
    const phone = (form.querySelector('#f-tel') as HTMLInputElement).value;
    const email = (form.querySelector('#f-mail') as HTMLInputElement).value;
    const position = (form.querySelector('#f-poste') as HTMLSelectElement).value;
    const experience = (form.querySelector('#f-exp') as HTMLSelectElement).value;
    const city = (form.querySelector('#f-ville') as HTMLInputElement).value;
    const message = (form.querySelector('#f-msg') as HTMLTextAreaElement).value;

    this.sending.set(true);
    this.status.set('');

    this.cloudinary
      .upload(this.cvFile, 'applications')
      .pipe(
        catchError(() => of(null)),
        switchMap((result) =>
          this.applicationApi.create({
            position,
            name,
            phone,
            email,
            experience,
            city,
            message,
            cvUrl: result?.secure_url,
          }),
        ),
      )
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.isValid.set(true);
          this.status.set(this.transloco.translate('common.form.sent'));
          form.reset();
          this.cvFile = null;
          this.cvDrop?.reset();
        },
        error: () => {
          this.sending.set(false);
          this.isValid.set(false);
          this.status.set(this.transloco.translate('common.form.sendError'));
        },
      });
  }
}
