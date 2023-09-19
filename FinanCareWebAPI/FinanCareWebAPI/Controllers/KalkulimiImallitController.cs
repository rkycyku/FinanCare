using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanCareWebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class KalkulimiImallitController : Controller
    {
        private readonly FinanCareDbContext _context;

        public KalkulimiImallitController(FinanCareDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("shfaqRegjistrimet")]
        public async Task<IActionResult> Get()
        {
            var regjistrimet = await _context.KalkulimiImallits
                .OrderByDescending(x => x.IdRegjistrimit)
                .Select(x => new
                {
                    x.IdRegjistrimit,
                    x.TotaliPaTvsh,
                    x.Tvsh,
                    x.DataRegjistrimit,
                    x.StafiId,
                    x.Stafi.Username,
                    x.NrFatures,
                    x.IdpartneriNavigation.EmriBiznesit,
                    x.LlojiKalkulimit,
                    x.LlojiPageses,
                    x.StatusiPageses,
                    x.StatusiKalkulimit
                }).ToListAsync();

            return Ok(regjistrimet);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("shfaqRegjistrimetNgaID")]
        public async Task<IActionResult> GetRegjistrimin(int id)
        {
            var regjistrimet = await _context.KalkulimiImallits
                .Select(x => new
                {
                    x.IdRegjistrimit,
                    x.TotaliPaTvsh,
                    x.Tvsh,
                    x.DataRegjistrimit,
                    x.StafiId,
                    x.Stafi.Username,
                    x.NrFatures,
                    x.IdpartneriNavigation.EmriBiznesit,
                    x.LlojiKalkulimit,
                    x.LlojiPageses,
                    x.StatusiPageses,
                    x.StatusiKalkulimit
                }).FirstOrDefaultAsync(x => x.IdRegjistrimit == id);

            return Ok(regjistrimet);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("shfaqTeDhenatKalkulimit")]
        public async Task<IActionResult> Get(int idRegjistrimit)
        {
            var teDhenat = await _context.TeDhenatKalkulimits
                .Where(x => x.IdRegjistrimit == idRegjistrimit)
                .Select(x => new
                {
                    x.IdRegjistrimit,
                    x.IdProduktit,
                    x.IdProduktitNavigation.EmriProduktit,
                    x.SasiaStokut,
                    x.QmimiBleres,
                    x.QmimiShites
                })
               .ToListAsync();

            return Ok(teDhenat);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("ruajKalkulimin")]
        public async Task<IActionResult> Post(KalkulimiImallit regjistrimet)
        {
            await _context.KalkulimiImallits.AddAsync(regjistrimet);
            await _context.SaveChangesAsync(); 

            return CreatedAtAction("Get", regjistrimet.IdRegjistrimit, regjistrimet);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("ruajKalkulimin/teDhenat")]
        public async Task<IActionResult> Post(TeDhenatKalkulimit teDhenat)
        {
            await _context.TeDhenatKalkulimits.AddAsync(teDhenat);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("ruajKalkulimin/perditesoStokunQmimin")]
        public async Task<IActionResult> Put(int id, [FromBody] StokuQmimiProduktit stoku)
        {
            var produkti = await _context.StokuQmimiProduktits.FindAsync(id);
            if (produkti == null)
            {
                return NotFound();
            }

            produkti.SasiaNeStok += stoku.SasiaNeStok;
            produkti.DataPerditsimit = DateTime.Now;
            produkti.QmimiProduktit = stoku.QmimiProduktit;
            produkti.QmimiBleres = stoku.QmimiBleres;
            if(stoku.DataKrijimit == null) {
                produkti.DataKrijimit = produkti.DataKrijimit;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(produkti);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("ruajKalkulimin/perditesoStatusinKalkulimit")]
        public async Task<IActionResult> Put(int id)
        {
            var kalkulimi = await _context.KalkulimiImallits.FindAsync(id);
            if (kalkulimi == null)
            {
                return NotFound();
            }

            kalkulimi.StatusiKalkulimit = "true";

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(kalkulimi);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("getNumriFaturesMeRradhe")]
        public async Task<IActionResult> getNumriFaturesMeRradhe()
        {
            var nrFatures = await _context.KalkulimiImallits.CountAsync();

            return Ok(nrFatures);
        }
    }
}
