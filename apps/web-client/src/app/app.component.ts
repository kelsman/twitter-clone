import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthUser } from '@project/core';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from './shared/services/profile.service';
import { StorageService } from './shared/services/storage.service';
import { AppState } from './store';
import { userActions, userSelectors } from './store/user';

@Component({
  selector: 'project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'web-client';
  tokenPresent = this.storageService.getItem('access_token');
  destroy$ = new Subject<void>();
  currentUser$: AuthUser;
  constructor(
    private store: Store<AppState>,
    private storageService: StorageService,
    private profileService: ProfileService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.store
      .pipe(select(userSelectors.currentUser))
      .subscribe((user) => (this.currentUser$ = user));

    if (this.tokenPresent) {
      if (!this.currentUser$) {
        this.loadUser();
      }
    }
  }

  loadUser() {
    this.profileService
      .getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) =>
        this.store.dispatch(userActions.setUser({ user: data }))
      );
  }
}
