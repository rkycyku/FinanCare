using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinanCareWebAPI.Models;

public partial class TeDhenatPerdoruesit
{
    [Key]
    public int UserID { get; set; }

    public string? NrKontaktit { get; set; }

    public string? Qyteti { get; set; }

    public int? ZipKodi { get; set; }

    public string? Adresa { get; set; }

    public string? Shteti { get; set; }

    [ForeignKey(nameof(UserID))]
    public virtual Perdoruesi User { get; set; }
}
