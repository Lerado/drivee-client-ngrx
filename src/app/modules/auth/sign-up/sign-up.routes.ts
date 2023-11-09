import { Routes } from '@angular/router';
import { AuthSignUpComponent } from './sign-up.component';
import { provideEffects } from '@ngrx/effects';
import { AuthSignUpEffects } from './sign-up.effects';

export default [
  {
    path: '',
    component: AuthSignUpComponent,
    providers: [
      provideEffects(AuthSignUpEffects)
    ]
  }
] as Routes;
