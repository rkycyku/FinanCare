using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinanCareWebAPI.Models;

public partial class NjesiaMatese
{
    [Key]
    public int IDNjesiaMatese { get; set; }

    public string? EmriNjesiaMatese { get; set; }

    public string? isDeleted { get; set; } = "false";

    public virtual ICollection<Produkti> Produkti { get; } = new List<Produkti>();
}
