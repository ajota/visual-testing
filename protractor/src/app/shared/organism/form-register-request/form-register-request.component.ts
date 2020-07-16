import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-register-request',
  templateUrl: './form-register-request.component.html',
  styleUrls: ['./form-register-request.component.scss']
})

export class FormRegisterRequestComponent implements AfterViewInit {

  @Output() eventSubmitRegister = new EventEmitter();
  @Output() eventBackButton = new EventEmitter();

  regExpRules = {
    regDocumentCC: this.mapConfigBase.transform('str_regular_expression_document_cc_validation'),
    regDocumentCE: this.mapConfigBase.transform('str_regular_expression_document_ce_validation'),
  };

  constructor(private mapConfigBase: MapConfigBasePipe) { }

  formRegister = new FormGroup({
    nid_type: new FormControl( 'CC', [Validators.required]),
    nid: new FormControl('', [Validators.required]),
    verify_nid: new FormControl('', [Validators.required])
  });

  ngAfterViewInit() {
    this.nid_type.setValue('CC');
    this.validateNid('CC');
  }

  onSubmitForm() {
    if (
      this.formRegister.get('nid').value ===
      this.formRegister.get('verify_nid').value
    ) {
      this.eventSubmitRegister.emit(this.formRegister.value);
    }
  }

  get nid_type(): AbstractControl {
    return this.formRegister.get('nid_type');
  }
  get nid(): AbstractControl {
    return this.formRegister.get('nid');
  }
  get verify_nid(): AbstractControl {
    return this.formRegister.get('verify_nid');
  }

  validateVerifyEmail( control: AbstractControl ) {
    const form = control.parent;
    if ( form ) {
      const cond = form.get('nid').value === form.get('verify_nid').value;
      if ( cond ) {
        return null;
      } else {
        return { emailMatch: true};
      }

    }
  }

  validateNid( type ) {
    if ( type === 'CC') {
      this.nid.setValidators([Validators.required, Validators.pattern(this.regExpRules.regDocumentCC)]);
    }

    if ( type === 'CE' ) {
      this.nid.setValidators([Validators.required, Validators.pattern(this.regExpRules.regDocumentCE)]);
    }

    this.nid.updateValueAndValidity();
  }
}
