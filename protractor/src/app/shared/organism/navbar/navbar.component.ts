import { Component, OnInit, Input, ViewChild, Output,EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { name } from '../../util/name-storage';
import { nameRoutes } from '../../util/name-routes';
import { ScNotifyService } from '../sc-notify/sc-notify.service';
import { MapConfigBasePipe } from '../../pipes/map-config-base.pipe';
import { DataCustomer } from 'src/app/components/credits/credits.model';
import { Router, ActivatedRoute } from '@angular/router';
import { updateData } from '../../util/media-types';
import { NavbarService } from './navbar.service';
import { stateCustomer } from 'src/app/shared/util/state-storage';
import { MapConfigLangPipe } from '../../pipes/map-config-lang.pipe';
import { PassDataService } from '../../util/pass-data.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('imgProfile', {static: true}) img;
  @ViewChild('modal', { static: false }) modal;

  @Output() eventCloseSesion = new EventEmitter();
  @Output() navigateUpdateEmail = new EventEmitter();
  @Output() navigateUpdateMobile = new EventEmitter();
  @Input() customer: DataCustomer;

  name = '';
  lastName = '';
  isToogle = false;
  nameRoutes = nameRoutes;
  typeActionModal: string;
  photo = '';
  photoWidth: number;
  photoHeigth: number;
  styleSizePhoto = ''; // ↴
  // ['sc-header__profile__photo--portrait' for 'portrait photo', 'sc-header__profile__photo--landscape' for'landscape photo']
  customerStatus: number;

  env = environment;

  constructor(
    private notify: ScNotifyService,
    private navbarService: NavbarService,
    private  mapConfigBase: MapConfigBasePipe,
    private mapConfigLang: MapConfigLangPipe,
    private router: Router,
    private route: ActivatedRoute,
    private passDataService: PassDataService
  ) {

    this.navbarService.initStickyHeader();
  }

  ngOnInit() {
    this.navbarService.setHeightClassHeader();
  }

  ngOnChanges( value ) {
      this.customer = value.customer.currentValue;
      this.name =  this.customer.firstName;
      this.lastName =  this.customer.firstLastName;
      this.photo = this.customer.urlPhoto;
      this.customerStatus = this.customer.status;
      this.imgSize();
  }

  toogleMenu() {
    this.isToogle = !this.isToogle;
  }

  closeSesion() {
    this.notify.open({
      title: this.mapConfigBase.transform('lbl_close_sesion_confirm'),
      message: this.mapConfigBase.transform('lbl_close_sesion_info'),
      icon: 'sc-icon--notify-logout',
      type: 'confirm',
      onAccept: () => this.eventCloseSesion.emit(name)
    });
  }


  imgSize( ) {
    const img = this.img.nativeElement;
    if ( img.height > 0 ) {
      if ( img.width > img.height) {
        this.styleSizePhoto = 'sc-header__profile__photo--landscape';
      } else if ( img.height > img.width ) {
        this.styleSizePhoto = 'sc-header__profile__photo--portrait';
      }
    }
  }

  validateCustomerStatus() {
    switch (this.customerStatus) {
      case stateCustomer.new:
        this.notify.open({
          title: this.mapConfigLang.transform('msj_tittle_error_not_posible_update_data'),
          message: this.mapConfigLang.transform('msj_error_not_posible_update_data'),
          icon: 'sc-icon--notify-info',
          type: 'info',
          onAccept: () => this.notify.close()
        });
        break;
      default:
        this.showDataUpdateNotify();
        break;
    }
  }

  showDataUpdateNotify() {
    this.modal.open();
  }

  goToUpdateMobile() {
    this.router.navigate([nameRoutes.updateData, {update: updateData.mobile}]);
  }

  goToUpdateEmail() {
    this.router.navigate([nameRoutes.updateData, {update: updateData.email}]);
  }

  ngOnDestroy(){
    this.navbarService.turnOffHeaderStiky();
  }

  getCustomerData() {
    this.customer = this.passDataService.getData('userData');
    if (this.route.snapshot.routeConfig.path !== nameRoutes.dashboard ) {
      this.router.navigate([`/${nameRoutes.dashboard}`]);
    }
  }

  validateRedirect(){
    return this.route.snapshot.routeConfig.path === nameRoutes.dashboard;
  }
}





