import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CommonInterceptorService} from './common-interceptor.service';
import {InterceptorTwoService} from './interceptor2.service';

export default [
  { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorTwoService, multi: true }
];
