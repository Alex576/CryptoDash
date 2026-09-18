using CryptoDashWeb.Core.Models.OperationResult;
using CryptoDashWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Security.Core.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;

namespace CryptoDashWeb.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public AuthenticationController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<OperationResultData<LoginResult>> Register(RegisterModel model)
        {
            ArgumentNullException.ThrowIfNull(model.Login);
            ArgumentNullException.ThrowIfNull(model.Password);

            var (userModel, tokens) = await _loginService.Register(model.Login, model.Password);
            if (userModel == null || tokens == null)
                return new OperationResultData<LoginResult>(null, ResultCode.Error, "Failed to register");

            Response.Cookies.Append(CookieKeys.RefreshToken, new JwtSecurityTokenHandler().WriteToken(tokens.RefreshToken), new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = tokens.RefreshToken.ValidTo
            });

            return new OperationResultData<LoginResult>(
                new LoginResult()
                {
                    Id = userModel.Id,
                    Email = userModel.Email,
                    AccessToken = tokens.AccessToken
                },
                ResultCode.Success,
                "Register success");
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<OperationResultData<LoginResult>> Login(LoginModel model)
        {
            ArgumentNullException.ThrowIfNull(model.Login);
            ArgumentNullException.ThrowIfNull(model.Password);

            var (userModel, tokens) = await _loginService.Login(model.Login, model.Password);

            if (userModel == null || tokens == null)
                return new OperationResultData<LoginResult>(null, ResultCode.Error, "Failed to login");

            Response.Cookies.Append(CookieKeys.RefreshToken, new JwtSecurityTokenHandler().WriteToken(tokens.RefreshToken), new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = tokens.RefreshToken.ValidTo
            });

            return new OperationResultData<LoginResult>(
                new LoginResult()
                {
                    Id = userModel.Id,
                    Email = userModel.Email,
                    AccessToken = tokens.AccessToken
                },
                ResultCode.Success,
                "Login success");
        }

        [HttpPost("[action]")]
        public async Task Logout(LogoutModel model)
        {
            await _loginService.Logout(model.Id);
            Response.Cookies.Delete(CookieKeys.RefreshToken);
        }
    }
}
