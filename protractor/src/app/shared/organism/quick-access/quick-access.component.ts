import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataCustomer, charDocument, luegoPago } from './quick-access.model';
import { stateCustomer, state } from 'src/app/shared/util/state-storage';
import { environment } from 'src/environments/environment';
import { getItemSessionCustomer } from '../../util/web-config';
import { name } from '../../util/name-storage';
import { PassDataService } from '../../util/pass-data.service';
import { QuickAccessService } from './quick-access.service';
import { nameRoutes } from '../../util/name-routes';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent implements OnDestroy {

  customerStatus: number;
  customerData: DataCustomer;
  stateCustomer = stateCustomer;
  stateRequest = state;
  urlAction: string;
  env = environment;
  tooltipOpen = true;
  retryRequest: boolean = false;
  idInterval: any;
  userStatus: number;
  count = 0;
  totalCount = 0;
  nameRoutes = nameRoutes;
  constructor(private passDataService: PassDataService) 
  { 
    this.getInfoCustomer();
  }

  getInfoCustomer(){
    let customer;
    this.useInfoCustomer(customer);
    if(!customer){
      this.passDataService.notifyDataChanges.subscribe( (customer:DataCustomer) => {
        this.useInfoCustomer(customer);
      });
    }
  }

  useInfoCustomer ( customer:DataCustomer ) {
    const isEmpty = customer && (Object.keys(customer)).length > 0;
    if( isEmpty ) {
      this.customerData = customer;
      this.customerStatus = this.customerData.status;
      this.getRetryRequest();
      this.setRedirectAction();
    }
  }

  getRetryRequest( ) {
    this.tooltipOpen = true;
    if (this.customerStatus === stateCustomer.negated){
      this.retryRequest = this.customerData.canRetryRequest;
    }
    if(this.customerStatus === this.stateRequest.pending){
      this.retryRequest = this.customerData.canRetryRequest;
    }
    if(this.retryRequest === false && this.customerStatus != stateCustomer.new) {
      this.tooltipOpen = false;
    }
  }

  setRedirectAction() {
    let url = luegoPago.url;
    switch (this.customerStatus) {
      case 1: case 4:
        url += this.prepareUserData();
        break;
    default:
      url += `${luegoPago.paramId}0`;
      break;
    }
    this.urlAction = url;
  }

  prepareUserData() {
    let params = luegoPago.paramId;
    const {typeDocument, idDocument} = this.customerData;
    switch (typeDocument) {
      case charDocument.cc:
        params += `1${idDocument}`;
        break;
      case charDocument.ce:
        params += `2${idDocument}`;
        break;
    }
    return `${params}`;
  }
  
  close(){
    this.tooltipOpen = false;
  }

  ngOnDestroy(){
    this.customerData = undefined;
    const deleteCustomerInfo = undefined;
    this.passDataService.setData(deleteCustomerInfo, 'customerInformationData');
  }
}

