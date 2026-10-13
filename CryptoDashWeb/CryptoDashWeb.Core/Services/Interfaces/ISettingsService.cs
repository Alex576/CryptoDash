using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.OperationResult;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Models.Settings.LayoutEntities;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface ISettingsService
    {
        Task<SettingsFilters> GetFilters(ToolCode toolCode);
        Task<FormModel> GetForm(TileCode tileCode, string? itemId);
        Task<LayoutsModel> GetLayout(ToolCode toolCode);
        Task<FormModel> RemoveItem(TileCode tileCode, string itemId);
        Task SaveDashboardItem(TileCode tileCode, DashboardItemChanges model);
        Task<OperationResult> SaveForm(TileCode tileCode, string? itemId, FormValues formValues);
        Task<FormModel> UpdateForm(TileCode tileCode, string? itemId, FormValues formValues);
    }
}
