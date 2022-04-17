import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { IsNotSignGuard } from './is-not-sign.guard';

describe('IsNotSignGuard', () => {
  let authService: AuthService;
  let fixture: IsNotSignGuard;

  beforeEach(() => {
    authService = new AuthService();
    fixture = new IsNotSignGuard(authService);
  });

  it('should be defined', () => {
    expect(fixture).toBeDefined();
  });

  it('should be true when user is not log in', () => {
    const result = fixture.canActivate(new ActivatedRouteSnapshot(), null as unknown as RouterStateSnapshot);

    expect(result).toBeTruthy();
  });

  it('should be false when user is connected', () => {
    authService.tryToSign();

    const result = fixture.canActivate(new ActivatedRouteSnapshot(), null as unknown as RouterStateSnapshot);

    expect(result).toBeFalsy();
  });
});
