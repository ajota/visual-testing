import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { LoginService } from 'src/app/shared/security/login.service';
import { Router } from '@angular/router';
import { nameRoutes } from 'src/app/shared/util/name-routes';

@Injectable({providedIn: 'root'})
export class SessionInterceptor implements HttpInterceptor{

  sessionStatus = null;

  sessionSubs: Subscription  = new Subscription();

  constructor(
    private loginService: LoginService,
    private notify: ScNotifyService,
    private mapConfigBase: MapConfigBasePipe,
    private router: Router
  ) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        ( evt: HttpEvent<any> ) => this.handleCurrentSession( evt ), // handle success
        ( evt: HttpEvent<any> ) => this.handleCurrentSession( evt )  // handle error
      )
    );
  }

  handleCurrentSession( evt: HttpEvent<any> ) {

    const sessionData = this.loginService.getSessionData();

    if ( sessionData ) {
      if ( !this.loginService.sessionMessage) {
        this.sessionSubs = this.loginService.setInteractionNotificationUser( sessionData.key_session ).subscribe(
          resp  => this.validateSessionInteractions( resp ),
          error => this.sessionMessagesHandler( null, error )
        );
      } else {
        this.loginService.updateInteractionUserSession();
      }
    }
  }

  validateSessionInteractions( resp ) {

    const isLoggedIn = this.loginService.isLoggedIn;
    this.sessionStatus = resp && !resp.status; // 1: Active 0: Inactive

    if ( (!resp || this.sessionStatus) && isLoggedIn ) { // if the session is deleted without an status
      this.loginService.deleteUserSession( true );
      this.router.navigate([ nameRoutes.login ]);
      this.sessionMessagesHandler( (resp && resp.status) ) ;
    }

    if( (!resp || this.sessionStatus) ) {
      this.sessionSubs.unsubscribe();
      this.sessionStatus = null;
    }


  }

  sessionMessagesHandler( status = null, error = false ) {
    // Default Session Message
    let msgType = 'info';
    let notifyTitle = this.mapConfigBase.transform( 'msg_session_timeout_title' );
    let notifyMessage = this.mapConfigBase.transform( 'msg_session_timeout_text' );

    // Session Message for new session open
    if ( status === 0 ) {
      notifyTitle = this.mapConfigBase.transform( 'msg_session_change_title' );
      notifyMessage = this.mapConfigBase.transform( 'msg_session_change_text' );
    }

    // Error message for session mistakes
    if ( error ) {
      msgType = 'error';
      notifyTitle = this.mapConfigBase.transform( 'msj_error_generic_title' );
      notifyMessage = this.mapConfigBase.transform( 'msj_error_generic_text' );
    }

    this.notify.open({
      title: notifyTitle,
      icon: `sc-icon--notify-${msgType}`,
      type: msgType,
      message: this.mapConfigBase.transform( notifyMessage )
    });

  }
}
