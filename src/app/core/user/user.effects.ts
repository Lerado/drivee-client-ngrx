import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "./user.service";
import { UserActions } from "./user.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AuthActions } from "../auth/auth.actions";

@Injectable()
export class UserEffects {

  loadUserAfterAuth$ = createEffect(() => this._actions$.pipe(
    ofType(AuthActions.signInSuccess),
    map(() => UserActions.loadUser())
  ));

  loadUser$ = createEffect(() => this._actions$.pipe(
    ofType(UserActions.loadUser),
    exhaustMap(() => this._userService.get().pipe(
      map(user => UserActions.loadUserSuccess({ user })),
      catchError(error => of(UserActions.loadUserFailure({ error })))
    ))
  ));

  /**
   * Constructor
   */
  constructor(
    private readonly _actions$: Actions,
    private readonly _userService: UserService
  ) { }
}
