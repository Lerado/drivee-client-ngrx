import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { AuthSignInComponentStore } from './sign-in.component.store';
import { Store } from '@ngrx/store';
import { AuthSignInActions } from './sign-in.actions';

@Component({
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: 'sign-in.component.html',
  providers: [AuthSignInComponentStore]
})
export class AuthSignInComponent implements OnInit {

  signInForm = this._authSignInComponentStore.signInForm;

  /**
   * Constructor
   */
  constructor(
    private readonly _authSignInComponentStore: AuthSignInComponentStore,
    private readonly _store: Store
  ) { }

  // -------------------------------------------------------------------
  // @ Lifecycle hooks
  // -------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._authSignInComponentStore.disableFormOnLoading();
    this._authSignInComponentStore.handleErrors();
  }

  // -------------------------------------------------------------------
  // @ Public methods
  // -------------------------------------------------------------------

  /**
   * Sign the user in
   */
  signIn(): void {

    if (this.signInForm.invalid) return;

    this._store.dispatch(AuthSignInActions.signInButtonClicked({
      payload: this.signInForm.getRawValue()
    }));
  }
}
