using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using FinanCareWebAPI.Models;
using FinanCareWebAPI.Migrations;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("api/[controller]")]
    public class PerdoruesiController : Controller
    {
        private readonly FinanCareDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public PerdoruesiController(
            FinanCareDbContext context, 
            UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqPerdoruesit")]
        public async Task<IActionResult> Get()
        {
            var perdoruesit = await _context.Perdoruesi
                .Include(p => p.TeDhenatPerdoruesit)
                .ThenInclude(x => x.Banka)
                .ToListAsync();

            var perdoruesiList = new List<RoletEPerdoruesit>();

            foreach (var perdoruesi in perdoruesit)
            {
                var user = await _userManager.FindByIdAsync(perdoruesi.AspNetUserID);
                var roles = await _userManager.GetRolesAsync(user);

                var roletEPerdoruesit = new RoletEPerdoruesit
                {
                    Perdoruesi = perdoruesi,
                    Rolet = roles.ToList()
                };

                perdoruesiList.Add(roletEPerdoruesit);
            }

            return Ok(perdoruesiList);
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqSipasID")]
        public async Task<IActionResult> GetbyId(string idUserAspNet)
        {
            var user = await _userManager.FindByIdAsync(idUserAspNet);

            var perdoruesi = await _context.Perdoruesi
                .Include(p => p.TeDhenatPerdoruesit)
                .ThenInclude(x => x.Banka)
                .FirstOrDefaultAsync(x => x.AspNetUserID.Equals(idUserAspNet));

            var rolet = await _userManager.GetRolesAsync(user);

            var result = new
            {
                perdoruesi,
                rolet
            };

            return Ok(result);
        }

        [Authorize]
        [HttpPut]
        [Route("perditesoPerdorues/{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Perdoruesi p)
        {
            var perdouresi = await _context.Perdoruesi.FirstOrDefaultAsync(x => x.AspNetUserID == id);

            if (perdouresi == null)
            {
                return BadRequest("Perdoruesi nuk ekziston");
            }

            if (!p.Email.IsNullOrEmpty())
            {
                perdouresi.Email = p.Email;
            }
            if (!p.Emri.IsNullOrEmpty())
            {
                perdouresi.Emri = p.Emri;
            }
            if (!p.Mbiemri.IsNullOrEmpty())
            {
                perdouresi.Mbiemri = p.Mbiemri;
            }

            _context.Perdoruesi.Update(perdouresi);
            await _context.SaveChangesAsync();

            var teDhenatUser = await _context.TeDhenatPerdoruesit.FirstOrDefaultAsync(x => x.UserID == perdouresi.UserID);

            if (!p.TeDhenatPerdoruesit.Adresa.IsNullOrEmpty())
            {
                teDhenatUser.Adresa = p.TeDhenatPerdoruesit.Adresa;
            }
            if (!p.TeDhenatPerdoruesit.NrKontaktit.IsNullOrEmpty())
            {
                teDhenatUser.NrKontaktit = p.TeDhenatPerdoruesit.NrKontaktit;
            }

            _context.TeDhenatPerdoruesit.Update(teDhenatUser);
            await _context.SaveChangesAsync();

            return Ok(perdouresi);
        }

        [Authorize]
        [HttpGet]
        [Route("KontrolloEmail")]
        public async Task<IActionResult> KontrolloEmail(string email)
        {
            var perdoruesi = await _userManager.FindByEmailAsync(email);

            var emailIPerdorur = false;

            if(perdoruesi != null)
            {
                emailIPerdorur = true;
            }


            return Ok(emailIPerdorur);
        }

        [Authorize]
        [HttpPost]
        [Route("NdryshoEmail")]
        public async Task<IActionResult> NdryshoEmail(string emailIVjeter, string emailIRI)
        {
            var perdoruesi = await _userManager.FindByEmailAsync(emailIVjeter);

            if (perdoruesi == null)
            {
                return BadRequest("Perdoreusi nuk egziston");
            }

            var tokeniPerNderrimEmail = await _userManager.GenerateChangeEmailTokenAsync(perdoruesi, emailIRI);

            var emailINdryshuar = await _userManager.ChangeEmailAsync(perdoruesi, emailIRI, tokeniPerNderrimEmail);

            if (!emailINdryshuar.Succeeded)
            {
                return BadRequest("Ndodhi nje gabim gjate perditesimit te email");
            }


            return Ok(emailINdryshuar);
        }

        [Authorize]
        [HttpGet]
        [Route("KontrolloFjalekalimin")]
        public async Task<IActionResult> KontrolloFjalekalimin(string AspNetID, string fjalekalimi)
        {
            var perdoruesi = await _userManager.FindByIdAsync(AspNetID);

            var kontrolloFjalekalimin = await _userManager.CheckPasswordAsync(perdoruesi, fjalekalimi);

            return Ok(kontrolloFjalekalimin);
        }

        [Authorize]
        [HttpPost]
        [Route("NdryshoFjalekalimin")]
        public async Task<IActionResult> NdryshoFjalekalimin(string AspNetID, string fjalekalimiAktual, string fjalekalimiIRi)
        {
            var perdoruesi = await _userManager.FindByIdAsync(AspNetID);


            if (perdoruesi == null)
            {
                return BadRequest("Perdoreusi nuk egziston");
            }

            var passwodiINdryshuar = await _userManager.ChangePasswordAsync(perdoruesi, fjalekalimiAktual, fjalekalimiIRi);

            if (!passwodiINdryshuar.Succeeded)
            {
                return BadRequest("Ndodhi nje gabim gjate perditesimit te fjalekalimit");
            }


            return Ok(passwodiINdryshuar);
        }

        [Authorize]
        [HttpGet]
        [Route("GjeneroTeDhenatPerHyrje")]
        public async Task<IActionResult> GjeneroTeDhenatPerHyrje(string e, string m, string domain)
        {
            var emri = e.ToLower();
            var mbiemri = m.ToLower();

            var UsernameGjeneruar = $"{emri}.{mbiemri}";
            var EmailGjeneruar = $"{UsernameGjeneruar}@{domain.ToLower()}";

            var ekziston = await _context.Perdoruesi.Where(x => x.Email == EmailGjeneruar).ToListAsync();

            int counter = 1;
            while (ekziston.Count > 0)
            {
                UsernameGjeneruar = $"{emri}.{mbiemri}.{counter}";
                EmailGjeneruar = $"{UsernameGjeneruar}@{domain.ToLower()}";

                ekziston = await _context.Perdoruesi.Where(x => x.Email == EmailGjeneruar).ToListAsync();

                counter++;
            }

            var PasswordiGjeneruar = $"{emri}{mbiemri}1@";

            var teDhenat = new
            {
                EmailGjeneruar,
                UsernameGjeneruar,
                PasswordiGjeneruar
            };

            return Ok(teDhenat);
        }
    }

    public class RoletEPerdoruesit
    {
        public Perdoruesi Perdoruesi { get; set; }
        public List<string> Rolet { get; set; }
    }
}
