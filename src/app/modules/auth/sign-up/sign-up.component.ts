import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthSignUpComponentStore } from './sign-up.component-store';
import { Store } from '@ngrx/store';
import { AuthSignUpActions } from './sign-up.actions';

@Component({
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  providers: [AuthSignUpComponentStore],
  templateUrl: './sign-up.component.html'
})
export class AuthSignUpComponent implements OnInit {

  signUpForm = this._authSignUpComponentStore.signUpForm;

  /**
   * Constructor
   */
  constructor(
    private readonly _authSignUpComponentStore: AuthSignUpComponentStore,
    private readonly _store: Store
  ) { }

  // -------------------------------------------------------------------
  // @ Lifecycle hooks
  // -------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._authSignUpComponentStore.disableFormOnLoading();
    this._authSignUpComponentStore.handleErrors();
  }

  // -------------------------------------------------------------------
  // @ Public methods
  // -------------------------------------------------------------------

  /**
   * Registers the user
   */
  signUp(): void {

    if (this.signUpForm.invalid) return;

    const payload = this.signUpForm.getRawValue();
    this._store.dispatch(AuthSignUpActions.signUpButtonClicked({ payload }));
  }
}
