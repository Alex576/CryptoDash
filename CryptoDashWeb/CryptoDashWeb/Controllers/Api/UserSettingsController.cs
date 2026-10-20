using CryptoDashWeb.Core.Models.Settings;
using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Models;
using CryptoDashWeb.Models.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CryptoDashWeb.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSettingsController : ControllerBase
    {
        private readonly IUserSettingsService _userSettingsService;

        public UserSettingsController(IUserSettingsService userSettingsService)
        {
            _userSettingsService = userSettingsService;
        }

        [HttpPost("[action]")]
        public async Task<BaseUserSettings?> GetUserSettings(GetUserSettingsModel model)
        {
            return await _userSettingsService.GetUserSettings(model.SettingsCode, model.ToolCode, model.TileCode);
        }

        [HttpPost("[action]")]
        public async Task SaveUserSettings(SaveUserSettingsModel model)
        {
            await _userSettingsService.SaveUserSettings(model.SettingsCode, model.ToolCode, model.TileCode, model.Value);
        }
    }
}
