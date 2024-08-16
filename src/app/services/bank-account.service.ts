import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from './userauth.service'; // Assume you have an AuthService to get user ID

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  private ifscApiRoot = 'https://thingproxy.freeboard.io/fetch/https://ifsc.razorpay.com/';
  private bankInfoPath = '/bankInfo/';
  private userBankHistoryPath = '/users/bankHistory/';

  constructor(private db: AngularFireDatabase, private authService: AuthService, private http: HttpClient) {}

  getBankNames(): Observable<any[]> {
    return this.db.list(`${this.bankInfoPath}bankNames`).snapshotChanges().pipe(
      map((actions: any[]) =>
        actions.map(a => ({
          key: a.payload.key,
          value: a.payload.val()
        }))
      ),tap(same => console.log(same))
    );
  }

  getStatesForBank(bankCode: string): Observable<Object> {
    ///places?bankcode=AUBL
    const val = this.http.get(`${this.ifscApiRoot}places?bankcode=${bankCode}`).pipe();
    console.log(val);
    return val;
  }

  searchBanks(filter: any): Observable<any> {
    const path = `${this.bankInfoPath}branches/${filter.bankcode}/${filter.state}`;
    return this.db.object(path).valueChanges();
  }

  getBankDetailsByIfsc(ifsc: string): Observable<any> {
    return this.http.get(`${this.ifscApiRoot}${ifsc}`).pipe(
      catchError(err => of(null))
    );
  }

  searchBranches(bankCode: string, state: string, limit: number = 10, offset: number = 0): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('bankcode', bankCode)
      .set('state', state);

      console.log("path : ",`${this.ifscApiRoot}search?limit=${limit}&offset=${offset}&bankcode=${bankCode}&state=${state}`)
    return this.http.get<any>(`${this.ifscApiRoot}search?limit=${limit}&offset=${offset}&bankcode=${bankCode}&state=${state}`).pipe(
      catchError(error => {
        console.error('Error fetching branches:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

    // Save bank account details to user-specific path in Firebase
    saveBankAccountDetails(bankAccount: any): Observable<any> {
      return this.authService.getUserProfile().pipe(
        switchMap(user => {
          if (user && user.uid) {
            const uid = user.uid;
            return this.db.list(`${this.userBankHistoryPath}${uid}`).push(bankAccount);
          } else {
            console.error('User not authenticated');
            return of(null);
          }
        }),
        catchError(error => {
          console.error('Error saving bank account details:', error);
          return of(null);
        })
      );
    }
}

// saveBankAccountDetails(details: any): Observable<any> {
//   const userId = this.authService.getUserId();
//   return this.db.list(`${this.userBankHistoryPath}${userId}`).push(details).pipe(
//     switchMap(() => this.db.object(`${this.userBankHistoryPath}${userId}`).set(details))
//   );
// }
