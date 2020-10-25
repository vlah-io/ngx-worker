import {InjectionToken} from '@angular/core';
import {LoggerInterface} from '../interface/ngx-worker.interface';

export const VLAH_LOGGER_SERVICE = new InjectionToken<LoggerInterface>('VLAH_LOGGER_SERVICE');
