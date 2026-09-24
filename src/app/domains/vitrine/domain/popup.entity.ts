// Entité métier "Popup" : une popup promotionnelle/marketing, pilotée depuis le back-office, ciblée sur une page précise.

export type PopupType = 'image' | 'image_text' | 'video';
export type PopupLayout = 'stacked' | 'image_left';
/** once_per_visitor = bannière d'entrée classique ; every_visit = communication urgente qu'on veut voir à chaque venue. */
export type PopupFrequency = 'once_per_visitor' | 'every_visit';

export interface Popup {
  id: string;
  /** Chemin de la page ciblée, tel que dans app.routes (ex: '' pour l'accueil, 'services', 'a-propos'...). */
  page: string;
  /** Coupe l'affichage sans supprimer la popup — c'est le bouton "activer/désactiver" du BO. */
  active: boolean;
  type: PopupType;
  layout: PopupLayout;
  frequency: PopupFrequency;
  /** Délai avant apparition, en ms. */
  delayMs: number;
  eyebrow?: string;
  title: string;
  text?: string;
  image?: string;
  video?: string;
  /** Affiche un champ e-mail + bouton d'inscription (cas "récolter les mails pour la newsletter"). */
  collectEmail: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
  /**
   * Dernière modification (ISO). Sert de filet de sécurité côté front : si jamais 2 popups actives
   * se retrouvent sur la même page (ne devrait pas arriver si le BO impose "une seule active par page"
   * à l'activation), on affiche la plus récemment mise à jour plutôt qu'un choix arbitraire.
   */
  updatedAt: string;
}
