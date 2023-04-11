import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { GenericToastComponent } from './generic-toast/generic-toast.component';


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
    AuthService,
    AuthGuard
  ]
})
export class SharedModule { }
