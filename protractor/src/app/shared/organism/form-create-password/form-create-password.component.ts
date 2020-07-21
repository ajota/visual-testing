import { Component, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';


@Component({
  selector: 'app-form-create-password',
  templateUrl: './form-create-password.component.html',
  styleUrls: ['./form-create-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormCreatePasswordComponent {

  @Output() eventSubmitRegister = new EventEmitter();

  regFieldsExp = {
    regPass: this.mapLanguagePipe.transform('str_regular_expression_password_validation')
  };


  constructor(
    private mapLanguagePipe: MapConfigBasePipe
  ) { }

  formRegister = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.pattern(this.regFieldsExp.regPass )]),
    verify_pass: new FormControl('', [Validators.required])
  });

  onSubmitForm() {
    if (
      this.formRegister.get('password').value ===
      this.formRegister.get('verify_pass').value
    ) {
      this.eventSubmitRegister.emit(this.formRegister.value);
    }
  }

  get password(): AbstractControl {
    return this.formRegister.get('password');
  }
  get verify_pass(): AbstractControl {
    return this.formRegister.get('verify_pass');
  }

  validateVerifyEmail( control: AbstractControl ) {
    const form = control.parent;
    if ( form ) {
      const cond = form.get('password').value === form.get('verify_pass').value;
      if ( cond ) {
        return null;
      } else {
        return { emailMatch: true};
      }

    }
  }
}
