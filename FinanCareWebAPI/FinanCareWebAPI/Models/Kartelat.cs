using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class Kartelat
{
    [Key]
    public int IDKartela { get; set; }
    public string? KodiKartela { get; set; }
    public string? LlojiKarteles { get; set; } = "Bonus";
    public decimal? Rabati { get; set; } = 0;
    public int? StafiID { get; set; }
    public int? PartneriID { get; set; }
    public DateTime? DataKrijimit { get; set; } = DateTime.Now;

    [ForeignKey(nameof(StafiID))]
    public virtual Perdoruesi? Stafi { get; set; }

    [ForeignKey(nameof(PartneriID))]
    public virtual Partneri? Partneri { get; set; }
}
