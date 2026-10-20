import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal, untracked, viewChild } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgCartesianSeriesOptions, AgChartInstance, AgChartOptions, AgHierarchySeriesOptions, AgPolarSeriesOptions } from 'ag-charts-community';
import { LoadingComponent } from '../../loading/loading.component';
import { DashboardItem, DashboardItemData } from '../models/dashboard-item';
import { DashboardChartService } from './dashboard-chart.service';

type ChartSeries =
  AgCartesianSeriesOptions<any, unknown>[]
  | AgPolarSeriesOptions<any, unknown>[]
  | AgHierarchySeriesOptions<any, unknown>[];

interface test extends AgCharts {
  // chart?: AgChartInstance<AgChartOptions>;
}
@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
  imports: [AgCharts, LoadingComponent],
  providers: [DashboardChartService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardChartComponent {
  readonly item = input.required<DashboardItem>();
  readonly data = input.required<DashboardItemData>();
  private readonly service = inject(DashboardChartService);

  protected readonly chartOption = signal<AgChartOptions<unknown, DashboardItemData>>(null);
  private readonly chart = viewChild<test>(AgCharts);
  protected readonly isLoadError = computed<boolean>(() => this.data().loadError);
  protected readonly isLoading = computed<boolean>(() => this.item().isLoading);

  constructor() {
    effect(() => {
      const data = this.data();
      if (!data) {
        return;
      }
      if (this.chartOption()) {
        const chart = untracked(() => this.chart());
        if (!chart) {
          return;
        }
        chart.chart.applyTransaction({ add: data.data, remove: chart.chart.getOptions().data });
        chart.chart.update(this.service.getOptions(data) as any);
        // chart.chart.getOptions().series = this.getSeries(data.series);
      } else {

        // const options: AgChartOptions<unknown, DashboardItemData> = {
        //   data: data.data,
        //   series: this.getSeries(data),
        //   axes: {
        //     x: {
        //       type: 'category',
        //       label: {
        //         formatter: (params) => {
        //           const value = typeof params.value === 'string' ? new Date(params.value) : params.value instanceof Date ? params.value : null;
        //           return value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(value) : '';
        //         },
        //       }
        //     },
        //     y: {
        //       type: 'number',
        //       title: { text: 'USD', orientation: 'vertical' },
        //       label: {
        //         formatter: (params) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' }).format(params.value)
        //       }
        //     },
        //   },
        //   // legend: {
        //   //   item: {
        //   //     label: {
        //   //       formatter: (params: AgChartLegendLabelFormatterParams<DashboardItemData>) => "test",
        //   //     }
        //   //   }
        //   // }
        // };
        this.chartOption.set(this.service.getOptions(data));
      }
    });
  }

  onChartReady(instance: AgChartInstance): void {
  }



  private getSeries(data: DashboardItemData): AgCartesianSeriesOptions<unknown, DashboardItemData>[] {
    // switch (data.chartBase) {
    //   case 'polar':
    return data.series.map((series) => ({ type: 'bar', xKey: series.xKey, yKey: series.yKey }));
    //   case 'cartesian':
    //   case 'hierarchy':
    // }
    // return [];
  }
}
