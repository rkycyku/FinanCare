using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class LlogaritEBiznesit
{
    [Key]
    public int IDLlogariaBankare { get; set; }
    public string? NumriLlogaris { get; set; }
    public string? AdresaBankes { get; set; }
    public string? Valuta { get; set; }
    public int BankaID { get; set; }
    [ForeignKey(nameof(BankaID))]
    public virtual Bankat? Banka { get; set; }
}
