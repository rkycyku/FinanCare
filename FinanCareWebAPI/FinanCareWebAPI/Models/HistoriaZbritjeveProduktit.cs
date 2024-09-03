using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class HistoriaZbritjeveProduktit
{
    [Key]
    public int HistoriaZbritjesProduktitID { get; set; }
    public int ProduktiID { get; set; }
    public DateTime? DataZbritjes { get; set; } = DateTime.Now;
    public DateTime? DataSkadimit { get; set; } = DateTime.Now;
    public decimal? Rabati { get; set; } = 0;

    [ForeignKey(nameof(ProduktiID))]
    public virtual Produkti? Produkti { get; set; }
}
