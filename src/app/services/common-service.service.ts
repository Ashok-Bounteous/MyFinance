import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  APIURL = "http://localhost:3010/chartData";
  constructor(private httpclient: HttpClient) { }

  
  showData(){
    return this.httpclient.get(this.APIURL)
  }
}
