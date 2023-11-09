import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, mergeMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FileActions } from './file.actions';
import { StoredFileService } from './file.service';
import { StoredFile } from './file.model';

@Injectable()
export class FileEffects {

  loadFiles$ = createEffect(() => this._actions$.pipe(
    ofType(FileActions.loadFiles),
    exhaustMap(() =>
      this._storedFileService.getAll().pipe(
        map(files => FileActions.loadFilesSuccess({ files })),
        catchError(error => of(FileActions.loadFilesFailure({ error }))))
    )
  ));

  addFiles$ = createEffect(() => this._actions$.pipe(
    ofType(FileActions.addFiles),
    concatMap(({ files }) => this._storedFileService.createMultiple({ files }).pipe(
      map(() => FileActions.addFilesSuccess()),
      catchError(error => of(FileActions.addFilesFailure({ error })))
    ))
  ));

  addFilesReloadOnSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(FileActions.addFilesSuccess),
    map(() => FileActions.loadFiles())
  ));

  deleteFile$ = createEffect(() => this._actions$.pipe(
    ofType(FileActions.deleteFile),
    mergeMap(({ file }: { file: StoredFile }) => this._storedFileService.delete(file).pipe(
      map(() => FileActions.deleteFileSuccess({ file })),
      catchError(error => of(FileActions.deleteFileFailure({ error })))
    ))
  ));

  deleteFiles$ = createEffect(() => this._actions$.pipe(
    ofType(FileActions.deleteFiles),
    mergeMap(({ files }: { files: StoredFile[] }) => this._storedFileService.deleteMultiple(...files).pipe(
      map(() => FileActions.deleteFilesSuccess({ files })),
      catchError(error => of(FileActions.deleteFilesFailure({ error })))
    ))
  ));

  /**
   * Constructor
   */
  constructor(
    private readonly _actions$: Actions,
    private readonly _storedFileService: StoredFileService) { }
}
