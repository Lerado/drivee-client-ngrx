import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { SignInDto, SignUpDto } from "./auth.dto";
import { AuthenticationTokens } from "./auth.model";
import { HttpErrorResponse } from "@angular/common/http";

export const AuthActions = createActionGroup({
  source: 'Auth/API',
  events: {
    'Init': emptyProps(),
    'Init Success': props<{ authenticated: boolean; tokens: AuthenticationTokens }>(),
    'Init Failure': props<{ error: HttpErrorResponse }>(),

    'Sign In': props<{ payload: SignInDto }>(),
    'Sign In Redirect': emptyProps(),
    'Sign In Success': props<{ tokens: AuthenticationTokens }>(),
    'Sign In Failure': props<{ error: HttpErrorResponse }>(),

    'Sign In Using Token': emptyProps(),
    'Sign In Using Token Success': props<{ tokens: AuthenticationTokens }>(),
    'Sign In Using Token Failure': props<{ error: HttpErrorResponse }>(),

    'Sign Up': props<{ payload: SignUpDto }>(),
    'Sign Up Success': props<{ payload: SignUpDto }>(),
    'Sign Up Failure': props<{ error: HttpErrorResponse }>(),

    'Sign Out': emptyProps(),
    'Sign Out Redirect': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Failure': props<{ error: Error }>()
  }
})
