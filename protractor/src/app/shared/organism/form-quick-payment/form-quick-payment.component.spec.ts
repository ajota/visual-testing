import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuickPaymentComponent } from './form-quick-payment.component';

describe('FormQuickPaymentComponent', () => {
  let component: FormQuickPaymentComponent;
  let fixture: ComponentFixture<FormQuickPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuickPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuickPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
