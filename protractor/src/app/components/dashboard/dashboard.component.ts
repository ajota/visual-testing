import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, Params } from '@angular/router';
import { name } from 'src/app/shared/util/name-storage';
import { nameRoutes } from 'src/app/shared/util/name-routes';
import { getItemSessionCustomer, saveSessionCustomer, getDataSessionCustomer } from 'src/app/shared/util/web-config';
import { DashboardService } from './dashboard.service';
import { DataCustomer } from './dashboard.model';
import { LoginService } from 'src/app/shared/security/login.service';
import { PassDataService } from 'src/app/shared/util/pass-data.service';
import { updateData } from 'src/app/shared/util/media-types';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  @ViewChild('modal', { static: true }) modal;

  email: string;
  customer = {}  as DataCustomer;
  typeNavigation: Params;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private loginService: LoginService,
    private passData: PassDataService
  ) { 
  }

  ngOnInit() {
    this.getInfoCustomer();
    this.activateStatus();
    this.getTypeNavigation();
    this.showDataUpdateNotify();
  }

  getTypeNavigation() {
    this.typeNavigation = this.activeRoute.snapshot.params;
    if ( this.typeNavigation ) {
      if (this.typeNavigation.validationType === undefined ) {
        this.typeNavigation = this.activeRoute.snapshot.queryParams;
      }
    }
  }

  getInfoCustomer() {
    // this.passData.setData(this.customer, 'userData');
    this.email = getItemSessionCustomer(name.customer, 'email');
    this.dashboardService.getInfoCustomer(this.email).subscribe(res => {
      this.customer = res.data;
      saveSessionCustomer(name.moreCustomer,  this.customer );
      saveSessionCustomer(name.customer, {name: this.customer.firstName});
      saveSessionCustomer(name.customer, {lastName: this.customer.firstLastName});
      //shared user data
      this.passData.setData(this.customer, 'userData');
    });
  }

  closeSesion() {
    this.loginService.deleteUserSession( );
    this.router.navigate([ nameRoutes.login ]);
  }

  activateStatus() {
    if ( this.customer) {
      this.passData.setData(this.customer, 'userData');
    }
  }


  showDataUpdateNotify() {
    this.getTypeNavigation();
    if(this.typeNavigation.validationType === 'updateData') {
      this.modal.open();
    }
  }

  goToUpdateMobile() {
    this.router.navigate([nameRoutes.updateData, {update: updateData.mobile}]);
  }

  goToUpdateEmail() {
    this.router.navigate([nameRoutes.updateData, {update: updateData.email}]);
  }

}
