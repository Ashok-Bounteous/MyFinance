import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CompanyData } from '../store/models/company.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AlphaVantageService {
//   private apiKey = environment.alphaVantageApiKey;

//   constructor(private http: HttpClient) {}

//   getCompanyData(symbol: string): Observable<CompanyData> {
//     // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${this.apiKey}`;
//     const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo`;
//     return this.http.get<any>(url).pipe(
//       map(response => {
//         const timeSeries = response['Weekly Time Series'];
//         const formattedData = Object.keys(timeSeries).map(date => ({
//           date,
//           open: parseFloat(timeSeries[date]['1. open']),
//           high: parseFloat(timeSeries[date]['2. high']),
//           low: parseFloat(timeSeries[date]['3. low']),
//           close: parseFloat(timeSeries[date]['4. close']),
//           volume: parseInt(timeSeries[date]['5. volume'], 10),
//         }));
//         return {
//           symbol: response['Meta Data']['2. Symbol'],
//           lastRefreshed: response['Meta Data']['3. Last Refreshed'],
//           timeSeries: formattedData
//         } as CompanyData;
//       })
//     );
//   }
// }


@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {
  private apiKey = environment.alphaVantageApiKey;

  constructor(private http: HttpClient) {}

  getCompanyData(symbol: string, interval: string): Observable<CompanyData> {
    // Construct URL dynamically based on interval
    // const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${symbol}&apikey=${this.apiKey}`;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=IBM&apikey=demo`;
    return this.http.get<any>(url).pipe(
      map(response => {
        // Adjust this mapping based on interval
        console.log("Called API. Data : ",response)
        const timeSeriesKey = interval === 'daily' ? 'Time Series (Daily)' :
                              interval === 'weekly' ? 'Weekly Time Series' :
                              'Monthly Time Series';
        const timeSeries = response[timeSeriesKey];
        const formattedData = Object.keys(timeSeries).map(date => ({
          date,
          open: parseFloat(timeSeries[date]['1. open']),
          high: parseFloat(timeSeries[date]['2. high']),
          low: parseFloat(timeSeries[date]['3. low']),
          close: parseFloat(timeSeries[date]['4. close']),
          volume: parseInt(timeSeries[date]['5. volume'], 10),
        }));
        return {
          symbol: response['Meta Data']['2. Symbol'],
          lastRefreshed: response['Meta Data']['3. Last Refreshed'],
          timeSeries: formattedData
        } as CompanyData;
      })
    );
  }
}
