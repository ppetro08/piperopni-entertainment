import { createAction, props } from '@ngrx/store';
import { AuthenticationResponseModel } from '../../api/models/user.model';
import { ErrorModel } from '../../shared/models/error.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

export const authenticationUnverifiedSession = createAction(
  '[Authentication] Unverified Session'
);
export const authenticationVerifiedSessionSuccess = createAction(
  '[Authentication] Verified Session Success',
  props<{ authenticationResponse: AuthenticationResponseModel }>()
);
export const authenticationVerifiedSessionFailure = createAction(
  '[Authentication] Verified Session Failure'
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

export const authenticationLogout = createAction('[Authentication] Logout');

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
