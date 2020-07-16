import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/shared/security/login.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    if (this.loginService.isLoggedIn) {
      return true;
    } else {
      this.loginService.redirectUrl = url;
      this.router.navigate(['/']);
      return false;
    }
  }
}
