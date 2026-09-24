// Entité métier "Service" : une prestation proposée par ATHL (construction, rénovation, mobilité, import).

export interface ServicePrestation {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  lead: string;
  image: string;
  heroImage: string;
  prestations: ServicePrestation[];
  process: ServiceProcessStep[];
  gallery: string[];
}
