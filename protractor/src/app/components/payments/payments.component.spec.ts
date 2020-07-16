import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormPaymentComponent } from 'src/app/shared/organism/form-payment/form-payment.component';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([{path: '', redirectTo: '', pathMatch: 'full' }]) ],
      declarations: [ FormPaymentComponent, PaymentsComponent, MapConfigLangPipe, MapConfigBasePipe ],
      providers: [MapConfigLangPipe, MapConfigBasePipe, {provide: ActivatedRoute, useValue: { snapshot: {queryParams: ''} }}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
