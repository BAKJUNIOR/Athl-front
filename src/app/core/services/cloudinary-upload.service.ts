// Envoi direct de fichiers vers Cloudinary depuis le navigateur (upload non signé), sans passer
// par le backend. Même service que côté BO (core/services/cloudinary-upload.service.ts) : les
// formulaires publics (devis, candidature) uploadent leurs pièces jointes/CV de la même façon
// que le BO uploade ses images de contenu.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const UPLOAD_URL = 'https://api.cloudinary.com/v1_1';

const env = environment as { cloudinary?: { cloudName?: string; uploadPreset?: string } };

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class CloudinaryUploadService {
  private readonly cloudName = env.cloudinary?.cloudName;
  private readonly uploadPreset = env.cloudinary?.uploadPreset;

  /** Envoie un fichier vers Cloudinary et retourne l'URL sécurisée (type de ressource auto-détecté). */
  upload(file: File, folder?: string): Observable<CloudinaryUploadResponse> {
    let resourceType: 'image' | 'video' | 'raw' = 'image';

    if (file.type === 'application/pdf') {
      resourceType = 'raw';
    } else if (file.type.startsWith('video/')) {
      resourceType = 'video';
    } else if (file.type.startsWith('image/')) {
      resourceType = 'image';
    } else {
      resourceType = 'raw';
    }

    return this.uploadResource(file, resourceType, folder);
  }

  private uploadResource(file: File, resourceType: 'image' | 'video' | 'raw', folder?: string): Observable<CloudinaryUploadResponse> {
    return new Observable((observer) => {
      if (!this.cloudName || !this.uploadPreset) {
        observer.error(new Error('Cloudinary non configuré (cloudName, uploadPreset)'));
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
      if (folder) formData.append('folder', folder);

      const url = `${UPLOAD_URL}/${this.cloudName}/${resourceType}/upload`;

      fetch(url, { method: 'POST', body: formData })
        .then(async (res) => {
          const data = (await res.json()) as CloudinaryUploadResponse & { error?: { message?: string } };
          if (data.error) {
            observer.error(new Error(data.error.message ?? 'Erreur Cloudinary'));
            return;
          }
          if (data.secure_url) {
            observer.next(data);
            observer.complete();
          } else {
            observer.error(new Error('Réponse Cloudinary invalide'));
          }
        })
        .catch((err) => {
          observer.error(new Error(err?.message ?? (err?.toString?.() || 'Erreur réseau ou CORS')));
        });
    });
  }
}
