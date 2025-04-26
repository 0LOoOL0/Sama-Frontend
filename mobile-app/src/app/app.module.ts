import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment'; // Import environment
import { defineCustomElements } from 'ionicons/dist/loader';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
// Extract firebaseConfig from environment
const firebaseConfig = environment.firebaseConfig;
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
defineCustomElements(window);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
