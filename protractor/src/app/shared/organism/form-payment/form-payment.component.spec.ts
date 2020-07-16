import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaymentComponent } from './form-payment.component';
import { AppModule } from 'src/app/app.module';

describe('FormPaymentComponent', () => {
  let component: FormPaymentComponent;
  let fixture: ComponentFixture<FormPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaymentComponent);
    component = fixture.componentInstance;
    component.creditInfo = {creditValue: ''};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
