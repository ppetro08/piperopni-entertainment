import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { appInit } from './app.actions';
import { getUser } from './authentication/state/authentication.selectors';

@Component({
  selector: 'pip-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'pip-root',
  },
})
export class AppComponent {
  authenticated: Observable<boolean>;

  constructor(private store: Store) {
    this.store.dispatch(appInit());

    this.authenticated = this.store.select(getUser).pipe(
      map((user) => {
        return !!user;
      })
    );
  }
}
