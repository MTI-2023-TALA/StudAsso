import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getData } from '@stud-asso/frontend-core-storage';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {
    return;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getData('jwt-token');
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
