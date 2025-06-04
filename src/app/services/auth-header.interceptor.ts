import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyName } from './constant';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Example header: Add Authorization or any custom header
    const modifiedReq = req.clone({
      setHeaders: {
        'company': sessionStorage.getItem(CompanyName), // You can replace with dynamic values
      }
    });

    return next.handle(modifiedReq);
  }
}
