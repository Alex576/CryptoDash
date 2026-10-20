using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Dashboard
{
    public class DashboardItemData
    {
        public List<Dictionary<string, object>> Data { get; set; } = [];
        public List<Series> Series { get; set; } = [];
        public bool LoadError { get; set; }
        public ChartBaseType ChartBaseType { get; set; }
        public List<DashboardLegend> Legends { get; set; } = [];
    }
}
