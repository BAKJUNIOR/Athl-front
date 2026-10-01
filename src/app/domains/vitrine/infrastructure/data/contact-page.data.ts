// Source de données du contenu de la page /contact, branchée sur l'API backend. Chargée une
// fois au démarrage (voir core/initializers) et mise en cache dans un signal : getContactPage()
// reste synchrone pour ne pas changer la page qui le consomme déjà.
import { signal } from '@angular/core';
import { ContactPageApiDto } from '../api/contact-page.api';
import { Lang } from '../../../../core/services/language.service';

export interface ContactPageContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  writeToUsEyebrow: string;
  info: { eyebrow: string; heading: string };
  phone: { title: string; note: string };
  email: { title: string };
  address: { title: string; note: string };
}

// Repli identique à ce qui était codé en dur avant le passage par le BO (voir contact.component.html).
const FALLBACK: Record<Lang, ContactPageContent> = {
  fr: {
    hero: { eyebrow: 'Contact', title: "Besoin de conseils ou d'un devis ?", subtitle: "Pour plus d'informations, contactez-nous — nos équipes répondent directement." },
    writeToUsEyebrow: 'Écrivez-nous',
    info: { eyebrow: "Besoin d'aide ?", heading: 'Entrer en contact avec nous' },
    phone: { title: 'Une question ?', note: 'Devis, chantiers et candidatures — également joignables sur WhatsApp.' },
    email: { title: 'Écrivez-nous' },
    address: { title: 'Nous rendre visite', note: "Interventions sur Abidjan et l'ensemble du territoire ivoirien." },
  },
  en: {
    hero: { eyebrow: 'Contact', title: 'Need advice or a quote?', subtitle: 'For more information, get in touch — our teams reply directly.' },
    writeToUsEyebrow: 'Write to us',
    info: { eyebrow: 'Need any help?', heading: 'Get in touch with us' },
    phone: { title: 'Have any question?', note: 'Quotes, sites and applications — also reachable on WhatsApp.' },
    email: { title: 'Write us an email' },
    address: { title: 'Visit anytime', note: "Operating in Abidjan and across Côte d'Ivoire." },
  },
};

const CONTACT_PAGE = signal<ContactPageApiDto | null>(null);

export function setContactPage(dto: ContactPageApiDto | null): void {
  CONTACT_PAGE.set(dto);
}

export function getContactPage(lang: Lang): ContactPageContent {
  const dto = CONTACT_PAGE();
  const fb = FALLBACK[lang];
  if (!dto) return fb;

  const en = lang === 'en';
  return {
    hero: {
      eyebrow: (en ? dto.heroEyebrowEn : dto.heroEyebrowFr) || fb.hero.eyebrow,
      title: (en ? dto.heroTitleEn : dto.heroTitleFr) || fb.hero.title,
      subtitle: (en ? dto.heroSubtitleEn : dto.heroSubtitleFr) || fb.hero.subtitle,
    },
    writeToUsEyebrow: (en ? dto.writeToUsEyebrowEn : dto.writeToUsEyebrowFr) || fb.writeToUsEyebrow,
    info: {
      eyebrow: (en ? dto.infoEyebrowEn : dto.infoEyebrowFr) || fb.info.eyebrow,
      heading: (en ? dto.infoHeadingEn : dto.infoHeadingFr) || fb.info.heading,
    },
    phone: {
      title: (en ? dto.phoneTitleEn : dto.phoneTitleFr) || fb.phone.title,
      note: (en ? dto.phoneNoteEn : dto.phoneNoteFr) || fb.phone.note,
    },
    email: {
      title: (en ? dto.emailTitleEn : dto.emailTitleFr) || fb.email.title,
    },
    address: {
      title: (en ? dto.addressTitleEn : dto.addressTitleFr) || fb.address.title,
      note: (en ? dto.addressNoteEn : dto.addressNoteFr) || fb.address.note,
    },
  };
}
