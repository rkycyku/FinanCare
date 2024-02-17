using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class LargimiITabelaveTePaNevojshme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeDhenatEPorosis");

            migrationBuilder.DropTable(
                name: "Porosit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Porosit",
                columns: table => new
                {
                    IDPorosia = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDPartneri = table.Column<int>(type: "int", nullable: true),
                    IDStafi = table.Column<int>(type: "int", nullable: true),
                    DataPorosis = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExtraRabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ExtraRabati2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    LlojiPageses = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pagesa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    StatusiPorosis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotaliPorosis = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TotaliProdukteve = table.Column<int>(type: "int", nullable: true)
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
                name: "TeDhenatEPorosis",
                columns: table => new
                {
                    IDDetajet = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDPorosia = table.Column<int>(type: "int", nullable: true),
                    IDProdukti = table.Column<int>(type: "int", nullable: true),
                    QmimiProduktit = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    SasiaPorositur = table.Column<int>(type: "int", nullable: true)
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
                name: "IX_Porosit_IDPartneri",
                table: "Porosit",
                column: "IDPartneri");

            migrationBuilder.CreateIndex(
                name: "IX_Porosit_IDStafi",
                table: "Porosit",
                column: "IDStafi");

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatEPorosis_IDPorosia",
                table: "TeDhenatEPorosis",
                column: "IDPorosia");

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatEPorosis_IDProdukti",
                table: "TeDhenatEPorosis",
                column: "IDProdukti");
        }
    }
}
