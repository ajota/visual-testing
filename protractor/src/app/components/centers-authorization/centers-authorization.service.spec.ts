import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CentersAuthorizationService } from './centers-authorization.service';
import { endpoint, requestURL } from '../../../environments/environment';
import { VerifyEmailResponse, VerifyEmailRequest, CentersAuthorization, CentersAuthorizationResponse, CentersAuthorizationTextResponse, VerifyAccountRequest, ChangePasswordResponse } from './centers-authorization.model';


const mockResponseFormat = {
  function: '',
  errorCode: 0,
  message: '',
  country: 'co',
};

describe('CentersAuthorizationService', () => {
  let service: CentersAuthorizationService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get( CentersAuthorizationService );
    backend = TestBed.get( HttpTestingController );
  });

  it('Should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('Should initiate with public variables', () => {
    expect( service.endpoint ).toEqual( endpoint.credinet );
  });

  it('Should verify the sent email', (done) => {
    const mockRequest: VerifyEmailRequest = {
      paramToken: ''
    };

    const MockVerifiedEmailResp: VerifyEmailResponse = {
      ...mockResponseFormat,
      data: true
    };

    service.postVerifyEmail( mockRequest ).subscribe( res => {
      expect(res.data).toBeTruthy();
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.postVerifyEmail}`)
           .flush( MockVerifiedEmailResp );
  });

  it('Should call the appropiate API', (done) => {
    const MockCentersAuthorization: CentersAuthorization = {
      paramToken: 'asdadsasñkasd61456456454sad564a6ds456as4dsa',
      authorize: true
    };

    const MockCentersAuthorizationResp: CentersAuthorizationResponse = {
      ...mockResponseFormat,
      data: true
    };

    service.getAuthorizationCenters( MockCentersAuthorization ).subscribe( res => {
      expect(res.data).toBeTruthy();
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.postAutorizationCenters}`)
           .flush( MockCentersAuthorizationResp );
  });

  it('Should get the text from API', (done) => {
    const mockAuthorizationTextResp: CentersAuthorizationTextResponse = {
      ...mockResponseFormat,
      data: {
        country: '', lang: '', deviceType: '', appVersion: '', updateAppUrl: '',
        textBase: [ { label: '', type: '', value: 'authtext'}]
      }
    };

    service.getCentersAuthorizationText( ).subscribe( res => {
      expect(res).toEqual('authtext');
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.getCentersAuthorizationText}`)
           .flush( mockAuthorizationTextResp );
  });

  it('Should call the API to change the password', (done) => {
    const mockVerifyAccount: VerifyAccountRequest = {
      paramToken: 'dsadasdsaahdsda56s4d4sa56d4asd6sa564da',
      password: '123456',
      confirmPassword: '123456',
      t: ''

    }

    const mockVerifyAccountResp: ChangePasswordResponse = {
      ...mockResponseFormat,
      data: {
        email: 'ajota06@gmail.com',
        changedPassword: true
      }
    };

    service.postChangePassword( mockVerifyAccount  ).subscribe( res => {
      expect(res.data.email).toEqual('ajota06@gmail.com');
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.postChangePassword}`)
           .flush( mockVerifyAccountResp );
  });

});
