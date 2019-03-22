import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public transactionHistory: any;
  baseUrl = "http://52.13.109.60:8080/api";

  constructor(private http: HttpClient) {
    http.get<any>(this.baseUrl + "/Transactions").subscribe(
      result => {
        console.log(result);
        this.transactionHistory = result;
      },
      error => console.error(error));
  }

}
