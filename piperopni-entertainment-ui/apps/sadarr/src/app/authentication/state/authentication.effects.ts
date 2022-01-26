import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, take, tap } from 'rxjs/operators';
import { PiperopniEntertainmentService } from '../../api/piperopni-entertainment.api.service';
import { AuthenticationService } from '../authentication.service';
import * as AuthenticationActions from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
  confirmRegistration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthenticationActions.authenticationConfirmRegistration),
      fetch({
        run: (action) => {
          return this.piperopniEntertainmentService
            .confirmRegistration({
              token: action.token,
              userId: action.userId,
            })
            .pipe(
              map(() => {
                return AuthenticationActions.authenticationConfirmRegistrationSuccess();
              }),
              take(1)
            );
        },
        onError: (action, { error }) => {
          return AuthenticationActions.authenticationConfirmRegistrationFailure(
            { error }
          );
        },
      })
    );
  });

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.authenticationLogin),
      fetch({
        run: (action) => {
          return this.piperopniEntertainmentService.login(action.login).pipe(
            map((authenticationResponse) => {
              return AuthenticationActions.authenticationLoginSuccess({
                authenticationResponse,
              });
            }),
            take(1)
          );
        },
        onError: (action, { error }) => {
          return AuthenticationActions.authenticationLoginFailure({ error });
        },
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthenticationActions.authenticationLoginSuccess),
        tap(({ authenticationResponse }) => {
          this.authenticationService.setCurrentUser(authenticationResponse);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthenticationActions.authenticationRegister),
      fetch({
        run: (action) => {
          return this.piperopniEntertainmentService
            .register(action.register)
            .pipe(
              map(() => {
                return AuthenticationActions.authenticationRegisterSuccess();
              }),
              take(1)
            );
        },
        onError: (action, { error }) => {
          return AuthenticationActions.authenticationRegisterFailure({ error });
        },
      })
    );
  });

  unverifiedSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthenticationActions.authenticationUnverifiedSession),
      map(() => {
        const currentUser = this.authenticationService.getCurrentUser();
        const cookie = this.authenticationService.getCookie();
        if (!currentUser) {
          return AuthenticationActions.authenticationVerifiedSessionFailure();
        }

        if (!cookie) {
          this.authenticationService.setCookieToCurrentUserToken();
        }

        return AuthenticationActions.authenticationVerifiedSessionSuccess({
          authenticationResponse: currentUser,
        });
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private piperopniEntertainmentService: PiperopniEntertainmentService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
}
