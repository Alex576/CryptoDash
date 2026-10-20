using CryptoDashWeb.Core.Models.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Settings.LayoutDBEntities
{
    public enum DashboardDataView
    {
        // Декартовы графики
        Bar = 1,
        Column = 2,
        Line = 3,
        Area = 4,
        Scatter = 5,
        Bubble = 6,
        Histogram = 7,
        Waterfall = 8,
        BoxPlot = 9,
        RangeBar = 10,
        RangeArea = 11,

        // Круговые и полярные
        Pie = 12,
        Donut = 13,
        RadarLine = 14,
        RadarArea = 15,
        Nightingale = 16,
        RadialColumn = 17,
        RadialBar = 18,

        // Иерархические / Отдельные
        Treemap = 19,
        Sunburst = 20,

        // Специализированные / Топологические
        Heatmap = 21,
        Sankey = 22,
        Chord = 23,
        Funnel = 24,
        Pyramid = 25,

        // Финансовые
        Candlestick = 26,
        Ohlc = 27,

        Table = 28,
    }

    public static class DashboardDataViewExtensions
    {
        public static ChartBaseType? ToBaseChartType(this DashboardDataView dataView) => dataView switch
        {
            DashboardDataView.Bar or
            DashboardDataView.Column or
            DashboardDataView.Line or
            DashboardDataView.Area or
            DashboardDataView.Scatter or
            DashboardDataView.Bubble or
            DashboardDataView.Histogram or
            DashboardDataView.Waterfall or
            DashboardDataView.BoxPlot or
            DashboardDataView.RangeBar or
            DashboardDataView.RangeArea => ChartBaseType.Cartesian,

            DashboardDataView.Pie or
            DashboardDataView.Donut or
            DashboardDataView.RadarLine or
            DashboardDataView.RadarArea or
            DashboardDataView.Nightingale or
            DashboardDataView.RadialColumn or
            DashboardDataView.RadialBar => ChartBaseType.Polar,

            DashboardDataView.Sunburst or
            DashboardDataView.Heatmap or
            DashboardDataView.Sankey or
            DashboardDataView.Chord or
            DashboardDataView.Funnel or
            DashboardDataView.Pyramid => ChartBaseType.Topology,

            DashboardDataView.Treemap or
            DashboardDataView.Candlestick or
            DashboardDataView.Ohlc => ChartBaseType.Standalone,
            _ => null,
        };
    }
}
