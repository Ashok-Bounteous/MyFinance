import { Injectable } from '@angular/core';
// import { Database, ref, set, get, child, push, update, remove, DataSnapshot } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '@angular/fire/auth';

import { getDatabase, Database, onValue, ref, remove , set, get, push, update, child, DataSnapshot} from "firebase/database";

export interface Task {
  title: string;
  description: string;
  amount: number;
  to: string;
  dates: { created: Date; updated: Date[] };
  priority: 'low' | 'medium' | 'high';
  deadline: Date;
  id?: string;
  completed: boolean;
}

export interface UserTasks {
  userId: string;
  usertasks: Task[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _tasks = new BehaviorSubject<Task[]>([]);
  private TaskDBPath = `https://myfinance-1790a-default-rtdb.firebaseio.com/users/tasks`;
  private db = getDatabase();

  get tasks() {
    return this._tasks.asObservable();
  }

  constructor(
    // private db: Database, 
    private auth: Auth) {}

  private getUserProfile(): string {
    const user = this.auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      throw new Error('User not authenticated');
    }
  }

  async addTask(task: Task) {
    try {
      const userId = this.getUserProfile();
      const userTasksRef = ref(this.db, `users/tasks/${userId}/usertasks`);
      task.id = push(userTasksRef).key as string; // Generate a unique id for the task
      const updates: any = {};
      updates[task.id] = task;
      await update(userTasksRef, updates);

      const currentTasks = this._tasks.value;
      this._tasks.next([...currentTasks, task]);
      return task;
    } catch (e) {
      throw e;
    }
  }

  async getTasks() {
    try {
      const userId = this.getUserProfile();
      const userTasksRef = ref(this.db, `users/tasks/${userId}/usertasks`);
      const snapshot = await get(userTasksRef);
      if (snapshot.exists()) {
        const tasks: Task[] = Object.values(snapshot.val());
        this._tasks.next(tasks);
        return tasks;
      } else {
        console.log("No tasks found for this user.");
        this._tasks.next([]);
        return [];
      }
    } catch (e) {
      throw e;
    }
  }

  async getTaskById(taskId: string) {
    try {
      const userId = this.getUserProfile();
      const taskRef = ref(this.db, `users/tasks/${userId}/usertasks/${taskId}`);
      const snapshot = await get(taskRef);
      if (snapshot.exists()) {
        return snapshot.val() as Task;
      } else {
        throw new Error("Task not found.");
      }
    } catch (e) {
      throw e;
    }
  }

  async updateTask(taskId: string, updatedTask: Task) {
    try {
      const userId = this.getUserProfile();
      const taskRef = ref(this.db, `users/tasks/${userId}/usertasks/${taskId}`);
      await set(taskRef, { ...updatedTask, id: taskId });
      const tasks = await this.getTasks();
      this._tasks.next(tasks);
      return updatedTask;
    } catch (e) {
      throw e;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const userId = this.getUserProfile();
      const taskRef = ref(this.db, `users/tasks/${userId}/usertasks/${taskId}`);
      await remove(taskRef);
      const tasks = await this.getTasks();
      this._tasks.next(tasks);
    } catch (e) {
      throw e;
    }
  }
}
