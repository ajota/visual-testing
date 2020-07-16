import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { endpoint, requestURL } from '../../../environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';

const mockUser = {
  username: 'asd@mail.com',
  password: 'asd123*',
  token: 'aljqQlslspdlkkd344'
};

const mockRequest = {
  access_token: `eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5M2M1Y2ZjNzJlMz
A3ZmM1NzY3NzcxYzk4YzY0MzUxIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1N
zAxMzE4MzIsImV4cCI6MTU3MDEzNTQzMiwiaXNzIjoiaHR0cDovL2xvY
2FsaG9zdDo1ODQ0NSIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjU
4NDQ1L3Jlc291cmNlcyIsImFwaTEiXSwiY2xpZW50X2lkIjoiY2xpZW50Ii
wic3ViIjoiM2QwZGUwZDgtYTZhMC00ZDdkLTk4NTEtYTJmYWY1NTIz
ZTM0IiwiYXV0aF90aW1lIjoxNTcwMTMxODMyLCJpZHAiOiJsb2NhbCIsI
nNjb3BlIjpbImFwaTEiXSwiYW1yIjpbInB3ZCJdfQ.nB4_eLu8NutHYkj44CLFSLr7rHzh1
KvPMgY3LWfmk9hO-KTDbZ9lQDmnXAHoRm83H-2npJfwn16jcD3HQxY2nPXtlQO
pXtvDsWrKqO6lSpDGkd7SYLzt_Qrl223rzsqinReEVak6AboiaL_RihjZP3wrRw_A_X2V_
pU6O6WoNukxHK4TMMUO4bmCUXAw8Yx9cKrRzEEoNv1KDGHYR3KYjQbwlu7zh09E6
IdZPW2eZwESNIKX5ljlmg0E76M8-FEaiUYcqERJc2onHzwV54pppPr23g_FenZpShl9-v-_v
_bi_dcfCRVaKPhuv-0MLGeEQnZGF4-DewMNFnHt7J-Wtw`,
  expires_in: 3600,
  scope: 'api1',
  token_type: 'Bearer'
};

class MockAngularFirebase {
  database;
  scheduler;

  list(){}
}

describe('LoginService', () => {
  let service: LoginService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AngularFireDatabase, useClass: MockAngularFirebase}
      ]
    });
    service = TestBed.get(LoginService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Shoukd get params to request service', () => {
    expect(service.endpoint).toEqual(endpoint.credinet);
    expect(service.url).toEqual(requestURL.postLoginUser);
  });

  it('Should Login user', done => {
    service.postLogin(mockUser).subscribe(res => {
      expect(res).toEqual(mockRequest);
      done();
    });

    backend
      .expectOne({
        method: 'POST',
        url: `${service.endpoint}${service.url}`
      })
      .flush(mockRequest);
  });

  it('Shoul isLoggeId', () => {
    expect(service.isLoggedIn).toBeFalsy();
  });
});
