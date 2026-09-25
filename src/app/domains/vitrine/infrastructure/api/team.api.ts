import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface TeamMemberApi {
  id: number;
  name: string;
  roleFr: string;
  roleEn: string;
  photo: string;
  sortOrder: number;
  updatedAt: string;
  // Pas encore géré par le BO — présent ici pour que la fiche détail l'affiche automatiquement
  // le jour où le champ existera côté backend, sans autre changement front.
  bioFr?: string;
  bioEn?: string;
}

@Injectable({ providedIn: 'root' })
export class TeamApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  list(): Observable<TeamMemberApi[]> {
    return this.http.get<TeamMemberApi[]>(`${this.base}/${environment.endpoints.team.list}`);
  }
}
