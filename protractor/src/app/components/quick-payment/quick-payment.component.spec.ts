import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPaymentComponent } from './quick-payment.component';
import { CommonModule } from '@angular/common';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { FormSearchCreditsComponent } from 'src/app/shared/organism/form-search-credits/form-search-credits.component';
import { ScSelectCreditComponent } from 'src/app/shared/molecules/sc-select-credit/sc-select-credit.component';
import { FormPaymentComponent } from 'src/app/shared/organism/form-payment/form-payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { ScControlComponent } from 'src/app/shared/molecules/sc-control/sc-control.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentsComponent } from '../payments/payments.component';

describe('QuickPaymentComponent', () => {
  let component: QuickPaymentComponent;
  let fixture: ComponentFixture<QuickPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentsComponent,
        QuickPaymentComponent,
        MapConfigBasePipe,
        FormSearchCreditsComponent,
        ScSelectCreditComponent,
        FormPaymentComponent,
        MapConfigLangPipe,
        ScControlComponent],
    imports: [CommonModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
  })
  .compileComponents();
    fixture = TestBed.createComponent(QuickPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
