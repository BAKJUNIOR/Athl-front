// Environnement local — API backend lancée en local (voir Athl_logistics-backend).
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  // Vide en local : on ne veut pas polluer les statistiques de production avec le trafic de développement.
  googleAnalyticsId: '',
  cloudinary: {
    cloudName: 'drfq0bt4z',
    uploadPreset: 'xbanking',
  },
  endpoints: {
    services: {
      list: 'api/v1/services',
      bySlug: (slug: string) => `api/v1/services/slug/${slug}`,
    },
    jobs: {
      list: 'api/v1/jobs',
    },
    jobDomains: {
      list: 'api/v1/job-domains',
    },
    projects: {
      list: 'api/v1/projects',
      bySlug: (slug: string) => `api/v1/projects/slug/${slug}`,
    },
    news: {
      list: 'api/v1/news',
      bySlug: (slug: string) => `api/v1/news/slug/${slug}`,
    },
    team: {
      list: 'api/v1/team',
    },
    siteContact: {
      get: 'api/v1/site-settings/contact',
    },
    aboutPage: {
      get: 'api/v1/about-page',
    },
    homePage: {
      get: 'api/v1/home-page',
    },
    partners: {
      get: 'api/v1/partners',
    },
    contactPage: {
      get: 'api/v1/contact-page',
    },
    popups: {
      list: 'api/v1/popups',
    },
    quotes: {
      create: 'api/v1/quotes',
    },
    applications: {
      create: 'api/v1/applications',
    },
  },
};
