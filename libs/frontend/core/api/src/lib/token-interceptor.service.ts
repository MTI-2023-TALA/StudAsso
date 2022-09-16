import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LocalStorageKey, getData } from '@stud-asso/frontend-core-storage';
import { Observable, catchError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {
    return;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = getData(LocalStorageKey.JWT_TOKEN);

    if (req.url.includes('/api/auth/refresh')) {
      token = getData(LocalStorageKey.REFRESH_TOKEN);
    }

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          localStorage.removeItem('jwt-token');
          localStorage.removeItem('refresh-token');
          this.router.navigateByUrl('/login');
        }
        return next.handle(req);
      })
    );
  }
}
