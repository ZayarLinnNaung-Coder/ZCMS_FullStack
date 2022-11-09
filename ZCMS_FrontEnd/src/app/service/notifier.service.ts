import { Injectable } from '@angular/core';
import * as Notiflix from "notiflix";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private static options = {
    timeout: 2000
  };

  constructor() { }

  static success(message: string){
    Notiflix.Notify.success(message, this.options);
  }

  static info(message: string){
    Notiflix.Notify.info(message, this.options);
  }

  static failure(message: string){
    Notiflix.Notify.failure(message, this.options);
  }

  static warning(message: string){
    Notiflix.Notify.warning(message, this.options);
  }
}
