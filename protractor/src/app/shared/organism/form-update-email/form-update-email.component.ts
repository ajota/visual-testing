import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PassDataService } from '../../util/pass-data.service';

@Component({
  selector: 'app-form-update-email',
  templateUrl: './form-update-email.component.html',
  styleUrls: ['./form-update-email.component.scss']
})
export class FormUpdateEmailComponent implements OnInit {

  @Output() eventSubmitUpdateData = new EventEmitter();
  regFieldsExp = {
    regPass: this.mapLanguagePipe.transform('str_regular_expression_mail_validation')
  };

  constructor( private mapLanguagePipe: MapConfigBasePipe,
               private passDataService: PassDataService) { }
  formUpdateMail = new FormGroup({
    email: new FormControl('', [Validators.required, 
      Validators.pattern(this.regFieldsExp.regPass)]),
    verify_email: new FormControl('', [Validators.required, this.validateVerifyEmail])
  });

  ngOnInit() {
  }

  onSubmitForm() {
    if (this.email.value === this.verify_email.value) {
      this.passDataService.setData( this.email.value, 'updateData');
      this.eventSubmitUpdateData.emit(this.formUpdateMail.value);
      this.formUpdateMail.reset();
    }
  }

  get email(): AbstractControl {
    return this.formUpdateMail ? this.formUpdateMail.get('email')  : undefined ;
  }

  get verify_email(): AbstractControl {
    return this.formUpdateMail ? this.formUpdateMail.get('verify_email')  : undefined ;
  }

  validateVerifyEmail( control: AbstractControl ) {
    const form = control.parent;
    if ( form ) {
      const cond = form.get('email').value === form.get('verify_email').value;
      if ( cond ) {
        return null;
      } else {
        return { emailMatch: true};
      }

    }
  }
}
