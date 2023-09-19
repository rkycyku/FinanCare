using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class Porosit
{
    public int IdPorosia { get; set; }

    public decimal? TotaliPorosis { get; set; }

    public DateTime? DataPorosis { get; set; }

    public string? StatusiPorosis { get; set; }

    public int? Idpartneri { get; set; }

    public int? TotaliProdukteve { get; set; }

    public int? Idstafi { get; set; }

    public decimal? Rabati { get; set; }

    public decimal? ExtraRabati { get; set; }

    public decimal? ExtraRabati2 { get; set; }

    public string? LlojiPageses { get; set; }

    public string? Pagesa { get; set; }

    public virtual Partneri? IdpartneriNavigation { get; set; }

    public virtual Perdoruesi? IdstafiNavigation { get; set; }

    public virtual ICollection<TeDhenatEporosi> TeDhenatEporosis { get; } = new List<TeDhenatEporosi>();
}
