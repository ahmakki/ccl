import { Injectable } from '@angular/core';

export interface DonationPayload {
  fullname: string;
  cellphone: string;
  amount: number;
}

export interface StatsResponse {
  count: number;
  total: number;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class DonationService {
  /**
   * Submits the donation form to Netlify Forms (captured on deploy).
   * This POST goes to '/' with x-www-form-urlencoded body.
   */
  async submitDonation(payload: DonationPayload): Promise<void> {
    const body = new URLSearchParams({
      'form-name': 'donation',
      fullname: payload.fullname,
      cellphone: payload.cellphone,
      amount: String(payload.amount)
    });

    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    });

    // Netlify often returns 200/302 depending on environment
    if (!res.ok && res.status !== 0) {
      throw new Error(`Echec de l'envoi : ${res.status}`);
    }
  }

  /**
   * Reads aggregate stats from Netlify Function.
   * Returns only count + total (no personal info).
   */
  async getStats(): Promise<StatsResponse> {
    const res = await fetch('/.netlify/functions/stats');
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { count: 0, total: 0, error: 'Impossible de charger les statistiques.' };
    }
    return data as StatsResponse;
  }
}
