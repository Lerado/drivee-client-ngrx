import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { provideEffects } from '@ngrx/effects';
import { HomeEffects } from './home.effects';

export default [
  {
    path: '',
    component: HomeComponent,
    providers: [
      provideEffects(HomeEffects)
    ]
  }
] as Routes;
