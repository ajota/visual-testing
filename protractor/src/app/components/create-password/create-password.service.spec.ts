import { TestBed, ComponentFixture } from '@angular/core/testing';

import { CreatePasswordService } from './create-password.service';
import { AppModule } from 'src/app/app.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreatePasswordComponent } from './create-password.component';
import { Router } from '@angular/router';
import { RequestParams } from './create-password.model';
import { HttpBackend } from '@angular/common/http';
import { endpoint, requestURL } from 'src/environments/environment';



const MockRequestChangedPassword: RequestParams = {
  password: '1851',
  confirmPassword: '8',
  paramToken: '2'
};

describe('CreatePasswordService', () => {
  let component: CreatePasswordComponent;
  let fixture: ComponentFixture<CreatePasswordComponent>;
  let backend: HttpTestingController;
  let service: CreatePasswordService;

  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [
       AppModule,
       HttpClientTestingModule
     ]
   })
    .compileComponents(),
      fixture = TestBed.createComponent(CreatePasswordComponent),
      component = fixture.componentInstance,
      backend = TestBed.get(HttpTestingController),
      service = TestBed.get(CreatePasswordService);
   return {fixture};
  });

  it('should be created', () => {
    expect(service.postChangePassword).toBeTruthy();
  });

  it('Should initiate with public variables', () => {
    expect(service.endpoint).toEqual( endpoint.credinet );
  });

  it('should be changed password', (done) => {
    service.postChangePassword(MockRequestChangedPassword).subscribe( res => {
      expect(res).toBeTruthy();
      done();
    });

    backend.expectOne(`${service.endpoint}${requestURL.postChangePassword}`)
    .flush( MockRequestChangedPassword );
  });
});
