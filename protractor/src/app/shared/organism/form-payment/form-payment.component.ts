import { Component, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss']
})
export class FormPaymentComponent implements  OnInit {
  @Output() eventSubmitPayment = new EventEmitter();
  @Output() eventBackButton = new EventEmitter();
  @Input() creditInfo;

  maxPayValue = 0;
  minPayValue = 5000;
  customValueDisabled = true;
  params = this.route.snapshot.params;
  formPayment: FormGroup;


  constructor(private route: ActivatedRoute, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.maxPayValue = this.creditInfo.creditValue;
    this.formPayment = this.fb.group({
      idCredit: [this.params.id],
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
    if (!((this.creditInfo.totalPayment - value) >= this.minPayValue) ) {
      $event.preventDefault();
      this.creditValue.setErrors({required: true});
      return;
    }
    this.creditValue.setErrors(null);
    this.creditValue.updateValueAndValidity();
  }
}
