import { Injectable } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ComponentStore } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import * as fromAuthSignIn from './sign-in.reducer';
import { filter, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ApiErrorHandler } from "app/core/api/utils/error-handler.service";

interface AuthSignInComponentState { }

const defaultAuthSignInComponentState: AuthSignInComponentState = {};

@Injectable()
export class AuthSignInComponentStore extends ComponentStore<AuthSignInComponentState> {

  readonly signInForm = this._formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  private readonly _isLoading$ = this._store.select(fromAuthSignIn.selectSignInLoading);
  private readonly _error$ = this._store.select(fromAuthSignIn.selectError);

  readonly disableFormOnLoading = this.effect(() => this._isLoading$.pipe(
    tap(isLoading => isLoading ? this.signInForm.disable() : this.signInForm.enable()
    )
  ))

  readonly handleErrors = this.effect(() => this._error$.pipe(
    filter((error: HttpErrorResponse | null) => !!error),
    tap(error => this._errorHandler.handle(error as HttpErrorResponse))
  ));

  /**
   * Constructor
   */
  constructor(
    private readonly _store: Store,
    private readonly _formBuilder: NonNullableFormBuilder,
    private readonly _errorHandler: ApiErrorHandler
  ) {
    super(defaultAuthSignInComponentState);
  }
}
