import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SystemConstant} from "../const/SystemConstant";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private defaultUrl: string = SystemConstant.BASE_PATH + '/users';

  constructor(private httpClient: HttpClient) {
  }

  findUserByUsername(username: string){
    const queryParams = new HttpParams().append('username', username);
    return this.httpClient.get(this.defaultUrl, {params: queryParams});
  }
}
