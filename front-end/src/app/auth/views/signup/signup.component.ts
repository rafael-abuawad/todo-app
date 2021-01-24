import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config.service';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';

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
    private httpClient: HttpClient,
    private configService: ConfigService
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
    this.loading = true;
    this.httpClient
      .post('http://localhost:3000/api/auth/signup', {
        ...this.signupForm.value,
      })
      .toPromise()
      .then((data: any) => {
        const { access_token } = data as JwtPayload;
        this.configService.setToken = access_token;
        this.loading = false;
      })
      .catch((err) => {
        this.errorMsg = err.error.message;
        this.loading = false;
      });
  }
}
