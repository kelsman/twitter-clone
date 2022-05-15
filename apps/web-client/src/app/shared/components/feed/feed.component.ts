import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Post } from '@project/core';
import { Observable } from 'rxjs';
import { AppState } from '../../../store';
import { PostActions, PostSelectors } from '../../../store/post';
import { FeedSocket } from '../../services/feed-socket.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private feedSocket: FeedSocket, private store: Store<AppState>) {}

  feeds$: Observable<Array<Post>> = this.store.select(
    PostSelectors.selectFeeds
  );
  loadingFeeds$: Observable<boolean> = this.store.select(
    PostSelectors.selectLoadingFeed
  );

  ngOnInit(): void {
    this.store.dispatch(PostActions.getFeed());

    this.feedSocket.message();
    this.feedSocket
      .getMessage()
      .subscribe((message) => console.log('message', message));
  }
}
