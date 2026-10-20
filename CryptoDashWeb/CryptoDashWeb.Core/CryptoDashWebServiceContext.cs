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
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<ICoingeckoService, CoingeckoService>();
            services.AddScoped<IUserSettingsService, UserSettingsService>();
            services.AddScoped<IUserPreviewLayout, UserPreviewLayout>();
            services.AddSingleton<IUserSettingsStoreService, UserSettingsStoreService>();
        }
    }
}
