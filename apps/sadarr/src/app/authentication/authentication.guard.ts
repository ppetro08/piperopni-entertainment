import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { AuthenticationPartialState } from './state/authentication.reducer';
import { getUser } from './state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private store: Store<AuthenticationPartialState>,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(getUser).pipe(
      switchMap((user) => {
        return this.authenticationService.verifySession(user);
      })
    );
  }
}
