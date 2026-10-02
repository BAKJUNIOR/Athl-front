export const environment = {
  production: true,
  apiUrl: 'https://api.athl.athl-logistique.com',
  googleAnalyticsId: 'G-XJSK44PL4B',
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
    team: {
      list: 'api/v1/team',
    },
    siteContact: {
      get: 'api/v1/site-settings/contact',
    },
    aboutPage: {
      get: 'api/v1/about-page',
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
