// Appelle l'API des popups marketing. Liste publique : ne renvoie que les popups actives.
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PopupFrequency, PopupLayout, PopupType } from '../../domain/popup.entity';

export interface PopupApiDto {
  id: number;
  page: string;
  active: boolean;
  type: PopupType;
  layout: PopupLayout;
  frequency: PopupFrequency;
  delayMs: number;
  eyebrow?: string;
  title: string;
  text?: string;
  image?: string;
  video?: string;
  collectEmail: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class PopupApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  list(): Observable<PopupApiDto[]> {
    return this.http.get<PopupApiDto[]>(`${this.base}/${environment.endpoints.popups.list}`);
  }
}
