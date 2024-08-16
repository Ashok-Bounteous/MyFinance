import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as CompanyActions from '../actions/company.actions';

@Injectable()
export class CompanyEffects {
  loadCompanyData$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.loadCompanyData),
    mergeMap(({ symbol, interval }) => {
      let functionType = '';
      switch (interval) {
        case 'daily':
          functionType = 'TIME_SERIES_DAILY';
          break;
        case 'weekly':
          functionType = 'TIME_SERIES_WEEKLY';
          break;
        case 'monthly':
          functionType = 'TIME_SERIES_MONTHLY';
          break;
        default:
          functionType = 'TIME_SERIES_DAILY'; // Default to daily if unknown interval
      }
      
      // Construct the API URL dynamically
      // const apiUrl = `https://www.alphavantage.co/query?function=${functionType}&symbol=${symbol}&apikey=demo`;
      const apiUrl = `https://www.alphavantage.co/query?function=${functionType}&symbol=IBM&apikey=demo`;
      
      return this.http.get(apiUrl)
        .pipe(
          map(data => CompanyActions.loadCompanyDataSuccess({ symbol, interval, data })),
          catchError(error => of(CompanyActions.loadCompanyDataFailure({ error })))
        );
    })
  ));

  constructor(private actions$: Actions, private http: HttpClient) {}
}
