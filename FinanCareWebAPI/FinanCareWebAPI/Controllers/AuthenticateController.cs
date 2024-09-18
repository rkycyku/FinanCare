using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.Auth;
using FinanCareWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using FinanCareWebAPI.Migrations;

namespace WebAPI.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly FinanCareDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthenticateController(
            UserManager<IdentityUser> userManager,
           RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            FinanCareDbContext context)
        {
            _userManager = userManager; 
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        [Authorize]
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            if (ModelState.IsValid)
            {
                var perdoruesiEkziston = await _userManager.FindByEmailAsync(registerModel.Email);

                if (perdoruesiEkziston != null)
                {
                    return BadRequest(new AuthResults()
                    {
                        Result = false,
                        Errors = new List<string>()
                        {
                            "Email already exists"
                        }
                    });
                }

                var perdoruesiIRI = new IdentityUser()
                {
                    Email = registerModel.Email,
                    UserName = registerModel.Username,
                    PhoneNumber = registerModel.NrTelefonit,
                };

                var shtuarMeSukses = await _userManager.CreateAsync(perdoruesiIRI, registerModel.Password);

                if (shtuarMeSukses.Succeeded)
                {
                    await _userManager.AddToRolesAsync(perdoruesiIRI, new[] { "User", registerModel.Roli });


                    Perdoruesi perdoruesi = new Perdoruesi
                    {
                        AspNetUserID = perdoruesiIRI.Id,
                        Emri = registerModel.Name,
                        Username = perdoruesiIRI.UserName,
                        Email = perdoruesiIRI.Email,
                        Mbiemri = registerModel.LastName,
                    };
                    await _context.Perdoruesi.AddAsync(perdoruesi);
                    await _context.SaveChangesAsync();

                    TeDhenatPerdoruesit teDhenatPerdoruesit = new TeDhenatPerdoruesit
                    {
                        UserID = perdoruesi.UserID,
                        Adresa = !registerModel.Adresa.IsNullOrEmpty() ? registerModel.Adresa : null,
                        NrKontaktit = !registerModel.NrTelefonit.IsNullOrEmpty() ? registerModel.NrTelefonit : null,
                        BankaID = int.TryParse(registerModel.BankaID.ToString(), out int bankaIdValue)
              ? bankaIdValue : (int?)null,
                        DataFillimitKontrates = DateTime.TryParse(registerModel.DataFillimitKontrates.ToString(), out DateTime dataFillimit)
                            ? dataFillimit : (DateTime?)null,

                        DataMbarimitKontrates = DateTime.TryParse(registerModel.DataMbarimitKontrates.ToString(), out DateTime dataMbarimit)
                            ? dataMbarimit : (DateTime?)null,

                        Datelindja = DateTime.TryParse(registerModel.Datelindja.ToString(), out DateTime datelindja)
                 ? datelindja : (DateTime?)null,
                        EmailPrivat = !registerModel.EmailPrivat.IsNullOrEmpty() ? registerModel.EmailPrivat : null,
                        EshtePuntorAktive = !registerModel.EshtePuntorAktive.IsNullOrEmpty() ? registerModel.EshtePuntorAktive : "true",
                        Kualifikimi = !registerModel.Kualifikimi.IsNullOrEmpty() ? registerModel.Kualifikimi : null,
                        NrPersonal = !registerModel.NrPersonal.IsNullOrEmpty() ? registerModel.NrPersonal : null,
                        NumriLlogarisBankare = !registerModel.NumriLlogarisBankare.IsNullOrEmpty() ? registerModel.NumriLlogarisBankare : null,
                        Paga = decimal.TryParse(registerModel.Paga.ToString(), out decimal paga)
           ? paga : (decimal?)null,
                        Profesioni = !registerModel.Profesioni.IsNullOrEmpty() ? registerModel.Profesioni : null,
                        Specializimi = !registerModel.Specializimi.IsNullOrEmpty() ? registerModel.Specializimi : null
                    };
                    await _context.TeDhenatPerdoruesit.AddAsync(teDhenatPerdoruesit);
                    await _context.SaveChangesAsync();

                    return Ok(new AuthResults()
                    {
                        Result = true
                    });
                }
                return BadRequest(new AuthResults()
                {
                    Errors = new List<string>
                    {
                        "Server Errors"
                    },
                    Result = false
                });

            }
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LogInModel login)
        {
            if (ModelState.IsValid)
            {
                
                var useri_ekziston = await _userManager.FindByEmailAsync(login.Email);

                if(useri_ekziston == null)
                {
                    return BadRequest(new AuthResults()
                    {
                        Errors = new List<string>()
                        {
                            "Inavlid Payload"
                        },
                        Result = false
                    });
                }

                var neRregull = await _userManager.CheckPasswordAsync(useri_ekziston, login.Password);

                if (!neRregull)
                {
                    return BadRequest(new AuthResults()
                    {
                        Errors = new List<string>()
                        {
                            "Invalid Credintials"
                        },
                        Result = false
                    });
                }

                var roles = await _userManager.GetRolesAsync(useri_ekziston);

                var jwtToken = GenerateJwtToken(useri_ekziston, roles);

                return Ok(new AuthResults()
                {
                    Token = jwtToken,
                    Result = true
                });
            }

            return BadRequest(new AuthResults()
            {
                Errors = new List<String>()
                {
                    "Inavlid Payload"
                }
            });
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
        [HttpPut]
        [Route("PerditesoAksesin")]
        public async Task<IActionResult> PerditesoAksesin(string UserID, string roli)
        {
            var user = await _userManager.FindByIdAsync(UserID);

            if (user == null)
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Perdoruesi nuk ekziston!" }
                });
            }

            // Fetch all roles assigned to the user
            var userRoles = await _userManager.GetRolesAsync(user);

            // Remove all roles except "User"
            foreach (var role in userRoles)
            {
                if (role != "User")
                {
                    var removeRoleResult = await _userManager.RemoveFromRoleAsync(user, role);
                    if (!removeRoleResult.Succeeded)
                    {
                        return BadRequest(new AuthResults
                        {
                            Errors = new List<string> { $"Ndodhi nje gabim gjate heqjes se rolit {role}" }
                        });
                    }
                }
            }

            // Check if the user already has the new role
            if (await _userManager.IsInRoleAsync(user, roli))
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ky perdorues e ka kete rol!" }
                });
            }

            // Assign the new role
            var perditesoAksesin = await _userManager.AddToRoleAsync(user, roli);

            if (perditesoAksesin.Succeeded)
            {
                return Ok(new AuthResults
                {
                    Result = true
                });
            }
            else
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ndodhi nje gabim gjate perditesimit te Aksesit" }
                });
            }
        }


        [Authorize]
        [HttpPost]
        [Route("shtoRolinPerdoruesit")]
        public async Task<IActionResult> ShtoRolinPerdoruesit(string UserID, string roli)
        {
            var user = await _userManager.FindByIdAsync(UserID);

            if (user == null)
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Perdoruesi nuk ekziston!" }
                });
            }

            var perditesoAksesin = await _userManager.AddToRoleAsync(user, roli);

            if (perditesoAksesin.Succeeded)
            {

                return Ok(new AuthResults
                {
                    Result = true
                });
            }
            else if (await _userManager.IsInRoleAsync(user, roli))
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ky perdorues e ka kete role!" }
                });
            }
            else
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ndodhi nje gabim gjate perditesimit te Aksesit" }
                });
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("FshijRolinUserit")]
        public async Task<IActionResult> FshijRolinUserit(string UserID, string roli)
        {
            var perdoruesi = await _userManager.FindByIdAsync(UserID);

            if(perdoruesi == null)
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ky perdorues nuk egziston" }
                });
            }
            else
            {
                var ekzistonRoli = await _roleManager.FindByNameAsync(roli);

                if(ekzistonRoli != null)
                {
                    var eKaRolin = await _userManager.IsInRoleAsync(perdoruesi, roli);

                    if (eKaRolin == true)
                    {
                        await _userManager.RemoveFromRoleAsync(perdoruesi, roli);

                        return Ok(new AuthResults
                        {
                            Result = true
                        });
                    }
                }
                else
                {
                    return BadRequest(new AuthResults
                    {
                        Errors = new List<string> { "Ky role nuk egziston" }
                    });
                }

                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ndodhi nje gabim!" }
                });
            }

            
        }

        [Authorize]
        [HttpPost]
        [Route("shtoRolin")]
        public async Task<IActionResult> ShtoRolin(string roli)
        {
            var ekziston = await _roleManager.FindByNameAsync(roli);

            if (ekziston != null)
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ky role tashme Egziston!" }
                });
            }
            else
            {
                var role = new IdentityRole(roli); 
                var result = await _roleManager.CreateAsync(role); 

                if (result.Succeeded)
                {
                    return Ok(new AuthResults
                    {
                        Result = true
                    });
                }
                else
                {
                    return BadRequest(new AuthResults
                    {
                        Errors = new List<string> { "Ndodhi nje gabim gjate shtimit te rolit" }
                    });
                }
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("fshijRolin")]
        public async Task<IActionResult> FshijRolet(string emriRolit)
        {
            var roliEkziston = await _roleManager.FindByNameAsync(emriRolit);

            if (roliEkziston != null)
            {
                var roliUFshi = await _roleManager.DeleteAsync(roliEkziston);

                if(roliUFshi.Succeeded)
                {
                    return Ok(new AuthResults { Result = true });
                }
                else
                {
                    return BadRequest(new AuthResults
                    {
                        Errors = new List<string> { "Ndodhi nje gabim gjate fshirjes" }
                    });
                }
            }
            else
            {
                return BadRequest(new AuthResults
                {
                    Errors = new List<string> { "Ky Rol nuk egziston" }
                });
            }
        }

        [Authorize]
        [HttpGet]
        [Route("shfaqRolet")]
        public async Task<IActionResult> ShfaqRolet()
        {
            var rolet = await _roleManager.Roles.ToListAsync();

            var roletWithUsersCount = new List<object>();

            foreach (var roli in rolet)
            {
                var usersCount = await _userManager.GetUsersInRoleAsync(roli.Name);

                var roliWithUsersCount = new
                {
                    roli.Id,
                    roli.Name,
                    roli.NormalizedName,
                    roli.ConcurrencyStamp,
                    TotaliPerdoruesve = usersCount.Count
                };

                roletWithUsersCount.Add(roliWithUsersCount);
            }

            return Ok(roletWithUsersCount);
        }


        private string GenerateJwtToken(IdentityUser user, IList<string> roles)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            // Token descriptor
            var TokenDescriptor = new SecurityTokenDescriptor()
            {
                
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Email, value:user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.Now.ToUniversalTime().ToString())
                }),

                Expires = DateTime.Now.AddDays(1).AddHours(12),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            foreach (var role in roles)
            {
                TokenDescriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var token = jwtTokenHandler.CreateToken(TokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }

    }

}
