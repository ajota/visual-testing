import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormRegisterUserComponent } from './organism/form-register-user/form-register-user.component';
import { FormLoginComponent } from './organism/form-login/form-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormRegisterRequestComponent } from './organism/form-register-request/form-register-request.component';
import { AppRoutingModule } from '../app-routing.module';
import { MapConfigBasePipe } from './pipes/map-config-base.pipe';
import { ScNotifyComponent } from './organism/sc-notify/sc-notify.component';
import { ScControlComponent } from './molecules/sc-control/sc-control.component';
import { CardActiveCreditComponent } from './organism/card-active-credit/card-active-credit.component';
import { CardHistoryCreditComponent } from './organism/card-history-credit/card-history-credit.component';
import { NavbarComponent } from './organism/navbar/navbar.component';
import { MapConfigLangPipe } from './pipes/map-config-lang.pipe';
import { CardDetailCreditComponent } from './organism/card-detail-credit/card-detail-credit.component';
import { CardHistoryDetailComponent } from './organism/card-history-detail/card-history-detail.component';
import { FormCreatePasswordComponent } from './organism/form-create-password/form-create-password.component';
import { LocationPickerComponent } from './organism/location-picker/location-picker.component';
import { ScModalComponent } from './molecules/sc-modal/sc-modal.component';
import { ScDropdownComponent } from './molecules/sc-dropdown/sc-dropdown.component';
import { FormIdentityValidationComponent } from './organism/form-identity-validation/form-identity-validation.component';
import { NgBootstrapModule } from '../ng-bootstrap.module';
import { CameraComponent } from './organism/camera/camera.component';
import { FormValidateTokenComponent } from './organism/form-validate-token/form-validate-token.component';
import { DatepickerComponent } from './organism/datepicker/datepicker.component';
import { FormFamilyReferenceComponent } from './organism/form-family-reference/form-family-reference.component';
import { FormPersonalReferenceComponent } from './organism/form-personal-reference/form-personal-reference.component';
import { FormJobReferenceComponent } from './organism/form-job-reference/form-job-reference.component';
import { UserStatusComponent } from './organism/user-status/user-status.component';
import { QuickAccessComponent } from './organism/quick-access/quick-access.component';
import { ScBtnOptionsComponent } from './molecules/sc-btn-options/sc-btn-options.component';
import { FormRecoveryPasswordComponent } from './organism/form-recovery-password/form-recovery-password.component';
import { FormForgotRecoveryPasswordComponent } from './organism/form-forgot-recovery-password/form-forgot-recovery-password.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { LockedCameraComponent } from './organism/locked-camera/locked-camera.component';
import { FormPaymentComponent } from './organism/form-payment/form-payment.component';
import { LockedLocationComponent } from './organism/locked-location/locked-location.component';
import { FormSearchCreditsComponent } from './organism/form-search-credits/form-search-credits.component';
import { ScSelectCreditComponent } from './molecules/sc-select-credit/sc-select-credit.component';
import { ScDownloadAppComponent } from './templates/sc-download-app/sc-download-app.component';
import { FormUpdateEmailComponent } from './organism/form-update-email/form-update-email.component';
import { FormUpdateMobileComponent } from './organism/form-update-mobile/form-update-mobile.component';
import { UpdateDataComponent } from '../components/update-data/update-data.component';
import { ScValidateTokenComponent } from './templates/sc-validate-token/sc-validate-token.component';
import { ScTypeaheadComponent } from './molecules/sc-typeahead/sc-typeahead.component';
import { FormQuickPaymentComponent } from './organism/form-quick-payment/form-quick-payment.component';

@NgModule({
  declarations: [
    FormRegisterUserComponent,
    FormLoginComponent,
    FormRegisterRequestComponent,
    ScNotifyComponent,
    ScControlComponent,
    MapConfigBasePipe,
    CardActiveCreditComponent,
    CardHistoryCreditComponent,
    NavbarComponent,
    MapConfigLangPipe,
    CardDetailCreditComponent,
    CardHistoryDetailComponent,
    FormCreatePasswordComponent,
    LocationPickerComponent,
    ScModalComponent,
    ScDropdownComponent,
    FormIdentityValidationComponent,
    CameraComponent,
    FormValidateTokenComponent,
    DatepickerComponent,
    FormFamilyReferenceComponent,
    FormPersonalReferenceComponent,
    FormJobReferenceComponent,
    UserStatusComponent,
    QuickAccessComponent,
    ScBtnOptionsComponent,
    FormRecoveryPasswordComponent,
    FormForgotRecoveryPasswordComponent,
    SafeUrlPipe,
    LockedCameraComponent,
    FormPaymentComponent,
    LockedLocationComponent,
    FormSearchCreditsComponent,
    ScSelectCreditComponent,
    FormUpdateEmailComponent,
    FormUpdateMobileComponent,
    UpdateDataComponent,
    ScDownloadAppComponent,
    FormUpdateEmailComponent,
    FormUpdateMobileComponent,
    ScValidateTokenComponent,
    ScTypeaheadComponent,
    FormQuickPaymentComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgBootstrapModule
  ],

  exports: [
    FormRegisterUserComponent,
    FormLoginComponent,
    FormRegisterRequestComponent,
    ScControlComponent,
    ScNotifyComponent,
    MapConfigBasePipe,
    MapConfigLangPipe,
    CardActiveCreditComponent,
    CardHistoryCreditComponent,
    NavbarComponent,
    CardDetailCreditComponent,
    CardHistoryDetailComponent,
    FormCreatePasswordComponent,
    LocationPickerComponent,
    ScModalComponent,
    ScDropdownComponent,
    FormIdentityValidationComponent,
    CameraComponent,
    FormValidateTokenComponent,
    DatepickerComponent,
    FormFamilyReferenceComponent,
    FormPersonalReferenceComponent,
    FormJobReferenceComponent,
    QuickAccessComponent,
    ScBtnOptionsComponent,
    FormRecoveryPasswordComponent,
    FormForgotRecoveryPasswordComponent,
    SafeUrlPipe,
    FormPaymentComponent,
    FormSearchCreditsComponent,
    ScSelectCreditComponent,
    FormUpdateEmailComponent,
    FormUpdateMobileComponent,
    UpdateDataComponent,
    ScDownloadAppComponent,
    FormUpdateEmailComponent,
    FormUpdateMobileComponent,
    ScValidateTokenComponent,
    ScTypeaheadComponent,
    FormQuickPaymentComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
