import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDetailComponent } from './credit-detail.component';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { CommonModule } from '@angular/common';
import { CardDetailCreditComponent } from 'src/app/shared/organism/card-detail-credit/card-detail-credit.component';
import { FormPaymentComponent } from 'src/app/shared/organism/form-payment/form-payment.component';
import { SafeUrlPipe } from 'src/app/shared/pipes/safe-url.pipe';
import { ScModalComponent } from 'src/app/shared/molecules/sc-modal/sc-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentsComponent } from '../payments/payments.component';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';

describe('CreditDetailComponent', () => {
  let component: CreditDetailComponent;
  let fixture: ComponentFixture<CreditDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full' }])
      ],
      declarations: [
        PaymentsComponent,
        CreditDetailComponent,
        CardDetailCreditComponent,
        ScModalComponent,
        FormPaymentComponent,
        MapConfigLangPipe,
        MapConfigBasePipe,
        SafeUrlPipe
      ],
      providers: [ MapConfigBasePipe, MapConfigLangPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
