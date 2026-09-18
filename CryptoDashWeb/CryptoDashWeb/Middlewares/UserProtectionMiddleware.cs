using CryptoDashWeb.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace CryptoDashWeb.Middlewares
{
    public class UserProtectionMiddleware
    {
        private readonly RequestDelegate _next;

        public UserProtectionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, ISessionService sessionService)
        {

            if (context.Request.Headers.TryGetValue("UserId", out var userId) && int.TryParse(userId, out var userIdInt))
            {
                sessionService.CurrentUser = userIdInt;
            }
            else if (context.GetEndpoint()?.Metadata.GetMetadata<IAllowAnonymous>() == null)
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return;
            }
            await _next(context);
        }
    }
}