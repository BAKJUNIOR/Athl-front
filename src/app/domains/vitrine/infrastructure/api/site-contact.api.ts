// Appelle l'API des coordonnées du site (footer + page Contact).
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface SiteContactApiDto {
  phone1: string;
  phone2: string;
  phone3: string;
  address: string;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
}

@Injectable({ providedIn: 'root' })
export class SiteContactApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  get(): Observable<SiteContactApiDto> {
    return this.http.get<SiteContactApiDto>(`${this.base}/api/v1/site-settings/contact`);
  }
}
