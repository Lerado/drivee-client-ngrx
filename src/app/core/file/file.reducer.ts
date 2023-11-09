import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { StoredFile } from './file.model';
import { FileActions } from './file.actions';

export const filesFeatureKey = 'files';

export interface State extends EntityState<StoredFile> { }

export const adapter: EntityAdapter<StoredFile> = createEntityAdapter<StoredFile>({
  selectId: file => file.name,
  sortComparer: (fileA, fileB) => fileA.createdAt - fileB.createdAt
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(FileActions.deleteFileSuccess,
    (state, action) => adapter.removeOne(adapter.selectId(action.file) as string, state)
  ),
  on(FileActions.deleteFilesSuccess,
    (state, action) => adapter.removeMany(action.files.map(file => adapter.selectId(file) as string), state)
  ),
  on(FileActions.loadFilesSuccess,
    (state, action) => adapter.setAll(action.files, state)
  )
);

export const filesFeature = createFeature({
  name: filesFeatureKey,
  reducer,
  extraSelectors: ({ selectFilesState }) => ({
    ...adapter.getSelectors(selectFilesState)
  }),
});

export const {
  selectAll,
  selectTotal,
} = filesFeature;
