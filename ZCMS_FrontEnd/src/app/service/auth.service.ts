import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";
import {SystemConstant} from "../const/SystemConstant";
import {Observable} from "rxjs";
import {UserLoginInfo} from "../model/UserLoginInfo";
import {SecurityConstant} from "../const/SecurityConstant";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private defaultUrl: string = SystemConstant.BASE_PATH + '/auth';
  private jwtHelperService: JwtHelperService;

  constructor(private httpClient: HttpClient) {
    this.jwtHelperService  = new JwtHelperService();
  }

  registerUser(user: User): Observable<any>{
    return this.httpClient.post(this.defaultUrl + '/register', user);
  }

  login(userLoginInfo: UserLoginInfo){
    return this.httpClient.post(this.defaultUrl + '/login', userLoginInfo, {observe: 'response'});
  }

  isUserLogin(): boolean{
    const jwtToken = this.getTokenFromLocalStorage();
    if(jwtToken != null){
      if(!this.jwtHelperService.isTokenExpired(jwtToken)){
        return true;
      }else{
        this.logout();
      }
    }
    return false;
  }

  saveTokenToLocalStorage(jwtToken: string){
    localStorage.setItem(SecurityConstant.JWT_TOKEN, jwtToken);
  }

  getTokenFromLocalStorage(): string | null{
    return localStorage.getItem(SecurityConstant.JWT_TOKEN);
  }

  saveUserToLocalStorage(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User | null{
    return JSON.parse(localStorage.getItem('user'));
  }

  logout(){
    localStorage.removeItem(SecurityConstant.JWT_TOKEN);
  }
}
