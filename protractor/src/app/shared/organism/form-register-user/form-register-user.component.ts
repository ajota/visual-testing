import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-register-user',
  templateUrl: './form-register-user.component.html',
  styleUrls: ['./form-register-user.component.scss'],
})

export class FormRegisterUserComponent {
  @Output() eventSubmitRegister = new EventEmitter();
  nameHistoryValue: string;

  regNonSpaceBeginning = new RegExp(this.mapLanguagePipe.transform('str_regular_expression_non_spaces_beginning'));

  regFieldsExp = {
    regEmail: this.mapLanguagePipe.transform('str_regular_expression_mail_validation'),
    regName: this.mapLanguagePipe.transform('str_regular_expression_name_validation'),
    regPass: this.mapLanguagePipe.transform('str_regular_expression_password_validation'),
    regMaxLength: this.mapLanguagePipe.transform('validator_name_max_length'),
    regMinLength: this.mapLanguagePipe.transform('validator_name_min_length')
  };

  formRegister = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regFieldsExp.regName),
      Validators.pattern(this.regNonSpaceBeginning),
      Validators.maxLength(this.regFieldsExp.regMaxLength),
      Validators.minLength(this.regFieldsExp.regMinLength)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regFieldsExp.regEmail)]),
    verify_email: new FormControl('', [Validators.required, this.validateVerifyEmail] ),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regFieldsExp.regPass ),
    ]),
    verify_pass: new FormControl('', [Validators.required, this.validateVerifyPass ] )
  });

  constructor(
    private mapLanguagePipe: MapConfigBasePipe
  ) { }


  onSubmitForm() {
    if ( this.password.value === this.verify_pass.value ) {
      this.eventSubmitRegister.next(this.formRegister.value);
    }
    this.formRegister.reset();
  }

  get name(): AbstractControl {
    return this.formRegister.get('name');
  }
  get email(): AbstractControl {
    return this.formRegister.get('email');
  }
  get verify_email(): AbstractControl {
    return this.formRegister.get('verify_email');
  }
  get password(): AbstractControl {
    return this.formRegister.get('password');
  }
  get verify_pass(): AbstractControl {
    return this.formRegister.get('verify_pass');
  }

  // Custom validation functions
  validateVerifyEmail( control: AbstractControl ) {
    const form = control.parent;
    if ( form ) {
      const cond = (form.get('email').value === form.get('verify_email').value)
      if ( cond ) {
        return null;
      } else {
        return { emailMatch: true};
      }

    }
  }

  validateVerifyPass( control: AbstractControl ) {
    const form = control.parent;
    if ( form ) {
      const cond = form.get('password').value === form.get('verify_pass').value;
      if ( cond ) {
        return null;
      } else {
        return { required: true };
      }
    }
  }

}
