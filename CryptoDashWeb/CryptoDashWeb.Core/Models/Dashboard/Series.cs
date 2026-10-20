using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;

namespace CryptoDashWeb.Core.Models.Dashboard
{
    public class Series
    {
        public DashboardDataView Type { get; set; }
        public string XKey { get; set; }
        public string YKey { get; set; }
    }
}
