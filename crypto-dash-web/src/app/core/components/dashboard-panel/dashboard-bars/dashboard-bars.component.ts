import { ChangeDetectionStrategy, Component, effect, input, signal, viewChild } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartInstance, AgChartOptions } from 'ag-charts-community';
import { LoadingComponent } from '../../loading/loading.component';
import { DashboardItem, DashboardItemData } from '../models/dashboard-item';

@Component({
  selector: 'app-dashboard-bars',
  templateUrl: './dashboard-bars.component.html',
  styleUrls: ['./dashboard-bars.component.scss'],
  imports: [AgCharts, LoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardBarsComponent {
  readonly item = input.required<DashboardItem>();
  readonly data = input.required<DashboardItemData>();

  protected readonly chartOption = signal<AgChartOptions>(null);
  private readonly chart = viewChild<AgCharts>(AgCharts);

  constructor() {
    effect(() => {
      const data = this.data();
      if (!data) {
        return;
      }
      if (this.chartOption()) {
        const chart = this.chart();
        if (!chart) {
          return;
        }
        // chart.chart.applyTransaction({ add: data.data, remove: chart.chart.getOptions().data });
        // chart.chart.getOptions().series = [data.series];
      } else {

        this.chartOption.set({
          data: data.data,
          series: data.series,
        });
      }
    });
  }

  onChartReady(instance: AgChartInstance): void {
  }

}
