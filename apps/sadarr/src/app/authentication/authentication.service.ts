import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { merge, Observable, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import {
  AuthenticationResponseModel,
  UserModel,
} from '../api/models/user.model';
import {
  authenticationUnverifiedSession,
  authenticationVerifiedSessionFailure,
  authenticationVerifiedSessionSuccess,
} from './state/authentication.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private cookieKey = 'Bearer';
  private currentUserKey = 'currentUser';

  constructor(
    private cookieService: CookieService,
    private store: Store,
    private readonly actions$: Actions,
    private router: Router
  ) {}

  getCookie(): string {
    return this.cookieService.get(this.cookieKey);
  }

  getCurrentUser(): AuthenticationResponseModel | null {
    const currentUser = localStorage.getItem(this.currentUserKey);
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  resetLocalStorageAndCookies(): void {
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  setCookieToCurrentUserToken(): void {
    const authenticationResponse: AuthenticationResponseModel | null =
      this.getCurrentUser();
    if (authenticationResponse && !this.getCookie()) {
      this.cookieService.set('Bearer', authenticationResponse.token);
    }
  }

  setCurrentUser(authenticationResponse: AuthenticationResponseModel): void {
    localStorage.setItem(
      this.currentUserKey,
      JSON.stringify(authenticationResponse)
    );
    this.setCookieToCurrentUserToken();
  }

  verifySession(user: UserModel | null): Observable<boolean> {
    if (user) {
      return of(true);
    }

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

    return merge(success, failure).pipe(
      tap((results) => {
        console.log(results);
      })
    );
  }
}
