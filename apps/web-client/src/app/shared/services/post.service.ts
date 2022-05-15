import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseType, Post } from '@project/core';
import { environment } from 'apps/web-client/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = environment.POST_API_URI + '/post';
  constructor(private http: HttpClient) {}

  createPost(body: FormData): Observable<ApiResponseType<Post>> {
    return this.http.post<ApiResponseType<Post>>(
      this.baseUrl + '/create',
      body
    );
  }

  getFeed(): Observable<ApiResponseType<Post[]>> {
    return this.http.get<ApiResponseType<Post[]>>(this.baseUrl + '/feed');
  }

  likePost(postId: string): Observable<ApiResponseType<Post>> {
    const params = new HttpParams().set('postId', postId);
    return this.http.patch<ApiResponseType<Post>>(
      this.baseUrl + '/like',
      {},
      {
        params,
      }
    );
  }

  unlikePost(postId: string): Observable<ApiResponseType<Post>> {
    const params = new HttpParams().set('postId', postId);
    return this.http.patch<ApiResponseType<Post>>(
      this.baseUrl + '/unlike',
      {},
      {
        params,
      }
    );
  }
}
