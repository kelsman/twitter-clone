import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, GoogleUser, LogInUserResponse } from '@project/core';
import { environment } from 'apps/web-client/src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.AUTH_API_URI;

  constructor(private http: HttpClient) {}

  signInGoogle(user: GoogleUser): Observable<ApiResponse<LogInUserResponse>> {
    return this.http.post<ApiResponse<LogInUserResponse>>(
      `${this.baseUrl}/auth/google/login`,
      user
    );
  }
}
