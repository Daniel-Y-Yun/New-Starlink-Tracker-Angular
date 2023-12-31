// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// // import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

import { bootstrapApplication,provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent,
  {
    providers: [
    provideProtractorTestingSupport(),
    provideAnimations(),
    provideHttpClient()
]
  }
).catch(err => console.error(err));