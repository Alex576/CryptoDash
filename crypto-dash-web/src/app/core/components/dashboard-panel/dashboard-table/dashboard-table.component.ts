import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { DashboardItem } from '../models/dashboard-item';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTableComponent implements OnInit {
  readonly item = input.required<DashboardItem>();

  constructor() { }

  ngOnInit() {
  }

}
