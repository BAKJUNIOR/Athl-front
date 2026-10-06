// Transforme un lien vidéo saisi dans le BO en source lisible dans la fenêtre vidéo du site.
// Seuls YouTube, Vimeo et les fichiers vidéo directs (https) sont acceptés : l'URL d'iframe est
// reconstruite ici à partir de l'identifiant extrait, jamais reprise telle quelle, ce qui permet
// de la marquer comme sûre (DomSanitizer) sans ouvrir la porte à une page arbitraire.

export type VideoSource =
  | { kind: 'youtube' | 'vimeo'; embedUrl: string }
  | { kind: 'file'; fileUrl: string };

const YOUTUBE_ID = /^[\w-]{11}$/;
const VIMEO_ID = /^\d+$/;

export function parseVideoUrl(raw: string | null | undefined): VideoSource | null {
  const value = raw?.trim();
  if (!value) return null;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  // https uniquement : le site est en https, une vidéo en http serait bloquée par le navigateur.
  if (url.protocol !== 'https:') return null;

  const host = url.hostname.replace(/^(www\.|m\.)/, '');

  if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host === 'youtu.be') {
    const id =
      host === 'youtu.be'
        ? url.pathname.slice(1)
        : url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? '';
    return YOUTUBE_ID.test(id)
      ? { kind: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` }
      : null;
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean).find((part) => VIMEO_ID.test(part)) ?? '';
    return id ? { kind: 'vimeo', embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1` } : null;
  }

  // Tout autre lien est lu comme un fichier vidéo (.mp4 Cloudinary, etc.) par la balise <video>.
  return { kind: 'file', fileUrl: url.toString() };
}
