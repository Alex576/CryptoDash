using Microsoft.Extensions.DependencyInjection;
using Security.Core.Services;
using Security.Core.Services.Interfaces;

namespace Security.Core
{
    public static class SecurityServiceHelper
    {
        public static void InitializeServices(IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddSingleton<ITokenService, TokenService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ILoginService, LoginService>();
        }
    }
}
