import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsNotSignGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // TODO: if isSign is true then redirect to / and return false
    // TODO: else return true
    const isSign = this.authService.isSign();
    return !isSign;
  }
}
