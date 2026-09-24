// Soumission publique du formulaire "Demander un devis".
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface QuoteRequestPayload {
  serviceLabel: string;
  name: string;
  phone: string;
  description: string;
  attachments?: string[];
}

@Injectable({ providedIn: 'root' })
export class QuoteApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  create(payload: QuoteRequestPayload): Observable<unknown> {
    return this.http.post(`${this.base}/${environment.endpoints.quotes.create}`, payload);
  }
}
