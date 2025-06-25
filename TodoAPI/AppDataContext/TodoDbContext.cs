using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;

namespace TodoAPI.AppDataContext
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Todo>()
                .ToTable("TodoAPI")
                .HasKey(x => x.Id);
        }
    }
}
