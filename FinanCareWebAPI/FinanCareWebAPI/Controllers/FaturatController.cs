using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanCareWebAPI.Models;
using FinanCareWebAPI.Migrations;

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
            var regjistrimet = await _context.Faturat
                .OrderByDescending(x => x.IDRegjistrimit)
                .Select(x => new
                {
                    x.IDRegjistrimit,
                    x.TotaliPaTVSH,
                    x.TVSH,
                    x.DataRegjistrimit,
                    x.StafiID,
                    x.Stafi.Username,
                    x.NrFatures,
                    x.Partneri.EmriBiznesit,
                    x.Partneri.IDPartneri,
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
            var regjistrimet = await _context.Faturat
                .Where(x => x.StatusiKalkulimit == statusi)
                .OrderByDescending(x => x.IDRegjistrimit)
                .Select(x => new
                {
                    x.IDRegjistrimit,
                    x.TotaliPaTVSH,
                    x.TVSH,
                    x.DataRegjistrimit,
                    x.StafiID,
                    x.Stafi.Username,
                    x.NrFatures,
                    x.Partneri.EmriBiznesit,
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
            var regjistrimet = await _context.Faturat
                .Select(x => new
                {
                    x.IDRegjistrimit,
                    x.TotaliPaTVSH,
                    x.TVSH,
                    x.DataRegjistrimit,
                    x.StafiID,
                    x.Stafi.Username,
                    x.NrFatures,
                    x.Partneri.EmriBiznesit,
                    x.Partneri.Adresa,
                    x.Partneri.NRF,
                    x.Partneri.NUI,
                    partneriTVSH = x.Partneri.TVSH,
                    x.Partneri.IDPartneri,
                    x.Partneri.ShkurtesaPartnerit,
                    x.Partneri.Email,
                    x.Partneri.NrKontaktit,
                    x.LlojiKalkulimit,
                    x.LlojiPageses,
                    x.StatusiPageses,
                    x.StatusiKalkulimit,
                    x.PershkrimShtese,
                    x.Rabati,
                    x.NrRendorFatures
                }).FirstOrDefaultAsync(x => x.IDRegjistrimit == id);

            var totTVSH18 = await _context.TeDhenatFaturat.Include(x => x.Produkti).Where(x => x.Produkti.LlojiTVSH == 18 && x.IDRegjistrimit == id).ToListAsync();
            var totTVSH8 = await _context.TeDhenatFaturat.Include(x => x.Produkti).Where(x => x.Produkti.LlojiTVSH == 8 && x.IDRegjistrimit == id).ToListAsync();

            decimal TotaliMeTVSH18 = 0;
            decimal TotaliMeTVSH8 = 0;
            decimal TotaliPaTVSH18 = 0;
            decimal TotaliPaTVSH8 = 0;
            decimal Rabati = 0;

            foreach (var teDhenat in totTVSH18)
            {
                decimal rabati = teDhenat.Rabati1 + teDhenat.Rabati2 + teDhenat.Rabati3 ?? 0;
                decimal vatRate = 0.18m; // 18% VAT rate as a decimal
                decimal totalBeforeVAT = 0.00m;
                decimal vatAmount = 0.00m;

                if(regjistrimet.LlojiKalkulimit.Equals("OFERTE") || regjistrimet.LlojiKalkulimit.Equals("FAT") || regjistrimet.LlojiKalkulimit.Equals("FL"))
                {
                    totalBeforeVAT = Convert.ToDecimal((teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) -
                              (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100) -
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) -
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100)) * (teDhenat.Rabati3 / 100)) * teDhenat.SasiaStokut);
                    vatAmount = (vatRate / (1 + vatRate)) * totalBeforeVAT ;
                }
                else
                {
                    totalBeforeVAT = Convert.ToDecimal(teDhenat.QmimiBleres * teDhenat.SasiaStokut - (teDhenat.QmimiBleres * teDhenat.SasiaStokut * rabati / 100));
                    vatAmount = (vatRate / (1 + vatRate)) * totalBeforeVAT;
                }

                TotaliMeTVSH18 += totalBeforeVAT;
                TotaliPaTVSH18 += totalBeforeVAT - vatAmount;

                if (regjistrimet.LlojiKalkulimit.Equals("OFERTE") || regjistrimet.LlojiKalkulimit.Equals("FAT") || regjistrimet.LlojiKalkulimit.Equals("FL"))
                {
                    Rabati += Convert.ToDecimal((teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) +
                              (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100) +
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) -
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100)) * (teDhenat.Rabati3 / 100)) * teDhenat.SasiaStokut);
                }
                else
                {

                    Rabati += Convert.ToDecimal((teDhenat.QmimiBleres * teDhenat.SasiaStokut) * rabati / 100);
                }
            }

            foreach (var teDhenat in totTVSH8)
            {
                decimal rabati = teDhenat.Rabati1 + teDhenat.Rabati2 + teDhenat.Rabati3 ?? 0;
                decimal vatRate = 0.08m; // 8% VAT rate as a decimal
                decimal totalBeforeVAT = 0.00m;
                decimal vatAmount = 0.00m;

                if (regjistrimet.LlojiKalkulimit.Equals("OFERTE") || regjistrimet.LlojiKalkulimit.Equals("FAT") || regjistrimet.LlojiKalkulimit.Equals("FL"))
                {
                    totalBeforeVAT = Convert.ToDecimal((teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) -
                              (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100) -
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) -
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100)) * (teDhenat.Rabati3 / 100)) * teDhenat.SasiaStokut);
                    vatAmount = (vatRate / (1 + vatRate)) * totalBeforeVAT;
                }
                else
                {
                    totalBeforeVAT = Convert.ToDecimal(teDhenat.QmimiBleres * teDhenat.SasiaStokut - (teDhenat.QmimiBleres * teDhenat.SasiaStokut * rabati / 100));
                    vatAmount = (vatRate / (1 + vatRate)) * totalBeforeVAT;
                }

                TotaliMeTVSH8 += totalBeforeVAT;
                TotaliPaTVSH8 += totalBeforeVAT - vatAmount;

                if (regjistrimet.LlojiKalkulimit.Equals("OFERTE") || regjistrimet.LlojiKalkulimit.Equals("FAT") || regjistrimet.LlojiKalkulimit.Equals("FL"))
                {
                    Rabati += Convert.ToDecimal((teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) +
                              (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100) +
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100) -
                                (teDhenat.QmimiShites - teDhenat.QmimiShites * (teDhenat.Rabati1 / 100)) * (teDhenat.Rabati2 / 100)) * (teDhenat.Rabati3 / 100)) * teDhenat.SasiaStokut);
                }
                else
                {

                    Rabati += Convert.ToDecimal((teDhenat.QmimiBleres * teDhenat.SasiaStokut) * rabati / 100);
                }
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
        public async Task<IActionResult> GetRegjistrimi(int IDRegjistrimit)
        {
            var teDhenat = await _context.TeDhenatFaturat
                .Where(x => x.IDRegjistrimit == IDRegjistrimit)
                .Select(x => new
                {
                    x.ID,
                    x.IDRegjistrimit,
                    x.IDProduktit,
                    x.Produkti.EmriProduktit,
                    x.Produkti.Barkodi,
                    x.Produkti.KodiProduktit,
                    x.SasiaStokut,
                    x.QmimiBleres,
                    x.QmimiShites,
                    x.QmimiShitesMeShumic,
                    x.Produkti.LlojiTVSH,
                    x.Rabati1,
                    x.Rabati2,
                    x.Rabati3,
                    x.Produkti.NjesiaMatese.EmriNjesiaMatese,
                    SasiaAktualeNeStok = x.Produkti.StokuQmimiProduktit.SasiaNeStok
                })
               .ToListAsync();

            return Ok(teDhenat);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("perditesoFaturen")]
        public async Task<IActionResult> PerditesoFaturen(int idKalulimit, [FromBody] Faturat fat)
        {
            var fatura = await _context.Faturat.FindAsync(idKalulimit);
            if (fatura == null)
            {
                return NotFound();
            }

            fatura.Rabati = fat.Rabati;
            fatura.NrFatures = fat.NrFatures;
            fatura.NrRendorFatures = fat.NrRendorFatures;
            fatura.StatusiPageses = fat.StatusiPageses;
            fatura.StatusiKalkulimit = fat.StatusiKalkulimit;
            fatura.IDPartneri = fat.IDPartneri;
            fatura.LlojiKalkulimit = fat.LlojiKalkulimit;
            fatura.LlojiPageses = fat.LlojiPageses;
            fatura.PershkrimShtese = fat.PershkrimShtese;
            fatura.StafiID = fat.StafiID;
            fatura.TotaliPaTVSH = fat.TotaliPaTVSH;
            fatura.TVSH = fat.TVSH;
            fatura.DataRegjistrimit = fat.DataRegjistrimit;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(fatura);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("ruajKalkulimin")]
        public async Task<IActionResult> Post(Faturat regjistrimet)
        {
            await _context.Faturat.AddAsync(regjistrimet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", regjistrimet.IDRegjistrimit, regjistrimet);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPost]
        [Route("ruajKalkulimin/teDhenat")]
        public async Task<IActionResult> Post(TeDhenatFaturat teDhenat)
        {
            await _context.TeDhenatFaturat.AddAsync(teDhenat);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpDelete]
        [Route("ruajKalkulimin/FshijTeDhenat")]
        public async Task<IActionResult> Delete(int idTeDhenat)
        {
            var produkti = await _context.TeDhenatFaturat.FirstOrDefaultAsync(x => x.ID == idTeDhenat);

            if (produkti == null)
                return BadRequest("Invalid id");

            _context.TeDhenatFaturat.Remove(produkti);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpDelete]
        [Route("ruajKalkulimin/FshijTeDhenatNgaIdKalkulimit")]
        public async Task<IActionResult> DeleteByIdKalkulimi(int idKalkulimi)
        {
            var teDhenatKalkulimi = await _context.TeDhenatFaturat.Where(x => x.IDRegjistrimit == idKalkulimi).ToListAsync();

            if (teDhenatKalkulimi == null)
                return BadRequest("Invalid id");

            foreach (var produkti in teDhenatKalkulimi)
            {
                _context.TeDhenatFaturat.Remove(produkti);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpPut]
        [Route("ruajKalkulimin/PerditesoTeDhenat")]
        public async Task<IActionResult> Put(int id, [FromBody] TeDhenatFaturat teDhenat)
        {
            var produkti = await _context.TeDhenatFaturat.FindAsync(id);
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
            var produkti = await _context.StokuQmimiProduktit.FindAsync(id);
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
            var kalkulimi = await _context.TeDhenatFaturat
                .Where(x => x.ID == idKalkulimit)
                .Select(x => new
                {
                    x.ID,
                    x.IDRegjistrimit,
                    x.IDProduktit,
                    x.Produkti.EmriProduktit,
                    x.Produkti.Barkodi,
                    x.Produkti.KodiProduktit,
                    x.SasiaStokut,
                    x.Produkti.StokuQmimiProduktit.SasiaNeStok,
                    x.Produkti.StokuQmimiProduktit.QmimiMeShumic,
                    x.Produkti.StokuQmimiProduktit.QmimiProduktit,
                    x.Produkti.SasiaShumices,
                    x.QmimiBleres,
                    x.QmimiShites,
                    x.QmimiShitesMeShumic,
                    x.Produkti.LlojiTVSH,
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
            var kalkulimi = await _context.Faturat.FindAsync(id);
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
            var nrFatures = await _context.Faturat
                .Where(x => x.LlojiKalkulimit == llojiKalkulimit)
                .OrderByDescending(x => x.IDRegjistrimit)
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
            var kalkulimi = await _context.Faturat.FirstOrDefaultAsync(x => x.IDRegjistrimit == idKalkulimi);
            var teDhenatKalkulimit = await _context.TeDhenatFaturat.Where(x => x.IDRegjistrimit == idKalkulimi).ToListAsync();

            foreach (var teDhenat in teDhenatKalkulimit)
            {
                _context.TeDhenatFaturat.Remove(teDhenat);
            }

            _context.Faturat.Remove(kalkulimi);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("fshijKalkulimin/perditesoStokunQmimin")]
        public async Task<IActionResult> fshijKalkuliminPerditesoStokun(int idKalkulimi, int idProdukti, int idTeDhenatKalkulimit)
        {
            var secondLatestTeDhenat = await _context.TeDhenatFaturat
            .Where(x => x.IDProduktit == idProdukti && x.IDRegjistrimit != idKalkulimi && x.Faturat.StatusiKalkulimit == "true")
            .OrderByDescending(x => x.ID)
            .Take(1) // Take only one record (the second latest)
            .Select(x => new
            {
                x.ID,
                x.IDRegjistrimit,
                x.IDProduktit,
                x.Produkti.EmriProduktit,
                x.SasiaStokut,
                x.QmimiBleres,
                x.QmimiShites,
                x.QmimiShitesMeShumic,
                x.Rabati1,
                x.Rabati2,
                x.Rabati3,
            })
            .SingleOrDefaultAsync(); // Use SingleOrDefaultAsync to retrieve one record


            var produktiNeKalkulim = await _context.TeDhenatFaturat.FirstOrDefaultAsync(x => x.ID == idTeDhenatKalkulimit);


            var produkti = await _context.StokuQmimiProduktit.FindAsync(idProdukti);

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
            var produktiNeKalkulim = await _context.TeDhenatFaturat.FirstOrDefaultAsync(x => x.ID == idTeDhenatKalkulimit);


            var produkti = await _context.StokuQmimiProduktit.FindAsync(idProdukti);

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

            _context.StokuQmimiProduktit.Update(produkti);
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
            var produkti = await _context.StokuQmimiProduktit.FindAsync(id);
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
