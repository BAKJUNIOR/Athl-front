// État partagé de la modal "Demander un devis", ouvrable depuis n'importe quelle page (header, CTA, cartes services...).
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuoteModalService {
  readonly isOpen = signal(false);
  readonly preselectedService = signal('');

  open(service = ''): void {
    this.preselectedService.set(service);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
