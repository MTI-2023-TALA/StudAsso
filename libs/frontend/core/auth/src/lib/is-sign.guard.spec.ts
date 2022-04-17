import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { IsSignGuard } from './is-sign.guard';
import { spyOn } from 'jest-mock';

class RouterMock {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('IsNotSignGuard', () => {
  let routerMock: RouterMock;
  let authService: AuthService;
  let fixture: IsSignGuard;

  beforeEach(() => {
    routerMock = new RouterMock();
    authService = new AuthService();
    fixture = new IsSignGuard(routerMock as unknown as Router, authService);
  });

  it('should be defined', () => {
    expect(fixture).toBeDefined();
  });

  it('should be false when user is not log in', () => {
    const result = fixture.canActivate(new ActivatedRouteSnapshot(), null as unknown as RouterStateSnapshot);

    expect(result).toBeFalsy();
  });

  it('should redirect when user is not log in', () => {
    spyOn(routerMock, 'navigateByUrl');

    fixture.canActivate(new ActivatedRouteSnapshot(), null as unknown as RouterStateSnapshot);

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should be true when user is connected', () => {
    authService.tryToSign();

    const result = fixture.canActivate(new ActivatedRouteSnapshot(), null as unknown as RouterStateSnapshot);

    expect(result).toBeTruthy();
  });
});
