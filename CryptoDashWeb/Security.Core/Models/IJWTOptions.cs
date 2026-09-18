namespace Security.Core.Models
{
    public interface IJWTOptions
    {
        string? Issuer { get; set; }
        string? Audience { get; set; }
        string SecretKey { get; set; }
        string SecretRefreshKey { get; set; }
        int AccessTokenExpireInMinutes { get; set; }
        int RefreshTokenExpireInDays { get; set; }
    }
}
