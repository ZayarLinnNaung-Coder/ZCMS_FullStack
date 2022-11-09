import { Injectable } from '@angular/core';
import {SystemConstant} from "../const/SystemConstant";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private defaultUrl: string = SystemConstant.BASE_PATH + '/files';
  constructor(private httpClient: HttpClient) { }

  getAllFiles(): Observable<string[]>{
    return this.httpClient.get<string[]>(this.defaultUrl);
  }

  loadFile(fileName: string){
    const url = this.defaultUrl + '/' + fileName;
    return this.httpClient.get(url);
  }

  uploadFile(uploadFile: File): Observable<string>{
    let formData = new FormData();
    formData.append("file", uploadFile);
    console.log(uploadFile)
    return this.httpClient.post(this.defaultUrl, formData, {
      reportProgress: true,
      responseType: 'text'
    });
  }
}
