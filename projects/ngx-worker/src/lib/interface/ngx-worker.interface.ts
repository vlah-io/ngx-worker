import {HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export type ErrorHandlerArgs<T> = ErrorHandlerArgsInterface<T> | undefined;
export type ErrorWorkerHandleResponse<T> = (err: (HttpErrorResponse | T)) => Observable<T | HttpErrorResponse>;

export interface LoggerInterface {
  httpErrorResponse<T>(error: HttpErrorResponse | T, errorHandlerArgs: ErrorHandlerArgsInterface<T> | undefined): void;

  tap<T>(
    url: string,
    options: undefined | OptionsI | OptionsGet | OptionsPost | OptionsPut | OptionsDelete | OptionsRequest,
    errorHandlerArgs?: ErrorHandlerArgsInterface<T>
  ): void;
}

export interface ErrorHandlerArgsInterface<T> {
  operation?: string;
  throwsError?: boolean;
  mockResult?: T;
}

declare type HttpObserve = 'body' | 'events' | 'response';

export interface OptionsI {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: HttpObserve | any;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | any;
  withCredentials?: boolean;
}

export interface OptionsGet extends OptionsI {
  observe?: 'body';
  responseType?: 'json';
}

export interface OptionsPost extends OptionsI {
  observe?: 'body';
  responseType?: 'json';
}

export interface OptionsPut extends OptionsI {
  observe?: 'body';
  responseType?: 'json';
}

export interface OptionsDelete extends OptionsI {
  observe?: 'body';
  responseType?: 'json';
}

export interface OptionsRequest extends OptionsI {
  body?: any;
}

export interface MakeAndInsertBeforeInterface {
  container?: HTMLElement;
  content?: any[][];
}

export interface MakeAndPrependInterface {
  container?: HTMLElement;
  content?: any[][];
}

export interface MakeAndAppendInterface {
  container?: HTMLElement;
  content?: any[][];
}

export interface MakeAndInsertAfterInterface {
  container?: HTMLElement;
  content?: any[][];
}

export interface GluingOptionsInterface {
  container?: HTMLElement;
  before?: true;
  prepend?: true;
  append?: true;
  after?: true;
}

export interface RemoveChildNodesOptionsInterface {
  index?: number;
  nodeName?: string;
  childNode?: any;
}

export interface SubscriptionLike {
  unsubscribe(): void;
}
