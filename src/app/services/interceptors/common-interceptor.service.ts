import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthKey} from '../../configs/constant';
import {catchError} from 'rxjs/operators';

interface CustomHttpConfig {
  headers?: HttpHeaders;
}

@Injectable()
export class CommonInterceptorService implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('拦截器');
    const auth = localStorage.getItem(AuthKey);
    let httpConfig: CustomHttpConfig = {};
    if (auth) {
      httpConfig = { headers: req.headers.set(AuthKey, auth) };
    }
    const copyReq = req.clone(httpConfig);
    return next.handle(copyReq).pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // console.error('error', error);
    if (typeof error.error?.code === 'number') { // 后台拒绝请求
      alert(error.error.message);
    } else {
      alert('请求失败');
    }
    return throwError(error);
  }
}
