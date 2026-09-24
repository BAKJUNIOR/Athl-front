// Partenaires affichés au-dessus du footer.
// Pour ajouter un partenaire : déposer son logo (SVG monochrome de préférence) dans public/images/partners/
// puis ajouter une ligne ci-dessous. Sans `logo`, le nom est affiché en pastille + texte.
// NB : les logos ci-dessous sont des marques tierces, à remplacer/confirmer par vos vrais partenaires.
export interface Partner {
  name: string;
  logo?: string;
}

export const PARTNERS: Partner[] = [
  { name: 'Suzuki', logo: 'images/partners/suzuki.svg' },
  { name: 'Toyota', logo: 'images/partners/toyota.svg' },
  { name: 'Caterpillar', logo: 'images/partners/caterpillar.svg' },
  { name: 'DHL', logo: 'images/partners/dhl.svg' },
  { name: 'Volvo', logo: 'images/partners/volvo.svg' },
  { name: 'Hyundai', logo: 'images/partners/hyundai.svg' },
];
