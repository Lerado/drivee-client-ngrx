import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "./user.types";
import { HttpErrorResponse } from "@angular/common/http";

export const UserActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load User': emptyProps(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ error: HttpErrorResponse }>()
  }
});
