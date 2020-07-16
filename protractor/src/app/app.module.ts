import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { CoreModule } from './core/core.module';
import { LoadingInterceptor } from './core/http/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { firebase, socialLogin} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { registerLocaleData, TitleCasePipe } from '@angular/common';
import localeCop from '@angular/common/locales/es-CO';
import { MapConfigBasePipe } from './shared/pipes/map-config-base.pipe';
import { MapConfigLangPipe } from './shared/pipes/map-config-lang.pipe';
import { ErrorsInterceptor } from './core/http/errors.interceptor';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { SessionInterceptor } from './core/http/session.interceptor';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { CreditDetailComponent } from './components/credit-detail/credit-detail.component';

registerLocaleData(localeCop, 'COP');

const config = new AuthServiceConfig([
  {id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider(socialLogin.googleClienId)},
  {id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider(socialLogin.facebookId)
  }
]); // TODO: Pasar al home component(cuando lo pasa deja de funcionar) - Juan Mena

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    CoreModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    SocialLoginModule

  ],

  providers: [
    {provide: LOCALE_ID, useValue: 'COP'},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true },
    {provide: MapConfigBasePipe, useClass: MapConfigBasePipe},
    {provide: MapConfigLangPipe, useClass: MapConfigLangPipe},
    {provide: SafeUrlPipe, useClass: SafeUrlPipe},
    {provide: TitleCasePipe, useClass: TitleCasePipe},
    {provide: AuthServiceConfig,
    useFactory: provideConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
