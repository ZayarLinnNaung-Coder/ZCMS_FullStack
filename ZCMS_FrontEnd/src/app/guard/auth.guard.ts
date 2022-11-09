import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {UrlConstant} from "../const/UrlConstant";
import {AuthService} from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isUserLogin()){
      return true;
    }
    this.router.navigate([UrlConstant.USER_LOGIN]);
    return false;
  }

  isUserLogin(): boolean{
    return this.authService.isUserLogin();
  }

}
