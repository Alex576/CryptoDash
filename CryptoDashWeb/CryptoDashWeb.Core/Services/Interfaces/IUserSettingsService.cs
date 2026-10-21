using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Data.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface IUserSettingsService
    {
        Task<BaseUserSettings?> GetUserSettings(SettingsCode settingsCode, ToolCode? toolCode = null, TileCode? tileCode = null);
        Task SaveUserSettings(SettingsCode settingsCode, JToken userSettings, ToolCode? toolCode = null, TileCode? tileCode = null);
    }
}
