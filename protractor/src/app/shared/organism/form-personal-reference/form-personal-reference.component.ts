import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-personal-reference',
  templateUrl: './form-personal-reference.component.html',
  styleUrls: ['./form-personal-reference.component.scss']
})
export class FormPersonalReferenceComponent implements OnInit {

  @Output() eventSubmitForm = new EventEmitter();
  @Input() listOptions;
  @Input() listCities;
  @Input() cities;
  selectOptions = [];
  regFieldsExp = {
    regName: this.mapConfigBase.transform(
      'str_regular_expression_name_validation'
    ),
    regPhone: this.mapConfigBase.transform('str_regular_expression_phone_validation')
  };

  formPersonalReference = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regFieldsExp.regName)
    ]),
    phone: new FormControl('', [Validators.required, Validators.pattern(this.regFieldsExp.regPhone)]),
    city: new FormControl(''),
    relationship: new FormControl('', Validators.required)
  });

  constructor(
    private mapConfigBase: MapConfigBasePipe
  ) {
  }

  ngOnInit() {
    this.getlistValues();
  }

  onSubmitForm() {
    if (this.relationship.value != this.selectOptions[0]) {
      this.eventSubmitForm.next(this.formPersonalReference.value);
      this.formPersonalReference.reset();
      this.relationship.setValue(this.selectOptions[0]);
      this.city.setValue('');
    }
    this.listCities = this.listCities;
  }

  get name(): AbstractControl {
    return this.formPersonalReference ? this.formPersonalReference.get('name') : undefined ;
  }

  get phone(): AbstractControl {
    return this.formPersonalReference ? this.formPersonalReference.get('phone')  : undefined ;
  }

  get city(): AbstractControl {
    return this.formPersonalReference ? this.formPersonalReference.get('city') : undefined ;
  }

  get relationship(): AbstractControl {
    return this.formPersonalReference ? this.formPersonalReference.get('relationship') : undefined ;
  }

  getlistValues() {
    if ( this.listOptions ) {
      const tempOptions = Object.assign({}, ...this.listOptions);
      const selectValues = tempOptions.question.properties.filter(item => item.property == 'listOptionsReference');
      this.selectOptions = selectValues[0].value.split('|');
      this.relationship.setValue(this.selectOptions[0]);
    }
  }

  validateCity(value) {
    const isValidCity = this.listCities.filter(city => value === city.name);
    if (value === '' || isValidCity.length > 0) {
      this.city.setValue(value);
      this.city.clearValidators();
    } else {
      this.city.setErrors(Validators.required);
    }
    this.formPersonalReference.updateValueAndValidity();
  }
}
