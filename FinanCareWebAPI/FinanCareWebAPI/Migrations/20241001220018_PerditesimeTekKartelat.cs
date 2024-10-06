using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimeTekKartelat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Kartelat_StafiID",
                table: "Kartelat");

            migrationBuilder.CreateIndex(
                name: "IX_Kartelat_StafiID",
                table: "Kartelat",
                column: "StafiID",
                unique: false,
                filter: "[StafiID] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Kartelat_StafiID",
                table: "Kartelat");

            migrationBuilder.CreateIndex(
                name: "IX_Kartelat_StafiID",
                table: "Kartelat",
                column: "StafiID");
        }
    }
}
