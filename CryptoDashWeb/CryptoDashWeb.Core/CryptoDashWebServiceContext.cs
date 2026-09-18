using CryptoDashWeb.Core.Services;
using CryptoDashWeb.Core.Services.Interfaces;
using CryptoDashWeb.Data;
using Microsoft.Extensions.DependencyInjection;

namespace CryptoDashWeb.Core
{
    public static class CryptoDashWebServiceContext
    {
        public static void InitializeServices(IServiceCollection services)
        {
            CryptoDashWebDataServiceInit.InitializeServices(services);

            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<ISettingsService, SettingsService>();
        }
    }
}
