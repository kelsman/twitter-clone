import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthUser } from '@project/core';
import { AppState } from 'apps/web-client/src/app/store';
import { modalSelectors } from 'apps/web-client/src/app/store/layout';
import { userSelectors } from 'apps/web-client/src/app/store/user';
import { timeStamp } from 'console';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-google-auth-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
})
export class GoogleAuthComponent implements OnInit {
  isVisible: Observable<boolean>;
  constructor(private store: Store<AppState>) {}
  loading: Observable<boolean>;
  userError: Observable<string>;
  currentUser: Observable<AuthUser>;
  destroy$ = new Subject<void>();
  showUsernameSettings: boolean = false;

  ngOnInit(): void {
    this.isVisible = this.store.select(
      modalSelectors.isModalOpen('google-auth')
    );
    this.loading = this.store.select(userSelectors.loadingAction);

    this.userError = this.store.select(userSelectors.userError);
    console.log('cheee');

    this.store.select(userSelectors.currentUser).pipe(takeUntil(this.destroy$)).subscribe((user)=> {
      if(user){
        if(!user.username){
          this.showUsernameSettings = true
        }
      }
    })
  }
}
