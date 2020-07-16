import { AuthGuard } from './auth.guard';
import { NgZone } from '@angular/core';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service;
  let router;

  beforeEach(() => {
    service = { isLoggedIn: true, redirectUrl: '' };
    router = { navigate: (new NgZone({enableLongStackTrace: true})).run( () => true ) };
    guard = new AuthGuard(service, router);
  });

  it( 'should initiate', () => {
    expect(guard).toBeTruthy();
  });

  it('Should checked if the user is logged in and return true', () => {
    expect(guard.checkLoggedIn('')).toBeTruthy();
  });

  it('Should checked if the user is logged in redirect and return false', () => {
    service.isLoggedIn = false;
    spyOn(router, 'navigate');

    guard = new AuthGuard(service, router);

    expect(guard.checkLoggedIn('/someDirectory')).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(service.redirectUrl).toEqual('/someDirectory');

  });

});
