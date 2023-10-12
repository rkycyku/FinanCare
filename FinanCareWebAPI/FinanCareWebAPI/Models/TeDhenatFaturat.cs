using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class TeDhenatFaturat
{
    public int Id { get; set; }

    public int? IdRegjistrimit { get; set; }

    public int? IdProduktit { get; set; }

    public decimal? SasiaStokut { get; set; }

    public decimal? QmimiBleres { get; set; }

    public decimal? QmimiShites { get; set; }

    public decimal? QmimiShitesMeShumic {get; set;}
    public decimal? Rabati1 { get; set; }
    public decimal? Rabati2 { get; set; }
    public decimal? Rabati3 { get; set; }

    public virtual Produkti? IdProduktitNavigation { get; set; }

    public virtual Faturat? IdRegjistrimitNavigation { get; set; }
}
