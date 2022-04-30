import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { environment } from 'apps/web-client/src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { AppState } from '../../store';
import { userActions } from '../../store/user';
@Component({
  selector: 'twitter-clone-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AuthComponent implements OnInit, OnDestroy {
  googleAuthUrl = environment.AUTH_API_URI + '/auth/google';
  destroy$: Subject<void> = new Subject<void>();
  googleAccessToken: string;
  googleRefreshToken: string;
  isModalVisible: Observable<boolean | undefined>;
  loadingGoogleTokenProcess = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loginWithGoogle() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => this.store.dispatch(userActions.googleLogin({ user })))
      .catch((error) => {
        console.log(error);
      });
  }

  signOutWithGoogle() {
    this.socialAuthService.signOut();
  }
}
