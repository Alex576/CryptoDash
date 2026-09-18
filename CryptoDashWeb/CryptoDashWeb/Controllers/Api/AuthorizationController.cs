using CryptoDashWeb.Models;
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

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<IActionResult> RefreshToken(RefreshTokenModel model)
        {
            if (!Request.Cookies.TryGetValue(CookieKeys.RefreshToken, out var refreshToken))
                return BadRequest();

            var token = await _authorizationService.TryRefreshToken(model.AccessToken, refreshToken);
            if (token == null)
                return BadRequest();
            return Ok(new RefreshTokenModel() { AccessToken = token });
        }
    }
}
