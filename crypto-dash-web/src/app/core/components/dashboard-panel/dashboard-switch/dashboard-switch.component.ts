import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DashboardBarsComponent } from '../dashboard-bars/dashboard-bars.component';
import { DashboardChartComponent } from '../dashboard-chart/dashboard-chart.component';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import { DashboardItem, DashboardItemData } from '../models/dashboard-item';
import { DashboardType } from '../models/dashboard-type';

@Component({
  selector: 'app-dashboard-switch',
  templateUrl: './dashboard-switch.component.html',
  styleUrls: ['./dashboard-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardBarsComponent, DashboardChartComponent, DashboardTableComponent]
})
export class DashboardSwitchComponent {
  readonly item = input.required<DashboardItem>();
  readonly data = input.required<DashboardItemData>();

  protected readonly dashboardType = DashboardType;

  constructor() { }


}
