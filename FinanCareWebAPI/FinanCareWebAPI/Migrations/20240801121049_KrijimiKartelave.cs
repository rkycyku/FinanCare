using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class KrijimiKartelave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kartelat",
                columns: table => new
                {
                    IDKartela = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KodiKartela = table.Column<int>(type: "int", nullable: true),
                    LlojiKarteles = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rabati = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    StafiID = table.Column<int>(type: "int", nullable: true),
                    PartneriID = table.Column<int>(type: "int", nullable: true),
                    DataKrijimit = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kartelat", x => x.IDKartela);
                    table.ForeignKey(
                        name: "FK_Kartelat_Partneri_PartneriID",
                        column: x => x.PartneriID,
                        principalTable: "Partneri",
                        principalColumn: "IDPartneri");
                    table.ForeignKey(
                        name: "FK_Kartelat_Perdoruesi_StafiID",
                        column: x => x.StafiID,
                        principalTable: "Perdoruesi",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kartelat_PartneriID",
                table: "Kartelat",
                column: "PartneriID");

            migrationBuilder.CreateIndex(
                name: "IX_Kartelat_StafiID",
                table: "Kartelat",
                column: "StafiID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kartelat");
        }
    }
}
