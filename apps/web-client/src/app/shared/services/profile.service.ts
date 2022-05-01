import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseType, AuthUser } from '@project/core';
import { environment } from 'apps/web-client/src/environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly baseUrl = environment.USER_API_URI;
  constructor(private http: HttpClient) {}

  updateUsername(username: string): Observable<ApiResponseType<AuthUser>> {
    return this.http.patch<ApiResponseType<AuthUser>>(
      this.baseUrl + '/update',
      {
        username,
      }
    );
  }

  getProfile(): Observable<AuthUser> {
    return this.http
      .get<ApiResponseType<AuthUser>>(this.baseUrl + '/profile')
      .pipe(map(({ data }) => data));
  }
}
