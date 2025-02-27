import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { provideRouter, ROUTES } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    {
      provide: provideRouter,
      useFactory: (routes: any) => provideRouter(routes),
      deps: [ROUTES],
    },
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}