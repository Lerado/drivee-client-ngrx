import { Routes } from '@angular/router';
import { AuthSignInComponent } from './sign-in.component';
import { provideEffects } from '@ngrx/effects';
import { AuthSignInEffects } from './sign-in.effects';
import { provideState } from '@ngrx/store';
import * as fromAuthSignIn from './sign-in.reducer';

export default [
  {
    path: '',
    component: AuthSignInComponent,
    providers: [
      provideState(fromAuthSignIn.authSignInFeatureKey, fromAuthSignIn.reducer),
      provideEffects(AuthSignInEffects)
    ]
  }
] as Routes
