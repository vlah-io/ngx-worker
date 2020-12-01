import {HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {ErrorHandlerArgs, ErrorWorkerHandleResponse, LoggerInterface} from '../interface/ngx-worker.interface';
import {VLAH_LOGGER_SERVICE} from '../token/injection-token';

@Injectable({
  providedIn: 'root'
})
export class ErrorWorker {
  constructor(@Inject(VLAH_LOGGER_SERVICE) private loggerService: LoggerInterface) {
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * operation - name of the operation that failed
   * throwsError - this will force stop the subscription
   * mockResult - optional value to return as the observable result
   */
  handle<T>(errorHandlerArgs?: ErrorHandlerArgs<T>): ErrorWorkerHandleResponse<T> {
    errorHandlerArgs = {
      ...{throwsError: true},
      ...errorHandlerArgs
    };
    const {throwsError, mockResult} = errorHandlerArgs;
    return (err: HttpErrorResponse | T): Observable<T | HttpErrorResponse> => {

      // send the error to logging service (from there, send to logging server and present to the user maybe)
      this.loggerService.httpErrorResponse(err, errorHandlerArgs);

      // Let the app keep running by returning a mock result.
      // this will send a mock to the next method of the observable (sometimes desired).
      if (mockResult) {
        return of(mockResult as T);
      }

      // this will send the error to the err method of the observable (expected behaviour).
      if (throwsError === true) {
        return throwError(err);
      }

      // at this stage, the error is sent to the next method of the observable (not desirable)
      return of(err);
    };
  }
}
