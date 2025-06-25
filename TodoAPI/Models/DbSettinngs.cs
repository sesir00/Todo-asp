namespace TodoAPI.Models
{
    public class DbSettings
    {
         public string Provider { get; set; }           // e.g. "Sqlite" or "SqlServer"
        public string? ConnectionString { get; set; }
    }
}