using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class KrijimiIDatabazesMeEntityFramework : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GrupiProduktit",
                columns: table => new
                {
                    IDGrupiProduktit = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GrupiIProduktit = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrupiProduktit", x => x.IDGrupiProduktit);
                });

            migrationBuilder.CreateTable(
                name: "NjesiaMatese",
                columns: table => new
                {
                    IDNjesiaMatese = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriNjesiaMatese = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NjesiaMatese", x => x.IDNjesiaMatese);
                });

            migrationBuilder.CreateTable(
                name: "Partneri",
                columns: table => new
                {
                    IDPartneri = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriBiznesit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NUI = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NRF = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TVSH = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NrKontaktit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LlojiPartnerit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShkurtesaPartnerit = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partneri", x => x.IDPartneri);
                });

            migrationBuilder.CreateTable(
                name: "TeDhenatBiznesit",
                columns: table => new
                {
                    IDTeDhenatBiznesit = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriIBiznesit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShkurtesaEmritBiznesit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NUI = table.Column<int>(type: "int", nullable: true),
                    NF = table.Column<int>(type: "int", nullable: true),
                    NrTVSH = table.Column<int>(type: "int", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NrKontaktit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeDhenatBiznesit", x => x.IDTeDhenatBiznesit);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Perdoruesi",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mbiemri = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AspNetUserID = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perdoruesi", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Perdoruesi_AspNetUsers_AspNetUserID",
                        column: x => x.AspNetUserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Produkti",
                columns: table => new
                {
                    ProduktiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriProduktit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IDPartneri = table.Column<int>(type: "int", nullable: true),
                    IDNjesiaMatese = table.Column<int>(type: "int", nullable: true),
                    Barkodi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KodiProduktit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LlojiTVSH = table.Column<int>(type: "int", nullable: true),
                    IDGrupiProduktit = table.Column<int>(type: "int", nullable: true),
                    SasiaShumices = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produkti", x => x.ProduktiID);
                    table.ForeignKey(
                        name: "FK_Produkti_GrupiProduktit_IDGrupiProduktit",
                        column: x => x.IDGrupiProduktit,
                        principalTable: "GrupiProduktit",
                        principalColumn: "IDGrupiProduktit");
                    table.ForeignKey(
                        name: "FK_Produkti_NjesiaMatese_IDNjesiaMatese",
                        column: x => x.IDNjesiaMatese,
                        principalTable: "NjesiaMatese",
                        principalColumn: "IDNjesiaMatese");
                    table.ForeignKey(
                        name: "FK_Produkti_Partneri_IDPartneri",
                        column: x => x.IDPartneri,
                        principalTable: "Partneri",
                        principalColumn: "IDPartneri");
                });

            migrationBuilder.CreateTable(
                name: "Faturat",
                columns: table => new
                {
                    IDRegjistrimit = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataRegjistrimit = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StafiID = table.Column<int>(type: "int", nullable: true),
                    TotaliPaTVSH = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TVSH = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    IDPartneri = table.Column<int>(type: "int", nullable: true),
                    StatusiPageses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LlojiPageses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LlojiKalkulimit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NrFatures = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StatusiKalkulimit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PershkrimShtese = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    NrRendorFatures = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Faturat", x => x.IDRegjistrimit);
                    table.ForeignKey(
                        name: "FK_Faturat_Partneri_IDPartneri",
                        column: x => x.IDPartneri,
                        principalTable: "Partneri",
                        principalColumn: "IDPartneri");
                    table.ForeignKey(
                        name: "FK_Faturat_Perdoruesi_StafiID",
                        column: x => x.StafiID,
                        principalTable: "Perdoruesi",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "Porosit",
                columns: table => new
                {
                    IDPorosia = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotaliPorosis = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DataPorosis = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StatusiPorosis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IDPartneri = table.Column<int>(type: "int", nullable: true),
                    TotaliProdukteve = table.Column<int>(type: "int", nullable: true),
                    IDStafi = table.Column<int>(type: "int", nullable: true),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ExtraRabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ExtraRabati2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    LlojiPageses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pagesa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Porosit", x => x.IDPorosia);
                    table.ForeignKey(
                        name: "FK_Porosit_Partneri_IDPartneri",
                        column: x => x.IDPartneri,
                        principalTable: "Partneri",
                        principalColumn: "IDPartneri");
                    table.ForeignKey(
                        name: "FK_Porosit_Perdoruesi_IDStafi",
                        column: x => x.IDStafi,
                        principalTable: "Perdoruesi",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "TeDhenatPerdoruesit",
                columns: table => new
                {
                    UserID = table.Column<int>(type: "int", nullable: false),
                    NrKontaktit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Qyteti = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ZipKodi = table.Column<int>(type: "int", nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Shteti = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeDhenatPerdoruesit", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_TeDhenatPerdoruesit_Perdoruesi_UserID",
                        column: x => x.UserID,
                        principalTable: "Perdoruesi",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StokuQmimiProduktit",
                columns: table => new
                {
                    ProduktiID = table.Column<int>(type: "int", nullable: false),
                    SasiaNeStok = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    QmimiBleres = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    QmimiProduktit = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    DataKrijimit = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataPerditsimit = table.Column<DateTime>(type: "datetime2", nullable: true),
                    QmimiMeShumic = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StokuQmimiProduktit", x => x.ProduktiID);
                    table.ForeignKey(
                        name: "FK_StokuQmimiProduktit_Produkti_ProduktiID",
                        column: x => x.ProduktiID,
                        principalTable: "Produkti",
                        principalColumn: "ProduktiID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ZbritjaQmimitProduktit",
                columns: table => new
                {
                    ProduktiID = table.Column<int>(type: "int", nullable: false),
                    DataZbritjes = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataSkadimit = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZbritjaQmimitProduktit", x => x.ProduktiID);
                    table.ForeignKey(
                        name: "FK_ZbritjaQmimitProduktit_Produkti_ProduktiID",
                        column: x => x.ProduktiID,
                        principalTable: "Produkti",
                        principalColumn: "ProduktiID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeDhenatFaturat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDRegjistrimit = table.Column<int>(type: "int", nullable: true),
                    IDProduktit = table.Column<int>(type: "int", nullable: true),
                    SasiaStokut = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    QmimiBleres = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    QmimiShites = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    QmimiShitesMeShumic = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Rabati1 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Rabati2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Rabati3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeDhenatFaturat", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TeDhenatFaturat_Faturat_IDRegjistrimit",
                        column: x => x.IDRegjistrimit,
                        principalTable: "Faturat",
                        principalColumn: "IDRegjistrimit");
                    table.ForeignKey(
                        name: "FK_TeDhenatFaturat_Produkti_IDProduktit",
                        column: x => x.IDProduktit,
                        principalTable: "Produkti",
                        principalColumn: "ProduktiID");
                });

            migrationBuilder.CreateTable(
                name: "TeDhenatEPorosis",
                columns: table => new
                {
                    IDDetajet = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SasiaPorositur = table.Column<int>(type: "int", nullable: true),
                    IDPorosia = table.Column<int>(type: "int", nullable: true),
                    IDProdukti = table.Column<int>(type: "int", nullable: true),
                    QmimiProduktit = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeDhenatEPorosis", x => x.IDDetajet);
                    table.ForeignKey(
                        name: "FK_TeDhenatEPorosis_Porosit_IDPorosia",
                        column: x => x.IDPorosia,
                        principalTable: "Porosit",
                        principalColumn: "IDPorosia");
                    table.ForeignKey(
                        name: "FK_TeDhenatEPorosis_Produkti_IDProdukti",
                        column: x => x.IDProdukti,
                        principalTable: "Produkti",
                        principalColumn: "ProduktiID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Faturat_IDPartneri",
                table: "Faturat",
                column: "IDPartneri");

            migrationBuilder.CreateIndex(
                name: "IX_Faturat_StafiID",
                table: "Faturat",
                column: "StafiID");

            migrationBuilder.CreateIndex(
                name: "IX_Perdoruesi_AspNetUserID",
                table: "Perdoruesi",
                column: "AspNetUserID");

            migrationBuilder.CreateIndex(
                name: "IX_Porosit_IDPartneri",
                table: "Porosit",
                column: "IDPartneri");

            migrationBuilder.CreateIndex(
                name: "IX_Porosit_IDStafi",
                table: "Porosit",
                column: "IDStafi");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_IDGrupiProduktit",
                table: "Produkti",
                column: "IDGrupiProduktit");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_IDNjesiaMatese",
                table: "Produkti",
                column: "IDNjesiaMatese");

            migrationBuilder.CreateIndex(
                name: "IX_Produkti_IDPartneri",
                table: "Produkti",
                column: "IDPartneri");

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatEPorosis_IDPorosia",
                table: "TeDhenatEPorosis",
                column: "IDPorosia");

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatEPorosis_IDProdukti",
                table: "TeDhenatEPorosis",
                column: "IDProdukti");

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatFaturat_IDProduktit",
                table: "TeDhenatFaturat",
                column: "IDProduktit");

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatFaturat_IDRegjistrimit",
                table: "TeDhenatFaturat",
                column: "IDRegjistrimit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "StokuQmimiProduktit");

            migrationBuilder.DropTable(
                name: "TeDhenatBiznesit");

            migrationBuilder.DropTable(
                name: "TeDhenatEPorosis");

            migrationBuilder.DropTable(
                name: "TeDhenatFaturat");

            migrationBuilder.DropTable(
                name: "TeDhenatPerdoruesit");

            migrationBuilder.DropTable(
                name: "ZbritjaQmimitProduktit");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Porosit");

            migrationBuilder.DropTable(
                name: "Faturat");

            migrationBuilder.DropTable(
                name: "Produkti");

            migrationBuilder.DropTable(
                name: "Perdoruesi");

            migrationBuilder.DropTable(
                name: "GrupiProduktit");

            migrationBuilder.DropTable(
                name: "NjesiaMatese");

            migrationBuilder.DropTable(
                name: "Partneri");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
