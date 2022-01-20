import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTHENTICATION_FEATURE_KEY, State } from './authentication.reducer';

export const getAuthenticationState = createFeatureSelector<State>(
  AUTHENTICATION_FEATURE_KEY
);

export const getUserToken = createSelector(
  getAuthenticationState,
  (state: State) => state.token
);

export const getUser = createSelector(
  getAuthenticationState,
  (state: State) => state.user
);

export const getAuthenticationLoading = createSelector(
  getAuthenticationState,
  (state: State) => state.loading
);

export const getAuthenticationLoginError = createSelector(
  getAuthenticationState,
  (state: State) => state.error
);
