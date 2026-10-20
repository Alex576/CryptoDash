using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace CryptoDashWeb.Data.Services
{
    public class UserSettingsContext : CryptoDashContextServiceBase
    {
        public UserSettingsContext(CryptoDashContext context) : base(context)
        {
        }

        public async Task<UserSetting?> GetUserSettings(string key)
        {
            return await _context.UserSettings.Where(x => EF.Functions.Like(x.SettingKey, key)).FirstOrDefaultAsync();
        }
        //public async Task<UserSettingsModel<TData>> GetUserSettings<TData>(string key) where TData : class
        //{
        //    var settings = await _context.UserSettings.FirstOrDefaultAsync(x => x.SettingKey == key);
        //    return new UserSettingsModel<TData>(settings);
        //}

        public async Task<int> SaveUserSettings(string settingsKey, object data)
        {
            var oldSettings = await _context.UserSettings.Where(x => EF.Functions.Like(x.SettingKey, settingsKey)).FirstOrDefaultAsync();
            if (oldSettings == null)
            {
                oldSettings = new UserSetting()
                {
                    SettingKey = settingsKey,
                };
            }
            oldSettings.DataJson = JsonConvert.SerializeObject(data);
            _context.UserSettings.Update(oldSettings);
            return await _context.SaveChangesAsync();
        }
    }
}
