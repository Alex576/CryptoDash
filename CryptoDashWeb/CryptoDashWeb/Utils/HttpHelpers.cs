using CryptoDashWeb.Core.Utils;
using System.Diagnostics.CodeAnalysis;

namespace CryptoDashWeb.Utils
{
    public static class HttpHelpers
    {
        public static bool TryGetAccessToken(HttpContext context, [NotNullWhen(true)] out string? accessToken)
        {
            if (!context.Request.Headers.TryGetValue("Authorization", out var authHeaders)
                 || !authHeaders.TryGetValue(x => !string.IsNullOrEmpty(x) && x.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase), out var bearer))
            {
                accessToken = default;
                return false;
            }
            accessToken = bearer.Substring("Bearer ".Length).Trim();
            return !string.IsNullOrEmpty(accessToken);
        }
    }
}
