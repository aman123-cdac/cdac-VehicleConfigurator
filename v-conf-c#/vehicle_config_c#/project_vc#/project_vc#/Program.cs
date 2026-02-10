using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using project_vc_.Data;
using project_vc_.Filter;
using project_vc_.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace project_vc_;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // -------------------- DB Context --------------------
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

        // -------------------- JWT / AUTH --------------------
        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

        var jwtKey = builder.Configuration["Jwt:Secret"] ?? "default_secret_key_long_enough";
        var key = Encoding.ASCII.GetBytes(jwtKey);

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                NameClaimType = "name",
                RoleClaimType = "role",
                ClockSkew = TimeSpan.FromMinutes(5)
            };

            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    if (context.Exception is SecurityTokenExpiredException)
                    {
                        context.Response.Headers.Add("Token-Expired", "true");
                    }
                    Console.WriteLine($"[JWT Auth Failed] {context.Exception.Message}");
                    return Task.CompletedTask;
                },
                OnTokenValidated = context =>
                {
                    Console.WriteLine("[JWT Token Validated]");
                    foreach (var claim in context.Principal?.Claims ?? Enumerable.Empty<Claim>())
                    {
                        Console.WriteLine($"  -> {claim.Type}: {claim.Value}");
                    }
                    return Task.CompletedTask;
                },
                OnMessageReceived = context =>
                {
                    var authHeader = context.Request.Headers["Authorization"].ToString();
                    Console.WriteLine($"[JWT Message Received] Authorization Header: {(string.IsNullOrEmpty(authHeader) ? "MISSING" : "PRESENT")}");
                    return Task.CompletedTask;
                }
            };
        })
        .AddCookie("ExternalCookie")
        .AddGoogle(google =>
        {
            google.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
            google.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
            google.SignInScheme = "ExternalCookie";
            google.CallbackPath = "/login/oauth2/code/google";
        })
        .AddFacebook(facebook =>
        {
            facebook.AppId = builder.Configuration["Authentication:Facebook:AppId"]!;
            facebook.AppSecret = builder.Configuration["Authentication:Facebook:AppSecret"]!;
            facebook.SignInScheme = "ExternalCookie";
            facebook.CallbackPath = "/login/oauth2/code/facebook";
        });

        // -------------------- APP SERVICES --------------------
        builder.Services.AddScoped<IJwtUtil, JwtUtil>();
        builder.Services.AddScoped<IEmailService, EmailService>();
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IVehicleService, VehicleService>();
        builder.Services.AddScoped<IInvoiceService, InvoiceService>();

        // -------------------- CONTROLLERS + LOGGING FILTER --------------------
        builder.Services.AddControllers(options =>
        {
            options.Filters.Add<ControllerActionLoggingFilter>();
        });

        // -------------------- SWAGGER --------------------
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Vehicle Configurator API",
                Version = "v1"
            });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "JWT Authorization header using Bearer scheme",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new List<string>()
                }
            });
        });

        // -------------------- CORS --------------------
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll", policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials();
            });
        });

        var app = builder.Build();

        // -------------------- DB INIT --------------------
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            db.Database.EnsureCreated();
        }

        // -------------------- MIDDLEWARE --------------------
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowAll");

        // Request debug logging
        app.Use(async (context, next) =>
        {
            var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
            var authHeader = context.Request.Headers["Authorization"].ToString();

            logger.LogInformation(
                "[Request] {Method} {Path} | Auth Header: {Auth}",
                context.Request.Method,
                context.Request.Path,
                string.IsNullOrEmpty(authHeader) ? "MISSING" : "PRESENT"
            );

            await next();
        });

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}