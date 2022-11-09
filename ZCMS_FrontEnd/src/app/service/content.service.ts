import { Injectable } from '@angular/core';
import {SystemConstant} from "../const/SystemConstant";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Content} from "../model/Content";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private defaultUrl: string = SystemConstant.BASE_PATH + '/contents';

  constructor(private httpClient: HttpClient) { }

  getAllContentsByContentModelId(contentModelId: string): Observable<Content[]>{
    const httpParams = new HttpParams().set("contentModelId", contentModelId);
    return this.httpClient.get<Content[]>(this.defaultUrl, {params: httpParams});
  }

  createNewContent(content: Content): Observable<Content>{
    return this.httpClient.post<Content>(this.defaultUrl, content);
  }

  updateExistingContent(content: Content): Observable<Content>{
    return this.httpClient.put<Content>(this.defaultUrl, content);
  }

  deleteContentById(contentId: string): Observable<any>{
    const url = this.defaultUrl + '/' + contentId;
    return this.httpClient.delete(url);
  }
}
