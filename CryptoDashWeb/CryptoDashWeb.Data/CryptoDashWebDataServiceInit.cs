using CryptoDashWeb.Data.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CryptoDashWeb.Data
{
    public static class CryptoDashWebDataServiceInit
    {
        public static void InitializeServices(IServiceCollection services)
        {
            services.AddScoped<LayoutContextService>();
            services.AddScoped<TileItemContextService>();
            services.AddScoped<ObjectContextService>();
            services.AddScoped<ClassContextService>();
            services.AddScoped<CoinHistoryContext>();
        }
    }
}
