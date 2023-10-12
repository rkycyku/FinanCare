using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanCareWebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class FaturatController : Controller
    {
        private readonly FinanCareDbContext _context;

        public FaturatController(FinanCareDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("shfaqRegjistrimet")]
        public async Task<IActionResult> Get()
        {
            var regjistrimet = await _context.Faturats
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
                    x.StatusiKalkulimit,
                    x.PershkrimShtese,
                    x.Rabati,
                    x.NrRendorFatures
                }).ToListAsync();

            return Ok(regjistrimet);
        }


        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("shfaqRegjistrimetSipasStatusit")]
        public async Task<IActionResult> GetByStatusi(string statusi)
        {
            var regjistrimet = await _context.Faturats
                .Where(x => x.StatusiKalkulimit == statusi)
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
                    x.StatusiKalkulimit,
                    x.PershkrimShtese,
                    x.Rabati,
                    x.NrRendorFatures
                }).ToListAsync();

            return Ok(regjistrimet);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("shfaqRegjistrimetNgaID")]
        public async Task<IActionResult> GetRegjistrimin(int id)
        {
            var regjistrimet = await _context.Faturats
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
                    x.IdpartneriNavigation.Adresa,
                    x.IdpartneriNavigation.Nrf,
                    x.IdpartneriNavigation.Nui,
                    partneriTVSH = x.IdpartneriNavigation.Tvsh,
                    x.IdpartneriNavigation.Idpartneri,
                    x.IdpartneriNavigation.ShkurtesaPartnerit,
                    x.IdpartneriNavigation.Email,
                    x.IdpartneriNavigation.NrKontaktit,
                    x.LlojiKalkulimit,
                    x.LlojiPageses,
                    x.StatusiPageses,
                    x.StatusiKalkulimit,
                    x.PershkrimShtese,
                    x.Rabati,
                    x.NrRendorFatures
                }).FirstOrDefaultAsync(x => x.IdRegjistrimit == id);

            var totTVSH18 = await _context.TeDhenatFaturats.Include(x => x.IdProduktitNavigation).Where(x => x.IdProduktitNavigation.LlojiTVSH == 18 && x.IdRegjistrimit == id).ToListAsync();
            var totTVSH8 = await _context.TeDhenatFaturats.Include(x => x.IdProduktitNavigation).Where(x => x.IdProduktitNavigation.LlojiTVSH == 8 && x.IdRegjistrimit == id).ToListAsync();

            decimal TotaliMeTVSH18 = 0;
            decimal TotaliMeTVSH8 = 0;
            decimal TotaliPaTVSH18 = 0;
            decimal TotaliPaTVSH8 = 0;
            decimal Rabati = 0;

            foreach (var teDhenat in totTVSH18)
            {
                decimal rabati = teDhenat.Rabati1 + teDhenat.Rabati2 + teDhenat.Rabati3 ?? 0;
                decimal vatRate = 0.18m; // 18% VAT rate as a decimal
                decimal totalBeforeVAT = Convert.ToDecimal(teDhenat.QmimiBleres * teDhenat.SasiaStokut - (teDhenat.QmimiBleres * teDhenat.SasiaStokut * rabati / 100));
                decimal vatAmount = (vatRate / (1 + vatRate)) * totalBeforeVAT;

                TotaliMeTVSH18 += totalBeforeVAT;
                TotaliPaTVSH18 += totalBeforeVAT - vatAmount;
                Rabati += Convert.ToDecimal((teDhenat.QmimiBleres * teDhenat.SasiaStokut) * rabati / 100);
            }

            foreach (var teDhenat in totTVSH8)
            {
                decimal rabati = teDhenat.Rabati1 + teDhenat.Rabati2 + teDhenat.Rabati3 ?? 0;
                decimal vatRate = 0.08m; // 8% VAT rate as a decimal
                decimal totalBeforeVAT = Convert.ToDecimal(teDhenat.QmimiBleres * teDhenat.SasiaStokut - (teDhenat.QmimiBleres * teDhenat.SasiaStokut * rabati / 100));
                decimal vatAmount = (vatRate / (1 + vatRate)) * totalBeforeVAT;

                TotaliMeTVSH8 += totalBeforeVAT;
                TotaliPaTVSH8 += totalBeforeVAT - vatAmount;
                Rabati += Convert.ToDecimal((teDhenat.QmimiBleres * teDhenat.SasiaStokut) * rabati / 100);
            }



            decimal TotaliPaTVSH = TotaliPaTVSH18 + TotaliPaTVSH8;
            decimal TotaliMeTVSH = TotaliPaTVSH + (TotaliMeTVSH18 - TotaliPaTVSH18) + (TotaliMeTVSH8 - TotaliPaTVSH8);

            return Ok(new
            {
                regjistrimet,
                TotaliMeTVSH18,
                TotaliMeTVSH8,
                TotaliPaTVSH18,
                TotaliPaTVSH8,
                TotaliPaTVSH,
                TotaliMeTVSH,
                Rabati,
                TVSH18 = TotaliMeTVSH18 - TotaliPaTVSH18,
                TVSH8 = TotaliMeTVSH8 - TotaliPaTVSH8,
                totTVSH18,
                totTVSH8
            });
        }


        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("shfaqTeDhenatKalkulimit")]
        public async Task<IActionResult> GetRegjistrimi(int idRegjistrimit)
        {
            var teDhenat = await _context.TeDhenatFaturats
                .Where(x => x.IdRegjistrimit == idRegjistrimit)
                .Select(x => new
                {
                    x.Id,
                    x.IdRegjistrimit,
                    x.IdProduktit,
                    x.IdProduktitNavigation.EmriProduktit,
                    x.IdProduktitNavigation.Barkodi,
                    x.IdProduktitNavigation.KodiProduktit,
                    x.SasiaStokut,
                    x.QmimiBleres,
                    x.QmimiShites,
                    x.QmimiShitesMeShumic,
                    x.IdProduktitNavigation.LlojiTVSH,
                    x.Rabati1,
                    x.Rabati2,
                    x.Rabati3,
                    x.IdProduktitNavigation.IdnjesiaMateseNavigation.NjesiaMatese1
                })
               .ToListAsync();

            return Ok(teDhenat);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("ruajKalkulimin")]
        public async Task<IActionResult> Post(Faturat regjistrimet)
        {
            await _context.Faturats.AddAsync(regjistrimet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", regjistrimet.IdRegjistrimit, regjistrimet);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("ruajKalkulimin/teDhenat")]
        public async Task<IActionResult> Post(TeDhenatFaturat teDhenat)
        {
            await _context.TeDhenatFaturats.AddAsync(teDhenat);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpDelete]
        [Route("ruajKalkulimin/FshijTeDhenat")]
        public async Task<IActionResult> Delete(int idTeDhenat)
        {
            var produkti = await _context.TeDhenatFaturats.FirstOrDefaultAsync(x => x.Id == idTeDhenat);

            if (produkti == null)
                return BadRequest("Invalid id");

            _context.TeDhenatFaturats.Remove(produkti);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("ruajKalkulimin/PerditesoTeDhenat")]
        public async Task<IActionResult> Put(int id, [FromBody] TeDhenatFaturat teDhenat)
        {
            var produkti = await _context.TeDhenatFaturats.FindAsync(id);
            if (produkti == null)
            {
                return NotFound();
            }

            produkti.SasiaStokut = teDhenat.SasiaStokut;
            produkti.QmimiBleres = teDhenat.QmimiBleres;
            produkti.QmimiShites = teDhenat.QmimiShites;
            produkti.QmimiShitesMeShumic = teDhenat.QmimiShitesMeShumic;
            produkti.Rabati1 = teDhenat.Rabati1;
            produkti.Rabati2 = teDhenat.Rabati2;
            produkti.Rabati3 = teDhenat.Rabati3;

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
            produkti.QmimiMeShumic = stoku.QmimiMeShumic;

            if (stoku.DataKrijimit == null)
            {
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
        [HttpGet]
        [Route("ruajKalkulimin/getKalkulimi")]
        public async Task<IActionResult> GetKalkulimi(int idKalkulimit)
        {
            var kalkulimi = await _context.TeDhenatFaturats
                .Where(x => x.Id == idKalkulimit)
                .Select(x => new
                {
                    x.Id,
                    x.IdRegjistrimit,
                    x.IdProduktit,
                    x.IdProduktitNavigation.EmriProduktit,
                    x.IdProduktitNavigation.Barkodi,
                    x.IdProduktitNavigation.KodiProduktit,
                    x.SasiaStokut,
                    x.QmimiBleres,
                    x.QmimiShites,
                    x.QmimiShitesMeShumic,
                    x.IdProduktitNavigation.LlojiTVSH,
                    x.Rabati1,
                    x.Rabati2,
                    x.Rabati3,
                })
               .ToListAsync();
            ;

            return Ok(kalkulimi);
        }


        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("ruajKalkulimin/perditesoStatusinKalkulimit")]
        public async Task<IActionResult> Put(int id, string statusi)
        {
            var kalkulimi = await _context.Faturats.FindAsync(id);
            if (kalkulimi == null)
            {
                return NotFound();
            }

            kalkulimi.StatusiKalkulimit = statusi;

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
        public async Task<IActionResult> GetNumriFaturesMeRradhe(string llojiKalkulimit)
        {
            var nrFatures = await _context.Faturats
                .Where(x => x.LlojiKalkulimit == llojiKalkulimit)
                .OrderByDescending(x => x.IdRegjistrimit)
                .Take(1)
                .Select(x => x.NrRendorFatures)
                .ToListAsync();

            if (nrFatures.Count == 0)
            {
                return Ok(0);
            }

            return Ok(nrFatures);
        }


        [Authorize(Roles = "Admin, Menaxher")]
        [HttpDelete]
        [Route("fshijKalkulimin")]
        public async Task<IActionResult> fshijKalkulimin(int idKalkulimi)
        {
            var kalkulimi = await _context.Faturats.FirstOrDefaultAsync(x => x.IdRegjistrimit == idKalkulimi);
            var teDhenatKalkulimit = await _context.TeDhenatFaturats.Where(x => x.IdRegjistrimit == idKalkulimi).ToListAsync();

            foreach (var teDhenat in teDhenatKalkulimit)
            {
                _context.TeDhenatFaturats.Remove(teDhenat);
            }

            _context.Faturats.Remove(kalkulimi);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("fshijKalkulimin/perditesoStokunQmimin")]
        public async Task<IActionResult> fshijKalkuliminPerditesoStokun(int idKalkulimi, int idProdukti, int idTeDhenatKalkulimit)
        {
            var secondLatestTeDhenat = await _context.TeDhenatFaturats
            .Where(x => x.IdProduktit == idProdukti && x.IdRegjistrimit != idKalkulimi && x.IdRegjistrimitNavigation.StatusiKalkulimit == "true")
            .OrderByDescending(x => x.Id)
            .Take(1) // Take only one record (the second latest)
            .Select(x => new
            {
                x.Id,
                x.IdRegjistrimit,
                x.IdProduktit,
                x.IdProduktitNavigation.EmriProduktit,
                x.SasiaStokut,
                x.QmimiBleres,
                x.QmimiShites,
                x.QmimiShitesMeShumic,
                x.Rabati1,
                x.Rabati2,
                x.Rabati3,
            })
            .SingleOrDefaultAsync(); // Use SingleOrDefaultAsync to retrieve one record


            var produktiNeKalkulim = await _context.TeDhenatFaturats.FirstOrDefaultAsync(x => x.Id == idTeDhenatKalkulimit);


            var produkti = await _context.StokuQmimiProduktits.FindAsync(idProdukti);

            if (produkti == null)
            {
                return NotFound();
            }

            produkti.SasiaNeStok -= produktiNeKalkulim.SasiaStokut;
            produkti.DataPerditsimit = DateTime.Now;

            if (secondLatestTeDhenat == null)
            {
                produkti.QmimiProduktit = 0;
                produkti.QmimiBleres = 0;
                produkti.QmimiMeShumic = 0;
            }
            else
            {
                produkti.QmimiProduktit = secondLatestTeDhenat.QmimiShites;
                produkti.QmimiBleres = secondLatestTeDhenat.QmimiBleres;
                produkti.QmimiMeShumic = secondLatestTeDhenat.QmimiShitesMeShumic;
            }

            if (produkti.DataKrijimit == null)
            {
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

            var result = new
            {
                SecondLatestTeDhenat = secondLatestTeDhenat,
                ProduktiNeKalkulim = produktiNeKalkulim,
                Produkti = produkti
            };

            return Ok(result); // Return both details

        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("hapAsgjesiminKthimin/perditesoStokunQmimin")]
        public async Task<IActionResult> FshijAsgjesiminPerditesoStokun(int idProdukti, int idTeDhenatKalkulimit, string lloji)
        {
            var produktiNeKalkulim = await _context.TeDhenatFaturats.FirstOrDefaultAsync(x => x.Id == idTeDhenatKalkulimit);


            var produkti = await _context.StokuQmimiProduktits.FindAsync(idProdukti);

            if (produkti == null)
            {
                return NotFound();
            }

            if (lloji == "AS")
            {
                produkti.SasiaNeStok += produktiNeKalkulim.SasiaStokut;
                produkti.DataPerditsimit = DateTime.Now;
            }

            if (lloji == "KMSH")
            {
                produkti.SasiaNeStok -= produktiNeKalkulim.SasiaStokut;
                produkti.DataPerditsimit = DateTime.Now;
            }

            _context.StokuQmimiProduktits.Update(produkti);
            await _context.SaveChangesAsync();

            var result = new
            {
                ProduktiNeKalkulim = produktiNeKalkulim,
                Produkti = produkti
            };

            return Ok(result); // Return both details

        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("ruajKalkulimin/asgjesoStokun/perditesoStokunQmimin")]
        public async Task<IActionResult> AsgjesoStokunPerditesoStokunQmimin(int id, [FromBody] StokuQmimiProduktit stoku)
        {
            var produkti = await _context.StokuQmimiProduktits.FindAsync(id);
            if (produkti == null)
            {
                return NotFound();
            }

            produkti.SasiaNeStok -= stoku.SasiaNeStok;
            produkti.DataPerditsimit = DateTime.Now;

            if (stoku.DataKrijimit == null)
            {
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

    }
}
