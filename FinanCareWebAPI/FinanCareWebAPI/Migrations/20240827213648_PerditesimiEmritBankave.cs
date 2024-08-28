using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimiEmritBankave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeDhenatBankat");

            migrationBuilder.CreateTable(
                name: "LlogaritEBiznesit",
                columns: table => new
                {
                    IDTeDhenatBankat = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NumriLlogaris = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdresaBankes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Valuta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LlogaritEBiznesit", x => x.IDTeDhenatBankat);
                    table.ForeignKey(
                        name: "FK_LlogaritEBiznesit_Bankat_BankaID",
                        column: x => x.BankaID,
                        principalTable: "Bankat",
                        principalColumn: "BankaID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LlogaritEBiznesit_BankaID",
                table: "LlogaritEBiznesit",
                column: "BankaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LlogaritEBiznesit");

            migrationBuilder.CreateTable(
                name: "TeDhenatBankat",
                columns: table => new
                {
                    IDTeDhenatBankat = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankaID = table.Column<int>(type: "int", nullable: false),
                    AdresaBankes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumriLlogaris = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Valuta = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeDhenatBankat", x => x.IDTeDhenatBankat);
                    table.ForeignKey(
                        name: "FK_TeDhenatBankat_Bankat_BankaID",
                        column: x => x.BankaID,
                        principalTable: "Bankat",
                        principalColumn: "BankaID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatBankat_BankaID",
                table: "TeDhenatBankat",
                column: "BankaID");
        }
    }
}
