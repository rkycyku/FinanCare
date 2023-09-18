using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class Perdoruesi
{
    public int UserId { get; set; }

    public string? Emri { get; set; }

    public string? Mbiemri { get; set; }

    public string? Email { get; set; }

    public string? Username { get; set; }

    public string AspNetUserId { get; set; } = null!;

    public virtual ICollection<KalkulimiImallit> KalkulimiImallits { get; } = new List<KalkulimiImallit>();

    public virtual ICollection<Porosit> Porosits { get; } = new List<Porosit>();

    public virtual TeDhenatPerdoruesit? TeDhenatPerdoruesit { get; set; }
}
