import 'zone.js';
import { APP_INITIALIZER } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { I18nService } from './app/services/i18n.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: (i18n: I18nService) => () => i18n.load('fr'),
      deps: [I18nService],
      multi: true
    }
  ]
}).catch(console.error);
