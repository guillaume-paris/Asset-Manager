import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { GenericModalComponent } from './generic-modal/generic-modal.component';


@NgModule({
  declarations: [
    GenericModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenericModalComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class SharedModule { }
