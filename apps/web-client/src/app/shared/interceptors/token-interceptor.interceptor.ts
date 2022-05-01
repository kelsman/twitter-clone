import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;
  refreshTokenSubject = new BehaviorSubject(null);

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAuthToken(request)).pipe(
      catchError((requestError: HttpErrorResponse) => {
        if (
          !request.url.includes('/auth') &&
          requestError &&
          [401, 403].includes(requestError.status)
        ) {
          return this.handle401Error(request, next);
        }

        return throwError(() => new Error(requestError.message));
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter((result) => result),
        take(1),
        switchMap(() => next.handle(this.addAuthToken(request)))
      );
    } else {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshExpiredToken().pipe(
        switchMap(({ access_token, refresh_token }) => {
          this.storageService.setItem('access_token', access_token);
          this.storageService.setItem('refresh_token', refresh_token);
          this.refreshTokenSubject.next(access_token);
          return next.handle(this.addAuthToken(request));
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    }
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.storageService.getItem('access_token');
    if (!token) return request;

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
