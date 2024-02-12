using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class TeDhenatEPorosis
{
    [Key]
    public int IDDetajet { get; set; }
    public decimal? Rabati { get; set; }
    public int? SasiaPorositur { get; set; }
    public int? IDPorosia { get; set; }
    public int? IDProdukti { get; set; }
    public decimal? QmimiProduktit { get; set; }

    [ForeignKey(nameof(IDPorosia))]
    public virtual Porosit? Porosit { get; set; }
    [ForeignKey(nameof(IDProdukti))]
    public virtual Produkti? Produkti { get; set; }
}
