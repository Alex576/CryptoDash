using CryptoDashWeb.Core.Models.Controls;
using CryptoDashWeb.Core.Models.Form;
using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface ISettingsService
    {
        SettingsFilters GetFilters(ToolCode toolCode);
        Task<FormModel> GetForm(TileCode tileCode, string itemId);
        Task<LayoutsModel> GetLayout(ToolCode toolCode);
        Task<FormModel> UpdateForm(TileCode tileCode, string itemId, FormValues formValues);
    }
}
