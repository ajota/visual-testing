import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { nameRoutes } from '../../util/name-routes';

@Component({
  selector: 'app-form-identity-validation',
  templateUrl: './form-identity-validation.component.html',
  styleUrls: ['./form-identity-validation.component.scss']
})
export class FormIdentityValidationComponent implements OnInit {

  @Output() eventSubmitIdentityValidation = new EventEmitter();
  @Output() eventTypeTokenProcess = new EventEmitter();
  @Input() set showControls( value ) { this.controls = value; }

  get showControls() {
    this.activateUniqueControl();
    return this.controls;
  }
  nameRoutes = nameRoutes;
  controls: any[];
  formIdentityValidation = new FormGroup({
    validation_type: new FormControl( '', [Validators.required])
  });



  constructor() { }

  ngOnInit() {
  }

  activateUniqueControl() {
    if ( this.controls.length === 1 ) {
      const firstItem = this.controls[0];
      this.validation_type.setValue( firstItem );
    }
  }

  onSubmitForm() {
    const value = this.validation_type.value;
    if ( value != null ) {
      this.eventSubmitIdentityValidation.emit(value.media);
    }
  }

  maskValue( value: string ){
    const maskForEmail = /(?![@\.])(^.{3})?.(\b...)?/g;
    const maskForMobile = /\d(?!\d{0,2}$)/g;
    const isEmail = value.search('@') >= 0;
    return (isEmail) ? value.replace(maskForEmail, '$1*$2') : value.replace(maskForMobile, '*') ;
  }

  get validation_type() {
    return this.formIdentityValidation.get( 'validation_type' );
  }
}
