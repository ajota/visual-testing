import { TestBed } from '@angular/core/testing';
import { IdentityValidationService } from './identity-validation.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { endpoint, requestURL } from 'src/environments/environment';
import { NidData } from '../register-request/register-credit.model';
import { CustomerInformation } from './identity-validation.model';

const MockNidRequest: NidData =  {
  verify_nid: '101010',
  nid_type: 'CC',
  nid: '101010'
};

const MockcustomerInfoResponse: CustomerInformation = {
  function: '/api/customer/getcustomerbyiddocumentandtypedocument',
  errorCode: 0,
  message: '',
  country: 'CO',
  data: {
    customerId: '',
    idDocument: '101010',
    typeDocument: 'CC',
    email: 'siste@siste.com',
    phoneNumber: '',
    requestStatus: 0,
    nextScreen: 1
  }
};


describe('IdentityValidationService', () => {
  let service: IdentityValidationService;
  let backend: HttpTestingController;
  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
   });
   service = TestBed.get(IdentityValidationService);
   backend = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get params to request service', () => {
    expect(service.endpoint).toEqual(endpoint.credinet);
  });

  it('should get customer information (getCustomerInformation)', (done) => {
    const email = 'siste@siste.com';
    service.getCustomerInformation(MockNidRequest, email).subscribe( res => {
      expect(res.data).toBeTruthy();
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.getCustomerByIdDocumentAndTypeDocument}?idDocument=${MockNidRequest.verify_nid}&typeDocument=${MockNidRequest.nid_type}&email=${email}`)
     .flush( MockcustomerInfoResponse );
  });

  // it('should sendtoken (sendToken)', (done) => {
  //   const typeValidation = 'Mobile';
  //   service.sendToken(MockNidRequest, typeValidation ).subscribe( res => {
  //     expect(res.data).toBeTruthy();
  //     done();
  //   });

  //   backend.expectOne(`${service.endpoint}${requestURL.getCustomerByIdDocumentAndTypeDocument}?idDocument=${MockNidRequest.verify_nid}&typeDocument=${MockNidRequest.nid_type}&email=${email}`)
  //     .flush( MockcustomerInfoResponse );
  // });
});
