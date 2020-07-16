import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidator } from '@angular/forms';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';

@Component({
  selector: 'app-form-job-reference',
  templateUrl: './form-job-reference.component.html',
  styleUrls: ['./form-job-reference.component.scss']
})
export class FormJobReferenceComponent implements OnInit {

  @Input() listOptions;
  @Input() listCities;
  @Input() cities;
  @Output() eventSubmitForm = new EventEmitter();
  ocupationOptions = [];
  salaryOptions = [];
  roleOptions = [];
  availableInput = false;

  regFieldsExp = {
    regName: this.mapConfigBase.transform(
      'str_regular_expression_name_validation'
    ),
    regPhone: this.mapConfigBase.transform('str_regular_expression_phone_number_validation')
  };

  formJobReference = new FormGroup({
    ocupation: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    business: new FormControl('', [
      Validators.pattern(this.regFieldsExp.regName)
    ]),
    phone: new FormControl(''),
    city: new FormControl(''),
    role: new FormControl('')
  });

  constructor(
    private mapConfigBase: MapConfigBasePipe
  ) {}

  ngOnInit() {
    this.getOcupationValues();
    this.getSalaryValues();
    this.getRoleValues();
  }

  onSubmitForm() {
    this.eventSubmitForm.next(this.prepareReference);
    this.formJobReference.reset();
    this.ocupation.setValue(this.ocupationOptions[0]);
    this.salary.setValue(this.salaryOptions[0]);
    this.role.setValue(this.roleOptions[0]);
    this.city.setValue('');
    this.business.setErrors(null);
  }

  get ocupation(): AbstractControl {
    return this.formJobReference.get('ocupation');
  }

  get salary(): AbstractControl {
    return this.formJobReference.get('salary');
  }

  get business(): AbstractControl {
    return this.formJobReference.get('business');
  }

  get phone(): AbstractControl {
    return this.formJobReference.get('phone');
  }

  get city(): AbstractControl {
    return this.formJobReference.get('city');
  }

  get role(): AbstractControl {
    return this.formJobReference.get('role');
  }

  getOcupationValues() {
    this.ocupationOptions = this.filterValues('listOptionsReference');
    if ( this.ocupationOptions ) {
      this.ocupation.setValue(this.ocupationOptions[0]);
    }
  }

  getSalaryValues() {
    this.salaryOptions = this.filterValues('listReferenceSalary');
    if ( this.salaryOptions ) {
      this.salary.setValue(this.salaryOptions[0]);
    }
  }

  getRoleValues() {
    this.roleOptions = this.filterValues('listJobTitle');
    if ( this.roleOptions ) {
      this.role.setValue(this.roleOptions[0]);
    }
  }

  filterValues(propertyFilter) {
    if ( this.listOptions ) {
      const tempOptions = Object.assign({}, ...this.listOptions);
      const selectValues = tempOptions.question.properties.filter(item => item.property === propertyFilter);
      return selectValues[0].value.split('|');
    }
  }

  showInputForm() {
    if (this.ocupation.value === this.ocupationOptions[1] ) {
     this.business.setValidators([Validators.required]);
     this.role.setValidators([Validators.required]);
     this.phone.setValidators([Validators.required, Validators.pattern(this.regFieldsExp.regPhone) ]);
     this.availableInput = true;
    } else {
      this.business.clearValidators();
      this.role.clearValidators();
      this.phone.clearValidators();
      this.availableInput = false;
    }
    this.formJobReference.updateValueAndValidity();
  }

  get validateReference() {
    const tempRegEx = new RegExp(this.regFieldsExp.regPhone);
    let validBussines;
    let validRole;
    let validPhone;
    const validOcupation = this.ocupation.value !== this.ocupationOptions[0];
    const validSalary = this.salary.value !== this.salaryOptions[0];

    if (this.availableInput) {
      validBussines = this.business.value !== '';
      validRole = this.role.value !== this.roleOptions[0];
      validPhone = tempRegEx.test(this.phone.value);
    } else {
      validBussines = true;
      validRole = true;
      validPhone = true;
    }
    return (validOcupation && validSalary && validRole && validBussines && validPhone) ? true : false;
  }
  get prepareReference() {
    let reference = {};
    if (this.ocupation.value === this.ocupationOptions[1] || this.ocupation.value === this.ocupationOptions[2]) {
      return this.formJobReference.value;
    } else {
      reference = {
        ocupation: this.ocupation.value,
        salary: this.salary.value,
        business: '',
        phone: '',
        role: ''
      };
      return reference;
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
    this.formJobReference.updateValueAndValidity();
  }

}
