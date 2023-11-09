import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SignUpDto } from "app/core/auth/auth.dto";

export const AuthSignUpActions = createActionGroup({
  source: 'Sign Up Page',
  events: {
    'Sign Up Button Clicked': props<{ payload: SignUpDto }>(),
    'Sign Up Loading Start': emptyProps(),
    'Sign Up Loading End': emptyProps()
  }
});
