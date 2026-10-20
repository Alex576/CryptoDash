import { Injectable } from '@angular/core';
import { AgCartesianChartOptions, AgCartesianSeriesOptions, AgPolarChartOptions, AgStandaloneChartOptions, AgTopologyChartOptions } from 'ag-charts-community';
import { ChartBaseType, DashboardItemData } from '../models/dashboard-item';

@Injectable()
export class DashboardChartService {

  getOptions(data: DashboardItemData): AgCartesianChartOptions<unknown, DashboardItemData> | AgPolarChartOptions<unknown, DashboardItemData> | AgTopologyChartOptions<unknown, DashboardItemData> | AgStandaloneChartOptions<unknown, DashboardItemData> {
    switch (data.chartBaseType) {
      case ChartBaseType.Polar: return this.getPolarOptions(data);
      case ChartBaseType.Cartesian: return this.getCartesianOptions(data);
      case ChartBaseType.Topology: return this.getTopologyOptions(data);
      case ChartBaseType.Standalone: return this.getStandaloneOptions(data);
    }

    return {
      overlays: {
        loading: {
          text: 'Some custom loading message',
        },
        noData: {
          text: 'Some custom noData message',
        },
        noVisibleSeries: {
          text: 'Some custom noVisibleSeries message',
        },
        unsupportedBrowser: {
          text: 'Some custom unsupportedBrowser message',
        },
      },
    };
  }

  private getPolarOptions<TDatum = unknown, TContext = DashboardItemData>(data: DashboardItemData): AgPolarChartOptions<unknown, DashboardItemData> {
    const polarOptions: AgPolarChartOptions<unknown, DashboardItemData> = {

    };
    return polarOptions;
  }

  private getCartesianOptions(data: DashboardItemData): AgCartesianChartOptions<unknown, DashboardItemData> {
    const cartesianOptions: AgCartesianChartOptions<unknown, DashboardItemData> = {
      data: data.data,
      series: this.getSeries(data),
      axes: {
        x: {
          type: 'category',
          label: {
            formatter: (params) => {
              const value = typeof params.value === 'string' ? new Date(params.value) : params.value instanceof Date ? params.value : null;
              return value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(value) : '';
            },
          }
        },
        y: {
          type: 'number',
          title: { text: 'USD', orientation: 'vertical' },
          label: {
            formatter: (params) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' }).format(params.value)
          }
        },
      },
    };
    return cartesianOptions;
  }

  private getTopologyOptions<TDatum = unknown, TContext = DashboardItemData>(data: DashboardItemData): AgTopologyChartOptions<TDatum, TContext> {
    throw new Error('Method not implemented.');
  }

  private getStandaloneOptions<TDatum = unknown, TContext = DashboardItemData>(data: DashboardItemData): AgStandaloneChartOptions<TDatum, TContext> {
    throw new Error('Method not implemented.');
  };

  getSeries(data: DashboardItemData): AgCartesianSeriesOptions<unknown, DashboardItemData>[] {
    // switch (data.chartBase) {
    //   case 'polar':
    return data.series.map((series) => ({ type: 'bar', xKey: series.xKey, yKey: series.yKey }));
    //   case 'cartesian':
    //   case 'hierarchy':
    // }
    // return [];
  }
}
