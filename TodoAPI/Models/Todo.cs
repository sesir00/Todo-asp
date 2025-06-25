using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoAPI.Models
{
    public class Todo
    {
        [Key]
        public Guid Id {get; set;}
        [Column(TypeName = "TEXT")]
        public string? Title { get; set; }
        [Column(TypeName = "TEXT")]
        public string? Description { get; set; }
        public bool? IsComplete {get; set;}
        public DateTime? DueDate {get; set;}
        public int? Priority {get; set;}
        public DateTime? CreatedAt {get; set;}
        public DateTime? UpdatedAt {get; set;}

        public Todo()
        {
            IsComplete = false;
        }
    }
}