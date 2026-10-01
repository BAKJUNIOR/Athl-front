// Appelle l'API du contenu de la page /contact (voir Athl_back ContactPageController).
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface ContactPageApiDto {
  heroEyebrowFr: string | null;
  heroEyebrowEn: string | null;
  heroTitleFr: string | null;
  heroTitleEn: string | null;
  heroSubtitleFr: string | null;
  heroSubtitleEn: string | null;

  writeToUsEyebrowFr: string | null;
  writeToUsEyebrowEn: string | null;

  infoEyebrowFr: string | null;
  infoEyebrowEn: string | null;
  infoHeadingFr: string | null;
  infoHeadingEn: string | null;

  phoneTitleFr: string | null;
  phoneTitleEn: string | null;
  phoneNoteFr: string | null;
  phoneNoteEn: string | null;

  emailTitleFr: string | null;
  emailTitleEn: string | null;

  addressTitleFr: string | null;
  addressTitleEn: string | null;
  addressNoteFr: string | null;
  addressNoteEn: string | null;
}

@Injectable({ providedIn: 'root' })
export class ContactPageApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  get(): Observable<ContactPageApiDto> {
    return this.http.get<ContactPageApiDto>(`${this.base}/${environment.endpoints.contactPage.get}`);
  }
}
