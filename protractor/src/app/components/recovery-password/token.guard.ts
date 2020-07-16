import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  ParamQueryToken: string;

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    this.ParamQueryToken = route.queryParamMap.get('t');

    if (! this.ParamQueryToken) {
      this.router.navigate(['/']);
      return true;
    } else {
      return true;
    }
  }

}
