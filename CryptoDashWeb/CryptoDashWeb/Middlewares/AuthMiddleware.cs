using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Utils;
using Microsoft.AspNetCore.Authorization;
using Security.Core.Services.Interfaces;

namespace CryptoDashWeb.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ITokenService tokenService, ISessionService sessionService)
        {
            if (context.GetEndpoint()?.Metadata.GetMetadata<IAllowAnonymous>() != null)
            {
                await _next(context);
                return;
            }

            if (!HttpHelpers.TryGetAccessToken(context, out var accessToken)
                || !await tokenService.ValidateAccessToken(accessToken)
                || !(context.Request.Headers.TryGetValue("UserId", out var userId) && int.TryParse(userId, out var userIdInt)))
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }
            sessionService.CurrentUser = userIdInt;

            await _next(context);
        }
    }
}
