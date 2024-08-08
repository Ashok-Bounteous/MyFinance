// import { createReducer, on } from '@ngrx/store';
// import * as CompanyActions from '../actions/company.actions';

// export interface CompanyState {
//   data: any;
//   error: any;
//   loading: boolean;
// }

// export const initialState: CompanyState = {
//   data: null,
//   error: null,
//   loading: false
// };

// export const companyReducer = createReducer(
//   initialState,
//   on(CompanyActions.loadCompanyData, state => ({ ...state, loading: true })),
//   on(CompanyActions.loadCompanyDataSuccess, (state, { data }) => ({ ...state, loading: false, data })),
//   on(CompanyActions.loadCompanyDataFailure, (state, { error }) => ({ ...state, loading: false, error }))
// );



import { createReducer, on } from '@ngrx/store';
import * as CompanyActions from '../actions/company.actions';

export interface CompanyState {
  data: { [key: string]: { [key: string]: any } }; // Structure: { [symbol: string]: { [interval: string]: any } }
  error: any;
  loading: boolean;
}

export const initialState: CompanyState = {
  data: {},
  error: null,
  loading: false
};

export const companyReducer = createReducer(
  initialState,
  on(CompanyActions.loadCompanyData, state => ({ ...state, loading: true })),
  on(CompanyActions.loadCompanyDataSuccess, (state, { symbol, interval, data }) => ({
    ...state,
    loading: false,
    data: {
      ...state.data,
      [symbol]: {
        ...state.data[symbol],
        [interval]: data
      }
    }
  })),
  on(CompanyActions.loadCompanyDataFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
