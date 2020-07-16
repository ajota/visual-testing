import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerRequestInformation } from '../../../components/identity-validation/identity-validation.model';
import { requestURL } from 'src/environments/environment';
import { ScValidateTokenService } from './sc-validate-token.service';

const StoreParams = {
  _id: '5145145',
  defaultStore: '54',
  defaultLevelConfigName: '454',
  defaultScStoreId: 'sf',
  defaultScUserStoreId: 'sf',
  defaultUserId: 'sf'
}


const MockStoreParams = {
  data: StoreParams
};

const MockTokenValidationData = {
  data: true
};

const MockrequestCustomerInformation = {
  function: '/api/customer/sendToken',
  errorCode: 0,
  message: '',
  country: 'CO',
  data: {
 customerId: '01',
  email: 'porlemai@pointmail.com',
  idDocument: '123456',
  nextScreen: 1,
  phoneNumber: '6543',
  requestStatus: 2,
  typeDocument: 'CC'
  }
};


const MockcustomerInfoResponse: CustomerRequestInformation = {
  function: '/api/customer/validateToken',
  errorCode: 0,
  message: '',
  country: '',
  data: null
};

describe('ScValidateTokenService', () => {
  let service: ScValidateTokenService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  });
    service = TestBed.get(ScValidateTokenService);
    backend = TestBed.get(HttpTestingController);
});

  it('should be created', () => {
    const service: ScValidateTokenService = TestBed.get(ScValidateTokenService);
    expect(service).toBeTruthy();
  });

  it('should get store params', () => {

    service.getStoreParams().subscribe(res => {
      expect(res.data).toBeTruthy();
    });
    backend.expectOne(`${service.endpoint}${requestURL.getCustomerParams}`)
   .flush( MockStoreParams );
  });

  it('should validate token', () => {
    const token = '123456';
    const typeToken = 'SMS';
    service.validateToken(token, MockrequestCustomerInformation).subscribe(res => {
      expect(res.data).toBeTruthy();
    });
    backend.expectOne(`${service.endpoint}${requestURL.postValidateToken}`)
      .flush( MockTokenValidationData );
  });

  it('should sendtoken (sendToken)', (done) => {

    service.sendToken(MockrequestCustomerInformation ).subscribe( res => {
      expect(res).toBeTruthy();
      done();
    });

  backend.expectOne(`${service.endpoint}${requestURL.postSendToken}`)
    .flush( MockcustomerInfoResponse );
  });
});
