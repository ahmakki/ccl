import { Routes } from '@angular/router';
import { DonatePageComponent } from './pages/donate-page.component';
import { ProgressPageComponent } from './pages/progress-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'donate' },
  { path: 'donate', component: DonatePageComponent },
  { path: 'progress', component: ProgressPageComponent },
  { path: 'thank-you', component: ThankYouPageComponent },
  { path: '**', redirectTo: 'donate' }
];
