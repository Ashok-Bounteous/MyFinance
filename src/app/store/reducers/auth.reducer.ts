import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { LoginState } from '../models/LoginState';

export const initialState: LoginState = {
  error: null,
  isRecoveredPasswords: false,
  isRecoveringPasswords: false,
  isLoggedIn: false,
  isLoggingIn: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    isLoggingIn: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    isLoggingIn: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    isLoggingIn: false,
    error,
  })),
  on(AuthActions.recoverEmailPassword, (state) => ({
    ...state,
    isRecoveringPasswords: true,
  })),
  on(AuthActions.recoverEmailPasswordSuccess, (state) => ({
    ...state,
    isRecoveringPasswords: false,
    isRecoveredPasswords: true,
    error: null,
  })),
  on(AuthActions.recoverEmailPasswordFailure, (state, { error }) => ({
    ...state,
    isRecoveringPasswords: false,
    error,
  }))
);

export function reducer(state: LoginState | undefined, action: Action) {
  return authReducer(state, action);
}
