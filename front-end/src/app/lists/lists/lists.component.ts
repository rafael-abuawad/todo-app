import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService as AuthConfigService } from '../../auth/config.service';
import { List } from '../dto/list.dto';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  lists: List[] = [];
  list: List | null = null;
  loading: boolean = false;
  errorMsg: string = '';

  constructor(
    private httpClient: HttpClient,
    private authConfigService: AuthConfigService
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
}
