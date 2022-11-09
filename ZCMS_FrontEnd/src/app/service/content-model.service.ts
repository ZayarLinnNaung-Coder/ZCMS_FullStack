import { Injectable } from '@angular/core';
import {ContentModel} from "../model/ContentModel";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UrlConstant} from "../const/UrlConstant";
import {SystemConstant} from "../const/SystemConstant";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ContentModelService {

  private defaultUrl: string = SystemConstant.BASE_PATH + '/content-models';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getAllContentModelByCurrentUser(): Observable<ContentModel[]>{
    const userId: string = this.authService.getUserFromLocalStorage().id;
    const httpParam = new HttpParams().set("userId", userId);
    return this.httpClient.get<ContentModel[]>(this.defaultUrl, {params: httpParam});
  }

  createNewContentModel(contentModel: ContentModel): Observable<ContentModel>{
    return this.httpClient.post<ContentModel>(this.defaultUrl, contentModel);
  }

  updateContentModel(contentModel: ContentModel): Observable<ContentModel>{
    return this.httpClient.put<ContentModel>(this.defaultUrl, contentModel);
  }

  deleteContentModelById(id: string){
    const url = this.defaultUrl + '/' + id;
    return this.httpClient.delete(url);
  }
}
