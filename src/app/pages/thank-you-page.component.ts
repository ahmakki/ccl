import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nPipe } from '../pipes/i18n.pipe';

@Component({
  standalone: true,
  imports: [RouterLink, I18nPipe],
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.css'
  
})
export class ThankYouPageComponent {}
