/**
 * Name: main.ts
 * Version: 2.0
 * Author: Alex Ho
 * Contact: alex.tianzhi.ho@gmail.com
 * Date: 2024-03-26
 * Description: Main application file. Uses App module to bootstrap app.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

