// Appelle l'API des compteurs animés de l'accueil (aussi affichés sur À propos et Équipe).
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface HomeStatApiDto {
  key: 'sites_delivered' | 'project_value' | 'asset_value';
  label: string;
  value: number;
  decimals: number;
  suffix: string;
}

@Injectable({ providedIn: 'root' })
export class HomeStatsApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  list(): Observable<HomeStatApiDto[]> {
    return this.http.get<HomeStatApiDto[]>(`${this.base}/api/v1/home-stats`);
  }
}
