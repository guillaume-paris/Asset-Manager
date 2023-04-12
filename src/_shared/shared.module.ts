import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { GenericToastComponent } from './generic-toast/generic-toast.component';
import { GenericToastService } from './services/generic-toast.service';


@NgModule({
  declarations: [
    GenericModalComponent,
    GenericToastComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenericModalComponent,
    GenericToastComponent
  ],
  providers: [
    AuthGuard,
    GenericToastService
  ]
})
export class SharedModule { }
