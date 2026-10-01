// Appelle l'API du bandeau "Nos partenaires" (voir Athl_back PartnersSectionController).
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface PartnerApi {
  name: string;
  logo: string | null;
}

export interface PartnersSectionApiDto {
  eyebrowFr: string | null;
  eyebrowEn: string | null;
  titleFr: string | null;
  titleEn: string | null;
  subtitleFr: string | null;
  subtitleEn: string | null;
  ctaLabelFr: string | null;
  ctaLabelEn: string | null;
  partners: PartnerApi[];
}

@Injectable({ providedIn: 'root' })
export class PartnersApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  get(): Observable<PartnersSectionApiDto> {
    return this.http.get<PartnersSectionApiDto>(`${this.base}/${environment.endpoints.partners.get}`);
  }
}
