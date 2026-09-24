// Formate une date ISO (yyyy-MM-dd) dans la langue active, sans dépendre de LOCALE_ID (fixe côté Angular).
import { Lang } from '../services/language.service';

const LOCALES: Record<Lang, string> = { fr: 'fr-FR', en: 'en-US' };

export function formatLocalizedDate(iso: string, lang: Lang): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}
