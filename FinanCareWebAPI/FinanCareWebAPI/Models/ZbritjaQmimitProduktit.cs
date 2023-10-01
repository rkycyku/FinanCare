using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class ZbritjaQmimitProduktit
{
    public int ProduktiId { get; set; }

    public DateTime? DataZbritjes { get; set; }

    public DateTime? DataSkadimit { get; set; }

    public decimal? Rabati { get; set; }

    public virtual Produkti? Produkti { get; set; }
}
