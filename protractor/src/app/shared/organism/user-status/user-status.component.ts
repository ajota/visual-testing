import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { stateCustomer, state } from 'src/app/shared/util/state-storage';
import { Subscription } from 'rxjs';
import { UserStatusService } from './user-status.service';
import { DataCustomer } from './user-status.model';
import { PassDataService } from '../../util/pass-data.service';
@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit, OnDestroy {

  @ViewChild('imgProfile', {static: true}) img;
  // @Input() customer = {} as DataCustomer;
  customer = {} as DataCustomer;
  email: string;
  stateCustomer = stateCustomer;
  stateRequest = state;
  amount: number
  photoWidth: number;
  photoHeigth: number;
  styleSizePhoto = ''; // ↴
  // ['sc-header__profile__photo--portrait' for 'portrait photo', 'sc-header__profile__photo--landscape' for'landscape photo']

  // subs
  subsCustomer = new Subscription();
  idInterval: any;
  userStatus: number;
  count = 0;
  totalCount = 0;

  constructor(
    private userStatusService: UserStatusService,
    private passDataService: PassDataService
    ) { 
      this.getInfoCustomer();
    }

  ngOnInit() {
  }

  getInfoCustomer() {
    let customer;
    this.useInfoCustomer(customer);
    if(!customer){
      this.passDataService.notifyDataChanges.subscribe((customer:DataCustomer)  => {
        this.useInfoCustomer(customer);
      });
    }
  }

  useInfoCustomer ( customer:DataCustomer ) {
    const isEmpty = customer && (Object.keys(customer)).length > 0;
    if( isEmpty ) {
      this.email = customer.email;
      this.customer = customer;
      this.userStatus = this.customer.status;
    }
  }

  ngOnChanges( value ) {
    this.customer = value.customer.currentValue;
    this.imgSize();
  }

  imgSize( ) {
    const img = this.img.nativeElement;
    if( img.height > 0 ) {
      if ( img.width > img.height) {
        this.styleSizePhoto = 'sc-picture__profile__photo--landscape';
      } else if ( img.height > img.width ) {
        this.styleSizePhoto = 'sc-picture__profile__photo--portrait';
      }
    }
  }

  ngOnDestroy() {
    if (this.idInterval) {
      clearInterval(this.idInterval);
    }
  }
}
