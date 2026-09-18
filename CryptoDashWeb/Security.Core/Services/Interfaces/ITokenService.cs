using Security.Core.Models;
using Security.Data.DBModels;
using System.IdentityModel.Tokens.Jwt;

namespace Security.Core.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
        string GenerateAccessToken(UserModel user);
        JwtSecurityToken GenerateRefreshToken(User user);
        JwtSecurityToken GenerateRefreshToken(UserModel user);
        Task<bool> ValidateRefreshToken(string token);
    }
}