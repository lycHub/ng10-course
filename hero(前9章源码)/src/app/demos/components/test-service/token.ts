import {InjectionToken} from '@angular/core';

interface AppConfig {
  apiEndpoint: string;
  title: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
console.log('APP_CONFIG', APP_CONFIG);
