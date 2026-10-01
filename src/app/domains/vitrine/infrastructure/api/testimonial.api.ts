import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface TestimonialApiDto {
  id: number;
  name: string;
  roleFr: string;
  roleEn: string;
  textFr: string;
  textEn: string;
  photo: string;
  initials: string;
  sortOrder: number;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class TestimonialApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  list(): Observable<TestimonialApiDto[]> {
    return this.http.get<TestimonialApiDto[]>(`${this.base}/${environment.endpoints.testimonials.list}`);
  }
}
