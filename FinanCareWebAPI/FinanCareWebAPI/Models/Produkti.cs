using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class Produkti
{
    public int ProduktiId { get; set; }

    public string? EmriProduktit { get; set; }

    public int? Idpartneri { get; set; }

    public int? IdnjesiaMatese { get; set; }

    public string? Barkodi { get; set; }

    public string? KodiProduktit { get; set; }

    public int? LlojiTVSH { get; set; }
    public int? IdgrupiProdukti { get; set; }
    
    public decimal? SasiaShumices { get; set; }

    public virtual NjesiaMatese? IdnjesiaMateseNavigation { get; set; }

    public virtual Partneri? IdpartneriNavigation { get; set; }
    public virtual GrupiProduktit? IdgrupiProduktitNavigation { get; set; }

    public virtual StokuQmimiProduktit? StokuQmimiProduktit { get; set; }

    public virtual ICollection<TeDhenatEporosi> TeDhenatEporosis { get; } = new List<TeDhenatEporosi>();

    public virtual ICollection<TeDhenatKalkulimit> TeDhenatKalkulimits { get; } = new List<TeDhenatKalkulimit>();

    public virtual ZbritjaQmimitProduktit? ZbritjaQmimitProduktit { get; set; }
    
}
