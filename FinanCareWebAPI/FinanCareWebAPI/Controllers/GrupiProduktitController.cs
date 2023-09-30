﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FinanCareWebAPI.Models;

namespace FinanCareWebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class GrupiProduktitController : Controller
    {
        private readonly FinanCareDbContext _context;

        public GrupiProduktitController(FinanCareDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqGrupinEProduktitSipasIDs")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var grupiIProduktit = await _context.GrupiProduktits.FirstOrDefaultAsync(x => x.IDGrupiProduktit == id);

                return Ok(grupiIProduktit);
            }
            catch (Exception ex)
            {

                return BadRequest("Grupi i Produktit nuk egziston");
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqGrupetEProduktit")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var grupiIProduktit = await _context.GrupiProduktits
                    .Include(x => x.Produktis)
                    .ToListAsync();

                var grupiIProduktitDheTotProdukteve = grupiIProduktit.Select(n => new
                {
                    n.IDGrupiProduktit,
                    n.GrupiIProduktit,
                    totaliProdukteve = n.Produktis.Count()
                }).ToList();

                return Ok(grupiIProduktitDheTotProdukteve);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("perditesoGrupinEProduktit")]
        public async Task<IActionResult> Put(int id, [FromBody] GrupiProduktit k)
        {
            var grupiIProduktit = await _context.GrupiProduktits.FirstOrDefaultAsync(x => x.IDGrupiProduktit == id);

            if (id < 0)
            {
                return BadRequest("Partneri nuk egziston");
            }

            if (!k.GrupiIProduktit.IsNullOrEmpty())
            {
                grupiIProduktit.GrupiIProduktit = k.GrupiIProduktit;
            }

            _context.GrupiProduktits.Update(grupiIProduktit);
            await _context.SaveChangesAsync();

            return Ok(grupiIProduktit);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("shtoGrupinEProduktit")]
        public async Task<IActionResult> Post(GrupiProduktit grupiIProduktit)
        {
            await _context.GrupiProduktits.AddAsync(grupiIProduktit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", grupiIProduktit.IDGrupiProduktit, grupiIProduktit);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete]
        [Route("fshijGrupinEProduktit")]
        public async Task<IActionResult> Delete(int id)
        {
            var grupiIProduktit = await _context.GrupiProduktits.FirstOrDefaultAsync(x => x.IDGrupiProduktit == id);

            _context.GrupiProduktits.Remove(grupiIProduktit);
            await _context.SaveChangesAsync();

            return Ok("Grupi i Produktit u fshi me sukses!");
        }
    }
}
