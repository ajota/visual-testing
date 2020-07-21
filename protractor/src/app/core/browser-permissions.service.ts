import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScNotifyService } from '../shared/organism/sc-notify/sc-notify.service';
import { nameRoutes } from '../shared/util/name-routes';
import { MapConfigLangPipe } from '../shared/pipes/map-config-lang.pipe';
import { getDevicesPermissions } from '../shared/util/web-config';
import { permissions } from '../shared/util/name-storage';
import { MapConfigBasePipe } from '../shared/pipes/map-config-base.pipe';
import { ActionsPermissions } from './models/browser-permissions';
import { headers } from 'src/environments/environment';
import { PassDataService } from '../shared/util/pass-data.service';

@Injectable({ providedIn: 'root' })
export class BrowserPermissionsService {

  @ViewChild('camera', { static: false }) public camera: ElementRef;
  coordenates: string = null;
  locationStatus: PermissionStatus;
  cameraStatus: PermissionStatus;

  constructor( private notify: ScNotifyService, private router: Router,
               private mapConfigLang: MapConfigLangPipe,
               private mapConfigBase: MapConfigBasePipe,
               private passData: PassDataService
               ) { }

  async askLocation(): Promise<boolean> {
    this.locationStatus = await getDevicesPermissions('geolocation');
    const actions = {
      ask: () => this.showNotificationRequestLocation(),
      redirect: () => window.location.href = nameRoutes.lockedLocation
    };
    let status =  this.managePermissions(this.locationStatus.state, actions);
    return new Promise(res => {
      this.passData.setData(status, 'locationStatus');
      this.locationStatus.onchange = ({target}) => {
        if (this.isValidRoute) {
          status = this.managePermissions(target[ 'state' ], actions);
        } else {
          status = false;
        }
        this.passData.setData(status, 'locationStatus');
        res(status);
      };
      if (status) {
        this.saveCoordinates();
        res(status);
      }
    });
  }

  async askCamera(): Promise<boolean> {
    this.cameraStatus = await getDevicesPermissions('camera');
    const actions = {
      ask: () => this.showNotificationRequestCamera(),
      redirect: () => window.location.href = nameRoutes.lockedCamera
    };
    let status =  this.managePermissions(this.cameraStatus.state, actions);
    return new Promise(res => {
      this.passData.setData(status, 'cameraStatus');
      this.cameraStatus.onchange = ({target}) => {
        if (this.isValidRoute) {
          status = this.managePermissions(target[ 'state' ], actions);
        } else {
          status = false;
        }
        this.passData.setData(status, 'cameraStatus');
        res(status);
      };
      if (status) {
        res(status);
      }
    });
  }

  private managePermissions(deviceState: string, actions: ActionsPermissions) {
    let status;
    switch (deviceState) {
      case permissions.granted:
        this.notify.close();
        status = true;
        break;
      case permissions.prompt:
        status = undefined;
        actions.ask();
        break;
      case permissions.denied:
        status = false;
        this.notify.close();
        actions.redirect();
        break;
    }
    return status;
  }

  showNotificationRequestCamera() {
    this.showNativeAlertCamPermission();
    this.notify.open({
      title: this.mapConfigLang.transform('lbl_tittle_camera_permissions'),
      message: this.mapConfigLang.transform('lbl_camera_permissions'),
      icon: 'sc-icon--notify-camera',
      type: 'camera'
    });
  }


 showNativeAlertCamPermission() {
     const constraints = { video: { width: 1280, height: 720 } };
     navigator.mediaDevices.getUserMedia(constraints).catch((err) => {
    });
  }

  showNotificationRequestLocation() {
    this.saveCoordinates();
    setTimeout(() => {
      this.notify.open( {
        title: this.mapConfigBase.transform('lbl_tittle_permisions_location'),
        message: this.mapConfigBase.transform('lbl_permisions_location'),
        icon: 'sc-icon--notify-location',
        type: 'camera'
      });
    });
  }

  saveCoordinates() {
    navigator.geolocation.getCurrentPosition( position => {
      const gps = `${position.coords.latitude},${position.coords.longitude}`;
      headers.SCLocation = gps;
    });
  }

  get isValidRoute() {
    const currentRoute = this.router.url;
    return (currentRoute.includes(nameRoutes.registerUser) || currentRoute.includes(nameRoutes.dashboard));
  }
}
