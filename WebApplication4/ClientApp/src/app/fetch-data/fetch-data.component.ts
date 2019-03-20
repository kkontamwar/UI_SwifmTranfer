import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public transactionHistory: any;
  baseUrl = "https://swiftmtransferapi.azurewebsites.net/api";

  constructor(private http: HttpClient) {
    http.get<any>(this.baseUrl + "/User/GetAllTransactions").subscribe(
      result => {
        console.log(result);
        this.transactionHistory = result;
      },
      error => console.error(error));
  }

}
