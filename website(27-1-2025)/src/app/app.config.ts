import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule, routes } from './app.routes';
import { authInterceptor } from './services/interceptor.service';
import { UserMainComponent } from './user/user-main-component/user-main-component.component';
import { ProviderAuthService } from './services/provider-auth.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    AppRoutingModule,
    UserMainComponent,
  ],
  providers: [],
})
export class AppModule { }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage()),
    ProviderAuthService
  ],
  
};
