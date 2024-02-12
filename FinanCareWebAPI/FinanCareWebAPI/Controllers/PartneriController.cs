﻿using Microsoft.AspNetCore.Authorization;
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
                var partneri = await _context.Partneri.FirstOrDefaultAsync(x => x.IDPartneri == id);

                return Ok(partneri);
            }
            catch (Exception ex)
            {

                return BadRequest("Partneri nuk egziston");
                throw new Exception(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("shfaqPartneretSipasLlojit")]
        public async Task<IActionResult> GetSipasLlojit(string llojiPartnerit)
        {
            try
            {
                var partneri = await _context.Partneri.Where(x => x.LlojiPartnerit == llojiPartnerit).ToListAsync();

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
                var partneri = await _context.Partneri.Where(x => x.LlojiPartnerit != "B").ToListAsync();

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
                var partneri = await _context.Partneri.Where(x => x.LlojiPartnerit != "F").ToListAsync();

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
                var partneret = await _context.Partneri.ToArrayAsync();

                return Ok(partneret);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
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
