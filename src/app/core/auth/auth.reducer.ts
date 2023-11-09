import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthActions } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface State {
  authenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export const initialState: State = {
  authenticated: false,
  accessToken: null,
  refreshToken: null
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.initSuccess,
    (state, { authenticated, tokens }) => ({
      ...state,
      ...tokens,
      authenticated
    })),
  on(AuthActions.signInSuccess,
    (state, { tokens: { accessToken, refreshToken } }) => ({
      ...state,
      authenticated: true,
      accessToken, refreshToken
    })
  ),
  on(AuthActions.signOutSuccess,
    () => initialState)
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer
})

export const {
  selectAccessToken,
  selectAuthState,
  selectAuthenticated,
  selectRefreshToken
} = authFeature;
