import { Component, Input } from '@angular/core';
import { List } from '../../interfaces/list.interface';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css'],
})
export class ListDetailComponent {
  @Input() list?: List;
}
