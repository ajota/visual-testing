import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  VerifyEmailResponse,
  ChangePasswordResponse,
  CentersAuthorizationResponse,
  VerifyAccountRequest,
  CentersAuthorization} from './centers-authorization.model';
import { CentersAuthorizationService } from './centers-authorization.service';
import { Observable, concat, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';


@Component({
  selector: 'app-centers-authorization',
  templateUrl: './centers-authorization.component.html',
  styleUrls: ['./centers-authorization.component.scss']
})

export class CentersAuthorizationComponent implements OnInit {

  emailVerified$: Observable<VerifyEmailResponse>;
  passChanged$: Observable<ChangePasswordResponse>;
  centersAutorized$: Observable<CentersAuthorizationResponse>;
  userVeryfied$: Observable<any>;
  requestVerifyAccount$: Subscription;
  legalTextCentersAuthorization$: Observable<string> = this.centersAuthService.getCentersAuthorizationText();

  accountToVerify = true;
  authorized = false;
  data = this.passDataService.data as VerifyAccountRequest || this.route.snapshot.queryParams as VerifyAccountRequest ;
  path = window.location.origin + environment.pathConfirmedEmail;

  constructor(
    private centersAuthService: CentersAuthorizationService,
    private passDataService: PassDataService,
    private route: ActivatedRoute,
    private routing: Router,
    private notify: ScNotifyService,
    private mapConfigBase: MapConfigBasePipe
  ) { }

  ngOnInit() {
    this.setAccountConfirmation();
  }

  setAccountConfirmation( ) {
    if ( this.hasParams ) {
      const requestList = [];
      const paramToken = this.data.paramToken || this.data.t;

      const requestVerifyEmail: VerifyAccountRequest = {paramToken};

      this.emailVerified$ = this.centersAuthService.postVerifyEmail( requestVerifyEmail );
      requestList.push( this.emailVerified$ );

      const requestAuthCenters: CentersAuthorization = {
        paramToken,
        authorize: true
      };
      this.centersAutorized$ = this.centersAuthService.getAuthorizationCenters( requestAuthCenters );
      requestList.push( this.centersAutorized$ );

      if ( this.data.password ) {
        const requestChangePass: VerifyAccountRequest = {
          paramToken,
          password: this.data.password,
          confirmPassword: this.data.confirmPassword
        };
        this.passChanged$ = this.centersAuthService.postChangePassword( requestChangePass );
        requestList.push( this.passChanged$ );
      }

      this.userVeryfied$ = concat( requestList );

    } else {
      this.routing.navigate(['/']);
    }
  }

  sendAccountConfirmation() {
    let counter = 0;
    this.userVeryfied$.subscribe( resp => {
      resp.subscribe( () => {
        counter++;
        const cond = this.data.password && counter === 3 || !this.data.password && counter === 1;
        if ( cond ) {
          this.redirectForMobileDeeplinking( this.path );
        }
      }, err => {

        this.notify.open({
          icon: 'sc-icon--notify-error',
          title: this.mapConfigBase.transform('msj_error_generic_title'),
          message: this.mapConfigBase.transform('msj_error_generic_text'),
          onAccept: () => this.redirectForMobileDeeplinking( this.path )
        });

      });
    }, err => {
      this.accountToVerify = true;
    });

  }

  redirectForMobileDeeplinking ( path: string ) {
    window.location.href = path;
  }

  get hasParams(): boolean {
    return this.data && (Object.keys( this.data )).length >= 1;
  }

}
