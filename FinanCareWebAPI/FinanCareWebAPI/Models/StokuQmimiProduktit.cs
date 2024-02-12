using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class StokuQmimiProduktit
{
    [Key]
    public int ProduktiID { get; set; }
    public decimal? SasiaNeStok { get; set; }
    public decimal? QmimiBleres { get; set; }
    public decimal? QmimiProduktit { get; set; }
    public DateTime? DataKrijimit { get; set; }
    public DateTime? DataPerditsimit { get; set; }
    public decimal? QmimiMeShumic { get; set; }

    [ForeignKey(nameof(ProduktiID))]
    public virtual Produkti? Produkti { get; set; }
}
