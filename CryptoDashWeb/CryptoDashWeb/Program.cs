using CryptoDashWeb.Core;
using CryptoDashWeb.Core.Models.Coingecko;
using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Middlewares;
using CryptoDashWeb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NLog;
using NLog.Web;
using Security.Core;
using Security.Core.Models;
using Security.Data.DBContext;
using StackExchange.Redis;

public partial class Program
{
    private static void Main(string[] args)
    {

        var logger = LogManager.Setup().LoadConfigurationFromAppSettings().GetCurrentClassLogger();

        try
        {
            InitializeApplication(logger, args);
        }
        catch (Exception ex)
        {
            logger.Error(ex, "Failed to start application");
            throw;
        }
        finally
        {
            LogManager.Shutdown();
        }
    }

    private static void InitializeApplication(Logger logger, string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        //builder.Logging.ClearProviders();
        builder.Host.UseNLog();
        builder.Services.AddMemoryCache();
        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddProblemDetails();
        builder.Services.AddControllers().AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
            options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
        });

        var isInDocker = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";


        var dbConnection = isInDocker ? builder.Configuration.GetConnectionString("DockerConnection") : builder.Configuration.GetConnectionString("DefaultConnection");
        var redisConnection = isInDocker ? builder.Configuration.GetConnectionString("RedisDockerConnection") : builder.Configuration.GetConnectionString("RedisDefaultConnection");

        builder.Services.AddDbContext<CryptoDashContext>(options => SetDbOptions(options, dbConnection, "dbo"));
        builder.Services.AddDbContext<SecurityContext>(options => SetDbOptions(options, dbConnection, "sc"));

        var jwtConfig = builder.Configuration.GetSection("JWT").Get<JWTModel>() ?? new JWTModel();
        //builder.Services.AddStackExchangeRedisCache(options =>
        //{
        //    options.Configuration = redisConnection;
        //    options.InstanceName = "UserNotifications_";
        //});
        if (string.IsNullOrEmpty(redisConnection))
            throw new InvalidOperationException("Redis connection string is empty");

        builder.Services.AddSingleton<IConnectionMultiplexer>(options => ConnectionMultiplexer.Connect(redisConnection));
        builder.Services.Configure<ConfigModel>(builder.Configuration.GetSection("Config"));
        builder.Services.Configure<JWTModel>(builder.Configuration.GetSection("JWT"));
        builder.Services.Configure<CoingeckoModel>(builder.Configuration.GetSection("Coingecko"));

        builder.Services.AddSingleton<IJWTOptions>(s => s.GetRequiredService<IOptions<JWTModel>>().Value);
        CryptoDashWebServiceContext.InitializeServices(builder.Services);
        SecurityServiceHelper.InitializeServices(builder.Services);


        var app = builder.Build();


        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors((options) =>
        {
            options.WithOrigins("http://localhost:5173", "https://localhost:5173", "http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        });


        app.UseAuthentication();
        app.UseAuthorization();

        app.UseMiddleware<AuthMiddleware>();

        app.MapControllerRoute(
          name: "default",
          pattern: "{controller}/{action=Index}/{id?}");

        app.Run();
    }

    private static void SetDbOptions(DbContextOptionsBuilder options, string? connection, string scheme)
    {

        options.UseLazyLoadingProxies();
        options.UseNpgsql(connection, x =>
        {
            x.MigrationsHistoryTable("__IdentityMigrationHistory", scheme);
            x.EnableRetryOnFailure();
        }).UseSnakeCaseNamingConvention();
    }
}