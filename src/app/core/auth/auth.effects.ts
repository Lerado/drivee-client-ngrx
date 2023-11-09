import { Injectable } from "@angular/core";
import { Actions, OnInitEffects, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./auth.actions";
import { catchError, concatMap, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Action } from "@ngrx/store";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects implements OnInitEffects {

  /**
   * Init auth state from AuthService on startup
   */
  ngrxOnInitEffects(): Action {
    return AuthActions.init();
  }

  // Init
  init$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.init),
    exhaustMap(() => this._authService.check().pipe(
      map(authenticated => AuthActions.initSuccess({
        authenticated,
        tokens: {
          accessToken: this._authService.accessToken as string,
          refreshToken: this._authService.refreshToken as string
        }
      })),
      catchError((error: HttpErrorResponse) => of(AuthActions.initFailure({ error })))
    ))
  ));

  // Sign in
  signIn$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signIn),
    switchMap(({ payload }) => this._authService.signIn(payload).pipe(
      map(tokens => AuthActions.signInSuccess({ tokens })),
      catchError((error: HttpErrorResponse) => of(AuthActions.signInFailure({ error })))
    ))
  ));

  signInUsingTokenSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signInUsingTokenSuccess),
    map(({ tokens }) => AuthActions.signInSuccess({ tokens }))
  ));

  signInRedirect = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signInSuccess),
    map(() => AuthActions.signInRedirect())
  ))

  redirectOnSignInSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signInRedirect),
    tap(() => this._router.navigateByUrl('/signed-in-redirect'))
  ), { dispatch: false });

  // Sign up
  signUp$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signUp),
    concatMap(({ payload }) => this._authService.signUp(payload).pipe(
      map(() => AuthActions.signUpSuccess({ payload })),
      catchError((error: HttpErrorResponse) => of(AuthActions.signUpFailure({ error })))
    ))
  ));

  signInOnSignUpSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signUpSuccess),
    map(({ payload }) => AuthActions.signIn({
      payload: {
        username: payload.email,
        password: payload.password
      }
    }))
  ))

  // Sign out
  signOut$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signOut),
    exhaustMap(() => this._authService.signOut().pipe(
      map(() => AuthActions.signOutSuccess()),
      catchError((error: Error) => of(AuthActions.signOutFailure({ error })))
    ))
  ));

  signOutRedirect = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signOutSuccess),
    map(() => AuthActions.signOutRedirect())
  ))

  redirectOnSignOutSuccess = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signOutRedirect),
    tap(() => this._router.navigateByUrl('/signed-out-redirect'))
  ), { dispatch: false });

  /**
   * Constructor
   */
  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) { }
}
