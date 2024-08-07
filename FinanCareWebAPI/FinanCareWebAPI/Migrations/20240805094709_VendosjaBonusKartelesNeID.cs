using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class VendosjaBonusKartelesNeID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IDBonusKartela",
                table: "Faturat",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Faturat_IDBonusKartela",
                table: "Faturat",
                column: "IDBonusKartela");

            migrationBuilder.AddForeignKey(
                name: "FK_Faturat_Kartelat_IDBonusKartela",
                table: "Faturat",
                column: "IDBonusKartela",
                principalTable: "Kartelat",
                principalColumn: "IDKartela");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Faturat_Kartelat_IDBonusKartela",
                table: "Faturat");

            migrationBuilder.DropIndex(
                name: "IX_Faturat_IDBonusKartela",
                table: "Faturat");

            migrationBuilder.DropColumn(
                name: "IDBonusKartela",
                table: "Faturat");
        }
    }
}
