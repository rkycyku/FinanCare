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
    public class NjesiaMateseController : Controller
    {
        private readonly FinanCareDbContext _context;

        public NjesiaMateseController(FinanCareDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqNjesineMateseSipasIDs")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var njesiaMatese = await _context.NjesiaMatese.FirstOrDefaultAsync(x => x.IDNjesiaMatese == id);

                return Ok(njesiaMatese);
            }
            catch (Exception ex)
            {

                return BadRequest("Njesia Matese nuk egziston");
                throw new Exception(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqNjesiteMatese")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var njesiaMatese = await _context.NjesiaMatese
                    .Include(x => x.Produkti)
                    .ToListAsync();

                var njesiaMateseDheTotProdukteve = njesiaMatese.Select(n => new
                {
                    IDNjesiaMatese = n.IDNjesiaMatese,
                    njesiaMatese = n.EmriNjesiaMatese,
                    totaliProdukteve = n.Produkti.Count()
                }).ToList();

                return Ok(njesiaMateseDheTotProdukteve);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        [Authorize]
        [HttpPut]
        [Route("perditesoNjesineMatese")]
        public async Task<IActionResult> Put(int id, [FromBody] NjesiaMatese k)
        {
            var njesiaMatese = await _context.NjesiaMatese.FirstOrDefaultAsync(x => x.IDNjesiaMatese == id);

            if (id < 0)
            {
                return BadRequest("Partneri nuk egziston");
            }

            if (!k.EmriNjesiaMatese.IsNullOrEmpty())
            {
                njesiaMatese.EmriNjesiaMatese = k.EmriNjesiaMatese;
            }

            _context.NjesiaMatese.Update(njesiaMatese);
            await _context.SaveChangesAsync();

            return Ok(njesiaMatese);
        }

        [Authorize]
        [HttpPost]
        [Route("shtoNjesineMatese")]
        public async Task<IActionResult> Post(NjesiaMatese njesiaMatese)
        {
            await _context.NjesiaMatese.AddAsync(njesiaMatese);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", njesiaMatese.IDNjesiaMatese, njesiaMatese);
        }

        [Authorize]
        [HttpDelete]
        [Route("fshijNjesineMatese")]
        public async Task<IActionResult> Delete(int id)
        {
            var njesiaMatese = await _context.NjesiaMatese.FirstOrDefaultAsync(x => x.IDNjesiaMatese == id);

            _context.NjesiaMatese.Remove(njesiaMatese);
            await _context.SaveChangesAsync();

            return Ok("Njesia Matese u fshi me sukses!");
        }
    }
}
