namespace FinanCareWebAPI.Models
{
    public partial class GrupiProduktit
    {
        public int IDGrupiProduktit { get; set; }
        public string GrupiIProduktit { get; set; }

        public virtual ICollection<Produkti> Produktis { get; } = new List<Produkti>();
    }
}
