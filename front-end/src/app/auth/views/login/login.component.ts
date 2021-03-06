import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

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
    private httpClient: HttpClient,
    private router: Router,
    private configService: ConfigService
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
    this.loading = true;
    this.httpClient
      .post('http://localhost:3000/api/auth/login', {
        ...this.loginForm.value,
      })
      .toPromise()
      .then((data: any) => {
        const { access_token } = data as JwtPayload;
        this.configService.setToken = access_token;
        this.loading = false;
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.errorMsg = err.error.message;
        this.loading = false;
      });
  }
}
