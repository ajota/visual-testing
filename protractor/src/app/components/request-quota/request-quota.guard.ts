import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import { RequestQuotaComponent } from './request-quota.component';


import { BrowserPermissionsService } from 'src/app/core/browser-permissions.service';

@Injectable({
  providedIn: 'root'
})

export class RequestQuotaGuard implements CanActivate {
  requestComponent: RequestQuotaComponent;
  statusCamera;
  statusLocation;

  constructor(
    private browserPermission: BrowserPermissionsService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    return this.askPermissions();
  }

  async askPermissions() {
    this.statusLocation = await this.browserPermission.askLocation();
    this.statusCamera = await this.browserPermission.askCamera();
    return (this.statusLocation && this.statusCamera);
  }
}
