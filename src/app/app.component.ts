import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { I18nPipe } from './pipes/i18n.pipe';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, I18nPipe],
  template: `
    <div class="container">
      <router-outlet />
      <footer class="site-footer">{{ 'app.footer' | i18n }}</footer>
    </div>
  `
})
export class AppComponent {
  constructor(private title: Title, private i18n: I18nService) {
    this.title.setTitle(this.i18n.t('index.title'));
  }
}
