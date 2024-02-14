using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanCareWebAPI.Migrations;
using FinanCareWebAPI.Models;
using Microsoft.IdentityModel.Tokens;

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
            var teDhenat = _context.TeDhenatBiznesit.First();

            return Ok(teDhenat);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("perditesoTeDhenat")]
        public IActionResult Put([FromBody] TeDhenatBiznesit k)
        {
            var teDhenat = _context.TeDhenatBiznesit.FirstOrDefault(x => x.IDTeDhenatBiznesit == 1);
            if (teDhenat == null)
            {
                return BadRequest("Kategoria nuk egziston");
            }

            teDhenat.NrKontaktit = k.NrKontaktit;
            teDhenat.NF = k.NF;
            teDhenat.NUI = k.NUI;
            teDhenat.Email = k.Email;
            teDhenat.EmriIBiznesit  = k.EmriIBiznesit;
            teDhenat.ShkurtesaEmritBiznesit = k.ShkurtesaEmritBiznesit;
            teDhenat.NrTVSH = k.NrTVSH;
            teDhenat.Adresa = k.Adresa;
            teDhenat.Logo = k.Logo;

            _context.SaveChanges();

            return Ok(teDhenat);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("ShfaqBankat")]
        public async Task<IActionResult> ShfaqBankat()
        {
            var bankat = await _context.Bankat.OrderBy(x => x.EmriBankes).ToListAsync();

            return Ok(bankat);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("ShfaqBankenNgaID")]
        public async Task<IActionResult> ShfaqBankenNgaID(int id)
        {
            var bankaNgaID = await _context.Bankat
                .Where(x => x.BankaID == id).ToListAsync();

            if(bankaNgaID == null)
            {
                return BadRequest("Banka nuk Egziston");
            }

            return Ok(bankaNgaID);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("ShtoBanken")]
        public async Task<IActionResult> ShtoBanken(Bankat banka)
        {
            await _context.Bankat.AddAsync(banka);
            await _context.SaveChangesAsync();

            return CreatedAtAction("get", banka.BankaID, banka);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpDelete]
        [Route("FshijBanken")]
        public async Task<IActionResult> FshijBanken(int id)
        {
            var banka = await _context.Bankat.FirstOrDefaultAsync(x => x.BankaID == id);

            if (banka == null)
            {
                return BadRequest("Banka nuk egziston!");
            }

            _context.Bankat.Remove(banka);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("PerditesoBanken")]
        public async Task<IActionResult> PerditesoBanken(int id, [FromBody] Bankat b)
        {
            var banka = _context.Bankat.FirstOrDefault(x => x.BankaID == id);
            if (banka == null)
            {
                return BadRequest("Banka nuk egziston");
            }

            if (!b.EmriBankes.IsNullOrEmpty())
            {
                banka.EmriBankes = b.EmriBankes;
            }
            if (!b.Valuta.IsNullOrEmpty())
            {
                banka.Valuta = b.Valuta;
            }
            if (!b.AdresaBankes.IsNullOrEmpty())
            {
                banka.AdresaBankes = b.AdresaBankes;
            }
            if (!b.NumriLlogaris.IsNullOrEmpty())
            {
                banka.NumriLlogaris = b.NumriLlogaris;
            }

            _context.Bankat.Update(banka);
            await _context.SaveChangesAsync();

            return Ok(banka);
        }
    }
}
