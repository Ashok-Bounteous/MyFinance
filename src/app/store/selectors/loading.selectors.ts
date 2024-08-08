// src/app/store/selectors/loading.selectors.ts
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { LoadingState } from "../models/loadingState";

export const selectLoadingState = createFeatureSelector<LoadingState>('loading');

export const selectIsLoading = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.show
);
