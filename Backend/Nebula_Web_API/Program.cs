//using Microsoft.Extensions.Options;
//using MongoDB.Driver;
//using Nebula_Web_API.Models;
//using Nebula_Web_API.Services;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.Configure<UserDatabaseSettings>(
//    builder.Configuration.GetSection(nameof(UserDatabaseSettings)));

//builder.Services.AddSingleton<IUserDatabaseSettings>(sp => 
//    sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);

//builder.Services.AddSingleton<IMongoClient>(s =>
//    new MongoClient(builder.Configuration.GetValue<string>("UserDatabaseSettings:ConnectionString")));

//builder.Services.AddScoped<IUserService, UserService>();

////-----------------------------------------------------------

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

//app.Run();


////Add Cors 

//// Add services to the container.
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowLocalhost",
//        builder =>
//        {
//            builder.WithOrigins("http://localhost:5173")
//                   .AllowAnyHeader()
//                   .AllowAnyMethod()
//                   .AllowCredentials();
//        });
//});

//builder.Services.AddControllers();

//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Error");
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();
//app.UseRouting();

//app.UseCors("AllowLocalhost"); // Use the CORS policy

//app.UseAuthorization();

//app.MapControllers();

//app.Run();


using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Nebula_Web_API.Models;
using Nebula_Web_API.Services;


// Import regarding jwt tocken
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;


var builder = WebApplication.CreateBuilder(args);


// Regarding JWT token
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(Options =>
{
    Options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
//----------------------------------------

// Add services to the container.
builder.Services.Configure<UserDatabaseSettings>(
    builder.Configuration.GetSection(nameof(UserDatabaseSettings)));

builder.Services.AddSingleton<IUserDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);

builder.Services.Configure<ISmtpSettings>(
    builder.Configuration.GetSection(nameof(SmtpSettings)));

builder.Services.AddSingleton<ISmtpSettings>(sp =>
    sp.GetRequiredService<IOptions<SmtpSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
    new MongoClient(builder.Configuration.GetValue<string>("UserDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<IUserService, UserService>();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowLocalhost"); // Use the CORS policy


app.UseAuthentication(); // For Jwt token regarding
app.UseAuthorization();

app.MapControllers();

app.Run();

