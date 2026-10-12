// Appelle l'API des en-têtes de pages (voir Athl_back PageHeaderController).
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface PageHeaderApiDto {
  pageKey: string;
  eyebrowFr: string | null;
  eyebrowEn: string | null;
  titleFr: string | null;
  titleEn: string | null;
  subtitleFr: string | null;
  subtitleEn: string | null;
}

@Injectable({ providedIn: 'root' })
export class PageHeaderApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  list(): Observable<PageHeaderApiDto[]> {
    return this.http.get<PageHeaderApiDto[]>(`${this.base}/${environment.endpoints.pageHeaders.get}`);
  }
}
