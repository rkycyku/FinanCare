using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Policy;

namespace WebAPI.Auth
{
    public class RegisterModel
    {
        [Required(ErrorMessage = " Name is required")]
        public string Name { get; set; }
        [Required(ErrorMessage = " Name is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        public string? NrTelefonit { get; set; }
        public string? Adresa { get; set; }
        public string? EmailPrivat { get; set; }
        public DateTime? Datelindja { get; set; }
        public DateTime? DataFillimitKontrates { get; set; }
        public DateTime? DataMbarimitKontrates { get; set; }
        public decimal? Paga { get; set; }
        public string? Profesioni { get; set; }
        public string? Specializimi { get; set; }
        public string? Kualifikimi { get; set; }
        public int? BankaID { get; set; }
        public string? NumriLlogarisBankare { get; set; }
        public string? NrPersonal { get; set; }
        public string? EshtePuntorAktive { get; set; }
        public string? Roli { get; set; }
    }
}
