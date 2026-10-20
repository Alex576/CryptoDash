using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Core.Utils;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using CryptoDashWeb.Data.Utils;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services
{
    public class UserSettingsStoreService : IUserSettingsStoreService
    {
        private readonly IReadOnlyDictionary<SettingsCode, Type> _userSettingsTypes = new Dictionary<SettingsCode, Type>()
        {
            {SettingsCode.LastOpenedTool, typeof(LastSessionUserSettings) },
            {SettingsCode.DashboardFilters, typeof(FilterUserSettings) },
            {SettingsCode.DashboardLayout, typeof(DashboardLayoutUserSettings) },
        };

        private readonly Dictionary<string, BaseUserSettings> _userSettings = new();
        private readonly ILogger<UserSettingsStoreService> _logger;

        public UserSettingsStoreService(ILogger<UserSettingsStoreService> logger)
        {
            _logger = logger;
        }

        public async Task<UserSettingsModel> GetUserSettings(int userId, SettingsCode settingsCode, UserSettingsContext userSettingsContext,
            ToolCode? toolCode = null, TileCode? tileCode = null)
        {
            var key = GetSearchKey(userId, toolCode, tileCode, settingsCode);
            if (_userSettings.TryGetValue(key, out var userSettings))
            {
                return new UserSettingsModel(userId, toolCode, tileCode, settingsCode, userSettings);
            }
            var data = await userSettingsContext.GetUserSettings(key);
            if (!_userSettingsTypes.TryGetValue(settingsCode, out var targetType))
                throw new Exception($"Not provided type for settings code = {(int)settingsCode}");

            return new UserSettingsModel(userId, toolCode, tileCode, settingsCode, JsonConvert.DeserializeObject(data?.DataJson ?? "", targetType) as BaseUserSettings);

            //userSettings = (JsonConvert.DeserializeObject(data?.DataJson ?? "", targetType) ?? Activator.CreateInstance(targetType)) as BaseUserSettings;
            //if (userSettings == null)
            //    throw new Exception($"Can't parse or create user settings with code = {(int)settingsCode}");

            //_userSettings[key] = userSettings;
            //return new UserSettingsModel(userId, toolCode, tileCode, settingsCode, userSettings);
        }

        public async Task SaveUserSettings(int userId, SettingsCode settingsCode, UserSettingsContext userSettingsContext, JToken userSettings,
            ToolCode? toolCode = null, TileCode? tileCode = null)
        {
            if (!_userSettingsTypes.TryGetValue(settingsCode, out var settingsType) || !userSettings.TryParseValue(settingsType, out var userData) || userData is not BaseUserSettings baseUserData)
                return;

            var key = GetSaveKey(userId, toolCode, tileCode, settingsCode);
            _userSettings[key] = baseUserData;
            await userSettingsContext.SaveUserSettings(key, baseUserData);
        }

        private string GetSearchKey(int userId, ToolCode? toolCode, TileCode? tileCode, SettingsCode settingsCode) =>
            $"{userId}_{(toolCode.HasValue ? (int)toolCode.Value : "%")}_{(tileCode.HasValue ? (int)tileCode.Value : "%")}_{(int)settingsCode}";

        private string GetSaveKey(int userId, ToolCode? toolCode, TileCode? tileCode, SettingsCode settingsCode) =>
            $"{userId}_{(toolCode.HasValue ? (int)toolCode.Value : 0)}_{(tileCode.HasValue ? (int)tileCode.Value : 0)}_{(int)settingsCode}";
    }
}
