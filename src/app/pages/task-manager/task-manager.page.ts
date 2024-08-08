// import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { IonModal } from '@ionic/angular';
// import { NgForm } from '@angular/forms';
// import { TaskService, Task } from 'src/app/services/task.service';
// import { OverlayEventDetail } from '@ionic/core/components';

// @Component({
//   selector: 'app-task-manager',
//   templateUrl: './task-manager.page.html',
//   styleUrls: ['./task-manager.page.scss'],
// })
// export class TaskManagerPage implements OnInit, OnDestroy {
//   @ViewChild(IonModal) modal!: IonModal;
//   taskSub!: Subscription;
//   model: any = {};
//   tasks: Task[] = [];
//   isOpen: boolean = false;
  
//   constructor(private taskService: TaskService) {}

//   ngOnInit(): void {
//     this.taskService.getTasks();
//     this.taskSub = this.taskService.tasks.subscribe({
//       next: (tasks) => {
//         this.tasks = tasks;
//       },
//       error: (e) => {
//         console.log(e);
//       }
//     });
//   }

//   onWillDismiss(event: Event) {
//     const ev = event as CustomEvent<OverlayEventDetail<string>>;
//     this.model = {};
//     this.isOpen = false;
//   }

//   cancel() {
//     this.modal.dismiss(null, 'cancel');
//   }

//   async save(form: NgForm) {
//     try {
//       if(!form.valid) {
//         // alert
//         return;
//       }
//       console.log(form.value);
//       // const userId = this.taskService.getUserProfile();
//       if(this.model?.id) await this.taskService.updateTask(this.model.id, form.value);
//       else await this.taskService.addTask(form.value);
//       this.modal.dismiss();
//     } catch(e) {
//       console.log(e);
//     }
//   }

//   async deleteTask(task: Task) {
//     try {
//       await this.taskService.deleteTask(task?.id!);
//     } catch(e) {
//       console.log(e);
//     }
//   }

//   async editTask(task: Task) {
//     try {
//       this.isOpen = true;
//       this.model = { ...task };
//     } catch(e) {
//       console.log(e);
//     }
//   }

//   ngOnDestroy(): void {
//       if(this.taskSub) this.taskSub.unsubscribe();
//   }
// }



import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IonModal } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { TaskService, Task } from 'src/app/services/task.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.page.html',
  styleUrls: ['./task-manager.page.scss'],
})
export class TaskManagerPage implements OnInit, OnDestroy {
  @ViewChild(IonModal) modal!: IonModal;
  taskSub!: Subscription;
  model: any = {};
  tasks: Task[] = [];
  isOpen: boolean = false;
  activeTab: 'all' | 'pending' | 'completed' | 'overdue' = 'all';
  filteredTasks: Task[] = [];
  sortField: 'deadline' | 'priority' = 'deadline';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks();
    this.taskSub = this.taskService.tasks.subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.applyFilters();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.model = {};
    this.isOpen = false;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async save(form: NgForm) {
    try {
      if(!form.valid) {
        // alert
        return;
      }
      if(this.model?.id) await this.taskService.updateTask(this.model.id, form.value);
      else await this.taskService.addTask(form.value);
      this.modal.dismiss();
      this.applyFilters();
    } catch(e) {
      console.log(e);
    }
  }

  async deleteTask(task: Task) {
    try {
      await this.taskService.deleteTask(task?.id!);
      this.applyFilters();
    } catch(e) {
      console.log(e);
    }
  }

  async editTask(task: Task) {
    try {
      this.isOpen = true;
      this.model = { ...task };
      console.log("Task : ",task);
    } catch(e) {
      console.log(e);
    }
  }

  async completeTask(task: Task) {
    try {
      task.completed = true;
      await this.taskService.updateTask(task.id!, task);
      this.applyFilters();
    } catch (e) {
      console.log(e);
    }
  }

  applyFilters() {
    let filteredTasks = this.tasks;

    if (this.activeTab === 'pending') {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    } else if (this.activeTab === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (this.activeTab === 'overdue') {
      const now = new Date();
      filteredTasks = filteredTasks.filter(task => new Date(task.deadline) < now && !task.completed);
    }

    filteredTasks = filteredTasks.sort((a, b) => {
      let fieldA: any;
      let fieldB: any;
      if (this.sortField === 'deadline') {
        fieldA = new Date(a.deadline);
        fieldB = new Date(b.deadline);
      } else {
        fieldA = a.priority;
        fieldB = b.priority;
      }

      if (this.sortDirection === 'asc') {
        return fieldA > fieldB ? 1 : -1;
      } else {
        return fieldA < fieldB ? 1 : -1;
      }
    });

    this.filteredTasks = filteredTasks;
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  ngOnDestroy(): void {
    if (this.taskSub) this.taskSub.unsubscribe();
  }
}
