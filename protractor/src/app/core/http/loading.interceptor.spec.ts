import { TestBed } from '@angular/core/testing';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { InitialConfigService } from '.';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../loading/loading.service';


describe('Interceptor', () => {
  let serviceLoading: LoadingService;
  let serviceInitConfig: InitialConfigService;
  let httpMock: HttpTestingController;
  let interceptor: LoadingInterceptor;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LoadingService,
        InitialConfigService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        }
      ]
    });

    serviceLoading = TestBed.get(LoadingService);
    serviceInitConfig = TestBed.get(InitialConfigService);
    httpMock = TestBed.get(HttpTestingController);
    interceptor = TestBed.get(LoadingInterceptor);

  });

  it('Should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Should call the start method in LoadingService', () => {
    const spyLoading = spyOn(serviceLoading, 'start');

    serviceInitConfig.getConfigBase().subscribe( resp => {
      expect(resp).toBeDefined();
    });

    expect(spyLoading).toHaveBeenCalled();

    const httpRequest = httpMock.expectOne(`${serviceInitConfig.endpoint}${serviceInitConfig.configBase}`);
    httpRequest.flush({});

  });

});
