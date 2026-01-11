import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface TranslationMap extends Record<string, string | TranslationMap> {}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private translations: TranslationMap = {};
  private loaded = false;

  constructor(private http: HttpClient) {}

  async load(language = 'fr'): Promise<void> {
    if (this.loaded) return;
    try {
      const data = await firstValueFrom(
        this.http.get<TranslationMap>(`/assets/i18n/${language}.json`)
      );
      this.translations = data;
    } catch {
      this.translations = {};
    }
    this.loaded = true;
  }

  t(key: string): string {
    const parts = key.split('.');
    let current: TranslationMap | string | undefined = this.translations;

    for (const part of parts) {
      if (
        current &&
        typeof current === 'object' &&
        Object.prototype.hasOwnProperty.call(current, part)
      ) {
        current = current[part] as TranslationMap | string;
      } else {
        return key;
      }
    }

    return typeof current === 'string' ? current : key;
  }
}
