using Security.Core.Models;

namespace CryptoDashWeb.Models
{
    public class JWTModel : IJWTOptions
    {
        public string? Issuer { get; set; }
        public string? Audience { get; set; }
        public string SecretAccessKey { get; set; } = "";
        public string SecretRefreshKey { get; set; } = "";
        public int AccessTokenExpireInMinutes { get; set; } = 15;
        public int RefreshTokenExpireInDays { get; set; } = 7;
    }
}
