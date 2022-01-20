import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginModel } from '../model/login.model';
import { authenticationLogin } from '../state/authentication.actions';

@Component({
  selector: 'pip-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.email,
        Validators.required,
      ]),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  login(form: FormGroup): void {
    const loginModel: LoginModel = form.value;
    this.store.dispatch(authenticationLogin({ login: loginModel }));
  }
}
