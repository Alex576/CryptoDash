using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services.Interfaces
{
    public interface IUserSettingsStoreService
    {
        Task<UserSettingsModel> GetUserSettings(int userId, SettingsCode settingsCode, UserSettingsContext userSettingsContext, ToolCode? toolCode = null, TileCode? tileCode = null);
        Task SaveUserSettings(int currentUser, SettingsCode settingsCode, UserSettingsContext userSettingsContext, JToken userSettings, ToolCode? toolCode, TileCode? tileCode);
    }
}
