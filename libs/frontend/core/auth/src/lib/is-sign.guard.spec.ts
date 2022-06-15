import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthServiceMock } from '@stud-asso/frontend/testing/common-mock';
import { IsSignGuard } from './is-sign.guard';

class RouterMock {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('IsSignGuard', () => {
  let guard: IsSignGuard;
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthServiceMock() as unknown as AuthService;
    guard = new IsSignGuard(new RouterMock() as unknown as Router, authService);
  });

  it('should create an instance', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is signed', () => {
    authService.tryToSign('a', 'a', false);
    expect(
      guard.canActivate(null as unknown as ActivatedRouteSnapshot, null as unknown as RouterStateSnapshot)
    ).toBeTruthy();
  });

  it('should return false if user is not signed', () => {
    authService.logout();
    expect(
      guard.canActivate(null as unknown as ActivatedRouteSnapshot, null as unknown as RouterStateSnapshot)
    ).toBeFalsy();
  });
});
