using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class Porosit
{
    [Key]
    public int IDPorosia { get; set; }
    public decimal? TotaliPorosis { get; set; }
    public DateTime? DataPorosis { get; set; }
    public string? StatusiPorosis { get; set; }
    public int? IDPartneri { get; set; }
    public int? TotaliProdukteve { get; set; }
    public int? IDStafi { get; set; }
    public decimal? Rabati { get; set; }
    public decimal? ExtraRabati { get; set; }
    public decimal? ExtraRabati2 { get; set; }
    public string? LlojiPageses { get; set; }
    public string? Pagesa { get; set; }

    [ForeignKey(nameof(IDPartneri))]
    public virtual Partneri? Partneri { get; set; }
    [ForeignKey(nameof(IDStafi))]
    public virtual Perdoruesi? Stafi { get; set; }
    public virtual ICollection<TeDhenatEPorosis> TeDhenatEPorosis { get; } = new List<TeDhenatEPorosis>();
}
