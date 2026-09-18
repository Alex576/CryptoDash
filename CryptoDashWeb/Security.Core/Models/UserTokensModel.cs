using System.IdentityModel.Tokens.Jwt;

namespace Security.Core.Models
{
    public class UserTokensModel
    {
        public JwtSecurityToken RefreshToken { get; set; }
        public string AccessToken { get; set; }
        public UserTokensModel(JwtSecurityToken refreshToken, string accessToken)
        {
            RefreshToken = refreshToken;
            AccessToken = accessToken;
        }

    }
}
