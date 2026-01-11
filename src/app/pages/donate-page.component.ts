import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nPipe } from '../pipes/i18n.pipe';
import { DonationService } from '../services/donation.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, I18nPipe],
  templateUrl: './donate-page.component.html',
  styleUrl: './donate-page.component.css'
})
export class DonatePageComponent {
  submitting = false;
  error = '';
  presetAmounts = [25, 50, 100, 200];

  model: { fullname: string; cellphone: string; amount: number | null } = {
    fullname: '',
    cellphone: '',
    amount: null
  };

  constructor(private donation: DonationService, private router: Router) {}

  setAmount(amount: number): void {
    this.model.amount = amount;
  }

  onPhoneChange(value: string): void {
    const sanitized = value.replace(/[^0-9+\s()-]/g, '');
    this.model.cellphone = sanitized;
  }

  onAmountChange(value: string | number): void {
    const raw = String(value ?? '');
    const sanitized = raw.replace(/\D/g, '');
    this.model.amount = sanitized ? Number(sanitized) : null;
  }

  async submit(f: NgForm): Promise<void> {
    this.error = '';
    if (this.submitting || f.invalid || this.model.amount == null) return;

    this.submitting = true;
    try {
      await this.donation.submitDonation({
        fullname: this.model.fullname.trim(),
        cellphone: this.model.cellphone.trim(),
        amount: Number(this.model.amount)
      });

      // Optional: clear
      this.model = { fullname: '', cellphone: '', amount: null };
      f.resetForm(this.model);

      await this.router.navigateByUrl('/thank-you');
    } catch (e: any) {
      this.error = "L'envoi a echoue. Veuillez reessayer.";
    } finally {
      this.submitting = false;
    }
  }
}
