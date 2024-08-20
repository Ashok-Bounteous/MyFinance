import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TaskManagerPageRoutingModule } from './task-manager-routing.module';
import { TaskManagerPage } from './task-manager.page';
import { TaskService } from 'src/app/services/task.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

// If you have a shared module, import it here
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskManagerPageRoutingModule,
    SharedModule // Uncomment this if you have a shared module
  ],
  declarations: [TaskManagerPage],
  providers: [TaskService]
})
export class TaskManagerPageModule {}
