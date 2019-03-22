import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  name = new FormControl('');
  public accNumber = '';
  baseUrl = "https://swiftmtransferapi.azurewebsites.net/api";

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    this.http = http;
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailID: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get function() { return this.registerForm.controls; }

  onSubmit() {
    console.log(this.registerForm);
    this.http.post("https://swiftmtransferapi.azurewebsites.net/api/" + "User/User", {
      "AddUser": this.registerForm.value
    }).subscribe(result => {
      console.log("Value returned from web service call is ", result),
        this.accNumber = result.toString();
    }, error => console.error(error));

  }

}
