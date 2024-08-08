import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/services/userauth.service';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const recoverEmailPassword = createAction(
  '[Auth] Recover Email Password',
  props<{ email: string }>()
);

export const recoverEmailPasswordSuccess = createAction('[Auth] Recover Email Password Success');

export const recoverEmailPasswordFailure = createAction(
  '[Auth] Recover Email Password Failure',
  props<{ error: any }>()
);
