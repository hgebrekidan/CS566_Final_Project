import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable()
export class Tokeninterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authorizationToken = request.clone({ headers: request.headers.set('Authorization', `${localStorage.getItem('token')}`) });
    return next.handle(authorizationToken);
  }
}
