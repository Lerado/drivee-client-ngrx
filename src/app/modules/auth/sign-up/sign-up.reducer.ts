import { HttpErrorResponse } from "@angular/common/http";
import { createFeature, createReducer } from "@ngrx/store";

export const authSignUpFeatureKey = 'authSignUp';

export interface State {
  signUpLoading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: State = {
  signUpLoading: false,
  error: null
}

export const reducer = createReducer(
  initialState
);

const authSignUpFeature = createFeature({
  name: authSignUpFeatureKey,
  reducer
});

export const {
  selectSignUpLoading,
  selectError
} = authSignUpFeature;
