import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { User } from "./user.types";
import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { UserActions } from "./user.actions";

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  user: User | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: user => user.id,
  sortComparer: (userA, userB) => userA.createdAt - userB.createdAt
});

export const initialState: State = adapter.getInitialState({
  user: null
})

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUserSuccess,
    (state, { user }) => ({ ...state, user }))
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
    selectUser: createSelector(selectUsersState, state => state.user)
  })
});

export const {
  selectAll,
  selectUser
} = usersFeature;
