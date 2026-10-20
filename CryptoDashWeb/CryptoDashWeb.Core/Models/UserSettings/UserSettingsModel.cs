using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Core.Models.UserSettings
{
    public class UserSettingsModel
    {
        public int UserId { get; set; }
        public ToolCode? ToolCode { get; set; }
        public TileCode? TileCode { get; set; }
        public SettingsCode SettingsCode { get; set; }
        public BaseUserSettings? UserSettings { get; set; }

        public UserSettingsModel(int userId, ToolCode? toolCode, TileCode? tileCode, SettingsCode settingsCode, BaseUserSettings? targetSettings)
        {
            UserId = userId;
            ToolCode = toolCode;
            TileCode = tileCode;
            SettingsCode = settingsCode;
            UserSettings = targetSettings;
        }
    }
}
