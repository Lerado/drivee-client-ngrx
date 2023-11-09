import { EnvironmentProviders, Provider } from "@angular/core";
import { provideState } from "./state/state.provider";
import { provideAuthentication } from "./auth/auth.provider";
import { provideApi } from "./api/api.provider";

export const provideCore: () => Array<EnvironmentProviders | Provider> = () => [
  // NgRx state
  provideState(),
  // Provide API rewrite and aliasing
  provideApi(),
  // Authentication and authorization
  provideAuthentication()
];
