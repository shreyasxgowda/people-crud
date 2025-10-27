using CrudApi.Data;
using CrudApi.Services;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Fix the backend port to 5000 so the frontend can call it
builder.WebHost.UseUrls("http://localhost:5000");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
options.AddPolicy("AllowFrontend", policy =>
{
policy.WithOrigins("http://localhost:5173") // Vite dev server
.AllowAnyHeader()
.AllowAnyMethod();
});
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<IPersonService, PersonService>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();