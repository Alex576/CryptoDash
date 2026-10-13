using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Models.Dashboard
{
    public class DashboardItemData
    {
        public List<Dictionary<string, object>> Data { get; set; } = [];
        public List<Series> Series { get; set; } = [];
    }

    public class Series
    {
        public string Type { get; set; }
        public string XKey { get; set; }
        public string YKey { get; set; }
    }
}
