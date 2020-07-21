import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { updateData, mediaTypes } from 'src/app/shared/util/media-types';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { UpdateDataService } from './update-data.service';
import { nameRoutes } from 'src/app/shared/util/name-routes';
import { getItemSessionCustomer } from 'src/app/shared/util/web-config';
import { name } from 'src/app/shared/util/name-storage';
import { DataCustomer, CustomerInformation, ResponseData } from './update-data.model';
import { ScNotifyService } from 'src/app/shared/organism/sc-notify/sc-notify.service';
import { MapConfigLangPipe } from 'src/app/shared/pipes/map-config-lang.pipe';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {

  whereGo: Params;
  goToUpdateMobile = false;
  goToUpdateEmail = false;
  email: string;
  mobileNumber: string;
  customer = {}  as DataCustomer;
  customerResponse: CustomerInformation;
  idDocument: string;
  typeDocument: string;
  formTypeData: string;
  dataAlreadyExistsText: string
  newData: string;
  onAcceptNotify: string;

  constructor(private activeRoute: ActivatedRoute,
              private passDataService: PassDataService,
              private updateDataService: UpdateDataService,
              private router: Router,
              private notify: ScNotifyService,
               private mapConfigLang: MapConfigLangPipe,) { }

  ngOnInit() {
    this.getUpdateParams();
    this.getInfoCustomer();
  }

  getInfoCustomer() {
    this.email = getItemSessionCustomer(name.customer, 'email');
    this.idDocument = getItemSessionCustomer(name.customer, 'document');
    this.typeDocument = getItemSessionCustomer(name.customer, 'typeDocument');
    if ( this.email ) {
      this.updateDataService.getCustomerInformation(this.idDocument, this.typeDocument, this.email).subscribe(res => {
        this.customerResponse = res;
      });
    }
  }

  getUpdateParams() {
    this.whereGo = this.activeRoute.snapshot.params;
    this.validateRedirection();
  }

  validateRedirection() {
    switch (this.whereGo.update) {
      case updateData.mobile:
        this.goToUpdateMobile = true;
        break;
      case updateData.email:
        this.goToUpdateEmail = true;
        break;
    }
  }

  validateUniqueData(formTypeData){
    this.newData = this.passDataService.getData('updateData');
    switch (formTypeData) {
      case 'Mobile':
        this.getUniqueEmail(formTypeData);
        break;
      case 'Email':
        this.getUniqueMobile(formTypeData);
        break;
    }
  }

  sendFormUpdateData( formTypeData ) {
    const typeToken: number = (formTypeData === 'Mobile') ? 1 : 2;
      this.passDataService.setData(this.customerResponse , 'customerInformation');
      if ( formTypeData ) {
        const sendToken = this.updateDataService.sendToken( this.idDocument, this.typeDocument, typeToken ).subscribe( res => {
          this.customerResponse = res;
          this.sendParameterType();
          if ( sendToken ) {
            sendToken.unsubscribe();
          }
        });
        
      }
  }

  sendParameterType() {
    switch (this.whereGo.update) {
      case updateData.mobile:
        this.router.navigate(['/' + nameRoutes.tokenRoot + '/' + nameRoutes.validateToken, {validationType: updateData.mobile}]);
        break;
      case updateData.email:
        this.router.navigate(['/' + nameRoutes.tokenRoot + '/' + nameRoutes.validateToken, {validationType:  updateData.email}]);
        break;
    }
  }

  getUniqueMobile(formTypeData){
    const uniqueMobileNumberValidation = this.updateDataService.getUniqueMobileValidation( this.idDocument, this.typeDocument, this.newData ).subscribe( res => {
      const validMobileNumber = res.data;
      if(validMobileNumber === false) {
        this.sendFormUpdateData(formTypeData)
      } else if (validMobileNumber === true){
        this.dataAlreadyExistsText = this.mapConfigLang.transform('msj_error_update_my_data_mobile_number_not_available');
        this.notifyDataAlreadyExists();
        if ( uniqueMobileNumberValidation ) {
          uniqueMobileNumberValidation.unsubscribe();
        }
      }
    });    
  }

  getUniqueEmail(formTypeData){
    const uniqueEmailValidation = this.updateDataService.getUniqueEmailValidation( this.idDocument, this.typeDocument, this.newData ).subscribe( res => {
      const validEmail = res.data;
      if(validEmail === true) {
        this.sendFormUpdateData(formTypeData)
      } else if (validEmail === false){
        this.dataAlreadyExistsText = this.mapConfigLang.transform('msj_error_update_my_data_email_not_available');
        this.notifyDataAlreadyExists();
        if ( uniqueEmailValidation ) {
          uniqueEmailValidation.unsubscribe();
        }
      }
    });   
  }

  notifyDataAlreadyExists(){
    this.notify.open({
      title: this.mapConfigLang.transform('lbl_denied_request_tittle'),
      message: this.mapConfigLang.transform(this.dataAlreadyExistsText),
      icon: 'sc-icon--notify-info',
      type: 'info',
      onAccept: () => this.notify.close()
    });
  }
}