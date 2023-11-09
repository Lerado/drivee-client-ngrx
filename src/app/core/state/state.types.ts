import * as fromAuth from 'app/core/auth/auth.reducer';
import * as fromUsers from 'app/core/user/user.reducer';
import * as fromFiles from 'app/core/file/file.reducer';

export interface AppCoreState {
  [fromAuth.authFeatureKey]: fromAuth.State,
  [fromUsers.usersFeatureKey]: fromUsers.State,
  [fromFiles.filesFeatureKey]: fromFiles.State
}
