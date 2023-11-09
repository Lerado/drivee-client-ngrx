import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthSignUpActions } from "./sign-up.actions";
import { AuthActions } from "app/core/auth/auth.actions";
import { map } from "rxjs";

@Injectable()
export class AuthSignUpEffects {

  signUp$ = createEffect(() => this._actions$.pipe(
    ofType(AuthSignUpActions.signUpButtonClicked),
    map(({ payload }) => AuthActions.signUp({ payload }))
  ));

  signUpLoadingStart$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signUp),
    map(() => AuthSignUpActions.signUpLoadingStart())
  ));

  signUpLoadingEnd$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signUpSuccess, AuthActions.signUpFailure),
    map(() => AuthSignUpActions.signUpLoadingEnd())
  ));

  /**
   * Constructor
   */
  constructor(
    private readonly _actions$: Actions
  ) { }
}
