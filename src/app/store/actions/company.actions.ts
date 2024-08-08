// import { createAction, props } from '@ngrx/store';

// export const loadCompanyData = createAction('[Company] Load Data');
// export const loadCompanyDataSuccess = createAction('[Company] Load Data Success', props<{ data: any }>());
// export const loadCompanyDataFailure = createAction('[Company] Load Data Failure', props<{ error: any }>());


import { createAction, props } from '@ngrx/store';

export const loadCompanyData = createAction(
  '[Company] Load Data',
  props<{ symbol: string, interval: string }>()
);

export const loadCompanyDataSuccess = createAction(
  '[Company] Load Data Success',
  props<{ symbol: string, interval: string, data: any }>()
);

export const loadCompanyDataFailure = createAction(
  '[Company] Load Data Failure',
  props<{ error: any }>()
);
