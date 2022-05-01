import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePost } from '@project/core';
import { environment } from 'apps/web-client/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly baseUrl = environment.POST_API_URI + '/post';
  constructor(private http: HttpClient) {}

  createPost(body: CreatePost) {
    return this.http.post(this.baseUrl + '/create', body);
  }
}
