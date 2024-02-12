using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class TeDhenatFaturat
{
    [Key]
    public int ID { get; set; }
    public int? IDRegjistrimit { get; set; }
    public int? IDProduktit { get; set; }
    public decimal? SasiaStokut { get; set; }
    public decimal? QmimiBleres { get; set; }
    public decimal? QmimiShites { get; set; }
    public decimal? QmimiShitesMeShumic {get; set;}
    public decimal? Rabati1 { get; set; }
    public decimal? Rabati2 { get; set; }
    public decimal? Rabati3 { get; set; }

    [ForeignKey(nameof(IDProduktit))]
    public virtual Produkti? Produkti { get; set; }
    [ForeignKey(nameof(IDRegjistrimit))]
    public virtual Faturat? Faturat { get; set; }
}
