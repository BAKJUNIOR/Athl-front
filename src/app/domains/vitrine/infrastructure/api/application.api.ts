// Soumission publique du formulaire de candidature de la page Carrières.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface JobApplicationPayload {
  position: string;
  name: string;
  phone: string;
  email?: string;
  experience?: string;
  city?: string;
  message?: string;
  cvUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicationApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  create(payload: JobApplicationPayload): Observable<unknown> {
    return this.http.post(`${this.base}/${environment.endpoints.applications.create}`, payload);
  }
}
