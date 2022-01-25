import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {
  authenticationConfirmRegistration,
  authenticationConfirmRegistrationSuccess,
} from '../state/authentication.actions';

@Component({
  selector: 'pip-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmRegistrationComponent implements OnInit {
  verified = false;

  private queryParamMap: ParamMap | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private actions$: Actions,
    private changeDetectoryRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.queryParamMap = this.activatedRoute.snapshot.queryParamMap;

    this.actions$
      .pipe(ofType(authenticationConfirmRegistrationSuccess), take(1))
      .subscribe(() => {
        this.verified = true;
        this.changeDetectoryRef.markForCheck();
      });
  }

  confirmRegistration(): void {
    const token = this.queryParamMap?.get('token');
    const userId = this.queryParamMap?.get('userId');

    if (token && userId) {
      this.store.dispatch(
        authenticationConfirmRegistration({ token, userId: Number(userId) })
      );
    }
  }
}
