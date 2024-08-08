import { LoadingState } from "./models/loadingState";
import { LoginState } from "./models/LoginState";

export interface AppState {
    loading: LoadingState;
    login: LoginState;
}