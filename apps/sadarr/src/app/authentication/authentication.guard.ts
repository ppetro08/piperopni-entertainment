import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationPartialState } from './state/authentication.reducer';
import { getUser } from './state/authentication.selectors';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AuthenticationPartialState>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(getUser).pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/authentication/login']);
        }
        return !!user;
      })
    );
  }
}
