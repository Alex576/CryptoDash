using CryptoDashWeb.Data.Models;

namespace CryptoDashWeb.Models
{
    public class GetUserSettingsModel
    {
        public SettingsCode SettingsCode { get; set; }
        public ToolCode? ToolCode { get; set; }
        public TileCode? TileCode { get; set; }
    }
}
