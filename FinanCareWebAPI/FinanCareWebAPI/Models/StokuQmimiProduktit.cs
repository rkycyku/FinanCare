using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class StokuQmimiProduktit
{
    [Key]
    public int ProduktiID { get; set; }
    public decimal? SasiaNeStok { get; set; } = 0;
    public decimal? QmimiBleres { get; set; } = 0;
    public decimal? QmimiProduktit { get; set; } = 0;
    public DateTime? DataKrijimit { get; set; } = DateTime.Now;
    public DateTime? DataPerditsimit { get; set; } = DateTime.Now;
    public decimal? QmimiMeShumic { get; set; } = 0;

    [ForeignKey(nameof(ProduktiID))]
    public virtual Produkti? Produkti { get; set; }
}
