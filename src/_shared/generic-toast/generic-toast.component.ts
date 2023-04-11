import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-toast',
  templateUrl: './generic-toast.component.html',
  styleUrls: ['./generic-toast.component.css']
})
export class GenericToastComponent {
  @Input()
  title: string | undefined;

  @Input()
  body: string | undefined;

  @Input()
  type: string | undefined;

}
