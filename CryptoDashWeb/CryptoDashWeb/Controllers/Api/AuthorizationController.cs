using CryptoDashWeb.Models;
using CryptoDashWeb.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Security.Core.Services.Interfaces;

namespace CryptoDashWeb.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthService _authorizationService;

        public AuthorizationController(IAuthService authorizationService)
        {
            _authorizationService = authorizationService;
        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken()
        {
            if (!Request.Cookies.TryGetValue(CookieKeys.RefreshToken, out var refreshToken) || !HttpHelpers.TryGetAccessToken(Request.HttpContext, out var accessToken))
                return BadRequest();

            var token = await _authorizationService.TryRefreshToken(accessToken, refreshToken);
            if (token == null)
                return BadRequest();
            return Ok(new RefreshTokenModel() { AccessToken = token });
        }
    }
}
