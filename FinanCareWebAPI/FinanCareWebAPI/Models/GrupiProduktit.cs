using System.ComponentModel.DataAnnotations;

namespace FinanCareWebAPI.Models
{
    public partial class GrupiProduktit
    {
        [Key]
        public int IDGrupiProduktit { get; set; }
        public string GrupiIProduktit { get; set; }

        public virtual ICollection<Produkti> Produkti { get; } = new List<Produkti>();
    }
}
