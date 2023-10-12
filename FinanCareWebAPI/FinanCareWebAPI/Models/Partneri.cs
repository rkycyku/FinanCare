using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class Partneri
{
    public int Idpartneri { get; set; }

    public string? EmriBiznesit { get; set; }

    public string? Nui { get; set; }

    public string? Nrf { get; set; }

    public string? Tvsh { get; set; }

    public string? Email { get; set; }

    public string? Adresa { get; set; }

    public string? NrKontaktit { get; set; }

    public string? LlojiPartnerit { get; set; }

    public string? ShkurtesaPartnerit { get; set; }

    public virtual ICollection<Faturat> Faturats { get; } = new List<Faturat>();

    public virtual ICollection<Porosit> Porosits { get; } = new List<Porosit>();

    public virtual ICollection<Produkti> Produktis { get; } = new List<Produkti>();
}
