using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class Faturat
{ 
    [Key]
    public int IDRegjistrimit { get; set; }
    public DateTime? DataRegjistrimit { get; set; }
    public int? StafiID { get; set; }
    public decimal? TotaliPaTVSH { get; set; }
    public decimal? TVSH { get; set; }
    public int? IDPartneri { get; set; }
    public string? StatusiPageses { get; set; }
    public string? LlojiPageses { get; set; }
    public string? LlojiKalkulimit { get; set; }
    public string? NrFatures { get; set; }
    public string? StatusiKalkulimit { get; set; }
    public string? PershkrimShtese { get; set; }    
    public decimal? Rabati { get; set; }    
    public int? NrRendorFatures { get; set; }

    [ForeignKey(nameof(IDPartneri))]
    public virtual Partneri? Partneri { get; set; }
    [ForeignKey(nameof(StafiID))]
    public virtual Perdoruesi? Stafi { get; set; }
    public virtual ICollection<TeDhenatFaturat> TeDhenatFaturat { get; } = new List<TeDhenatFaturat>();
}
