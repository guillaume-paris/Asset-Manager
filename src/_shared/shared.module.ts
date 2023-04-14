import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { GenericToastComponent } from './generic-toast/generic-toast.component';
import { GenericToastService } from './services/generic-toast.service';
import { UserService } from './services/user.service';
import { GenericCrudTableModule } from './generic-crud-table/generic-crud-table.module';


@NgModule({
  declarations: [
    GenericModalComponent,
    GenericToastComponent
  ],
  imports: [
    CommonModule,
    GenericCrudTableModule
  ],
  exports: [
    GenericModalComponent,
    GenericToastComponent,
    GenericCrudTableModule
  ],
  providers: [
    AuthGuard,
    GenericToastService,
    UserService
  ]
})
export class SharedModule { }
