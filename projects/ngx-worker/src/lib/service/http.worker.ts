import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {
  ErrorHandlerArgsInterface,
  LoggerInterface,
  OptionsDelete,
  OptionsGet,
  OptionsPost,
  OptionsPut,
  OptionsRequest
} from '../interface/ngx-worker.interface';
import {VLAH_LOGGER_SERVICE} from '../token/injection-token';
import {ErrorWorker} from './error.worker';

@Injectable({
  providedIn: 'root'
})
export class HttpWorker {
  constructor(
    private http: HttpClient,
    private errorWorker: ErrorWorker,
    @Inject(VLAH_LOGGER_SERVICE) private loggerService: LoggerInterface
  ) {
  }

  static prepSuffix(str?: string | number | (string | number)[]): string {
    if (!str) {
      return '';
    }

    if (Object.prototype.toString.call(str) === '[object Array]') {
      return '/' + (str as string[]).join('/');
    }

    if (Object.prototype.toString.call(str) === '[object Number]') {
      return '/' + str;
    }

    return ((str as string).slice(0, 1) !== '/' ? '/' : '') + str;
  }

  get<T>(
    url: string,
    options?: OptionsGet,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    errorHandlerArgs = {
      ...{operation: 'GET request'},
      ...errorHandlerArgs
    };

    return this.http
      .get<T | HttpErrorResponse>(url, options)
      .pipe(
        tap(
          () => this.loggerService.tap(url, options, errorHandlerArgs)
        ),
        catchError(
          this.errorWorker.handle(errorHandlerArgs)
        )
      );
  }

  post<T>(
    url: string,
    data: any,
    options?: OptionsPost,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    errorHandlerArgs = {
      ...{operation: 'POST request'},
      ...errorHandlerArgs
    };

    return this.http
      .post<T | HttpErrorResponse>(url, data, options)
      .pipe(
        tap(
          () => this.loggerService.tap(url, options, errorHandlerArgs)
        ),
        catchError(
          this.errorWorker.handle(errorHandlerArgs)
        )
      );
  }

  put<T>(
    url: string,
    data: any,
    options?: OptionsPut,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    errorHandlerArgs = {
      ...{operation: 'PUT request'},
      ...errorHandlerArgs
    };

    return this.http
      .put<T | HttpErrorResponse>(url, data, options)
      .pipe(
        tap(
          () => this.loggerService.tap(url, options, errorHandlerArgs)
        ),
        catchError(
          this.errorWorker.handle(errorHandlerArgs)
        )
      );
  }

  patch<T>(
    url: string,
    data: any,
    options?: OptionsPut,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    errorHandlerArgs = {
      ...{operation: 'PATCH request'},
      ...errorHandlerArgs
    };

    return this.http
      .patch<T | HttpErrorResponse>(url, data, options)
      .pipe(
        tap(
          () => this.loggerService.tap(url, options, errorHandlerArgs)
        ),
        catchError(
          this.errorWorker.handle(errorHandlerArgs)
        )
      );
  }

  delete<T>(
    url: string,
    options?: OptionsDelete,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    errorHandlerArgs = {
      ...{operation: 'DELETE request'},
      ...errorHandlerArgs
    };

    return this.http
      .delete<T | HttpErrorResponse>(url, options)
      .pipe(
        tap(
          () => this.loggerService.tap(url, options, errorHandlerArgs)
        ),
        catchError(
          this.errorWorker.handle(errorHandlerArgs)
        )
      );
  }

  request<T>(
    method: string,
    url: string,
    options?: OptionsRequest,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    errorHandlerArgs = {
      ...{operation: 'REQUEST type request'},
      ...errorHandlerArgs
    };

    return this.http
      .request<T | HttpErrorResponse>(method, url, options)
      .pipe(
        tap(
          () => this.loggerService.tap(url, options, errorHandlerArgs)
        ),
        catchError(
          this.errorWorker.handle(errorHandlerArgs)
        )
      );
  }
}
