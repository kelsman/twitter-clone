import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthUser } from '@project/core';
import { ProfileService } from 'apps/web-client/src/app/shared/services/profile.service';
import { UsernameValidator } from 'apps/web-client/src/app/shared/services/validators/validate-username';
import { AppState } from 'apps/web-client/src/app/store';
import {
  ModalActions,
  modalSelectors,
} from 'apps/web-client/src/app/store/layout';
import { userActions, userSelectors } from 'apps/web-client/src/app/store/user';
import { debounceTime, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-google-auth-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent implements OnInit, OnDestroy {
  isVisible: Observable<boolean> = this.store.select(
    modalSelectors.isModalOpen('google-auth')
  );
  loading: Observable<boolean>;
  userError: Observable<string>;
  currentUser: Observable<AuthUser> = this.store.pipe(
    select((state: AppState) => state.user.user)
  );
  chekingUserName = false;
  destroy$ = new Subject<void>();
  showUsernameSettings: boolean = false;
  userNameControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(2)],
    [this.usernameValidator.validate.bind(this.usernameValidator)]
  );

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService,
    private usernameValidator: UsernameValidator,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loading = this.store.select(userSelectors.loadingAction);
    this.userError = this.store.select(userSelectors.userError);
    this.checkUserHasUsername();
  }

  checkUserHasUsername() {
    this.chekingUserName = true;
    this.currentUser.pipe().subscribe((user) => {
      if (user) {
        if (user.username) {
          this.chekingUserName = false;
          this.router.navigate(['/']);
          return;
        } else {
          this.chekingUserName = false;
          this.showUsernameSettings = true;
        }
      }
    });
  }

  formulateLoading() {
    this.chekingUserName = true;
  }

  onSubmit() {
    this.formulateLoading();
    this.profileService
      .updateUsername(this.userNameControl.value)
      .pipe(
        takeUntil(this.destroy$),
        map(({ data }) => data)
      )
      .subscribe({
        next: (user) => {
          this.store.dispatch(userActions.setUser({ user }));
          this.store.dispatch(
            ModalActions.closeModal({ modalId: 'google-auth' })
          );
          debounceTime(500);
          this.chekingUserName = false;
          this.router.navigate(['/']);
        },
      });
  }
}
