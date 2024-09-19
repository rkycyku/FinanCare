using System.ComponentModel.DataAnnotations;

namespace FinanCareWebAPI.Models
{
    public class Bankat
    {
        [Key]
        public int BankaID { get; set; }
        public string? EmriBankes { get; set; }
        public string? LokacioniBankes { get; set; }
        public string? isDeleted { get; set; } = "false";
    }
}
