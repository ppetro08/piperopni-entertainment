import { Component, isDevMode } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { appInit } from './app.actions';
import { authenticationLogout } from './authentication/state/authentication.actions';
import { getUser } from './authentication/state/authentication.selectors';
import { isAuthenticationRoute } from './shared/utils/string';

@Component({
  selector: 'pip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'pip-root',
  },
})
export class AppComponent {
  showNavBar: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    // @ts-ignore
    if (isDevMode() && window.Cypress) {
      // @ts-ignore
      window.store = this.store;
    }

    this.store.dispatch(appInit());

    this.showNavBar = combineLatest([
      this.store.select(getUser),
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ),
    ]).pipe(
      map(([user, route]) => {
        return !!user && !isAuthenticationRoute((route as NavigationEnd).url);
      })
    );
  }

  logout(): void {
    this.store.dispatch(authenticationLogout());
  }
}
