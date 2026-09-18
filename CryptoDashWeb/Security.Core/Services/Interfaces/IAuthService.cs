namespace Security.Core.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string?> TryRefreshToken(string accessToken, string refreshToken);
    }
}