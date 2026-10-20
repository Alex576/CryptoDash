using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Core.Utils;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using CryptoDashWeb.Data.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Core.Services
{
    public class UserSettingsService : IUserSettingsService
    {
        private readonly UserSettingsContext _userSettingsContext;
        private readonly ISessionService _sessionService;
        private readonly IUserSettingsStoreService _userSettingsStoreService;

        public UserSettingsService(UserSettingsContext userSettingsContext, ISessionService sessionService, IUserSettingsStoreService userSettingsStoreService)
        {
            _userSettingsContext = userSettingsContext;
            _sessionService = sessionService;
            _userSettingsStoreService = userSettingsStoreService;
        }

        public async Task<BaseUserSettings?> GetUserSettings(SettingsCode settingsCode, ToolCode? toolCode, TileCode? tileCode)
        {
            var settings = await _userSettingsStoreService.GetUserSettings(_sessionService.CurrentUser, settingsCode, _userSettingsContext, toolCode, tileCode);
            return settings.UserSettings;
        }

        public async Task SaveUserSettings(SettingsCode settingsCode, ToolCode? toolCode, TileCode? tileCode, JToken userSettings)
        {
            await _userSettingsStoreService.SaveUserSettings(_sessionService.CurrentUser, settingsCode, _userSettingsContext, userSettings, toolCode, tileCode);
            
        }
    }
}
