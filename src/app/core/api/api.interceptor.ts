import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiAlias, ApiUrl } from './api.constants';
import { inject } from '@angular/core';
import { ApiErrorHandler } from './utils/error-handler.service';

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const errorHandler = inject(ApiErrorHandler);

  let newRequest = req;

  /**
   * We are trying to intercept all the requests made with the alias `@api`
   * and replace the alias with the real url base
   */
  if (newRequest.url.startsWith(`${ApiAlias}/`)) {
    newRequest = newRequest.clone({
      url: newRequest.url.replace(`${ApiAlias}`, ApiUrl)
    });

    return next(newRequest).pipe(
      catchError((error) => {
        const newError = error instanceof HttpErrorResponse ? error.error : error;
        errorHandler.handle(newError);
        return throwError(() => newError);
      })
    );
  }

  return next(newRequest);
}
