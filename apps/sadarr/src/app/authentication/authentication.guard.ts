import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, Observable, of } from 'rxjs';
import { first, mapTo, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import {
  authenticationUnverifiedSession,
  authenticationVerifiedSessionFailure,
  authenticationVerifiedSessionSuccess,
} from './state/authentication.actions';
import { AuthenticationPartialState } from './state/authentication.reducer';
import { getUser } from './state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private store: Store<AuthenticationPartialState>,
    private authenticationService: AuthenticationService,
    private router: Router,
    private readonly actions$: Actions
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(getUser).pipe(
      switchMap((user) => {
        if (user) {
          return of(true);
        }

        if (!this.authenticationService.getCurrentUser()) {
          return this.redirectToLogin(state);
        }

        return this.verifySession();
      })
    );
  }

  private redirectToLogin(state: RouterStateSnapshot): Observable<boolean> {
    this.router.navigate(['/authentication/login'], {
      queryParams: { redirectUrl: state.url },
    });
    return of(false);
  }

  verifySession(): Observable<boolean> {
    const success = this.actions$.pipe(
      ofType(authenticationVerifiedSessionSuccess),
      mapTo(true)
    );

    const failure = this.actions$.pipe(
      ofType(authenticationVerifiedSessionFailure),
      tap(() => {
        this.router.navigate(['/authentication/login']);
      }),
      mapTo(false)
    );

    this.store.dispatch(authenticationUnverifiedSession());

    return merge(success, failure).pipe(first());
  }
}
