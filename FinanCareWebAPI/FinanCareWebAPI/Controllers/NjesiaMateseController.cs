using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FinanCareWebAPI.Models;

namespace FinanCareWebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class NjesiaMateseController : Controller
    {
        private readonly FinanCareDbContext _context;

        public NjesiaMateseController(FinanCareDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqNjesineMateseSipasIDs")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var njesiaMatese = await _context.NjesiaMateses.FirstOrDefaultAsync(x => x.IdnjesiaMatese == id);

                return Ok(njesiaMatese);
            }
            catch (Exception ex)
            {

                return BadRequest("Njesia Matese nuk egziston");
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqNjesiteMatese")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var njesiaMatese = await _context.NjesiaMateses
                    .Include(x => x.Produktis)
                    .ToListAsync();

                var njesiaMateseDheTotProdukteve = njesiaMatese.Select(n => new
                {
                    idNjesiaMatese = n.IdnjesiaMatese,
                    njesiaMatese = n.NjesiaMatese1,
                    totaliProdukteve = n.Produktis.Count()
                }).ToList();

                return Ok(njesiaMateseDheTotProdukteve);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("perditesoNjesineMatese")]
        public async Task<IActionResult> Put(int id, [FromBody] NjesiaMatese k)
        {
            var njesiaMatese = await _context.NjesiaMateses.FirstOrDefaultAsync(x => x.IdnjesiaMatese == id);

            if (id < 0)
            {
                return BadRequest("Partneri nuk egziston");
            }

            if (!k.NjesiaMatese1.IsNullOrEmpty())
            {
                njesiaMatese.NjesiaMatese1 = k.NjesiaMatese1;
            }

            _context.NjesiaMateses.Update(njesiaMatese);
            await _context.SaveChangesAsync();

            return Ok(njesiaMatese);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("shtoNjesineMatese")]
        public async Task<IActionResult> Post(NjesiaMatese njesiaMatese)
        {
            await _context.NjesiaMateses.AddAsync(njesiaMatese);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", njesiaMatese.IdnjesiaMatese, njesiaMatese);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("fshijNjesineMatese")]
        public async Task<IActionResult> Delete(int id)
        {
            var njesiaMatese = await _context.NjesiaMateses.FirstOrDefaultAsync(x => x.IdnjesiaMatese == id);

            _context.NjesiaMateses.Remove(njesiaMatese);
            await _context.SaveChangesAsync();

            return Ok("Njesia Matese u fshi me sukses!");
        }
    }
}
