using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class KalkulimiImallit
{
    public int IdRegjistrimit { get; set; }

    public DateTime? DataRegjistrimit { get; set; }

    public int? StafiId { get; set; }

    public decimal? TotaliPaTvsh { get; set; }

    public decimal? Tvsh { get; set; }

    public int? Idpartneri { get; set; }

    public string? StatusiPageses { get; set; }

    public string? LlojiPageses { get; set; }

    public virtual Partneri? IdpartneriNavigation { get; set; }

    public virtual Perdoruesi? Stafi { get; set; }

    public virtual ICollection<TeDhenatKalkulimit> TeDhenatKalkulimits { get; } = new List<TeDhenatKalkulimit>();
}
