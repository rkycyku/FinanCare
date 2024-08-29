using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FinanCareWebAPI.Models;
using FinanCareWebAPI.Migrations;

namespace FinanCareWebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class PartneriController : Controller
    {
        private readonly FinanCareDbContext _context;

        public PartneriController(FinanCareDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqPartnerinSipasIDs")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var partneri = await _context.Partneri
                    .Include(p => p.Kartela) 
                    .FirstOrDefaultAsync(x => x.IDPartneri == id);

                if (partneri == null)
                {
                    return NotFound("Partneri nuk ekziston");
                }

                return Ok(partneri);
            }
            catch (Exception ex)
            {
                return BadRequest("Ndodhi një gabim: " + ex.Message);
            }
        }



        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqPartneretSipasLlojit")]
        public async Task<IActionResult> GetSipasLlojit(string llojiPartnerit)
        {
            try
            {
                var partneri = await _context.Partneri.Include(p => p.Kartela).Where(x => x.LlojiPartnerit == llojiPartnerit).ToListAsync();

                return Ok(partneri);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqPartneretFurntiore")]
        public async Task<IActionResult> GetFurnitoret()
        {
            try
            {
                var partneri = await _context.Partneri.Include(p => p.Kartela).Where(x => x.LlojiPartnerit != "B").ToListAsync();

                return Ok(partneri);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqPartneretBleres")]
        public async Task<IActionResult> GetBleresit()
        {
            try
            {
                var partneri = await _context.Partneri.Include(p => p.Kartela).Where(x => x.LlojiPartnerit != "F").ToListAsync();

                return Ok(partneri);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqPartneret")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var partneret = await _context.Partneri.Include(p => p.Kartela).ToArrayAsync();

                return Ok(partneret);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("KartelaFinanciare")]
        public async Task<ActionResult> GetById(int id)
        {
            var partneri = await _context.Partneri
                .Where(p => p.IDPartneri == id)
                .Select(x => new
                {
                    x.IDPartneri,
                    x.EmriBiznesit,
                    x.NUI,
                    x.TVSH,
                    x.NRF,
                    x.Email,
                    x.Adresa,
                    x.NrKontaktit,
                    x.LlojiPartnerit,
                    x.ShkurtesaPartnerit
                })
                .FirstOrDefaultAsync();

            var kalkulimet = await _context.Faturat
                .Where(x => x.IDPartneri == id && x.StatusiKalkulimit.Equals("true") && x.LlojiKalkulimit != "OFERTE")
                .Select(x => new
                {
                    x.IDRegjistrimit,
                    x.DataRegjistrimit,
                    x.TotaliPaTVSH,
                    x.TVSH,
                    x.Rabati,
                    x.LlojiKalkulimit,
                    x.StatusiPageses,
                    x.LlojiPageses,
                    x.StatusiKalkulimit,
                    x.NrRendorFatures,
                    x.PershkrimShtese
                })
                .ToListAsync();

            var kalkulimetDalese  = await _context.Faturat
                .Where(x => x.IDPartneri == id &&
                    (x.LlojiKalkulimit.Equals("HYRJE")
                    || x.LlojiKalkulimit.Equals("FL")
                    || x.LlojiKalkulimit.Equals("KMSH")
                    || x.LlojiKalkulimit.Equals("PAGES")
                    ) && x.StatusiKalkulimit.Equals("true")
                )
                .ToListAsync();


            var kalkulimetHyrese = await _context.Faturat
                .Where(x => x.IDPartneri == id &&
                    (x.LlojiKalkulimit.Equals("FAT")
                    || x.LlojiKalkulimit.Equals("AS")
                    || x.LlojiKalkulimit.Equals("KMB")
                    || x.LlojiKalkulimit.Equals("PARAGON")
                    ) && x.StatusiKalkulimit.Equals("true")
                )
                .ToListAsync();

            decimal TotaliHyrese = 0;
            decimal TotaliDalese = 0;

            foreach (var produktiNeKalkulim in kalkulimetHyrese)
            {
                TotaliHyrese += (produktiNeKalkulim.TotaliPaTVSH + produktiNeKalkulim.TVSH - produktiNeKalkulim.Rabati) ?? 0;
            }

            foreach (var produktiNeKalkulim in kalkulimetDalese)
            {
                if((produktiNeKalkulim.TotaliPaTVSH + produktiNeKalkulim.TVSH - produktiNeKalkulim.Rabati) < 0)
                {
                    TotaliDalese += (produktiNeKalkulim.TotaliPaTVSH + produktiNeKalkulim.TVSH - produktiNeKalkulim.Rabati)*(-1) ?? 0;
                }
                else
                {
                    TotaliDalese += (produktiNeKalkulim.TotaliPaTVSH + produktiNeKalkulim.TVSH - produktiNeKalkulim.Rabati) ?? 0;
                }
                
            }

            if (partneri == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                partneri,
                kalkulimet,
                TotaliHyrese,
                TotaliDalese
            });
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("perditesoPartnerin")]
        public async Task<IActionResult> Put(int id, [FromBody] Partneri k)
        {
            var partneri = await _context.Partneri.FirstOrDefaultAsync(x => x.IDPartneri == id);
            if (id < 0)
            {
                return BadRequest("Partneri nuk egziston");
            }

            if (!k.EmriBiznesit.IsNullOrEmpty())
            {
                partneri.EmriBiznesit = k.EmriBiznesit;
            }
            if (!k.NUI.IsNullOrEmpty())
            {
                partneri.NUI = k.NUI;
            }
            if (!k.NRF.IsNullOrEmpty())
            {
                partneri.NRF = k.NRF;
            }
            if (!k.TVSH.IsNullOrEmpty())
            {
                partneri.TVSH = k.TVSH;
            }
            if (!k.Email.IsNullOrEmpty())
            {
                partneri.Email = k.Email;
            }
            if (!k.Adresa.IsNullOrEmpty())
            {
                partneri.Adresa = k.Adresa;
            }
            if (!k.NrKontaktit.IsNullOrEmpty())
            {
                partneri.NrKontaktit = k.NrKontaktit;
            }
            if (!k.LlojiPartnerit.IsNullOrEmpty())
            {
                partneri.LlojiPartnerit = k.LlojiPartnerit;
            }
            if (!k.ShkurtesaPartnerit.IsNullOrEmpty())
            {
                partneri.ShkurtesaPartnerit = k.ShkurtesaPartnerit;
            }

            _context.Partneri.Update(partneri);
            await _context.SaveChangesAsync();

            return Ok(partneri);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("shtoPartnerin")]
        public async Task<IActionResult> Post(Partneri partneri)
        {
            await _context.Partneri.AddAsync(partneri);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", partneri.IDPartneri, partneri);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("fshijPartnerin")]
        public async Task<IActionResult> Delete(int id)
        {
            var partneri = await _context.Partneri.FirstOrDefaultAsync(x => x.IDPartneri == id);

            _context.Partneri.Remove(partneri);
            await _context.SaveChangesAsync();

            return Ok("Partneri u fshi me sukses!");
        }
    }
}
