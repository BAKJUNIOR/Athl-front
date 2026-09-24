// Environnement local — API backend lancée en local (voir Athl_logistics-backend).
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
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
    },
    team: {
      list: 'api/v1/team',
    },
    homeStats: {
      list: 'api/v1/home-stats',
    },
    siteContact: {
      get: 'api/v1/site-settings/contact',
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
