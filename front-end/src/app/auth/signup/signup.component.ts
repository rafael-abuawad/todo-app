import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.loading = false;
    this.errorMsg = '';
  }

  get username() {
    return this.signupForm.get('username') as AbstractControl;
  }

  get password() {
    return this.signupForm.get('password') as AbstractControl;
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signup() {
    this.loading = true
    this.httpClient
      .post('http://localhost:3000/api/auth/signup', {
        ...this.signupForm.value,
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
