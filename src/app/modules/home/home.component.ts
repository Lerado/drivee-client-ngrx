import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FileListTableComponent } from './components/file-list-table/file-list-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoredFile } from 'app/core/file/file.model';
import { AddFilesFormComponent } from './components/add-files-form/add-files-form.component';
import { CreateFilesDto } from 'app/core/file/file.dto';
import { AuthPipe } from 'app/core/auth/auth.pipe';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { HomeActions } from './home.actions';
import { HomeComponentStore } from './home.component.store';

@Component({
  standalone: true,
  imports: [NgIf, MatTableModule, MatSortModule, MatPaginatorModule, MatCheckboxModule, MatButtonModule, MatDialogModule, AuthPipe, FileListTableComponent, AddFilesFormComponent],
  providers: [HomeComponentStore],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('addFileFormDialog') private _addFileFormDialog!: TemplateRef<AddFilesFormComponent>;
  private _addFileFormDialogRef!: MatDialogRef<AddFilesFormComponent>;

  @ViewChild('sort') private _sort!: MatSort;
  @ViewChild(MatPaginator) private _paginator!: MatPaginator;

  user = this._homeComponentStore.user;
  files = this._homeComponentStore.files;
  filesDataSource = this._homeComponentStore.filesDataSource;

  filesSelection = this._homeComponentStore.filesSelection;
  isAllSelected = this._homeComponentStore.areAllFilesSelected;
  dataSourceSize = this._homeComponentStore.dataSourceSize;
  dataSourceEmpty = this._homeComponentStore.isEmpty

  bulkActionsActive = this._homeComponentStore.bulkActionsActive;
  displayedColumns = this._homeComponentStore.displayedColumns;

  /**
   * Constructor
   */
  constructor(
    private readonly _dialog: MatDialog,
    private readonly _store: Store,
    private readonly _homeComponentStore: HomeComponentStore
  ) { }

  // -------------------------------------------------------------------
  // @ Lifecycle hooks
  // -------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._store.dispatch(HomeActions.entered());
  }

  /**
   * After view init
   */
  ngAfterViewInit(): void {
    this._homeComponentStore.initPagination(this._paginator);
    this._homeComponentStore.initSort(this._sort);
  }

  // -------------------------------------------------------------------
  // @ Public methods
  // -------------------------------------------------------------------

  /**
   * Open file form dialog
   */
  openFileFormDialog(): void {
    this._addFileFormDialogRef = this._dialog.open(this._addFileFormDialog, { width: '42vw' });
  }

  /**
   * Select all rows if they are not all selected, deselect all otherwise
   */
  toggleAllRows($event?: MatCheckboxChange): void {

    if (!$event) return;

    this._homeComponentStore.toggleAllRows();
  }

  /**
   * Toggle bulk actins
   */
  toggleBulkActions(): void {
    this._homeComponentStore.toggleBulkActions();
  }

  /**
   * Add new files
   */
  addFiles(payload: Pick<CreateFilesDto, 'files'>): void {
    /**
     * Clone primitive FileList object in order to fix freeze error
     */
    this._store.dispatch(HomeActions.filesAdded(Object.assign({}, { files: { ...payload.files } })));
  }

  /**
   * Bulk delete
   */
  bulkDelete(): void {

    if (this.filesSelection().isEmpty()) return;

    const files: StoredFile[] = this.filesSelection().selected;
    this._store.dispatch(HomeActions.multipleFilesDeleted({ files }));

    this._homeComponentStore.clearSelection();
  }

  /**
   * Permanently delete a file
   *
   * @param file
   */
  deleteFile(file: StoredFile): void {
    this._store.dispatch(HomeActions.singleFileDeleted({ file }));
  }
}
