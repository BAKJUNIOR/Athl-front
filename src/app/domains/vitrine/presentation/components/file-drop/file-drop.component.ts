// Zone de dépôt de fichiers (drag & drop + validation de taille) réutilisée par les formulaires Devis et Candidature.
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'app-file-drop',
  template: `
    <label
      class="drop"
      [class.is-over]="isOver()"
      [class.is-filled]="fileSummary()"
      [class.drop--sm]="compact"
      [for]="inputId"
      (dragenter)="onDragOver($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <input
        #fileInput
        [id]="inputId"
        type="file"
        [name]="name"
        [multiple]="multiple"
        [required]="required"
        [accept]="accept"
        (change)="onChange($event)"
      />
      <span class="drop__icon" aria-hidden="true">&#8593;</span>
      <span class="drop__text">
        @if (fileSummary(); as summary) {
          {{ summary }}
        } @else {
          {{ label }} <em>{{ browseLabel }}</em>
        }
      </span>
      <span class="drop__hint">{{ hint }}</span>
    </label>
  `,
})
export class FileDropComponent {
  @Input() name = 'Documents';
  @Input() multiple = false;
  @Input() required = false;
  @Input() compact = false;
  @Input() accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.zip';
  @Input() label = 'Déposez vos fichiers ici ou';
  @Input() browseLabel = 'parcourez vos fichiers';
  @Input() hint = 'PDF, DOC, JPG, PNG ou ZIP — 5 Mo au total';
  @Input() maxBytes = 5 * 1024 * 1024;

  @Output() readonly filesChange = new EventEmitter<FileList | null>();
  @Output() readonly overLimit = new EventEmitter<void>();

  readonly inputId = `file-drop-${nextId++}`;
  readonly isOver = signal(false);
  readonly fileSummary = signal('');

  @ViewChild('fileInput') private fileInputRef?: ElementRef<HTMLInputElement>;

  // form.reset() vide l'input natif mais ne déclenche pas de (change) : sans ceci, le résumé
  // affiché ("1 fichier · X Ko") resterait visible après un envoi réussi.
  reset(): void {
    this.isOver.set(false);
    this.fileSummary.set('');
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isOver.set(false);
    const files = event.dataTransfer?.files;
    if (files?.length) {
      const input = (event.currentTarget as HTMLElement).querySelector('input[type="file"]') as HTMLInputElement;
      input.files = files;
      this.applyFiles(files, input);
    }
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.applyFiles(input.files, input);
  }

  private applyFiles(files: FileList | null, input: HTMLInputElement): void {
    if (!files?.length) {
      this.fileSummary.set('');
      this.filesChange.emit(null);
      return;
    }

    let total = 0;
    const names: string[] = [];
    for (let i = 0; i < files.length; i++) {
      total += files[i].size;
      names.push(files[i].name);
    }

    if (total > this.maxBytes) {
      input.value = '';
      this.fileSummary.set('');
      this.filesChange.emit(null);
      this.overLimit.emit();
      return;
    }

    const label = names.length > 1 ? `${names.length} fichiers` : names[0];
    this.fileSummary.set(`${label} · ${Math.max(1, Math.round(total / 1024))} Ko`);
    this.filesChange.emit(files);
  }
}
