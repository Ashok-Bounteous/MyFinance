import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private db: AngularFireDatabase) {}

  // Method to fetch the budget for a specific user, year, and month
  getBudget(uid: string, year: string, month: string): Observable<any> {
    const path = `users/budgetHistory/${uid}/${year}/${month}`;
    return this.db.object(path).valueChanges();
  }

  // Method to save the budget for a specific user, year, and month
  saveBudget(uid: string, year: string, month: string, budget: any): Promise<void> {
    const path = `users/budgetHistory/${uid}/${year}/${month}`;
    return this.db.object(path).set(budget);
  }
}
