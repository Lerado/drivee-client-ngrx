import * as fromAuth from 'app/core/auth/auth.reducer';
import * as fromUsers from 'app/core/user/user.reducer';
import * as fromFiles from 'app/core/file/file.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AppCoreState } from './state.types';

export const coreReducers: ActionReducerMap<AppCoreState> = {
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromUsers.usersFeatureKey]: fromUsers.reducer,
  [fromFiles.filesFeatureKey]: fromFiles.reducer
};
