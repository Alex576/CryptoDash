import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { DashboardItem } from '../models/dashboard-item';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardChartComponent implements OnInit {
  readonly item = input.required<DashboardItem>();

  constructor() { }

  ngOnInit() {
  }

}
