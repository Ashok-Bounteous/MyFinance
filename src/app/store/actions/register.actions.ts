import { createAction, props } from "@ngrx/store"


export const register = createAction('[Register]', props<{UserRegister: any}>());