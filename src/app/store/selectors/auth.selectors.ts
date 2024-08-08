import { createSelector, createFeatureSelector } from '@ngrx/store';
import { LoginState } from '../models/LoginState';

export const selectAuthState = createFeatureSelector<LoginState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: LoginState) => state.isLoggedIn
);

export const selectIsLoggingIn = createSelector(
  selectAuthState,
  (state: LoginState) => state.isLoggingIn
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: LoginState) => state.error
);

export const selectIsRecoveredPasswords = createSelector(
  selectAuthState,
  (state: LoginState) => state.isRecoveredPasswords
);

export const selectIsRecoveringPasswords = createSelector(
  selectAuthState,
  (state: LoginState) => state.isRecoveringPasswords
);
