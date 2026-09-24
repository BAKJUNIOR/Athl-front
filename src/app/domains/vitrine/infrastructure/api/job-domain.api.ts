import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface JobDomainDto {
  id: number;
  labelFr: string;
  labelEn: string;
}

@Injectable({ providedIn: 'root' })
export class JobDomainApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  list(): Observable<JobDomainDto[]> {
    return this.http.get<JobDomainDto[]>(`${this.base}/api/v1/job-domains`);
  }
}
