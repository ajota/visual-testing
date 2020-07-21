import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-recovery-password',
  templateUrl: './form-recovery-password.component.html',
  styleUrls: ['./form-recovery-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FormRecoveryPasswordComponent {
  @Output() eventSubmitRecoveryPassword = new EventEmitter();

  regFieldsExp = {
    regPass: this.mapLanguagePipe.transform('str_regular_expression_password_validation')
  };

  formRecoveryPassword = new FormGroup({
    new_password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regFieldsExp.regPass ),
    ]),
    verify_new_password: new FormControl('', [Validators.required, this.validateVerifyPass ] )
  });

  constructor(
    private mapLanguagePipe: MapConfigBasePipe
  ) { }

  onSubmitForm() {
    if ( this.new_password.value === this.verify_new_password.value ) {
      this.eventSubmitRecoveryPassword.next(this.formRecoveryPassword.value);
    }
    this.formRecoveryPassword.reset();
  }

  get new_password(): AbstractControl {
    return this.formRecoveryPassword.get('new_password');
  }
  get verify_new_password(): AbstractControl {
    return this.formRecoveryPassword.get('verify_new_password');
  }

  validateVerifyPass( control: AbstractControl ) {
    const form = control.parent;
    if ( form ) {
      const cond = form.get('new_password').value === form.get('verify_new_password').value;
      if ( cond ) {
        return null;
      } else {
        return { required: true };
      }
    }
  }

}
