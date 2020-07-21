import { Injectable, ViewChild } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { Router } from '@angular/router';
import { nameRoutes } from 'src/app/shared/util/name-routes';

@Injectable({providedIn: 'root'})
export class ErrorsInterceptor implements HttpInterceptor{
  @ViewChild('modal', {static: false}) modal;

  errorCode: number;

  constructor(
    private notify: ScNotifyService,
    private mapConfigBase: MapConfigBasePipe,
    private mapConfigLang: MapConfigLangPipe,
    private router: Router
  ) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        ( evt: HttpEvent<any> ) => this.handleNotification( evt ), // handle success
        ( evt: HttpEvent<any> ) => this.handleNotification( evt ) // handle error
      )
    );
  }

  handleNotification( evt: HttpEvent<any> ) {
    let errorCode: number;

    if ( evt instanceof HttpResponse ) {
      errorCode = evt.body.error;
    }

    if ( evt instanceof HttpErrorResponse ) {
      errorCode = evt.error.errorCode;
      this.errorCode = evt.error.errorCode;
    }

    const cond = ( !isNaN( errorCode ) && errorCode > 0 );
    if ( cond ) {
      this.activateNotify( errorCode );
    }
  }

  activateNotify( messageId: number ) {
    const notifyTitleId = messageId + '_title';

    let notifyTitle = this.mapConfigBase.transform( messageId + '_title' ); // prefix for title;
    notifyTitle = this.mapConfigLang.transform( notifyTitle );
    // if title does not exist, show the generic error title.
    if ( notifyTitleId === notifyTitle ) {
      notifyTitle = this.mapConfigBase.transform( 'msj_error_generic_title' );
    }

    let notifyMessage = this.mapConfigBase.transform( messageId );
    notifyMessage = this.mapConfigLang.transform( `${notifyMessage}` );
    // if the message does not exists, show the generic error message
    if ( messageId === notifyMessage ) {
      notifyMessage = this.mapConfigBase.transform( 'msj_error_generic_text' );
    }

    if (this.errorCode === 701) {
      this.notify.open({
        title: this.mapConfigBase.transform('lbl_tittle_sign_up_success'),
        icon: 'sc-icon--notify-sent-email',
        type: 'info',
        message: this.mapConfigBase.transform('lbl_document_sign_up_success'),
      });
    } 
    if (this.errorCode === 714) {
      this.notify.open({
        title: notifyTitle,
        icon: 'sc-icon--notify-error',
        type: 'error',
        message: this.mapConfigBase.transform( notifyMessage ),
        onAccept: () => this.router.navigate([nameRoutes.login])
      });
    } else {
      this.notify.open({
        title: notifyTitle,
        icon: 'sc-icon--notify-error',
        type: 'error',
        message: this.mapConfigBase.transform( notifyMessage )
      });
    }
  }
}
