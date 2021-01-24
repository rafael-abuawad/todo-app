import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { List } from '../../interfaces/list.interface';
import { ConfigService as AuthConfigService } from '../../../auth/services/config.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css'],
})
export class AddListComponent implements OnInit {
  loading: boolean = false;
  listForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authConfigService: AuthConfigService
  ) {}

  ngOnInit() {
    this.loading = false;
    this.listForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      tasks: this.formBuilder.array([]),
    });
  }

  get listTasksForm() {
    return this.listForm.get('tasks') as FormArray;
  }

  addTask() {
    const task = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
    });

    this.listTasksForm.push(task);
  }

  removeTask(i: number) {
    this.listTasksForm.removeAt(i);
  }

  createList() {
    this.loading = true;
    this.httpClient
      .post(
        'http://localhost:3000/api/lists',
        { ...this.listForm.value },
        {
          headers: {
            Authorization: `Bearer ${this.authConfigService.getToken}`,
          },
        }
      )
      .toPromise()
      .then((data) => {
        this.listForm.reset();
        this.loading = false;
      })
      .catch((err) => {
        console.error({ component: 'add-list', err });
        this.loading = false;
      });
  }
}
