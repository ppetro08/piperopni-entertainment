import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from '../../api/models/user.model';
import { ErrorModel } from '../../shared/models/error.model';
import * as AuthenticationActions from './authentication.actions';

export const AUTHENTICATION_FEATURE_KEY = 'authentication';

export interface State {
  error: ErrorModel | null;
  loading: boolean;
  token: string | null;
  user: UserModel | null;
}

export interface AuthenticationPartialState {
  readonly [AUTHENTICATION_FEATURE_KEY]: State;
}

export const initialState: State = {
  error: null,
  loading: true,
  token: null,
  user: null,
};

const authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.authenticationLogin, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    AuthenticationActions.authenticationVerifiedSessionSuccess,
    AuthenticationActions.authenticationLoginSuccess,
    (state, { authenticationResponse }) => {
      return {
        ...state,
        error: null,
        loading: false,
        token: authenticationResponse.token,
        user: authenticationResponse,
      };
    }
  ),
  on(AuthenticationActions.authenticationLoginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authenticationReducer(state, action);
}
