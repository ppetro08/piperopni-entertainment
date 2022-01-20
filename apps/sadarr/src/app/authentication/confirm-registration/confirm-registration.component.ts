import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { authenticationConfirmRegistration } from '../state/authentication.actions';

@Component({
  selector: 'pip-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmRegistrationComponent implements OnInit {
  verified = true;

  private queryParamMap: ParamMap | null = null;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.queryParamMap = this.route.snapshot.queryParamMap;
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
