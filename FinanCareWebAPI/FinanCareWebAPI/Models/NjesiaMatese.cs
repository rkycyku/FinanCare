using System;
using System.Collections.Generic;

namespace FinanCareWebAPI.Models;

public partial class NjesiaMatese
{
    public int IdnjesiaMatese { get; set; }

    public string? NjesiaMatese1 { get; set; }

    public virtual ICollection<Produkti> Produktis { get; } = new List<Produkti>();
}
