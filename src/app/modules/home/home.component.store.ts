import { Injectable, computed } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { StoredFile } from "app/core/file/file.model";
import * as fromUsers from 'app/core/user/user.reducer';
import * as fromFiles from 'app/core/file/file.reducer';
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { toSignal } from "@angular/core/rxjs-interop";
import { Store } from "@ngrx/store";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

interface HomeComponentState {
  filesSelection: SelectionModel<StoredFile>;
  bulkActionsActive: boolean;
  paginator: MatPaginator | null;
  sort: MatSort | null;
}

const fileEquals = (fileA: StoredFile, fileB: StoredFile) => fileA.name.localeCompare(fileB.name) === 0;

const defaultHomeComponentState: HomeComponentState = {
  filesSelection: new SelectionModel(true, [], true, fileEquals),
  bulkActionsActive: false,
  paginator: null,
  sort: null
}

@Injectable()
export class HomeComponentStore extends ComponentStore<HomeComponentState> {

  readonly filesSelection = this.selectSignal(state => state.filesSelection);
  private readonly _filesSelectionChange = toSignal(this.get().filesSelection.changed.asObservable());

  readonly user = this._store.selectSignal(fromUsers.selectUser);
  readonly files = this._store.selectSignal(fromFiles.selectAll);

  readonly paginator = this.selectSignal(({ paginator }) => paginator);
  readonly sort = this.selectSignal(({ sort }) => sort);

  private readonly _filesDataSource = computed(() => new MatTableDataSource<StoredFile>(this.files()))
  readonly filesDataSource = computed(() => {
    const dataSource = this._filesDataSource();
    if (this.paginator()) {
      dataSource.paginator = this.paginator();
    }
    if (this.sort()) {
      dataSource.sort = this.sort();
    }
    return dataSource;
  });

  readonly isEmpty = computed(() => !this.filesDataSource().data.length)
  readonly dataSourceSize = computed(() => this.filesDataSource().data.length)

  readonly bulkActionsActive = this.selectSignal(state => state.bulkActionsActive);

  readonly displayedColumns = this.selectSignal(
    this.bulkActionsActive,
    (bulkActionsActive) => {
      const columns = ['name', 'originalName', 'extension', 'createdAt', 'actions'];
      if (bulkActionsActive) {
        columns.unshift('select');
      }
      return columns;
    }
  );

  readonly selectionHasValue = this.selectSignal(
    this.filesSelection,
    this._filesSelectionChange,
    selection => selection.hasValue()
  );
  readonly areAllFilesSelected = this.selectSignal(
    this.filesDataSource,
    this.filesSelection,
    this._filesSelectionChange,
    (source, selection, $changeEvent) => $changeEvent && source.data.length === selection.selected.length
  );

  readonly toggleAllRows = this.updater(({ filesSelection, ...state }) => {
    if (this.areAllFilesSelected()) {
      filesSelection.clear();
    }
    else {
      filesSelection.select(...this.filesDataSource().data);
    }
    return { ...state, filesSelection };
  })

  readonly clearSelection = this.updater(({ filesSelection, ...state }) =>{
    filesSelection.clear();
    return { ...state, filesSelection };
  });

  readonly toggleBulkActions = this.updater(state => ({ ...state, bulkActionsActive: !this.bulkActionsActive() }));

  readonly initPagination = this.updater((state, paginator: MatPaginator) => ({ ...state, paginator }));
  readonly initSort = this.updater((state, sort: MatSort) => ({ ...state, sort }));

  /**
   * Constructor
   */
  constructor(
    private readonly _store: Store
  ) {
    super(defaultHomeComponentState);
  }
}
