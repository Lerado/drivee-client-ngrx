import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateFilesDto } from 'app/core/file/file.dto';
import { StoredFile } from 'app/core/file/file.model';

export const HomeActions = createActionGroup({
  source: 'Home page',
  events: {
    'Entered': emptyProps(),
    'Files Added': props<Pick<CreateFilesDto, 'files'>>(),
    'Single File Deleted': props<{ file: StoredFile }>(),
    'Multiple Files Deleted': props<{ files: StoredFile[] }>(),
  }
});
