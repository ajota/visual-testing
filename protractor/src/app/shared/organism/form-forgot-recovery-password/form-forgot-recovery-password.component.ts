import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-forgot-recovery-password',
  templateUrl: './form-forgot-recovery-password.component.html',
  styleUrls: ['./form-forgot-recovery-password.component.scss']
})
export class FormForgotRecoveryPasswordComponent {

  @Output() eventSubmitForgotPassword = new EventEmitter();

  regFieldsExp = {
    regEmail: this.mapLanguagePipe.transform('str_regular_expression_mail_validation'),
  };

  formForgotPassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regFieldsExp.regEmail)]),
  });

  constructor(
    private mapLanguagePipe: MapConfigBasePipe
  ) { }

  onSubmitForm() {
    this.eventSubmitForgotPassword.next(this.formForgotPassword.value);
    this.formForgotPassword.reset();
  }

  get email(): AbstractControl {
    return this.formForgotPassword.get('email');
  }
}
