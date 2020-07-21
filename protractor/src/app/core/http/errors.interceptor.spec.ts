import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpResponse, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { InitialConfigService } from '.';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../loading/loading.service';
import { ErrorsInterceptor } from './errors.interceptor';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { throwError } from 'rxjs';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';

class Notify {
  open(){
    return true;
  }
}
describe('Errors Interceptor', () => {
  let serviceLoading: LoadingService;
  let serviceInitConfig: InitialConfigService;
  let httpMock: HttpTestingController;
  let interceptor: ErrorsInterceptor;
  let notify: ScNotifyService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LoadingService,
        InitialConfigService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorsInterceptor,
          multi: true
        },
        {
          provide: MapConfigBasePipe,
          useClass: MapConfigBasePipe
        },
        {
          provide: MapConfigLangPipe,
          useClass: MapConfigLangPipe
        },
        {
          provide: ScNotifyService,
          useClass: Notify
        }
      ]
    });

    serviceLoading = TestBed.get(LoadingService);
    serviceInitConfig = TestBed.get(InitialConfigService);
    notify = TestBed.get(ScNotifyService);
    httpMock = TestBed.get(HttpTestingController);
    interceptor = TestBed.get(ErrorsInterceptor);

  });

  it('Errors Interceptor Should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Errors Interceotor Should instatiate with', () => {
    expect(interceptor.intercept).toBeDefined();
    expect(interceptor.handleNotification).toBeDefined();
    expect(interceptor.activateNotify).toBeDefined();
  });


  it('handleNotification method Should activateNotify on success or error request', () => {
    const evt = new HttpResponse<any>({body: {error: 405 } });
    const error = new HttpErrorResponse({error: {errorCode: 405 } });

    const req = {} as HttpRequest<any>;
    const hand = {handle: () => throwError( error ) } as HttpHandler;

    spyOn(interceptor, 'activateNotify');

    interceptor.handleNotification( evt )
    expect(interceptor.activateNotify).toHaveBeenCalled();

    interceptor.intercept( req, hand ).subscribe();
    expect(interceptor.activateNotify).toHaveBeenCalledTimes(2);
  });

  it('activateNotify method call notify.open method', () => {
    spyOn(notify, 'open');

    interceptor.activateNotify(405);

    expect(notify.open).toHaveBeenCalled();
  });

});
