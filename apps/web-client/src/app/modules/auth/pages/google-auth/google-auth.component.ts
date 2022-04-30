import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthUser } from '@project/core';
import { UsernameValidator } from 'apps/web-client/src/app/shared/services/validators/validate-username';
import { AppState } from 'apps/web-client/src/app/store';
import { modalSelectors } from 'apps/web-client/src/app/store/layout';
import { userSelectors } from 'apps/web-client/src/app/store/user';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-google-auth-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent implements OnInit, OnDestroy {
  isVisible: Observable<boolean>;
  loading: Observable<boolean>;
  userError: Observable<string>;
  currentUser: Observable<AuthUser>;
  destroy$ = new Subject<void>();
  showUsernameSettings: boolean = false;
  userNameControl = new FormControl(
    '',
    [Validators.required, Validators.minLength(2)],
    [this.usernameValidator.validate.bind(this.usernameValidator)]
  );

  constructor(
    private store: Store<AppState>,

    private usernameValidator: UsernameValidator
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.isVisible = this.store.select(
      modalSelectors.isModalOpen('google-auth')
    );
    this.loading = this.store.select(userSelectors.loadingAction);

    this.userError = this.store.select(userSelectors.userError);
    console.log('cheee');

    this.store
      .select(userSelectors.currentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          if (!user.username) {
            this.showUsernameSettings = true;
          }
        }
      });
  }
}
