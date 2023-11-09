import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar"
import { ApiErrorResponse } from "../api.types";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ApiErrorHandler {

  /**
   * Constructor
   */
  constructor(
    private readonly _matSnackbar: MatSnackBar
  ) { }

  /**
   * Handle error
   *
   * @param error
   */
  handle<T extends HttpErrorResponse>(this: ApiErrorHandler, error: T) {
    this._matSnackbar.open(error.message);
  }
}
