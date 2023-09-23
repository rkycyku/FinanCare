using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FinanCareWebAPI.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace TechStoreWebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class ProduktiController : Controller
    {
        private readonly FinanCareDbContext _context;

        public ProduktiController(FinanCareDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Products")]
        public async Task<ActionResult> Get()
        {

            var Produkti = await _context.Produktis
                .OrderByDescending(x => x.StokuQmimiProduktit.SasiaNeStok)
                .ThenByDescending(x => x.ProduktiId)
               .Select(x => new {
                   x.ProduktiId,
                   x.EmriProduktit,
                   x.Idpartneri,
                   x.IdnjesiaMatese,
                   x.Barkodi,
                   x.KodiProduktit,
                   x.LlojiTVSH,
                   x.StokuQmimiProduktit.SasiaNeStok,
                   x.StokuQmimiProduktit.QmimiProduktit,
                   x.StokuQmimiProduktit.QmimiBleres,
                   x.StokuQmimiProduktit.QmimiMeShumic,
                   x.ZbritjaQmimitProduktit.Rabati
               })
               .ToListAsync();

            return Ok(Produkti);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ProduktetPerKalkulim")]
        public async Task<ActionResult> ProduktetPerKalkulim()
        {

            var Produkti = await _context.Produktis
               .OrderBy(x => x.StokuQmimiProduktit.SasiaNeStok)
               .ThenByDescending(x => x.ProduktiId)
               .Select(p => new {
                   p.ProduktiId,
                   p.EmriProduktit,
                   p.Idpartneri,
                   p.IdpartneriNavigation.EmriBiznesit,
                   p.IdnjesiaMatese,
                   p.IdnjesiaMateseNavigation.NjesiaMatese1,
                   p.Barkodi,
                   p.KodiProduktit,
                   p.LlojiTVSH,
                   p.StokuQmimiProduktit.SasiaNeStok,
                   p.StokuQmimiProduktit.QmimiProduktit,
                   p.StokuQmimiProduktit.QmimiBleres,
                   p.StokuQmimiProduktit.QmimiMeShumic,
                   p.ZbritjaQmimitProduktit.Rabati,
               })
               .ToListAsync();

            return Ok(Produkti);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var produkti = await _context.Produktis
                .Include(p => p.IdpartneriNavigation)
                .Include(p => p.IdnjesiaMateseNavigation)
                .Include(p => p.StokuQmimiProduktit)
                .Where(p => p.ProduktiId == id)
                .Select(p => new {
                    p.ProduktiId,
                    p.EmriProduktit,
                    p.Idpartneri,
                    p.IdpartneriNavigation.EmriBiznesit,
                    p.IdnjesiaMatese,
                    p.IdnjesiaMateseNavigation.NjesiaMatese1,
                    p.Barkodi,
                    p.KodiProduktit,
                    p.LlojiTVSH,
                    p.StokuQmimiProduktit.SasiaNeStok,
                    p.StokuQmimiProduktit.QmimiProduktit,
                    p.StokuQmimiProduktit.QmimiBleres,
                    p.StokuQmimiProduktit.QmimiMeShumic,
                    p.ZbritjaQmimitProduktit.Rabati,
                })
                .FirstOrDefaultAsync();

            if (produkti == null)
            {
                return NotFound();
            }

            return Ok(produkti);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("shtoProdukt")]
        public async Task<IActionResult> Post(Produkti produkti)
        {
            await _context.Produktis.AddAsync(produkti);
            await _context.SaveChangesAsync();

            StokuQmimiProduktit s = new StokuQmimiProduktit
            {
                ProduktiId = produkti.ProduktiId
            };

            await _context.StokuQmimiProduktits.AddAsync(s);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", produkti.ProduktiId, produkti);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Produkti p)
        {
            var produkti = await _context.Produktis.FirstOrDefaultAsync(x => x.ProduktiId == id);
            var stokuQmimi = await _context.StokuQmimiProduktits.FirstOrDefaultAsync(x => x.ProduktiId == id);

            if (produkti == null || stokuQmimi == null)
            {
                return BadRequest("Produkti me këtë ID nuk ekziston");
            }

            if (!p.EmriProduktit.IsNullOrEmpty())
            {
                produkti.EmriProduktit = p.EmriProduktit;
            }

            if (p.IdnjesiaMatese != null)
            {
                produkti.IdnjesiaMatese = p.IdnjesiaMatese;
            }

            if (p.Idpartneri != null)
            {
                produkti.Idpartneri = p.Idpartneri;
            }

            if (p.Barkodi != null)
            {
                produkti.Barkodi = p.Barkodi;
            }

            if(p.KodiProduktit != null)
            {
                produkti.KodiProduktit = p.KodiProduktit;
            }

            if(p.LlojiTVSH != null)
            {
                produkti.LlojiTVSH = p.LlojiTVSH;
            }

            if(p.SasiaShumices != null)
            {
                produkti.SasiaShumices = p.SasiaShumices;
            }

            if (p.StokuQmimiProduktit != null)
            {
                if (p.StokuQmimiProduktit.QmimiProduktit != null)
                {
                    stokuQmimi.QmimiProduktit = p.StokuQmimiProduktit.QmimiProduktit;
                }

                if (p.StokuQmimiProduktit.QmimiBleres != null)
                {
                    stokuQmimi.QmimiBleres = p.StokuQmimiProduktit.QmimiBleres;
                }

                if (p.StokuQmimiProduktit.SasiaNeStok != null)
                {
                    stokuQmimi.SasiaNeStok = p.StokuQmimiProduktit.SasiaNeStok;
                }

                if (p.StokuQmimiProduktit.QmimiMeShumic != null)
                {
                    stokuQmimi.QmimiMeShumic = p.StokuQmimiProduktit.QmimiMeShumic;
                }
            }

            _context.Produktis.Update(produkti);
            _context.StokuQmimiProduktits.Update(stokuQmimi);
            await _context.SaveChangesAsync();

            return Ok(produkti);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var produkti = await _context.Produktis.FirstOrDefaultAsync(x => x.ProduktiId == id);

            if (produkti == null)
                return BadRequest("Invalid id");

            _context.Produktis.Remove(produkti);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
