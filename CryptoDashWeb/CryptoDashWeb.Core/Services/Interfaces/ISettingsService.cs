using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface ISettingsService
    {
        SettingsFilters GetFilters(ToolCode toolCode);
    }
}
