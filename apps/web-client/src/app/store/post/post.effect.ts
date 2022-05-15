import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { AppState } from '..';
import { AuthService } from '../../shared/services/auth.service';
import { PostService } from '../../shared/services/post.service';
import { PostActions } from './post.action';

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
    private postService: PostService
  ) {}

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      switchMap(({ data }) =>
        this.postService.createPost(data).pipe(
          map(({ data }) => PostActions.createPostSuccess({ post: data })),
          catchError((error) => of(PostActions.createPostFail({ error })))
        )
      )
    )
  );

  loadFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getFeed),
      switchMap(() =>
        this.postService.getFeed().pipe(
          map(({ data }) => PostActions.getFeedSuccess({ posts: data })),
          catchError((error) => of(PostActions.getFeedFail({ error })))
        )
      )
    )
  );

  likePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.likePost),
      switchMap(({ postId }) =>
        this.postService.likePost(postId).pipe(
          map(({ data }) => PostActions.likePostSuccess({ post: data }))
          // catchError((error) => of(PostActions.({ error })))
        )
      )
    )
  );

  unlikePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.unlikePost),
      switchMap(({ postId }) =>
        this.postService.unlikePost(postId).pipe(
          map(({ data }) => PostActions.unlikePostSuccess({ post: data }))
          // catchError((error) => of(PostActions.({ error })))
        )
      )
    )
  );
}
