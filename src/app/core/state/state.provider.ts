import { EnvironmentProviders, Provider, isDevMode } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { coreEffects } from "./state.effects";
import { coreReducers } from "./state.reducer";
import { provideStoreDevtools } from "@ngrx/store-devtools";

export const provideState: () => Array<EnvironmentProviders | Provider> = () => [
  provideStore(coreReducers),
  provideEffects(coreEffects),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
];
