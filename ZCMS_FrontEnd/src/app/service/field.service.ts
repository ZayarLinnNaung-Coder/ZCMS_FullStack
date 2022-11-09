import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Field} from "../model/Field";
import {SystemConstant} from "../const/SystemConstant";

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private defaultUrl: string = SystemConstant.BASE_PATH + '/fields';
  constructor(private httpClient: HttpClient) { }

  findFieldsByContentModelId(contentModelId: string): Observable<Field[]>{
    const httpParam = new HttpParams().set("contentModelId", contentModelId);
    return this.httpClient.get<Field[]>(this.defaultUrl, {params: httpParam});
  }

  saveField(newField: Field): Observable<Field>{
    console.log(newField)
    return this.httpClient.post<Field>(this.defaultUrl, newField);
  }

  updateField(existingField: Field): Observable<Field>{
    console.log(existingField)
    return this.httpClient.put<Field>(this.defaultUrl, existingField);
  }

  deleteField(id: string) {
    console.log(this.defaultUrl + '/' + id)
    return this.httpClient.delete<String>(this.defaultUrl + '/' + id);
  }
}
