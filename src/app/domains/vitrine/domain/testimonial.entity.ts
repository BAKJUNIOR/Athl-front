// Entité métier "Testimonial" : témoignage client affiché en carrousel sur la page d'accueil.

export interface Testimonial {
  photo: string;
  initials: string;
  text: string;
  name: string;
  role: string;
}
