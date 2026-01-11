import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { I18nPipe } from '../pipes/i18n.pipe';
import { DonationService, StatsResponse } from '../services/donation.service';

@Component({
  standalone: true,
  imports: [CommonModule, I18nPipe],
  templateUrl: './progress-page.component.html',
  styleUrl: './progress-page.component.css'
})
export class ProgressPageComponent implements OnInit, OnDestroy {
  loading = true;
  updating = false;
  error = '';
  stats: StatsResponse = { count: 0, total: 0 };
  lastUpdated: Date | null = null;
  totalBump = false;

  private intervalId: number | null = null;

  constructor(private donation: DonationService) { }

  ngOnInit(): void {
    this.reload()
    this.intervalId = window.setInterval(() => {
      void this.reload();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }
  }

  async reload(): Promise<void> {
    this.error = '';
    try {
      const previousTotal = this.stats?.total ?? 0;
      const data = await this.donation.getStats();
      if (data.error) {
        this.error = data.error;
      } else {
        this.stats = data;
        this.lastUpdated = new Date();
        if (data.total > previousTotal) {
          this.totalBump = true;
          window.setTimeout(() => {
            this.totalBump = false;
          }, 700);
        }
      }
    } catch (e: any) {
      this.error = e?.message || 'Impossible de charger les statistiques.';
    } finally {
      this.loading = false;
      this.updating = false;
    }
  }
}
