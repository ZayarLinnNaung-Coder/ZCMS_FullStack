import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlConstant} from "../const/UrlConstant";
import {AuthService} from "../service/auth.service";
import {SecurityConstant} from "../const/SecurityConstant";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(SecurityConstant.PUBLIC_ROUTES.find((route) => request.url.includes(route))){
      return next.handle(request);
    }

    const jwtToken = this.authService.getTokenFromLocalStorage();
    const modifiedRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${jwtToken}`
      }
    });
    return next.handle(modifiedRequest);
  }
}
