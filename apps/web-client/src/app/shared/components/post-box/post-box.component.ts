import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthUser, Post } from '@project/core';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../store';
import { PostActions } from '../../../store/post';
import { userSelectors } from '../../../store/user';

@Component({
  selector: 'post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss'],
})
export class PostBoxComponent implements OnInit, OnDestroy {
  @Input() post: Post;

  currentUser: AuthUser;
  destroy$ = new Subject<void>();

  get hasPostMedia() {
    return this.post.postMedia.length > 0;
  }
  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.store
      .select(userSelectors.currentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.currentUser = user));
  }

  handlePostVote() {
    if (this.post.userLikedPost) {
      this.store.dispatch(PostActions.unlikePost({ postId: this.post._id }));
    } else {
      this.store.dispatch(PostActions.likePost({ postId: this.post._id }));
    }
  }
}
