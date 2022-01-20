import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { PiperopniEntertainmentService } from '../../api/piperopni-entertainment.api.service';
import { appInit } from '../../app.actions';
import * as AuthenticationActions from './authentication.actions';
import { authenticationInit } from './authentication.actions';
import { AuthenticationPartialState } from './authentication.reducer';
import { getUser, getUserToken } from './authentication.selectors';

@Injectable()
export class AuthenticationEffects {
  appInit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appInit),
      withLatestFrom(
        this.store.select(getUserToken),
        this.store.select(getUser)
      ),
      switchMap(([action, token, user]) => {
        if (token && !user) {
          return this.piperopniEntertainmentService.getCurrentUser().pipe(
            take(1),
            map((user) => {
              return authenticationInit({ token, user });
            })
          );
        }
        return of(authenticationInit({}));
      })
    );
  });

  clearCookie$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authenticationInit),
        tap(() => {
          this.cookieService.deleteAll();
        })
      );
    },
    { dispatch: false }
  );

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
        onError: (action, error) => {
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
        onError: (action, error) => {
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
          this.cookieService.set('Bearer', authenticationResponse.token);
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
        onError: (action, error) => {
          return AuthenticationActions.authenticationRegisterFailure({ error });
        },
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private store: Store<AuthenticationPartialState>,
    private piperopniEntertainmentService: PiperopniEntertainmentService,
    private cookieService: CookieService
  ) {}
}
