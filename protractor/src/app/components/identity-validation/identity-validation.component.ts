import { Component, OnInit } from '@angular/core';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { IdentityValidationService } from './identity-validation.service';
import { NidData, CustomerInformation } from './identity-validation.model';
import { mediaTypes } from 'src/app/shared/util/media-types';
import { nameRoutes } from 'src/app/shared/util/name-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identity-validation',
  templateUrl: './identity-validation.component.html',
  styleUrls: ['./identity-validation.component.scss']
})

export class IdentityValidationComponent implements OnInit {

  nid: NidData ;
  nidType: string;
  customerData: CustomerInformation;
  showComunicationControls = [];
  userEmail: void;

  constructor(
    private mapConfigLang: MapConfigLangPipe,
    private notify: ScNotifyService,
    private passDataService: PassDataService,
    private identityValidationService: IdentityValidationService,
    private routing: Router
    ) { }

  ngOnInit() {
    this.prepareCustomerInfo();
  }

  prepareCustomerInfo( ) {
    const dataFromRegister = this.passDataService.getData();
    // nid = Numero de Identificacion (CC, CE)
    this.nid = {...dataFromRegister.formData};

    const customerInfo = this.identityValidationService.getCustomerInformation( this.nid, dataFromRegister.email ).subscribe( res => {
      this.customerData = res;
      this.setComunicationControls();
      if ( customerInfo ) {
        customerInfo.unsubscribe();
      }
    });
  }

  setComunicationControls() {
    const customer = this.customerData.data;
    this.showComunicationControls.push( { media: 'Mobile', value: customer.phoneNumber, label: 'lbl_token_option_mobile_number' } );
    const cond = customer.email;
    if ( cond ) {
      this.showComunicationControls.push( { media: 'Email', value: customer.email, label: 'lbl_token_option_email' } );
    }
  }

  showNotificationUpdateData() {
    this.notify.open( {
      title: this.mapConfigLang.transform('lbl_tittle_not_access_options'),
      message: this.mapConfigLang.transform('msg_document_sign_up_error_user_exists'),
      icon: 'sc-icon--notify-info',
      type: 'info',
      onAccept: () =>    this.routing.navigate(['../' +  nameRoutes.login])
    });
  }


  sendFormIdentityValidation( formData ) {
    const typeToken: string = (formData === 'Mobile') ? mediaTypes.mobile : mediaTypes.email ;

    this.customerData.media = typeToken;
    this.passDataService.setData(this.customerData , 'customerInformation');
    if ( formData ) {
      const sendToken = this.identityValidationService.sendToken( this.nid, typeToken ).subscribe( res => {
        this.customerData = res;
        this.routing.navigate(['/' + nameRoutes.tokenRoot + '/' + nameRoutes.validateToken]);
        if ( sendToken ) {
          sendToken.unsubscribe();
        }
      });
    }
  }
}

