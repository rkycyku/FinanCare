using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.Entity;
using FinanCareWebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("/api/[controller]")]
    public class TeDhenatBiznesitController : Controller
    {
        private readonly FinanCareDbContext _context;

        public TeDhenatBiznesitController(FinanCareDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShfaqTeDhenat")]
        public IActionResult Get()
        {
            var teDhenat = _context.TeDhenatBiznesits.First();

            return Ok(teDhenat);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("perditesoTeDhenat")]
        public IActionResult Put([FromBody] TeDhenatBiznesit k)
        {
            var teDhenat = _context.TeDhenatBiznesits.FirstOrDefault(x => x.IdteDhenatBiznesit == 1);
            if (teDhenat == null)
            {
                return BadRequest("Kategoria nuk egziston");
            }

            teDhenat.NrKontaktit = k.NrKontaktit;
            teDhenat.Nf = k.Nf;
            teDhenat.Nui = k.Nui;
            teDhenat.Email = k.Email;
            teDhenat.EmriIbiznesit  = k.EmriIbiznesit;
            teDhenat.ShkurtesaEmritBiznesit = k.ShkurtesaEmritBiznesit;
            teDhenat.Nrtvsh = k.Nrtvsh;
            teDhenat.Adresa = k.Adresa;
            teDhenat.Logo = k.Logo;

            _context.SaveChanges();

            return Ok(teDhenat);
        }
    }
}
