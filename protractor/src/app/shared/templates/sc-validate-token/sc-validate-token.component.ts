import { Component, OnInit, Input } from '@angular/core';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { Router, Params } from '@angular/router';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { nameRoutes } from 'src/app/shared/util/name-routes';
import { CustomerInformation } from 'src/app/components/identity-validation/identity-validation.model';
import { ScValidateTokenService } from './sc-validate-token.service';
import { mediaTypes, updateData } from '../../util/media-types';
import { saveSessionCustomer, getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { LoginService } from '../../security/login.service';

@Component({
  selector: 'app-sc-validate-token',
  templateUrl: './sc-validate-token.component.html',
  styleUrls: ['./sc-validate-token.component.scss']
})
export class ScValidateTokenComponent implements OnInit {

  globalFormToken = '';
  customerData: CustomerInformation;
  customerStatus: number;
  email: string;
  dataUpdataValue: string;
  typeToken: number;
  textMessage: string;
  validationType: string;
  @Input() eventSubmitSendToken;
  @Input() eventTypeTokenProcess;
  @Input() process: Params;

  constructor(private passDataService: PassDataService,
              private router: Router,
              private validateTokenService: ScValidateTokenService,
              private mapConfigLang: MapConfigLangPipe,
              private notify: ScNotifyService,
              private loginService: LoginService) { }

  ngOnInit( ) {
    this.executeForTypeFlow();
    this.email = getItemSessionCustomer(name.customer, 'email');
  }

  executeForTypeFlow() {
    this.validationType = this.process.validationType;
    switch (this.validationType) {
      case updateData.email:
        this.typeToken = 1;
        this.textMessage =  this.mapConfigLang.transform('lbl_update_email_success_instructions');
        this.dataUpdataValue = this.passDataService.getData('updateData');
        this.getCustomerInfoFlowUpdateData();
        break;
      case updateData.mobile:
        this.typeToken = 2;
        this.textMessage =  this.mapConfigLang.transform('lbl_update_mobile_number_success_instructions');
        this.dataUpdataValue = this.passDataService.getData('updateData');
        this.getCustomerInfoFlowUpdateData();
        break;
      default:
        this.getCustomerInformation();
        break;
   }
 }

  validateTokenUpdateData() {
    const tokenRequest = this.validateTokenService.updateDataCustomer(this.customerData,  this.globalFormToken, this.typeToken,
    this.dataUpdataValue).subscribe( res => {
       if ( res ) {
         if (this.validationType === updateData.email) {
           saveSessionCustomer( name.customer, {email: res.data.dataUpdate} );
         } switch (this.typeToken) {
           case 1:
            this.updateEmailSuccess();
             break;
             case 2:
              this.updatePhoneSuccess();
             break;
         }
      }if ( tokenRequest ) {
        tokenRequest.unsubscribe();
      }
    });
  }

  getCustomerInformation() {
      this.customerData = this.passDataService.getData('customerInformation');
      this.customerData.data.email = this.email;
      this.customerStatus = this.customerData.data.requestStatus;
  }

  getCustomerInfoFlowUpdateData() {
    this.customerData = this.passDataService.getData('customerInformation');
  }
  validateFunctionToExecute(formToken) {
    this.globalFormToken = formToken;
    if (this.globalFormToken === 'tokenTrue') {
      this.sendToken();
    } else if (this.globalFormToken === 'backTrue') {
      this.goBack(formToken);
    } else if (this.validationType) {
      this.validateTokenUpdateData();
    } else {
      this.validateToken(formToken);
    }
  }

  validateToken(formToken) {
    this.getCustomerInformation();
    const tokenRequest = this.validateTokenService.validateToken(formToken, this.customerData).subscribe( res => {
      if ( res ) {
        this.notify.open({
          icon: 'sc-icon--notify-success',
          title: this.mapConfigLang.transform('lbl_tittle_token_success'),
          message: this.mapConfigLang.transform('lbl_token_success'),
          onAccept: () => this.redirectForCustomerStatus()
        });
      }
      if ( tokenRequest ) {
        tokenRequest.unsubscribe();
      }
    });
  }

  sendToken() {
    switch (this.process.validationType) {
      case updateData.mobile:
      case updateData.email:
      this.customerData = this.passDataService.getData('customerInformation');
      const sendTokenUpdateData = this.validateTokenService.sendTokenUpdateData( this.customerData, this.typeToken).subscribe( res => {
        this.showNotyfyTokenSend();
        if ( sendTokenUpdateData ) {
          sendTokenUpdateData.unsubscribe();
        }
      });
      break;
      default:
      const sendToken = this.validateTokenService.sendToken( this.customerData).subscribe( res => {
        this.showNotyfyTokenSend();
        if ( sendToken ) {
          sendToken.unsubscribe();
        }
      });
      break;
    }
  }

  redirectForCustomerStatus() {
    if (this.customerStatus === 1 || this.customerStatus === 4 || this.customerStatus === 3) {
      this.router.navigate(['/' + nameRoutes.dashboard ]);
    } else {
      this.router.navigate(['/' + nameRoutes.requestQuota ]);
    }
  }

    goBack(isBack) {
    if (isBack === 'backTrue') {
      switch (this.process.validationType ) {
        case updateData.email:
          this.router.navigate([nameRoutes.updateData, {update: updateData.email}]);
          break;
        case updateData.mobile:
          this.router.navigate([nameRoutes.updateData, {update: updateData.mobile}]);
          break;
       default:
        this.router.navigate(['/' + nameRoutes.tokenRoot +  '/' + nameRoutes.identityValidation]);
        break;
      }
    }
  }

  showNotyfyTokenSend() {
    this.notify.open({
      icon: 'sc-icon--notify-info',
      title: this.mapConfigLang.transform('lbl_tittle_send_token'),
      message: ''
    });
  }

  updateEmailSuccess() {
    this.loginService.deleteUserSession();
    this.notify.open({
      type: 'check',
      icon: 'sc-icon--notify-success',
      title: this.mapConfigLang.transform('lbl_tittle_update_my_data_success'),
      message: this.textMessage,
      onAccept: () => this.router.navigate([ nameRoutes.login ])
    });
  }

  updatePhoneSuccess() {
    this.notify.open({
      type: 'check',
      icon: 'sc-icon--notify-success',
      title: this.mapConfigLang.transform('lbl_tittle_update_my_data_success'),
      message: this.textMessage,
      onAccept: () => this.router.navigate([nameRoutes.dashboard, {validationType: 'updateData'}])
    });
  }
  maskValue( value: string ){
    const maskForEmail = /(?![@\.])(^.{3})?.(\b...)?/g;
    const maskForMobile = /\d(?!\d{0,2}$)/g;
    const isEmail = value.search('@') >= 0;
    return (isEmail) ? value.replace(maskForEmail, '$1*$2') : value.replace(maskForMobile, '*') ;
  }
}
