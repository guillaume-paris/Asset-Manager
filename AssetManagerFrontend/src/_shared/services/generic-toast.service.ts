import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastInfo {
  title: string;
  body: string;
  type: "danger" | "info" | "warning" | "success";
}

@Injectable()
export class GenericToastService {

  genericToastChange: Subject<ToastInfo> = new Subject<ToastInfo>();
  static singletonInstance: GenericToastService;

  constructor() {
    if(!GenericToastService.singletonInstance){
      GenericToastService.singletonInstance = this;
    }
    return GenericToastService.singletonInstance;
  }

  showToast(title: string, body: string, type: "danger" | "info" | "warning" | "success"): void {
    this.genericToastChange.next({title, body, type});
  }
}
