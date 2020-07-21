import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { DataCustomerParams, DataRequestById } from 'src/app/shared/templates/chatbot/chatbot.model';
import { DataCustomer } from 'src/app/components/credits/credits.model';
import { mapRoutes, nameRoutes } from 'src/app/shared/util/name-routes';
import { RegisterRequestService } from './register-request.service';
import { Subscription } from 'rxjs';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigBasePipe } from 'src/app/shared/pipes/map-config-base.pipe';
import { NidData } from './register-credit.model';
import { saveSessionCustomer, removeItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { LoginService } from 'src/app/shared/security/login.service';

@Component({
  selector: 'app-register-request',
  templateUrl: './register-request.component.html',
  styleUrls: ['./register-request.component.scss']
})

export class RegisterRequestComponent implements OnInit, OnDestroy {

  storeParams: DataCustomerParams;
  paramsRequesById: DataRequestById;
  customer: DataCustomer;
  document: string;
  typeDocument: string;
  userEmail: string;

  // subscriptions
  storeParamsSubs: Subscription;
  requestSubs: Subscription;

  constructor(
    private router: Router,
    private passDataService: PassDataService,
    private registerRequestService: RegisterRequestService,
    private notify: ScNotifyService,
    private mapConfigBase: MapConfigBasePipe,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
    this.getUserEmail();
  }

  getUserEmail() {
    this.restartUservalidation();
    this.userEmail = this.passDataService.getData('email');
  }

  sendFormRegister( formData: NidData ) {
    this.askCustormerInformation(formData, this.userEmail);
    // share data
    this.passDataService.setData({formData, email: this.userEmail});
    saveSessionCustomer(name.customer, formData);
  }

  askCustormerInformation( formData: NidData, email: string ) {
    this.requestSubs = this.registerRequestService.getCustomerInformation(formData, email).subscribe ( res => {
      if ( res.data ) {
          if ( res.data.customerId ) {
            saveSessionCustomer( name.customer, {id: res.data.customerId} );
          }
          this.passDataService.setData( this.userEmail, 'email' );
          this.router.navigate([ mapRoutes[res.data.nextScreen] ]);
      } else {
        this.showGenericErrorMsg();
      }
    });
  }

  showGenericErrorMsg() {
    this.notify.open({
      icon: 'sc-icon--notify-error',
      title: this.mapConfigBase.transform('msj_error_generic_title'),
      message: this.mapConfigBase.transform('msj_error_generic_text')
    });
  }

  restartUservalidation(){
    removeItemSessionCustomer([ 'verify_nid', 'nid_type', 'nid', 'id']);
  }

  closeSesion() {
    this.loginService.deleteUserSession( );
    this.router.navigate([ nameRoutes.login ]);
  }

  ngOnDestroy() {
    let sub = this.storeParamsSubs && this.storeParamsSubs.unsubscribe();
    sub = this.requestSubs && this.requestSubs.unsubscribe();
  }
}
