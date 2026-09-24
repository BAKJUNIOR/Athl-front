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
}

@Injectable({ providedIn: 'root' })
export class TeamApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  list(): Observable<TeamMemberApi[]> {
    return this.http.get<TeamMemberApi[]>(`${this.base}/${environment.endpoints.team.list}`);
  }
}
