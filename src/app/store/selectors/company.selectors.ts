import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from '../reducers/company.reducer';

export const selectCompanyState = createFeatureSelector<CompanyState>('company');

export const selectCompanyData = createSelector(
  selectCompanyState,
  (state: CompanyState) => state.data
);

export const selectCompanyLoading = createSelector(
  selectCompanyState,
  (state: CompanyState) => state.loading
);

export const selectCompanyError = createSelector(
  selectCompanyState,
  (state: CompanyState) => state.error
);
