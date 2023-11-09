import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SignInDto } from "app/core/auth/auth.dto";

export const AuthSignInActions = createActionGroup({
  source: 'Sign in Page',
  events: {
    'Sign In Button Clicked': props<{ payload: SignInDto }>(),
    'Sign In Loading Start': emptyProps(),
    'Sign In Loading End': emptyProps()
  }
});
