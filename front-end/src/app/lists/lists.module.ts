import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './views/lists/lists.component';
import { ListsMenuComponent } from './components/lists-menu/lists-menu.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { AuthGuardService } from '../auth/services/auth-guard.service'
import { ConfigService } from '../auth/services/config.service'

@NgModule({
  declarations: [ListsComponent, ListsMenuComponent, ListDetailComponent],
  providers: [AuthGuardService, ConfigService],
  imports: [CommonModule, ListsRoutingModule],
})
export class ListsModule {}
