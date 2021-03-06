import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './views/lists/lists.component';
import { AddListComponent } from './views/add-list/add-list.component';
import { AddTaskComponent } from './views/add-task/add-task.component';
import { ListsMenuComponent } from './components/lists-menu/lists-menu.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { ConfigService } from '../auth/services/config.service';

@NgModule({
  declarations: [
    ListsComponent,
    ListsMenuComponent,
    ListDetailComponent,
    AddListComponent,
    AddTaskComponent,
  ],
  providers: [AuthGuardService, ConfigService],
  imports: [CommonModule, ReactiveFormsModule, ListsRoutingModule],
})
export class ListsModule {}
