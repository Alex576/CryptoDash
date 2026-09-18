using Microsoft.EntityFrameworkCore;
using Security.Core.Services.Interfaces;
using Security.Data.DBContext;

namespace Security.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly SecurityContext m_SecurityContext;
        private readonly ITokenService m_TokenService;

        public AuthService(SecurityContext securityContext, ITokenService tokenService)
        {
            m_SecurityContext = securityContext;
            m_TokenService = tokenService;
        }

        public async Task<string?> TryRefreshToken(string accessToken, string refreshToken)
        {
            if (!(await m_TokenService.ValidateRefreshToken(refreshToken)))
                return null;
            var user = await m_SecurityContext.Users.FirstOrDefaultAsync(x => !string.IsNullOrEmpty(x.RefreshToken) && x.RefreshToken.Equals(refreshToken));
            if (user == null)
                return null;

            return m_TokenService.GenerateAccessToken(user);
        }
    }
}
