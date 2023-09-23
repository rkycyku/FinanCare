using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class TeDhenatKalkulimit
{
    public int Id { get; set; }

    public int? IdRegjistrimit { get; set; }

    public int? IdProduktit { get; set; }

    public decimal? SasiaStokut { get; set; }

    public decimal? QmimiBleres { get; set; }

    public decimal? QmimiShites { get; set; }

    public decimal? QmimiShitesMeShumic {get; set;}

    public virtual Produkti? IdProduktitNavigation { get; set; }

    public virtual KalkulimiImallit? IdRegjistrimitNavigation { get; set; }
}
