using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Models
{
    public class DashboardItemChangesModel
    {
        public TileCode TileCode { get; set; }
        public DashboardItemChanges Changes { get; set; }
    }
}
