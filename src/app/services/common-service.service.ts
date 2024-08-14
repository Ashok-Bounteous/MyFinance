import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  private chartData= 
  [
    {
        "year": 2019,
        "amount": 5000,
        "color": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgb(255, 99, 132)"
    },
    {
        "year": 2020,
        "amount": 6000,
        "color": "rgba(255, 159, 64, 0.2)",
        "borderColor": "rgb(255, 159, 64)"

    },
    {
        "year": 2021,
        "amount": 5000,
        "color": "rgba(255, 205, 86, 0.2)",
        "borderColor": "rgb(255, 205, 86)"
    },
    {
        "year": 2022,
        "amount": 16000,
        "color": "rgba(75, 192, 192, 0.2)",
        "borderColor": "rgb(75, 192, 192)"

    },
    {
        "year": 2023,
        "amount": 35000,
        "color": "rgba(54, 162, 235, 0.2)",
        "borderColor": "rgb(54, 162, 235)"
    },
    {
        "year": 2024,
        "amount": 66000,
        "color": "rgba(75, 192, 192, 0.2)",
        "borderColor": "rgb(75, 192, 192)"

    }
];

  // APIURL = "http://localhost:3010/chartData";
  // constructor(private httpclient: HttpClient) { }

  
  showData(){
    return this.chartData;//this.httpclient.get(this.APIURL)
  }
}
