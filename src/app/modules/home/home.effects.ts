import { FileActions } from "app/core/file/file.actions";
import { HomeActions } from "./home.actions";
import { map } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";

@Injectable()
export class HomeEffects {

  init$ = createEffect(() => this._actions$.pipe(
    ofType(HomeActions.entered),
    map(() => FileActions.loadFiles())
  ));

  addFiles$ = createEffect(() => this._actions$.pipe(
    ofType(HomeActions.filesAdded),
    map($event => FileActions.addFiles($event))
  ));

  deleteSingleFile$ = createEffect(() => this._actions$.pipe(
    ofType(HomeActions.singleFileDeleted),
    map($event => FileActions.deleteFile($event))
  ));

  deleteMultipleFile$ = createEffect(() => this._actions$.pipe(
    ofType(HomeActions.multipleFilesDeleted),
    map($event => FileActions.deleteFiles($event))
  ));

  /**
   * Constructor
   */
  constructor(
    private readonly _actions$: Actions
  ) { }
}
