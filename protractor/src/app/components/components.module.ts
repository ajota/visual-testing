import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterRequestComponent } from './register-request/register-request.component';
import { ChatbotComponent } from '../shared/templates/chatbot/chatbot.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { CentersAuthorizationComponent } from './centers-authorization/centers-authorization.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreditDetailComponent } from './credit-detail/credit-detail.component';
import { CreditHistoryComponent } from './credit-history/credit-history.component';
import { ScMessageComponent } from '../shared/molecules/sc-message/sc-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { TokenComponent } from './token/token.component';
import { CreditsComponent } from './credits/credits.component';
import { IdentityValidationComponent } from './identity-validation/identity-validation.component';
import { RequestQuotaComponent } from './request-quota/request-quota.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ForgotRecoveryPasswordComponent } from './forgot-recovery-password/forgot-recovery-password.component';
import { PaymentsComponent } from './payments/payments.component';
import { QuickPaymentComponent } from './quick-payment/quick-payment.component';
import { ValidateTokenComponent } from './validate-token/validate-token.component';
import { BridgePayComponent } from './bridge-pay/bridge-pay.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    HomeComponent,
    RegisterRequestComponent,
    ChatbotComponent,
    CreditsComponent,
    DashboardComponent,
    CentersAuthorizationComponent,
    CreditDetailComponent,
    CreditHistoryComponent,
    ScMessageComponent,
    CreatePasswordComponent,
    TokenComponent,
    IdentityValidationComponent,
    RequestQuotaComponent,
    RecoveryPasswordComponent,
    ForgotRecoveryPasswordComponent,
    PaymentsComponent,
    QuickPaymentComponent,
    ValidateTokenComponent,
    BridgePayComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    RegisterUserComponent,
    HomeComponent,
    RegisterRequestComponent,
    ChatbotComponent,
    DashboardComponent,
    CreditsComponent,
    CreditDetailComponent,
    CreditHistoryComponent,
    ScMessageComponent,
    TokenComponent,
    IdentityValidationComponent,
    ValidateTokenComponent,
    RecoveryPasswordComponent,
    ForgotRecoveryPasswordComponent,
    PaymentsComponent
  ]
})
export class ComponentsModule {}
