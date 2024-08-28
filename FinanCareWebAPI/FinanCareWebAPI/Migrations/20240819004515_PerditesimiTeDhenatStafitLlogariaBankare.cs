using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimiTeDhenatStafitLlogariaBankare : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Banka",
                table: "TeDhenatPerdoruesit",
                newName: "BankaID");

            migrationBuilder.CreateIndex(
                name: "IX_TeDhenatPerdoruesit_BankaID",
                table: "TeDhenatPerdoruesit",
                column: "BankaID");

            migrationBuilder.AddForeignKey(
                name: "FK_TeDhenatPerdoruesit_Bankat_BankaID",
                table: "TeDhenatPerdoruesit",
                column: "BankaID",
                principalTable: "Bankat",
                principalColumn: "BankaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeDhenatPerdoruesit_Bankat_BankaID",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropIndex(
                name: "IX_TeDhenatPerdoruesit_BankaID",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.RenameColumn(
                name: "BankaID",
                table: "TeDhenatPerdoruesit",
                newName: "Banka");
        }
    }
}
