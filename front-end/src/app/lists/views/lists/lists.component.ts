import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { ConfigService as AuthConfigService } from '../../../auth/services/config.service';
import { List } from '../../interfaces/list.interface';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  lists: List[] = [];
  list?: List = undefined;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(
    private httpClient: HttpClient,
    private authConfigService: AuthConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.httpClient
      .get('http://localhost:3000/api/lists', {
        headers: {
          Authorization: `Bearer ${this.authConfigService.getToken}`,
        },
      })
      .toPromise()
      .then((data) => {
        this.lists = data as List[];
        this.loading = false;
      })
      .catch((err) => {
        this.errorMsg = err.error.message;
        this.loading = false;
      });
  }

  setCurrentList(idx: number) {
    this.list = this.lists[idx];
  }

  logoutUser() {
    this.authConfigService.clearToken();
    this.router.navigate(['login'])
  }
}
