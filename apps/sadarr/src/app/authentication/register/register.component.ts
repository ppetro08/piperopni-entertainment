import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterModel } from '../model/register.model';
import { authenticationRegister } from '../state/authentication.actions';

const checkPasswords: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  let pass = group.parent?.get('password')?.value;
  let confirmPass = group.parent?.get('confirmPassword')?.value;
  return pass === confirmPass ? null : { notSame: true };
};

@Component({
  selector: 'pip-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.email,
        Validators.required,
      ]),
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required]),
      confirmPassword: this.formBuilder.control(null, [
        Validators.required,
        checkPasswords,
      ]),
    });
  }

  register(form: FormGroup): void {
    // TODO:P - show a message saying that a registration email has been sent, click the link in the email to complete your registration
    const register: RegisterModel = form.value;
    this.store.dispatch(authenticationRegister({ register }));
  }
}
