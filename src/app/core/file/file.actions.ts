import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { StoredFile } from './file.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateFilesDto } from './file.dto';

export const FileActions = createActionGroup({
  source: 'File/API',
  events: {
    'Load Files': emptyProps(),
    'Load Files Success': props<{ files: StoredFile[] }>(),
    'Load Files Failure': props<{ error: HttpErrorResponse }>(),

    'Add Files': props<Pick<CreateFilesDto, 'files'>>(),
    'Add Files Success': emptyProps(),
    'Add Files Failure': props<{ error: HttpErrorResponse }>(),

    'Delete File': props<{ file: StoredFile }>(),
    'Delete File Success': props<{ file: StoredFile }>(),
    'Delete File Failure': props<{ error: HttpErrorResponse }>(),

    'Delete Files': props<{ files: StoredFile[] }>(),
    'Delete Files Success': props<{ files: StoredFile[] }>(),
    'Delete Files Failure': props<{ error: HttpErrorResponse }>()
  }
});
