import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { Task } from '../../interfaces/task.interface';
import { ConfigService as AuthConfigService } from '../../../auth/services/config.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Input()
  listId: number;
  taskForm: FormGroup;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private authConfigService: AuthConfigService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
    this.loading = false;
  }

  addTask() {
    this.loading = true;
    this.httpClient
      .post(
        'http://localhost:3000/api/tasks',
        { ...this.taskForm.value, list: this.listId },
        {
          headers: {
            Authorization: `Bearer ${this.authConfigService.getToken}`,
          },
        }
      )
      .toPromise()
      .then((data) => {
        this.taskForm.reset();
        this.router.navigate([''])
        this.loading = false;
      })
      .catch((err) => {
        console.error({ component: 'add-task', err });
        this.loading = false;
      });
  }
}
