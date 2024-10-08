﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanCareWebAPI.Models;
using FinanCareWebAPI.Migrations;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class ZbritjaQmimitProduktitController : Controller
    {
        private readonly FinanCareDbContext _context;

        public ZbritjaQmimitProduktitController(FinanCareDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqZbritjet")]
        public async Task<IActionResult> get()
        {
            var prodMeZbritje = await _context.Produkti
                .Where(x => x.ZbritjaQmimitProduktit.Rabati != null && x.isDeleted == "false")
                .Select(x => new
                {
                    x.EmriProduktit,
                    x.ZbritjaQmimitProduktit.ProduktiID,
                    x.ZbritjaQmimitProduktit.Rabati,
                    x.ZbritjaQmimitProduktit.DataZbritjes,
                    x.ZbritjaQmimitProduktit.DataSkadimit,
                    x.StokuQmimiProduktit.QmimiProduktit,
                }).ToListAsync();

            return Ok(prodMeZbritje);
        }

        [Authorize]
        [HttpPost]
        [Route("shtoZbritjenProduktit")]
        public async Task<IActionResult> post(ZbritjaQmimitProduktit zbritja)
        {
            await _context.ZbritjaQmimitProduktit.AddAsync(zbritja);
            HistoriaZbritjeveProduktit historiaZbritjeveProduktit = new()
            {
                DataSkadimit = zbritja.DataSkadimit,
                DataZbritjes = zbritja.DataZbritjes,
                ProduktiID = zbritja.ProduktiID,
                Rabati = zbritja.Rabati,
            };
            await _context.HistoriaZbritjeveProduktit.AddAsync(historiaZbritjeveProduktit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("get", zbritja.ProduktiID, zbritja);
        }

        [Authorize]
        [HttpDelete]
        [Route("fshijZbritjenProduktit")]
        public async Task<IActionResult> Delete(int id)
        {
            var produkti = await _context.ZbritjaQmimitProduktit.FirstOrDefaultAsync(x => x.ProduktiID == id);

            if(produkti == null)
            {
                return BadRequest("Ky produkt nuk ka zbritje!");
            }

            _context.ZbritjaQmimitProduktit.Remove(produkti);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
