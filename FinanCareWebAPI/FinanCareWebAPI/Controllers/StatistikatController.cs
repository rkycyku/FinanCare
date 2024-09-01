using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinanCareWebAPI.Migrations;
using FinanCareWebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class StatistikatController : Controller
    {
        private readonly FinanCareDbContext _context;

        public StatistikatController(FinanCareDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("totaleTeNdryshme")]
        public async Task<IActionResult> GetTotaleTeNdryshme()
        {
            /* PERGJITHSHME */
            var totShitjevePaTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveVetemTVSHFat= await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").SumAsync(p => p.TVSH);
            var totShitjevePaTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FL").SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveVetemTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FL").SumAsync(p => p.TVSH);
            var totKlient = await _context.Partneri.Where(x => x.LlojiPartnerit == "B" || x.LlojiPartnerit == "B/F").CountAsync();
            var totProdukteve = await _context.Produkti.CountAsync();
            var totPorosive = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").CountAsync();
            /* PERGJITHSHME */

            /* DITA E SOTME */
            var totPorosiveSotme = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").Where(p => p.DataRegjistrimit == DateTime.Today).CountAsync();
            var totShitjeveSotmePaTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").Where(p => p.DataRegjistrimit == DateTime.Today).SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveSotmeVetemTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").Where(p => p.DataRegjistrimit == DateTime.Today).SumAsync(p => p.TVSH);
            var totShitjeveSotmePaTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FL").Where(p => p.DataRegjistrimit == DateTime.Today).SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveSotmeVetemTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FL").Where(p => p.DataRegjistrimit == DateTime.Today).SumAsync(p => p.TVSH);
            /* DITA E SOTME */

            /* MUJORE */
            var dataESotme = DateTime.Today;
            var ditaEPareMuajit = new DateTime(dataESotme.Year, dataESotme.Month, 1);
            var ditaEFunditMuajit = ditaEPareMuajit.AddMonths(1).AddDays(-1);

            var totPorosiveMujore = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajit && p.DataRegjistrimit <= ditaEFunditMuajit)
                .CountAsync();

            var totShitjeveMujorePaTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajit && p.DataRegjistrimit <= ditaEFunditMuajit)
                .SumAsync(p => p.TotaliPaTVSH);

            var totShitjeveMujoreVetemTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajit && p.DataRegjistrimit <= ditaEFunditMuajit)
                .SumAsync(p => p.TVSH);

            var totShitjeveMujorePaTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "Fl")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajit && p.DataRegjistrimit <= ditaEFunditMuajit)
                .SumAsync(p => p.TotaliPaTVSH);

            var totShitjeveMujoreVetemTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "Fl")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajit && p.DataRegjistrimit <= ditaEFunditMuajit)
                .SumAsync(p => p.TVSH);
            /* MUJORE */

            /* TE MEPARSHME */

            /* DITA E DJESHME */
            var ditaDjeshme = DateTime.Today.AddDays(-1);
            var totPorosiveDjeshme = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").Where(p => p.DataRegjistrimit == ditaDjeshme).CountAsync();
            var totShitjeveDjeshmePaTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").Where(p => p.DataRegjistrimit == ditaDjeshme).SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveDjeshmeVetemTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT").Where(p => p.DataRegjistrimit == ditaDjeshme).SumAsync(p => p.TVSH);
            var totShitjeveDjeshmePaTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "Fl").Where(p => p.DataRegjistrimit == ditaDjeshme).SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveDjeshmeVetemTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "Fl").Where(p => p.DataRegjistrimit == ditaDjeshme).SumAsync(p => p.TVSH);
            /* DITA E DJESHME */

            /* MUAJI I KALUAR */
            var dataMuajinKaluar = dataESotme.AddMonths(-1);
            var ditaEPareMuajitKaluar = new DateTime(dataMuajinKaluar.Year, dataMuajinKaluar.Month, 1);
            var ditaEFunditMuajitKaluar = ditaEPareMuajitKaluar.AddMonths(1).AddDays(-1);

            var totPorosiveMujoreKaluar = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajitKaluar && p.DataRegjistrimit <= ditaEFunditMuajitKaluar)
                .CountAsync();

            var totShitjeveMujoreKaluarPaTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajitKaluar && p.DataRegjistrimit <= ditaEFunditMuajitKaluar)
                .SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveMujoreKaluarVetemTVSHFat = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajitKaluar && p.DataRegjistrimit <= ditaEFunditMuajitKaluar)
                .SumAsync(p => p.TVSH);
            var totShitjeveMujoreKaluarPaTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "Fl")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajitKaluar && p.DataRegjistrimit <= ditaEFunditMuajitKaluar)
                .SumAsync(p => p.TotaliPaTVSH);
            var totShitjeveMujoreKaluarVetemTVSHFl = await _context.Faturat.Where(x => x.LlojiKalkulimit == "Fl")
                .Where(p => p.DataRegjistrimit >= ditaEPareMuajitKaluar && p.DataRegjistrimit <= ditaEFunditMuajitKaluar)
                .SumAsync(p => p.TVSH);
            /* MUAJI I KALUAR */

            /* TE MEPARSHME */

            var totalet = new
            {
                /* PERGJITHSHME */
                    TotaliShitjeve = (totShitjevePaTVSHFat + totShitjeveVetemTVSHFat) + (totShitjevePaTVSHFl - totShitjeveVetemTVSHFl),
                    TotaliKlient = totKlient,
                    TotaliProdukteve = totProdukteve,
                    TotaliPorosive = totPorosive,
                /* PERGJITHSHME */

                /* DITA E SOTME */
                    TotaliPorosiveSotme = totPorosiveSotme,
                    TotaliShitjeveSotme = totShitjeveSotmePaTVSHFat + totShitjeveSotmeVetemTVSHFat + (totShitjeveSotmePaTVSHFl - totShitjeveSotmeVetemTVSHFl),
                /* DITA E SOTME */

                /* MUJORE */
                    TotaliPorosiveKeteMuaj = totPorosiveMujore,
                    TotaliShitjeveKeteMuaj = totShitjeveMujorePaTVSHFat + totShitjeveMujoreVetemTVSHFat + (totShitjeveMujorePaTVSHFl - totShitjeveMujoreVetemTVSHFl),
                /* MUJORE */

                /* TE MEPARSHME */

                    /* DITA E DJESHME */
                        TotaliPorosiveDjeshme = totPorosiveDjeshme,
                        TotaliShitjeveDjeshme = totShitjeveDjeshmePaTVSHFat + totShitjeveDjeshmeVetemTVSHFat + (totShitjeveDjeshmePaTVSHFl - totShitjeveDjeshmeVetemTVSHFl),
                    /* DITA E DJESHME */

                    /* MUAJI I KALUAR */
                        TotaliPorosiveMuajinKaluar = totPorosiveMujoreKaluar,
                        TotaliShitjeveMuajinKaluar = totShitjeveMujoreKaluarPaTVSHFat + totShitjeveMujoreKaluarVetemTVSHFat + (totShitjeveMujoreKaluarPaTVSHFat - totShitjeveMujoreKaluarVetemTVSHFat),
                    /* MUAJI I KALUAR */

                /* TE MEPARSHME */

            };

            return Ok(totalet);
        }

        /*[Authorize(Roles = "Admin, Menaxher")]*/
        [AllowAnonymous]
        [HttpGet]
        [Route("15BleresitQytetarMeSeShumtiBlerje")]
        public async Task<IActionResult> BleresitQytetarMeSeShumtiBlerje()
        {
            var topBuyers = await _context.Partneri
                .Where(p => p.IDPartneri != 1 && p.IDPartneri != 2 && p.IDPartneri != 3)  // Exclude partner with ID 1
                .Include(x => x.Kartela)        // Include related Kartela
                .Select(p => new
                {
                    Partneri = p,
                    NumriBlerjeve = p.Faturat.Count(f => f.LlojiKalkulimit == "PARAGON"),
                    TotaliBlerjeveEuro = p.Faturat
                        .Where(f => f.LlojiKalkulimit == "PARAGON")
                        .Sum(f => f.TotaliPaTVSH + f.TVSH)
                })
                .Where(x => x.NumriBlerjeve > 0) // Only include partners with more than 0 purchases
                .OrderByDescending(x => x.TotaliBlerjeveEuro)
                .Take(15)  // Take up to 15, will return fewer if less available
                .ToListAsync();

            return Ok(topBuyers);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("15BleresitBiznesorMeSeShumtiBlerje")]
        public async Task<IActionResult> BleresitBiznesorMeSeShumtiBlerje()
        {
            var topBuyers = await _context.Partneri
                .Where(p => p.IDPartneri != 1 && p.IDPartneri != 2 && p.IDPartneri != 3)  // Exclude partner with ID 1
                .Select(p => new
                {
                    Partneri = p,
                    NumriBlerjeve = p.Faturat.Count(f => f.LlojiKalkulimit == "FAT"),
                    TotaliBlerjeveEuro = p.Faturat
                        .Where(f => f.LlojiKalkulimit == "FAT")
                        .Sum(f => f.TotaliPaTVSH + f.TVSH)
                })
                .Where(x => x.NumriBlerjeve > 0) // Only include partners with more than 0 purchases
                .OrderByDescending(x => x.TotaliBlerjeveEuro)
                .Take(15)  // Take up to 15, will return fewer if less available
                .ToListAsync();

            return Ok(topBuyers);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("ShitjetDitoreMeParagon")]
        public async Task<IActionResult> ShitjetDitoreMeParagon()
        {
            var topBuyers = await _context.Faturat
                .Where(x => x.LlojiKalkulimit == "PARAGON" && x.DataRegjistrimit == DateTime.Today) // Exclude partner with ID 1
                .Include(x => x.Stafi)
                .GroupBy(p => p.Stafi)
                .Select(g => new
                {
                    Stafi = g.Key,
                    NumriBlerjeve = g.Count(),
                    TotaliBlerjeveEuro = g.Where(x => x.LlojiKalkulimit == "PARAGON" && x.DataRegjistrimit == DateTime.Today)
                                          .Sum(f => (f.TotaliPaTVSH ?? 0) + (f.TVSH ?? 0))
                })
                .Where(x => x.NumriBlerjeve > 0) // Only include partners with more than 0 purchases
                .OrderByDescending(x => x.TotaliBlerjeveEuro)
                .Take(15)  // Take up to 15, will return fewer if less available
                .ToListAsync();

            return Ok(topBuyers);
        }





        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("15ProduktetMeTeShitura")]
        public async Task<IActionResult> GetTop15Prod()
        {
            var produktet = await _context.Produkti
                .Select(e => new
                {
                    Produkti = new
                    {
                        e.ProduktiID,
                        e.EmriProduktit,
                        e.StokuQmimiProduktit.SasiaNeStok,
                        e.StokuQmimiProduktit.QmimiBleres,
                        e.StokuQmimiProduktit.QmimiProduktit,
                        e.ZbritjaQmimitProduktit.Rabati,
                    },
                    TotaliPorosive = (e.TeDhenatFaturat.Where(x => x.Faturat.LlojiKalkulimit == "FAT").Sum(q => q.SasiaStokut) - e.TeDhenatFaturat.Where(x => x.Faturat.LlojiKalkulimit == "FL").Sum(q => q.SasiaStokut)),
                    TotaliBlerjeve = (e.TeDhenatFaturat.Where(x => x.Faturat.LlojiKalkulimit == "FAT").Sum(q => q.SasiaStokut) - e.TeDhenatFaturat.Where(x => x.Faturat.LlojiKalkulimit == "FL").Sum(q => q.SasiaStokut)) * e.StokuQmimiProduktit.QmimiProduktit,
                })
                .OrderByDescending(g => g.TotaliPorosive)
                .ThenByDescending(g => g.TotaliBlerjeve)
                .Take(15)
                .ToListAsync();

            return Ok(produktet);
        }

        [Authorize(Roles = "Admin, Menaxher")]
        [HttpGet]
        [Route("TotaletJavore")]
        public async Task<IActionResult> GetShitjetJavore()
        {
            var dataESotme = DateTime.Today;
            var dataFillimit = dataESotme; 
            var dataMbarimit = dataESotme.AddDays(-6); ; 

            int totaliPorosiveJavore = 0;
            decimal totaliShitjeveJavore = 0;

            var totaletDitore = new List<Object>();

            for (var date = dataFillimit; date >= dataMbarimit; date = date.AddDays(-1))
            {
                var totalPorosive = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                    .Where(p => p.DataRegjistrimit == date)
                    .CountAsync();

                totaliPorosiveJavore += totalPorosive;

                var totalShitjevePaTVSH = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                    .Where(p => p.DataRegjistrimit == date)
                    .SumAsync(p => p.TotaliPaTVSH);

                var totalShitjeveVetemTVSH = await _context.Faturat.Where(x => x.LlojiKalkulimit == "FAT")
                    .Where(p => p.DataRegjistrimit == date)
                    .SumAsync(p => p.TVSH);

                totaliShitjeveJavore += (decimal)(totalShitjevePaTVSH + totalShitjeveVetemTVSH);

                var totaliDitor = new
                {
                    Data = date,
                    totaliPorosiveDitore = totalPorosive,
                    totaliShitjeveDitore = (totalShitjevePaTVSH + totalShitjeveVetemTVSH)
                };

                totaletDitore.Add(totaliDitor);
            }

            var totalet = new
            {
                totaletDitore,
                TotaletJavore = new
                {
                    TotaliShitjeveJavore = totaliShitjeveJavore,
                    TotaliPorosiveJavore = totaliPorosiveJavore,
                }
            };

            return Ok(totalet);
        }

    }
}
