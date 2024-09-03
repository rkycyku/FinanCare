using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class KrijimiHistoraZbritjeveProduktit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Kartelat_PartneriID",
                table: "Kartelat");

            migrationBuilder.CreateTable(
                name: "HistoriaZbritjeveProduktit",
                columns: table => new
                {
                    HistoriaZbritjesProduktitID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProduktiID = table.Column<int>(type: "int", nullable: false),
                    DataZbritjes = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DataSkadimit = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoriaZbritjeveProduktit", x => x.HistoriaZbritjesProduktitID);
                    table.ForeignKey(
                        name: "FK_HistoriaZbritjeveProduktit_Produkti_ProduktiID",
                        column: x => x.ProduktiID,
                        principalTable: "Produkti",
                        principalColumn: "ProduktiID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kartelat_PartneriID",
                table: "Kartelat",
                column: "PartneriID",
                unique: true,
                filter: "[PartneriID] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HistoriaZbritjeveProduktit_ProduktiID",
                table: "HistoriaZbritjeveProduktit",
                column: "ProduktiID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HistoriaZbritjeveProduktit");

            migrationBuilder.DropIndex(
                name: "IX_Kartelat_PartneriID",
                table: "Kartelat");

            migrationBuilder.CreateIndex(
                name: "IX_Kartelat_PartneriID",
                table: "Kartelat",
                column: "PartneriID");
        }
    }
}
