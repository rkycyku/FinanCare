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
    public class KartelatController : Controller
    {
        private readonly FinanCareDbContext _context;

        public KartelatController(FinanCareDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqKartelenSipasIDs")]
        public async Task<IActionResult> ShfaqKartelenSipasIDs(int id)
        {
            try
            {
                var kartela = await _context.Kartelat.FirstOrDefaultAsync(x => x.IDKartela == id);

                return Ok(kartela);
            }
            catch (Exception ex)
            {

                return BadRequest("Kartela nuk egziston");
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqKartelenSipasKodit")]
        public async Task<IActionResult> ShfaqKartelenSipasKodit(int kodiKarteles)
        {
                var kartela = await _context.Kartelat.Include(x => x.Partneri)
                    .Include(x => x.Stafi).FirstOrDefaultAsync(x => x.KodiKartela == kodiKarteles);

                if(kartela != null)
                {

                    return Ok(kartela);
                }
                else
                {

                    return BadRequest();
                }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqKartelat")]
        public async Task<IActionResult> ShfaqKartelat()
        {
            try
            {
                var kartela = await _context.Kartelat
                    .Include(x => x.Partneri)
                    .Include(x => x.Stafi)
                    .ToListAsync();

                return Ok(kartela);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("perditesoKartelen")]
        public async Task<IActionResult> Put(int id, [FromBody] Kartelat k)
        {
            var kartela = await _context.Kartelat.FirstOrDefaultAsync(x => x.IDKartela == id);

            if (id < 0)
            {
                return BadRequest("Partneri nuk egziston");
            }

            if (!k.LlojiKarteles.IsNullOrEmpty())
            {
                kartela.LlojiKarteles = k.LlojiKarteles;
            }

            if (k.KodiKartela > 0)
            {
                kartela.KodiKartela = k.KodiKartela;
            }

            if (k.PartneriID > 0)
            {
                kartela.LlojiKarteles = k.LlojiKarteles;
            }

            if (k.StafiID > 0)
            {
                kartela.StafiID = k.StafiID;
            }

            if (k.Rabati > 0)
            {
                kartela.Rabati = k.Rabati;
            }

            _context.Kartelat.Update(kartela);
            await _context.SaveChangesAsync();

            return Ok(kartela);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("shtoKartelen")]
        public async Task<IActionResult> Post(Kartelat kartela)
        {
            await _context.Kartelat.AddAsync(kartela);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", kartela.IDKartela, kartela);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("fshijKartelen")]
        public async Task<IActionResult> Delete(int id)
        {
            var kartela = await _context.Kartelat.FirstOrDefaultAsync(x => x.IDKartela == id);

            _context.Kartelat.Remove(kartela);
            await _context.SaveChangesAsync();

            return Ok("Kartela u fshi me sukses!");
        }
    }
}
