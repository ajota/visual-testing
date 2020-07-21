import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentityValidationComponent } from './identity-validation.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { IdentityValidationService } from './identity-validation.service';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { of } from 'rxjs';
import { CustomerInformation } from '../register-request/register-credit.model';

const MockresponseFrame = {
  function: 'string',
  errorCode: 0,
  message: 'string',
  country: 'string',
};

const MockCustomerInformation = {
  ...MockresponseFrame,
  data: {
    customerId: '01',
    email: 'porlemai@pointmail.com',
    idDocument: '123456',
    nextScreen: 1,
    phoneNumber: '',
    requestStatus: 2,
    typeDocument: 'CC'
  }
};


const ModckNidData = {
  nid_type: 'CC',
  nid: '0002256456',
  verify_nid: '0002256456'
};

const CustomerInformationResponse: CustomerInformation = MockCustomerInformation;

class MockPassDataService {
  getData() {
    return {formData: ModckNidData};
  }
  setData( data ) {}
}
class MockIdentityValidationService {

  sendToken( nid, typeToken ) {
    return of({
      data: {        customerId: '01',
        email: 'porlemai@pointmail.com',
        idDocument: '123456',
        nextScreen: 1,
        phoneNumber: '6543',
        requestStatus: 2,
        typeDocument: 'CC',
      }
    });
  }

  getCustomerInformation( nid, email ) {
    return of(CustomerInformationResponse);
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('This component (identityValidationComponent) should initializate with this default data', () => {
  let component: IdentityValidationComponent;
  let fixture: ComponentFixture<IdentityValidationComponent>;
  let httpTestingController: HttpTestingController;
  let service: IdentityValidationService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule
      ],

      providers: [IdentityValidationComponent,
        {provide: IdentityValidationService, useClass: MockIdentityValidationService},
        {provide: PassDataService, useClass: MockPassDataService}
      ],
    })
    .compileComponents();
    fixture = TestBed.createComponent(IdentityValidationComponent),
    component = fixture.componentInstance;
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(IdentityValidationService);
    router = TestBed.get(Router);
    return {fixture};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate this global variables ', () => {
    expect(component.nid).toBeUndefined();
    expect(component.nidType).toBeUndefined();
    expect(component.customerData).toBeUndefined();
    expect(component.showComunicationControls).toEqual([]);
    expect(component.userEmail).toBeUndefined();
  });

  it('should be prepare Customer Information calling the prepareCustomerInfo method', () => {

    expect(component.showComunicationControls).toEqual([]);

    component.ngOnInit();

    expect(component.nid).toEqual( ModckNidData );
    expect(component.customerData).toEqual( MockCustomerInformation );
    expect(component.showComunicationControls.length).toEqual(2);

  });


  // it('should be executed the method (showNotificationUpdate)', () => {
  //   expect(component.showNotificationUpdateData());
  // });

  it('should be executed the method (sendFormIdentityValidation', () => {
    component.ngOnInit();

    let formData = 'Mobile';
    component.sendFormIdentityValidation(formData);

    formData = 'Email';
    component.sendFormIdentityValidation(formData);

    const nid = '151';
    const typeToken = 'SMS';
    const token = service.sendToken(nid, typeToken);

    expect(token).toBeDefined();

  });
});
