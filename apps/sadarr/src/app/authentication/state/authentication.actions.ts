import { createAction, props } from '@ngrx/store';
import {
  AuthenticationResponseModel,
  UserModel,
} from '../../api/models/user.model';
import { ErrorModel } from '../../shared/models/error.model';
import { LoginModel } from '../model/login.model';
import { RegisterModel } from '../model/register.model';

export const authenticationInit = createAction(
  '[Authentication] Init',
  props<{ token?: string | null; user?: UserModel | null }>()
);

export const authenticationLogin = createAction(
  '[Authentication] Login',
  props<{ login: LoginModel }>()
);
export const authenticationLoginSuccess = createAction(
  '[Authentication/API] Login Success',
  props<{ authenticationResponse: AuthenticationResponseModel }>()
);
export const authenticationLoginFailure = createAction(
  '[Authentication/API] Login Failure',
  props<{ error: ErrorModel }>()
);

export const authenticationRegister = createAction(
  '[Authentication] Register',
  props<{ register: RegisterModel }>()
);
export const authenticationRegisterSuccess = createAction(
  '[Authentication/API] Register Success'
);
export const authenticationRegisterFailure = createAction(
  '[Authentication/API] Register Failure',
  props<{ error: ErrorModel }>()
);

export const authenticationConfirmRegistration = createAction(
  '[Authentication] Confirm Registration',
  props<{ token: string; userId: number }>()
);
export const authenticationConfirmRegistrationSuccess = createAction(
  '[Authentication/API] Confirm Registration Success'
);
export const authenticationConfirmRegistrationFailure = createAction(
  '[Authentication/API] Confirm Registration Failure',
  props<{ error: ErrorModel }>()
);
