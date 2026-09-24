import { signal } from '@angular/core';
import { JobDomainTag, JobOffer } from '../../domain/job-offer.entity';
import { Lang } from '../../../../core/services/language.service';
import { JobOfferApi } from '../api/job.api';
import { JobDomainDto } from '../api/job-domain.api';

const JOBS = signal<JobOfferApi[]>([]);
const JOB_DOMAINS = signal<JobDomainDto[]>([]);

export function setJobOffers(list: JobOfferApi[]): void {
  JOBS.set(list ?? []);
}

export function setJobDomains(list: JobDomainDto[]): void {
  JOB_DOMAINS.set(list ?? []);
}


export function getJobDomains(lang: Lang): JobDomainTag[] {
  const en = lang === 'en';
  return JOB_DOMAINS().map((d) => ({ id: d.id, label: (en && d.labelEn) || d.labelFr }));
}

export function getJobOffers(lang: Lang): JobOffer[] {
  const en = lang === 'en';
  return JOBS().map((dto) => ({
    id: String(dto.id),
    domain: { id: dto.domain.id, label: (en && dto.domain.labelEn) || dto.domain.labelFr },
    title: (en && dto.titleEn) || dto.titleFr,
    description: (en && dto.descriptionEn) || dto.descriptionFr,
    meta: (en && dto.metaEn) || dto.metaFr,
    publishedAt: dto.publishedAt ?? dto.deadline,
    deadline: dto.deadline,
    missions: dto.missions.map((m) => (en && m.en) || m.fr),
    profile: dto.profile.map((p) => (en && p.en) || p.fr),
    contactPhone: dto.contactPhone,
  }));
}
