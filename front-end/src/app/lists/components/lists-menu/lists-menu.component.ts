import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from '../../interfaces/list.interface';
import { ConfigService as AuthConfigService } from '../../../auth/services/config.service';

@Component({
  selector: 'app-lists-menu',
  templateUrl: './lists-menu.component.html',
  styleUrls: ['./lists-menu.component.css'],
})
export class ListsMenuComponent implements OnInit {
  @Input() lists: List[];
  @Output() listSelectedEvent: EventEmitter<List> = new EventEmitter<List>();
  searchForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authConfigService: AuthConfigService
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  selectList(list: List) {
    this.listSelectedEvent.emit(list);
  }

  logoutUser() {
    this.authConfigService.clearToken();
    this.router.navigate(['login']);
  }

  get search() {
    return this.searchForm.get('search') as FormControl;
  }

  get filteredLists() {
    return this.lists.filter((list) =>
      list.title.toLowerCase().includes(this.search.value.toLowerCase())
    );
  }
}
