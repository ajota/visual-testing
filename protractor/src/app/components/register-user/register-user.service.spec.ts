import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { RegisterUserService } from './register-user.service';
import { endpoint, requestURL } from 'src/environments/environment';
import { ValidEmail } from './register-user.model';

const mockUser = {
  id: '',
  name: 'asd',
  email: 'asd@mail.com',
  confirmEmail: 'asd@mail.com',
  password: 'asdasd',
  confirmPassword: 'asdasd',
  enabled: false
};

const mockUserEmail: ValidEmail = { string: 'ajota06@test.com'};

const mockRequest = {
  function: '/api/Account/Register',
  errorCode: 0,
  message: '',
  country: 'co',
  data: {
    id: '',
    name: 'Usuario Prueba',
    email: 'usuarioprueba@gmail.com',
    confirmemail: 'usuarioprueba@gmail.com',
    password: 'UsuarioPrueba123*',
    confirmpassword: 'UsuarioPrueba123*',
    enabled: 'false'
  }
};

const mockValidEmail = true;

describe('RegisterUserService', () => {
  let service: RegisterUserService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(RegisterUserService);
    backend = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Shoukd get params to request service', () => {
    expect(service.endpoint).toEqual(endpoint.credinet);
  });

  it('Should register user', done => {
    service.postRegisterUser(mockUser).subscribe(res => {
      expect(res).toEqual(mockRequest);
      done();
    });

    backend
      .expectOne({
        method: 'POST',
        url: `${service.endpoint}${requestURL.postRegisterUser}`
      })
      .flush(mockRequest);
  });

  it('Should valid the user e-mail', done => {
    service.postValidEmail( mockUserEmail.string ).subscribe(res => {
      expect(res).toEqual(mockRequest);
      done();
    });

    backend
      .expectOne({
        method: 'POST',
        url: `${service.endpoint}${requestURL.postValidEmail}`
      })
      .flush(mockRequest);
  });
});
