using System.ComponentModel.DataAnnotations;

namespace FinanCareWebAPI.Models
{
    public class Bankat
    {
        [Key]
        public int BankaID { get; set; }
        public string? EmriBankes { get; set; }
        public string? NumriLlogaris { get; set; }
        public string? AdresaBankes { get; set; }
        public string? Valuta { get; set; }
    }
}
