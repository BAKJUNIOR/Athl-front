export interface JobDomainTag {
  id: number;
  label: string;
}

export interface JobOffer {
  id: string;
  domain: JobDomainTag;
  title: string;
  description: string;
  meta: string;
  publishedAt: string; // ISO date (yyyy-MM-dd)
  deadline: string; // ISO date (yyyy-MM-dd)
  missions: string[];
  profile: string[];
  contactPhone: string;
}

export type JobDeadlineStatus = 'open' | 'soon' | 'over';

const DAY_MS = 86_400_000;

export function daysUntilDeadline(job: JobOffer, now = new Date()): number {
  const end = new Date(`${job.deadline}T23:59:59`);
  return Math.floor((end.getTime() - now.getTime()) / DAY_MS);
}

export function deadlineStatus(job: JobOffer, now = new Date()): JobDeadlineStatus {
  const days = daysUntilDeadline(job, now);
  if (days < 0) return 'over';
  if (days <= 10) return 'soon';
  return 'open';
}
