import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ApiResponse,
  CreateUser,
  GoogleUser,
  LogInUser,
  LogInUserResponse,
  RefreshTokenResponse,
} from '@project/core';
import { environment } from 'apps/web-client/src/environments/environment';
import { map, Observable, tap } from 'rxjs';
import { AppState } from '../../store';
import { userActions } from '../../store/user';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.AUTH_API_URI + '/auth';

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  get AuthToken(): string {
    return this.storageService.getItem('access_token');
  }

  get RefreshToken(): string {
    return this.storageService.getItem('refresh_token');
  }

  signInGoogle(user: GoogleUser): Observable<ApiResponse<LogInUserResponse>> {
    return this.http
      .post<ApiResponse<LogInUserResponse>>(
        `${this.baseUrl}/google/login`,
        user
      )
      .pipe(
        tap(({ data }) => {
          this.storageService.setItem('access_token', data.access_token);
          this.storageService.setItem('refresh_token', data.refresh_token);
        })
      );
  }

  refreshExpiredToken(): Observable<RefreshTokenResponse> {
    const params = new HttpParams().append('token', this.RefreshToken);
    return this.http
      .post<ApiResponse<RefreshTokenResponse>>(
        `${this.baseUrl}/refresh-token`,
        {},
        {
          params,
        }
      )
      .pipe(map(({ data }) => data));
  }

  emailSignUp(user: CreateUser): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.baseUrl}/signup`, user);
  }

  logInUser(user: LogInUser): Observable<ApiResponse<LogInUserResponse>> {
    return this.http.post<ApiResponse<LogInUserResponse>>(
      `${this.baseUrl}/login`,
      user
    );
  }

  validateUsername(username: string) {
    return this.http.post<ApiResponse<void>>(
      `${this.baseUrl}/validate-username`,
      { username }
    );
  }

  logOut() {
    this.storageService.clearAll();
    this.router.navigate(['/auth']);
    this.store.dispatch(userActions.logOutUser());
  }
}
