import { TestBed } from '@angular/core/testing';

import { CreditsService } from './credits.service';
import { endpoint, requestURL } from '../../../environments/environment';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

const MockcustomerInfo = {
  function: '/api/Customer/GetInfoCustomer',
  errorCode: 0,
  message: '',
  country: 'co',
  data: {
    idDocument: '',
    typeDocument: '',
    firstName: 'saltaren9@gmail.com',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    amount: 0.0,
    amountAvailable: 0.0,
    urlPhoto: '',
    status: 0,
    arrearsCharge: false
  }
};

describe('CreditsService', () => {
  let service: CreditsService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(CreditsService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should get params to request service', () => {
    expect(service.endpoint).toEqual(endpoint.credinet);
  });

  it('should get customer information (getCustomerInformation)', (done) => {
    const email = 'saltaren9@gmail.com';
    service.getInfoCustomer(email).subscribe(res => {
      expect(res.data).toBeTruthy();
      done();
    });
    backend.expectOne(`${service.endpoint}${requestURL.getInfoCustomer}?email=${email}`)
      .flush(MockcustomerInfo);
  });

  it('should get customer information (getActiveCredits)', (done) => {
    const idCustomer = '123456789';
    service.getActiveCredits(idCustomer).subscribe(res => {
      expect(res.data).toBeTruthy();
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.getActiveCredits}?idCustomer=${idCustomer}`)
      .flush(MockcustomerInfo);
  });

  it('should get customer information (getHistoryCredits)', (done) => {
    const idCustomer = '123456789';
    service.getHistoryCredits(idCustomer).subscribe(res => {
      expect(res.data).toBeTruthy();
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.getHistoryCredits}?idCustomer=${idCustomer}`)
      .flush(MockcustomerInfo);
  });
});
