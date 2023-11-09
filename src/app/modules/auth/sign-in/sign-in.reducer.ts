import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthSignInActions } from "./sign-in.actions";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthActions } from "app/core/auth/auth.actions";

export const authSignInFeatureKey = 'authSignIn';

export interface State {
  signInLoading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: State = {
  signInLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(AuthSignInActions.signInLoadingStart,
    (state) => ({ ...state, signInLoading: true })),
  on(AuthSignInActions.signInLoadingEnd,
    (state) => ({ ...state, signInLoading: false })),
  on(AuthActions.signInFailure,
    (state, { error }) => ({ ...state, error }))
)

const authSignInFeature = createFeature({
  name: authSignInFeatureKey,
  reducer
});

export const {
  selectSignInLoading,
  selectError
} = authSignInFeature;
