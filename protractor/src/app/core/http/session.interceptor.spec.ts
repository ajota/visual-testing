import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { InitialConfigService } from '.';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingService } from '../loading/loading.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { throwError, Observable, of } from 'rxjs';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { SessionInterceptor } from './session.interceptor';
import { LoginService } from 'src/app/shared/security/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { saveSessionCustomer } from 'src/app/shared/util/web-config';

class Notify {
  open(){
    return true;
  }
}

const session = { status: 0};
const angularFireBaseMock = { object: () => {} };
const routerMock = { navigate: ( path ) => {} };

// class togglers

class LoginServiceMock {
  isLoggedIn = true;
  sessionMessage = null;
  launchError = false;

  constructor(){}

  getSessionData() {
    return { sub: '1234567890', name: 'John Doe', iat: 1516239022, key_session: 'kjhasgdkjagvs564564564djhagssgdsa' };
  }

  setInteractionNotificationUser() {
    let observable;

    if ( this.launchError ) {
      observable = Observable.create( observ => {
        observ.throwError({Error: 0});
        return observ.complete();
      } );
    } else {
      observable = Observable.create( observ => {
        observ.next(session);
        return observ.complete();
      } );
      this.launchError = true;
    }
    return observable;
  }

  updateInteractionUserSession() {}
  deleteUserSession(){}

  // unit test
  setSessionMessage( data =  {}){
    this.sessionMessage = data;
  }
}

describe('Errors Interceptor', () => {
  let httpMock: HttpTestingController;
  let interceptor: SessionInterceptor;
  let notify: ScNotifyService;
  let loginService: LoginServiceMock;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LoadingService,
        InitialConfigService,
        {
          provide: AngularFireDatabase,
          useValue: angularFireBaseMock
        },
        {
          provide: LoginService,
          useClass: LoginServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SessionInterceptor,
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

    notify = TestBed.get(ScNotifyService);
    httpMock = TestBed.get(HttpTestingController);
    interceptor = TestBed.get(SessionInterceptor);
    loginService = TestBed.get(LoginService);
  });

  it('Session Interceptor Should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Session Interceptor Should instatiate with', () => {
    expect(interceptor.intercept).toBeDefined();
    expect(interceptor.sessionStatus).toBeNull();
    expect(interceptor.sessionSubs).toBeDefined();
    expect(interceptor.validateSessionInteractions).toBeDefined();
    expect(interceptor.sessionMessagesHandler).toBeDefined();
  });


  it('Intercept should call handleCurrentSession on success request or on error', () => {

    const evt = new HttpResponse<any>({body: {data: '1'} });
    const req = {} as HttpRequest<any>;
    const error = new HttpErrorResponse({error: {errorCode: 405 } });
    let hand = {handle: () => of( evt ) } as HttpHandler;

    spyOn(interceptor, 'handleCurrentSession');

    interceptor.intercept( req, hand ).subscribe().unsubscribe();
    expect(interceptor.handleCurrentSession).toHaveBeenCalled();

    hand = { handle: () => throwError( error ) } as HttpHandler;
    interceptor.intercept( req, hand ).subscribe().unsubscribe();
    expect(interceptor.handleCurrentSession).toHaveBeenCalledTimes(2);
  });


  it('handleCurrentSession should call validateSessionInteractions when session exist or sessionMessagesHandler on error', () => {

    const success = new HttpResponse<any>({body: {data: '1'} });

    spyOn(interceptor, 'validateSessionInteractions');
    spyOn(interceptor, 'sessionMessagesHandler');

    // first call return success
    interceptor.handleCurrentSession( success );
    expect(interceptor.validateSessionInteractions).toHaveBeenCalled();

    // second calll return error
    interceptor.handleCurrentSession( success );
    expect(interceptor.sessionMessagesHandler).toHaveBeenCalled();

  });

  it('handleCurrentSession should call updateInteractionUserSession when the session exists', () => {

    const error = new HttpResponse<HttpErrorResponse>( new HttpErrorResponse( {} ));

    loginService.setSessionMessage();

    spyOn(interceptor, 'validateSessionInteractions');
    spyOn(interceptor, 'sessionMessagesHandler');

    interceptor.handleCurrentSession( error );

    expect(interceptor.validateSessionInteractions).not.toHaveBeenCalled();
    expect(interceptor.sessionMessagesHandler).not.toHaveBeenCalled();

  });

  it('validateSessionInteractions should change the sessionStatus variable and call the sessionMessagesHandler method', () => {

    let resp = { status: 1 }; // when session is active
    // spyOn(interceptor, 'sessionMessagesHandler');

    expect(interceptor.validateSessionInteractions( resp )).toBeUndefined();
    expect(interceptor.sessionStatus).toEqual(false);

    resp = { status: 0 }; // when session is inactive

    interceptor.validateSessionInteractions( resp );
    expect(interceptor.sessionStatus).toEqual(null);

    spyOn(interceptor, 'sessionMessagesHandler');
    interceptor.validateSessionInteractions( resp );
    expect(interceptor.sessionMessagesHandler).toHaveBeenCalled();

  });



  it('sessionMessagesHandler should show a error alert message', () => {

    expect(interceptor.sessionMessagesHandler(false, true)).toBeUndefined();

  });

});
