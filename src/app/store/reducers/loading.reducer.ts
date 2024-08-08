import { createReducer, on } from "@ngrx/store";
import { show, hide } from "../actions/loading.actions";
import { LoadingState } from "../models/loadingState";

const initialState: LoadingState = {
    show: false
}

const reducer = createReducer({},
    on(show, () => {
        return {show: true};
    }),
    on(hide, () => {
        return { show: false};
    })
);

export function loadingReducer(state: LoadingState, action: any) {
    return reducer(state,action)
}