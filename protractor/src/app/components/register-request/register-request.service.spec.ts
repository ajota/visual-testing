import { TestBed } from '@angular/core/testing';

import { RegisterRequestService } from './register-request.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { requestURL, endpoint } from 'src/environments/environment';
import { NidData } from './register-credit.model';

describe('RegisterRequestService', () => {
  let service: RegisterRequestService;
  let MockBackend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.get(RegisterRequestService);
    MockBackend = TestBed.get( HttpTestingController );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initiate width', () => {
    expect(service.urls.getCustomerParams).toBeTruthy(requestURL.getCustomerParams);
    expect(service.urls.getRequestById).toBeTruthy(requestURL.getRequestByIdDocument);
    expect(service.urls.postSavePhoto).toBeTruthy(requestURL.postSavePhotoChat);
  });

  it('should be created', ( done ) => {
    const mockResponse = {};
    const mockRequest: NidData = {
      verify_nid: 'string',
      nid_type: 'string',
      nid: 'string'
    };

    service.getCustomerInformation( mockRequest, 'ajota06@yopmail.com' ).subscribe( (resp) => {
      expect(resp).toBeDefined();
      done();
    });

    MockBackend.expectOne(`${endpoint.credinet}${requestURL.getCustomerByIdDocumentAndTypeDocument}?idDocument=string&typeDocument=string&email=ajota06@yopmail.com`)
               .flush( mockResponse );
  });

});
