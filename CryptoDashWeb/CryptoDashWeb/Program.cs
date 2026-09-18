using CryptoDashWeb.Core;
using CryptoDashWeb.Data.DBContext;
using CryptoDashWeb.Middlewares;
using CryptoDashWeb.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NLog;
using NLog.Web;
using Security.Core;
using Security.Core.Models;
using Security.Data.DBContext;
using System.Text;

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
        });

        var isInDocker = Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";


        var connection = isInDocker ? builder.Configuration.GetConnectionString("DockerConnection") : builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<CryptoDashContext>(options => SetDbOptions(options, connection, "dbo"));
        builder.Services.AddDbContext<SecurityContext>(options => SetDbOptions(options, connection, "sc"));

        var jwtConfig = builder.Configuration.GetSection("JWT").Get<JWTModel>() ?? new JWTModel();
        //var kafkaOptions = builder.Configuration.GetSection("Kafka").Get<KafkaModel>() ?? new();
        //if (string.IsNullOrEmpty(kafkaOptions.BootstrapServer) || string.IsNullOrEmpty(kafkaOptions.Topic))
        //    logger.Error("Kafka configuration is empty!");

        builder.Services.Configure<ConfigModel>(builder.Configuration.GetSection("Config"));
        builder.Services.Configure<JWTModel>(builder.Configuration.GetSection("JWT"));
        //builder.Services.Configure<KafkaModel>(builder.Configuration.GetSection("Kafka"));

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtConfig.Issuer,
                    ValidateAudience = true,
                    ValidAudience = jwtConfig.Audience,
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfig.SecretKey)),
                    ValidateIssuerSigningKey = true,
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var token = context.Request.Headers["Authorization"];
                        // Здесь удобно смотреть, пришел ли токен вообще
                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        // А здесь можно поймать причину, почему токен отклонен (истек, кривой ключ и т.д.)
                        Console.WriteLine("Ошибка: " + context.Exception.Message);
                        return Task.CompletedTask;
                    },
                    OnForbidden = context =>
                    {
                        return Task.CompletedTask;
                    }
                };
            });

        builder.Services.AddAuthorization(options =>
        {
            options.FallbackPolicy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();
        });
        builder.Services.AddSingleton<IJWTOptions>(s => s.GetRequiredService<IOptions<JWTModel>>().Value);
        //var producerConfig = new ProducerConfig()
        //{
        //    BootstrapServers = kafkaOptions.BootstrapServer, //"localhost:9092",
        //    SocketTimeoutMs = 5000,
        //    MessageTimeoutMs = 5000
        //};

        //builder.Services.AddSingleton<IProducer<Null, SendKafkaFileModel>>(sp =>
        //    new ProducerBuilder<Null, SendKafkaFileModel>(producerConfig)
        //        .SetValueSerializer(new KafkaNewtonsoftSerDes<SendKafkaFileModel>())
        //        .Build());
        //builder.Services.AddSingleton<KafkaFileConvertProducer>();

        //builder.Services.AddHostedService<KafkaMissedFilesProducer>();
        //builder.Services.AddHostedService<KafkaConsumerService>();

        CryptoDashWebServiceContext.InitializeServices(builder.Services);
        SecurityServiceHelper.InitializeServices(builder.Services);


        var app = builder.Build();


        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseCors((options) =>
        {
            options.WithOrigins("http://localhost:5173", "https://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        });


        app.UseAuthentication();
        app.UseAuthorization();

        app.UseMiddleware<UserProtectionMiddleware>();

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