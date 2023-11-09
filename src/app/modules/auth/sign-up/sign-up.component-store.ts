import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { ComponentStore } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { ApiErrorHandler } from "app/core/api/utils/error-handler.service";
import { tap, filter } from "rxjs";
import * as fromAuthSignUp from './sign-up.reducer'

interface AuthSignUpComponentState { }

const defaultAuthSignUpComponentState: AuthSignUpComponentState = {}

@Injectable()
export class AuthSignUpComponentStore extends ComponentStore<AuthSignUpComponentState> {

  readonly signUpForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  private readonly _isLoading$ = this._store.select(fromAuthSignUp.selectSignUpLoading);
  private readonly _error$ = this._store.select(fromAuthSignUp.selectError);

  readonly disableFormOnLoading = this.effect(() => this._isLoading$.pipe(
    tap(isLoading => isLoading ? this.signUpForm.disable() : this.signUpForm.enable())
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
    super(defaultAuthSignUpComponentState);
  }
}
