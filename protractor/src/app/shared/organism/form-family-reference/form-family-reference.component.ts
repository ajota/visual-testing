import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-family-reference',
  templateUrl: './form-family-reference.component.html',
  styleUrls: ['./form-family-reference.component.scss']
})
export class FormFamilyReferenceComponent implements OnInit {

  @Output() eventSubmitForm = new EventEmitter();
  @Input() listOptions;
  @Input() listCities;
  @Input() cities;
  selectOptions = [];

  regFieldsExp = {
    regName: this.mapConfigBase.transform(
      'str_regular_expression_name_validation'
    ),
    regPhone: this.mapConfigBase.transform('str_regular_expression_phone_number_validation')
  };

  formFamilyReference = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(this.regFieldsExp.regName)
    ]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl(''),
    relationship: new FormControl('', Validators.required)
  });

  constructor(
    private mapConfigBase: MapConfigBasePipe
  ) {}

  ngOnInit() {
    this.getlistValues();
  }

  onSubmitForm() {
    if (this.relationship.value != this.selectOptions[0]) {
      this.eventSubmitForm.next(this.formFamilyReference.value);
      this.formFamilyReference.reset();
      this.relationship.setValue(this.selectOptions[0]);
      this.city.setValue('');
    }
    this.listCities = this.listCities;
  }

  get name(): AbstractControl {
    return this.formFamilyReference.get('name');
  }

  get phone(): AbstractControl {
    return this.formFamilyReference.get('phone');
  }

  get city(): AbstractControl {
    return this.formFamilyReference.get('city');
  }

  get relationship(): AbstractControl {
    return this.formFamilyReference.get('relationship');
  }

  getlistValues() {
    if ( this.listOptions ) {
      const tempOptions = Object.assign({}, ...this.listOptions);
      const selectValues = tempOptions.question.properties.filter(item => item.property == 'listOptionsReference');
      this.selectOptions = selectValues[0].value.split('|');
      this.relationship.setValue(this.selectOptions[0]);
    }
  }

  validatePhone(event) {
    const regExp = new RegExp(this.regFieldsExp.regPhone);
    const value = event.target.value.replace(/\s*$/, '');
    if (regExp.test(value)) {
      this.phone.clearValidators();
    } else {
      this.phone.setValidators([Validators.pattern(this.regFieldsExp.regPhone)]);
    }
    this.phone.setValue(value);
    this.formFamilyReference.updateValueAndValidity();
  }
}
