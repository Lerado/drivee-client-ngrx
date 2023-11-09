import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthSignInActions } from "./sign-in.actions";
import { map } from "rxjs";
import { AuthActions } from "app/core/auth/auth.actions";

@Injectable()
export class AuthSignInEffects {

  signIn$ = createEffect(() => this._actions$.pipe(
    ofType(AuthSignInActions.signInButtonClicked),
    map(({ payload }) => AuthActions.signIn({ payload }))
  ));

  signInLoadingStart$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signIn),
    map(() => AuthSignInActions.signInLoadingStart())
  ))

  signInLoadingEnd$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signInSuccess, AuthActions.signInFailure),
    map(() => AuthSignInActions.signInLoadingEnd())
  ))

  /**
   * Constructor
   */
  constructor(
    private readonly _actions$: Actions
  ) { }
}
