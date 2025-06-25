using Microsoft.EntityFrameworkCore;
using TodoAPI.AppDataContext;
using TodoAPI.Interface;
using TodoAPI.Middleware;
using TodoAPI.Models;
using TodoAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// --- CORS Configuration START ---
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; // Define a policy name

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173") // Allow your React app's origin
                                .AllowAnyHeader()  // Allows any header in the request
                                .AllowAnyMethod(); // Allows GET, POST, PUT, DELETE etc.
                      });
});
// --- CORS Configuration END ---

//Add services to the container
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());  


 // Add  This to in the Program.cs file
builder.Services.Configure<DbSettings>(builder.Configuration.GetSection("DbSettings"));
// builder.Services.AddScoped<TodoDbContext>(); 
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddExceptionHandler<GlobalExceptionHandler>(); 

builder.Services.AddProblemDetails();  

// Registers ITodoServices with TodoService as its implementation in the dependency injection container, 
// using scoped lifetime (a new instance is created per HTTP request).
builder.Services.AddScoped<ITodoServices, TodoServices>();

// Adding of login 
builder.Services.AddLogging();

var app = builder.Build();

{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider;
}

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins); // ⬅️ Add this to enable your CORS policy

app.UseAuthorization();

app.MapControllers();

app.Run();