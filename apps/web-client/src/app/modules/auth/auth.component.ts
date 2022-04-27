import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';
import { environment } from 'apps/web-client/src/environments/environment';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { AppState } from '../../store';
import { ModalActions } from '../../store/layout';
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

  ngOnInit(): void {
    this.socialAuthService.authState
      .pipe(takeUntil(this.destroy$))
      .subscribe((user: SocialUser) => {
        if (user) {
          this.store.dispatch(
            ModalActions.openModal({ modalId: 'google-auth' })
          );
        }
        console.log('google user', user);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loginWithGoogle() {
    // this.socialAuthService.initState
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(() => {
    //     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //   });
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((d) => console.log(d))
      .catch((error) => {
        console.log(error);
      });
  }

  signOutWithGoogle() {
    this.socialAuthService.signOut();
  }
  processTokenFromGoogle() {
    this.store.dispatch(ModalActions.openModal({ modalId: 'google-auth' }));
    this.loadingGoogleTokenProcess = true;
    this.storageService.setItem('access_token', this.googleAccessToken);
    this.storageService.setItem('refresh_token', this.googleRefreshToken);
    this.store.dispatch(ModalActions.closeModal({ modalId: 'google-auth' }));

    setTimeout(() => {
      this.router.navigate(['/auth/google']);
    }, 1000);
  }
}
