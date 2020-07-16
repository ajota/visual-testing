import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { PassDataService } from '../../util/pass-data.service';
import { nameRoutes } from '../../util/name-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-update-mobile',
  templateUrl: './form-update-mobile.component.html',
  styleUrls: ['./form-update-mobile.component.scss']
})
export class FormUpdateMobileComponent implements OnInit {

  @Output() eventSubmitMobileForm = new EventEmitter();
  regFieldsExp = {
    regPass: this.mapLanguagePipe.transform('str_regular_expression_phone_number_validation')
  };

  constructor( private mapLanguagePipe: MapConfigBasePipe,
               private passDataService: PassDataService) { }
  formUpdateMobile = new FormGroup({
    phone: new FormControl('', [Validators.required,
      Validators.pattern(this.regFieldsExp.regPass)]),
    verify_phone: new FormControl('', [Validators.required, this.validateVerifyPhone])
  });

  ngOnInit() {
  }

  onSubmitForm() {
    if (this.phone.value === this.verify_phone.value) {
      this.passDataService.setData(this.phone.value, 'updateData');
      this.eventSubmitMobileForm.emit(this.formUpdateMobile.value);
      this.formUpdateMobile.reset();
    }
  }

  get phone(): AbstractControl {
    return this.formUpdateMobile ? this.formUpdateMobile.get('phone')  : undefined ;
  }

  get verify_phone(): AbstractControl {
    return this.formUpdateMobile ? this.formUpdateMobile.get('verify_phone')  : undefined ;
  }

  validateVerifyPhone( control: AbstractControl ) {
    const form = control.parent;
    if ( form ) {
      const cond = form.get('phone').value === form.get('verify_phone').value;
        if ( cond ) {
          return null;
        } else {
          return { mobileMatch: true};
        }

    }
  }
}
