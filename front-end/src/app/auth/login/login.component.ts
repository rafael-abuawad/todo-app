import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.loading = false;
    this.errorMsg = '';
  }

  get username() {
    return this.loginForm.get('username') as AbstractControl;
  }

  get password() {
    return this.loginForm.get('password') as AbstractControl;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.loading = false;
    this.errorMsg = '';
  }

  login() {
    this.loading = true
    this.httpClient
      .post('http://localhost:3000/api/auth/login', {
        ...this.loginForm.value,
      })
      .pipe(
        catchError((error) => {
          if (error.error instanceof ErrorEvent) {
            this.errorMsg = `Error: ${error.error.message}`;
          } else {
            this.errorMsg = `Error: ${error.message}`;
          }
          this.loading = false
          return of([]);
        })
      )
      .subscribe(data => {
        console.log(data)
        this.loading = false
      });
  }
}
