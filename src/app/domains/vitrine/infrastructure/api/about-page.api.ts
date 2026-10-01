// Appelle l'API du contenu de la page /a-propos (voir Athl_back AboutPageController).
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface AboutWorkforceStatApi {
  labelFr: string;
  labelEn: string;
  value: number;
  decimals: number;
  suffix: string;
}

export interface AboutWorkforceTabApi {
  number: string;
  titleFr: string;
  titleEn: string;
  image: string;
  heroImage: string;
  leadFr: string;
  leadEn: string;
  bullet1Fr: string;
  bullet1En: string;
  bullet2Fr: string;
  bullet2En: string;
  bullet3Fr: string;
  bullet3En: string;
  bullet4Fr: string;
  bullet4En: string;
  stats: AboutWorkforceStatApi[];
}

export interface AboutPillarApi {
  titleFr: string;
  titleEn: string;
  image: string;
  bullet1Fr: string;
  bullet1En: string;
  bullet2Fr: string;
  bullet2En: string;
  bullet3Fr: string;
  bullet3En: string;
  bullet4Fr: string;
  bullet4En: string;
}

export interface AboutGroundRoleApi {
  labelFr: string;
  labelEn: string;
}

export interface AboutCommitmentApi {
  titleFr: string;
  titleEn: string;
  textFr: string;
  textEn: string;
}

export interface AboutValueApi {
  labelFr: string;
  labelEn: string;
  textFr: string;
  textEn: string;
}

export interface AboutPageApiDto {
  workforceEyebrowFr: string | null;
  workforceEyebrowEn: string | null;
  workforceTitleFr: string | null;
  workforceTitleEn: string | null;
  workforceLeadFr: string | null;
  workforceLeadEn: string | null;
  workforceTabs: AboutWorkforceTabApi[];

  heroEyebrowFr: string | null;
  heroEyebrowEn: string | null;
  heroTitleFr: string | null;
  heroTitleEn: string | null;
  heroLeadFr: string | null;
  heroLeadEn: string | null;

  pillarsEyebrowFr: string | null;
  pillarsEyebrowEn: string | null;
  pillarsTitleFr: string | null;
  pillarsTitleEn: string | null;
  pillarsLeadFr: string | null;
  pillarsLeadEn: string | null;
  pillars: AboutPillarApi[];

  teamEyebrowFr: string | null;
  teamEyebrowEn: string | null;
  teamTitleFr: string | null;
  teamTitleEn: string | null;
  teamLeadFr: string | null;
  teamLeadEn: string | null;

  groundTitleFr: string | null;
  groundTitleEn: string | null;
  groundLeadFr: string | null;
  groundLeadEn: string | null;
  groundCtaLabelFr: string | null;
  groundCtaLabelEn: string | null;
  groundImages: string[];
  groundRoles: AboutGroundRoleApi[];
  commitments: AboutCommitmentApi[];

  valuesTitleFr: string | null;
  valuesTitleEn: string | null;
  valuesBackgroundImage: string | null;
  values: AboutValueApi[];
}

@Injectable({ providedIn: 'root' })
export class AboutPageApi {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  get(): Observable<AboutPageApiDto> {
    return this.http.get<AboutPageApiDto>(`${this.base}/${environment.endpoints.aboutPage.get}`);
  }
}
