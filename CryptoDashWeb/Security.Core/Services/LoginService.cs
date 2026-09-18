using Security.Core.Models;
using Security.Core.Services.Interfaces;
using Security.Data.DBModels;
using System.IdentityModel.Tokens.Jwt;

namespace Security.Core.Services
{
    public class LoginService : ILoginService
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public LoginService(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        public async Task<(UserModel? userModel, UserTokensModel? tokens)> Login(string login, string password)
        {
            var user = await _userService.GetUser(login, password);

            if (user == null)
                return (null, null);

            var refreshToken = await UpdateRefreshToken(user);
            return (new UserModel(user), new(refreshToken, GenerateAccessToken(user)));
        }

        public async Task Logout(int id)
        {
            await _userService.UpdateUser(id, x => x.SetProperty(p => p.RefreshToken, v => null));
        }

        public async Task<(UserModel? userModel, UserTokensModel? tokens)> Register(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                return (null, null);

            var user = new UserModel(login, login)
            {
                OptionJson = new()
            };
            var result = await _userService.AddUser(user, password);
            return (result, new(_tokenService.GenerateRefreshToken(result), GenerateAccessToken(user)));
        }

        private string GenerateAccessToken(User user) => _tokenService.GenerateAccessToken(user);
        private string GenerateAccessToken(UserModel user) => _tokenService.GenerateAccessToken(user);
        private async Task<JwtSecurityToken> UpdateRefreshToken(User user)
        {
            var jwt = _tokenService.GenerateRefreshToken(user);
            await _userService.SetUserToken(user, new JwtSecurityTokenHandler().WriteToken(jwt));
            return jwt;
        }
    }
}
