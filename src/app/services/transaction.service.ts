import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Transaction } from '../store/models/transaction.model';
import { BankAccount } from '../store/models/bank-account.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private db: AngularFireDatabase) {}

  getTransactions(uid: string) {
    return this.db.list<Transaction>(`users/transactionHistory/${uid}`).valueChanges();
  }

  addTransaction(transaction: Transaction, uid: string) {
    return this.db.list(`users/transactionHistory/${uid}`).push(transaction);
  }

  updateTransaction(id: string, transaction: Transaction, uid: string) {
    return this.db.object(`users/transactionHistory/${uid}/${id}`).update(transaction);
  }

  deleteTransaction(id: string, uid: string) {
    return this.db.object(`users/transactionHistory/${uid}/${id}`).remove();
  }

  getBankAccounts(uid: string) {
    return this.db.list<BankAccount>(`users/bankHistory/${uid}`).valueChanges();
  }
}
