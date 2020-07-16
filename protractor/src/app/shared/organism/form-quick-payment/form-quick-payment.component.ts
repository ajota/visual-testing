import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-quick-payment',
  templateUrl: './form-quick-payment.component.html',
  styleUrls: ['./form-quick-payment.component.scss']
})
export class FormQuickPaymentComponent implements OnInit {

  @Output() eventSubmitPayment = new EventEmitter();
  @Output() eventBackButton = new EventEmitter();
  @Input() creditInfo;
  @Input() userInfo;
  maxPayValue = 0;
  minPayValue = 5000;
  customValueDisabled = true;
  formPayment: FormGroup;


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.maxPayValue = this.creditInfo.valueMax;
    this.formPayment = this.fb.group({
      idCredit: this.creditInfo.id,
      creditValue: ['', [Validators.required, Validators.max(this.maxPayValue), Validators.min(this.minPayValue)]],
    });
  }

  onSubmitForm(event) {
    event.preventDefault();
    this.eventSubmitPayment.emit(this.formPayment.value);
  }

  get creditValue(): AbstractControl {
    return this.formPayment.get('creditValue');
  }


  validateInput( $event ) {
    const value = $event.target.value;
    this.creditValue.setValue($event.target.value);
    if (!((this.creditInfo.valueMax  - value) >= this.minPayValue) ) {
      $event.preventDefault();
      this.creditValue.setErrors({required: true});
      return;
    }
    this.creditValue.setErrors(null);
    this.creditValue.updateValueAndValidity();
  }
}
