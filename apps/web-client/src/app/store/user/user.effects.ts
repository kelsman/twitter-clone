import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, debounceTime, exhaustMap, map, of, tap } from 'rxjs';
import { AppState } from '..';
import { AuthService } from '../../shared/services/auth.service';
import { ModalActions } from '../layout';
import { userActions } from './user.actions';

@Injectable()
export class userEffectService {
  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.googleLogin),
      exhaustMap(({ user }) =>
        this.authService.signInGoogle(user).pipe(
          map(({ data }) => userActions.setUser({ user: data.user })),
          catchError((error) => of(userActions.googleLoginFailure({ error })))
        )
      )
    )
  );

  googleLoginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userActions.googleLogin),
        tap(() => {
          this.router.navigate(['/auth/google']);
          debounceTime(1000);
          this.store.dispatch(
            ModalActions.openModal({ modalId: 'google-auth' })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
}
