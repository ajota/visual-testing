import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { ForgotRecoveryPasswordComponent } from './components/forgot-recovery-password/forgot-recovery-password.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterRequestComponent } from './components/register-request/register-request.component';
import { InitialConfigBaseResolver } from './core/initial-config-base.resolver';
import { ConfigLangResolver } from './core/config-lang.resolver';
import { CentersAuthorizationComponent } from './components/centers-authorization/centers-authorization.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/security/auth.guard';
import { TokenGuard } from './components/recovery-password/token.guard';
import { CreatePasswordComponent } from './components/create-password/create-password.component';
import { TokenComponent } from './components/token/token.component';
import { CreditsComponent } from './components/credits/credits.component';

import { IdentityValidationComponent } from './components/identity-validation/identity-validation.component';
import { UserStatusComponent } from './shared/organism/user-status/user-status.component';
import { RequestQuotaComponent } from './components/request-quota/request-quota.component';
import { CreditDetailComponent } from './components/credit-detail/credit-detail.component';
import { CreditHistoryComponent } from './components/credit-history/credit-history.component';
import { QuickAccessComponent } from './shared/organism/quick-access/quick-access.component';
import { LockedCameraComponent } from './shared/organism/locked-camera/locked-camera.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { RequestQuotaGuard } from './components/request-quota/request-quota.guard';
import { LockedLocationComponent } from './shared/organism/locked-location/locked-location.component';
import { QuickPaymentComponent } from './components/quick-payment/quick-payment.component';
import { nameRoutes } from './shared/util/name-routes';
import { UpdateDataComponent } from './components/update-data/update-data.component';
import { ValidateTokenComponent } from './components/validate-token/validate-token.component';
import {BridgePayComponent} from './components/bridge-pay/bridge-pay.component';
import { environment } from 'src/environments/environment';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
//
const routes: Routes = [
  {
    path: nameRoutes.login,
    component: HomeComponent,
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.confirmedEmail,
    component: HomeComponent,
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.registerUser,
    component: RegisterUserComponent,
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.forgotRecoveryPassword,
    component: ForgotRecoveryPasswordComponent,
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.recoveryPassword,
    component: RecoveryPasswordComponent,
    canActivate: [TokenGuard],
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.registerRequest,
    component: RegisterRequestComponent,
    canActivate: [AuthGuard],
    resolve: {configLang: ConfigLangResolver}
  },
  {
    path: nameRoutes.requestQuota,
    component: DashboardComponent,
    canActivate: [AuthGuard, RequestQuotaGuard],
    resolve: {configLang: ConfigLangResolver, configBase: InitialConfigBaseResolver},
    children: [
      { path: '', outlet: 'main-content', component: RequestQuotaComponent}
    ]
  },
  {
    path: nameRoutes.lockedCamera,
    component: LockedCameraComponent,
    // resolve: {configLang: ConfigLangResolver}
  },
  {
    path: nameRoutes.lockedLocation,
    component: LockedLocationComponent,
    resolve: {configBase: InitialConfigBaseResolver},
  },
  {
    path: nameRoutes.dashboard,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {configLang: ConfigLangResolver},
    children: [
      { path: '', outlet: 'main-content', component: CreditsComponent},
      { path: '', outlet: 'quick-access', component: QuickAccessComponent},
      { path: '', outlet: 'user-status', component: UserStatusComponent}
    ]
  },
  {
    path: nameRoutes.centersAutorization,
    component: CentersAuthorizationComponent,
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.createPassword,
    component: CreatePasswordComponent,
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.tokenRoot,
    component: TokenComponent,
    resolve: {configBase: InitialConfigBaseResolver, configLang: ConfigLangResolver},
    children: [
      {
        path: '',
        redirectTo: nameRoutes.identityValidation,
        pathMatch: 'full'
      },
      {
        path: nameRoutes.identityValidation,
        component: IdentityValidationComponent,
        resolve: {configBase: InitialConfigBaseResolver}
      },
      {
        path: nameRoutes.validateToken,
        component: ValidateTokenComponent,
        resolve: {configBase: InitialConfigBaseResolver}
      }
    ]
  },
  {
    path: '',
    component: LandingPageComponent,
    resolve: {configBase: InitialConfigBaseResolver}
  },
  {
    path: nameRoutes.payments,
    component: PaymentsComponent,
    resolve: {configBase: InitialConfigBaseResolver, configLang: ConfigLangResolver}
  },
  {
    path: nameRoutes.quickPayment,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {configBase: InitialConfigBaseResolver, configLang: ConfigLangResolver},
    children: [
      { path: '', outlet: 'main-content', component: QuickPaymentComponent },
      { path: '', outlet: 'quick-access', component: QuickAccessComponent},
      { path: 'userStatus', outlet: 'user-status', component: UserStatusComponent }]
  },
  {
    path: nameRoutes.updateData,
    component: UpdateDataComponent,
    resolve: {configLang: ConfigLangResolver}
  },
  {
    path: nameRoutes.bridgePay,
    component: BridgePayComponent,
    resolve: {configBase: InitialConfigBaseResolver, configLang: ConfigLangResolver}
  },
  {
    path: nameRoutes.credits,
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {configLang: ConfigLangResolver},
    children: [
      { path: '', outlet: 'main-content', component: CreditsComponent },
      { path: '', outlet: 'user-status', component: UserStatusComponent },
      { path: nameRoutes.creditDetail + '/:id', outlet: 'main-content', component: CreditDetailComponent },
      { path: nameRoutes.creditsHistory + '/:id', outlet: 'main-content', component: CreditHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 

  constructor (private router: Router) {
    // if ( environment.release >= 3) {
    //   routes.push({
    //     path: nameRoutes.credits,
    //     component: DashboardComponent,
    //     canActivate: [AuthGuard],
    //     resolve: {configLang: ConfigLangResolver},
    //     children: [
    //       // { path: '', outlet: 'main-content', component: CreditsComponent },
    //       // { path: '', outlet: 'user-status', component: UserStatusComponent },
    //       // { path: nameRoutes.creditDetail + '/:id', outlet: 'main-content', component: CreditDetailComponent },
    //       // { path: nameRoutes.creditsHistory + '/:id', outlet: 'main-content', component: CreditHistoryComponent }
    //     ]
    //   });
    // }
    // this.router.resetConfig( routes );
  }
}
