import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}

  set setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  get getToken(): string {
    const token = localStorage.getItem('access_token');
    if (token) {
      return token;
    }
    return '';
  }

  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.clear();
  }
}
