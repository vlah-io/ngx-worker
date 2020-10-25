import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  ErrorHandlerArgsInterface,
  OptionsDelete,
  OptionsGet,
  OptionsPost,
  OptionsPut,
  OptionsRequest
} from '../interface/ngx-worker.interface';
import {HttpWorker} from '../service/http.worker';

export abstract class HttpAbstract {
  protected constructor(readonly baseURL: string,
                        readonly httpWorker: HttpWorker
  ) {
  }

  get<T>(
    suffix?: string | (number | string)[],
    options?: OptionsGet,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .get<T | HttpErrorResponse>(
        this.baseURL + HttpWorker.prepSuffix(suffix),
        options,
        errorHandlerArgs
      );
  }

  getOne<T>(
    id: number,
    options?: OptionsGet,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .get<T | HttpErrorResponse>(
        `${this.baseURL}/${id}`,
        options,
        errorHandlerArgs
      );
  }

  getMany<T>(
    suffix?: string | (number | string)[],
    options?: OptionsGet,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .get<T | HttpErrorResponse>(
        this.baseURL + HttpWorker.prepSuffix(suffix),
        options,
        errorHandlerArgs
      );
  }

  getManyForSelectBox<T>(
    suffix?: string | (number | string)[],
    options?: OptionsGet,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .get<T | HttpErrorResponse>(
        `${this.baseURL}/select-box-collection${HttpWorker.prepSuffix(suffix)}`,
        options,
        errorHandlerArgs
      );
  }

  getAssociations<T>(
    id: number,
    association: string,
    options?: OptionsGet,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .get<T | HttpErrorResponse>(
        `${this.baseURL}/${id}/${association}`,
        options,
        errorHandlerArgs
      );
  }

  post<T>(
    data: any,
    options?: OptionsPost,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .post<T | HttpErrorResponse>(
        this.baseURL,
        data,
        options,
        errorHandlerArgs
      );
  }

  put<T>(
    id: number,
    data: any,
    options?: OptionsPut,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .put<T | HttpErrorResponse>(
        `${this.baseURL}/${id}`,
        data,
        options,
        errorHandlerArgs
      );
  }

  patch<T>(
    suffix: string | number | (number | string)[],
    data: any,
    options?: OptionsPut,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .patch<T | HttpErrorResponse>(
        this.baseURL + HttpWorker.prepSuffix(suffix),
        data,
        options,
        errorHandlerArgs
      );
  }

  delete<T>(
    suffix?: string | number | (number | string)[],
    options?: OptionsDelete,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .delete<T | HttpErrorResponse>(
        this.baseURL + HttpWorker.prepSuffix(suffix),
        options,
        errorHandlerArgs
      );
  }

  request<T>(
    method: string,
    suffix?: string | number | (number | string)[],
    options?: OptionsRequest,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): Observable<T | HttpErrorResponse> {
    return this.httpWorker
      .request<T | HttpErrorResponse>(
        method,
        this.baseURL + HttpWorker.prepSuffix(suffix),
        options,
        errorHandlerArgs
      );
  }
}
