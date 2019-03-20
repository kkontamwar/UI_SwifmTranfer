import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  public currentCount = 0;
  baseUrl = "https://swiftmtransferapi.azurewebsites.net/api";
  showMsg: boolean = false;
  public payeeAccounts: any;
  transactForm: FormGroup;
  fromAccNumber: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    http.get<any>(this.baseUrl + "/User/GetSelf").subscribe(
      result => {
        console.log("Fetching self Account Number."); this.fromAccNumber = result;
        console.log("Fetching payee Account Numbers.");

        http.get<any>(this.baseUrl + "/User/GetAllPayeeAccounts").subscribe(
          data => { this.payeeAccounts = data; },
          error => console.error(error));
      },
      error => console.error(error));


  }


  ngOnInit() {
    this.transactForm = this.formBuilder.group({
      fromAccNumber: ['', Validators.required],
      toAccNumber: ['', Validators.required],
      transAmount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {

    console.log(this.transactForm);
    this.baseUrl = "https://swiftmtransferapi.azurewebsites.net/api/Transact";

    this.http.post(this.baseUrl,
      this.transactForm.value
    ).subscribe(result => {
      console.log("Transaction done successfully, Transaction Id:" + result),
        this.showMsg = true;
    }, error => console.error(error));

  }
}
