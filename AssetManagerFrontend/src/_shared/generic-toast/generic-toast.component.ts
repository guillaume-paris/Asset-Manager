import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { GenericToastService } from '../services/generic-toast.service';



@Component({
  selector: 'generic-toast',
  templateUrl: './generic-toast.component.html',
  styleUrls: ['./generic-toast.component.css']
})
export class GenericToastComponent {

  genericToastSubscription!: Subscription;
  title: string | undefined;
  body: string | undefined;
  type: "danger" | "info" | "warning" | "success" | undefined;

  constructor(private genericToastService: GenericToastService) {
    this.subscribeGenericToast();
  }

  subscribeGenericToast() {
    this.genericToastSubscription = this.genericToastService.genericToastChange.subscribe((d) => {
      this.generateAndShowToast(d.title, d.body, d.type);
    })
  }

  generateAndShowToast(title: string | undefined, body: string | undefined, type: "danger" | "info" | "warning" | "success" | undefined) {
    this.title = title;
    this.body = body;
    this.type = type;
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample!);
    toastBootstrap.show();
  }

  ngOnDestroy() {
    this.genericToastSubscription.unsubscribe();
  }
  
}
