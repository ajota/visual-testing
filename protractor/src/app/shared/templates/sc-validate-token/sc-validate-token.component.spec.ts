import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { nameRoutes } from 'src/app/shared/util/name-routes';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { FormValidateTokenComponent } from 'src/app/shared/organism/form-validate-token/form-validate-token.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScControlComponent } from 'src/app/shared/molecules/sc-control/sc-control.component';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScValidateTokenComponent } from './sc-validate-token.component';
import { ScValidateTokenService } from './sc-validate-token.service';

const MockCustomerInformation = {
  function: 'string',
  errorCode: 0,
  message: 'string',
  country: 'string',
  data: {
    customerId: '01',
    email: 'prueba@sistecredito.com',
    idDocument: '123456',
    nextScreen: 1,
    phoneNumber: '',
    requestStatus: 2,
    typeDocument: 'CC'
  }
};

class MockValidateTokenService {

  getStoreParams() {
    return of({
      data:  {
        defaultStore: '5d3ef068926fa600017dac26',
        defaultLevelConfigName: 'Colombia_Customer_Functions',
        defaultScStoreId: '1325',
        defaultScUserStoreId: '66619',
        defaultUserId: '5d601058bee48500010b063f',
        defaultMinPayment: '5000'
      }
    });
  }

  validateToken() {
    return of({
      function: '/api/Customer/ValidateToken',
      errorCode: 0,
      message: 'Object reference not set to an instance of an object.',
      country: 'co',
      data: true
    });
  }

  sendToken( nid, typeToken ) {
    return of({
      data: {        customerId: '01',
        email: 'porlemai@pointmail.com',
        idDocument: '123456',
        nextScreen: 1,
        phoneNumber: '6543',
        requestStatus: 2,
        typeDocument: 'CC'
      }
    });
  }
}

class MockPassDataService {
  getData() {
    return {data: MockCustomerInformation};
  }
  setData( data ) {}
}

describe('ValidateTokenComponent', () => {
  let component: ScValidateTokenComponent;
  let fixture: ComponentFixture<ScValidateTokenComponent>;
  let service: ScValidateTokenService;
  let notify: ScNotifyService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{path: '', redirectTo: '/', pathMatch: 'full'}]),
        HttpClientTestingModule
      ],
      providers: [ MapConfigLangPipe, MapConfigBasePipe,
        {provide: ScValidateTokenService, useClass: MockValidateTokenService},
        {provide: PassDataService, useClass: MockPassDataService},
      ],
      declarations: [
        ScValidateTokenComponent,
        FormValidateTokenComponent,
        ScControlComponent,
        MapConfigLangPipe,
        MapConfigBasePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(ScValidateTokenComponent);
    component = fixture.componentInstance;
    component.customerData = MockCustomerInformation;
    service = TestBed.get(ScValidateTokenService);
    router = TestBed.get(Router);
    notify = TestBed.get(ScNotifyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with default data', () => {
    expect(component.globalFormToken).toEqual('');
    expect(component.customerData).toBeDefined();
    expect(component.customerStatus).toBeUndefined();
    expect(component.email).toBeUndefined();
  });

  it('should be executed method getCustomerInformation', () => {
    component.ngOnInit();
    expect(component.customerData).toBeDefined();
  });

  it('the following cases should be covered (sendToken() || goBack() || ValidateToken) ' +
  'when executing validateFunctionToExecute', () => {

    component.globalFormToken = 'tokenTrue';
    spyOn(component, 'sendToken');
    component.validateFunctionToExecute(component.globalFormToken);
    expect(component.sendToken).toHaveBeenCalled();

    component.globalFormToken = 'backTrue';
    spyOn(component, 'goBack');
    component.validateFunctionToExecute(component.globalFormToken);
    expect(component.goBack).toHaveBeenCalled();

    component.globalFormToken = '';
    spyOn(component, 'validateToken');
    component.validateFunctionToExecute(component.globalFormToken);
    expect(component.validateToken).toHaveBeenCalled();
  });

  it('should sendToken', () => {
    component.globalFormToken = 'tokenTrue';
    spyOn(notify, 'open');
    component.validateFunctionToExecute(component.globalFormToken);
    component.sendToken();
    expect(notify.open).toHaveBeenCalled();

    spyOn(component, 'getCustomerInformation');
    component.globalFormToken = 'tokenTrue';
    component.validateFunctionToExecute(component.globalFormToken);
    component.sendToken();
    expect(component.getCustomerInformation).toHaveBeenCalled();
  });

  it('should validateToken', () => {
    spyOn(notify, 'open');

    component.validateToken(458698);
    expect(notify.open).toHaveBeenCalled();
  });

  it('should redirect according to client status', () => {

    spyOn(router, 'navigate');

    component.customerStatus = 1;
    component.redirectForCustomerStatus();
    expect(router.navigate).toHaveBeenCalledWith(['/' + nameRoutes.dashboard]);

    component.customerStatus = 4;
    component.redirectForCustomerStatus();
    expect(router.navigate).toHaveBeenCalledWith(['/' + nameRoutes.dashboard]);

    component.customerStatus = 2;
    component.redirectForCustomerStatus();
    expect(router.navigate).toHaveBeenCalledWith(['/' + nameRoutes.requestQuota]);
  });

  // it('should be called method goBack', () => {
  //   const isBack = 'backTrue';
  //   spyOn(router, 'navigate');
  //   component.goBack(isBack);
  //   expect(router.navigate).toHaveBeenCalledWith(['/' + nameRoutes.tokenRoot + '/' + nameRoutes.identityValidation]);
  // });
});
