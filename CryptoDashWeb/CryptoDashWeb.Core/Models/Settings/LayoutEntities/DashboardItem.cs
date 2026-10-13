using CryptoDashWeb.Core.Models.Dashboard;
using CryptoDashWeb.Core.Models.Settings.LayoutDBEntities;

namespace CryptoDashWeb.Core.Models.Settings.LayoutEntities
{
    public class DashboardItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DashboardType Type { get; set; }
        public DashboardItemOptions Options { get; set; }
        public DashboardItemData Data { get; set; }

    }
}