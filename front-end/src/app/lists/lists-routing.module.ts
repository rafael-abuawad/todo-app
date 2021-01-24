import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './views/lists/lists.component';
import { AddListComponent } from './views/add-list/add-list.component';
import { AuthGuardService as AuthGuard } from '../auth/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: ListsComponent, canActivate: [AuthGuard] },
  { path: 'create/list', component: AddListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ListsRoutingModule {}
