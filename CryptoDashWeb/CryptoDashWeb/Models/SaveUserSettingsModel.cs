using CryptoDashWeb.Core.Converters;
using CryptoDashWeb.Core.Models.UserSettings;
using CryptoDashWeb.Data.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CryptoDashWeb.Models
{
    public class SaveUserSettingsModel
    {
        public ToolCode? ToolCode { get; set; }
        public TileCode? TileCode { get; set; }
        public SettingsCode SettingsCode { get; set; }
        public JToken Value { get; set; }
    }
}
