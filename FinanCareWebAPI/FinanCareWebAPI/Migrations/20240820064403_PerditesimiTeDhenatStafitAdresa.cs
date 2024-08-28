using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimiTeDhenatStafitAdresa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Qyteti",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "Shteti",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "ZipKodi",
                table: "TeDhenatPerdoruesit");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Qyteti",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Shteti",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ZipKodi",
                table: "TeDhenatPerdoruesit",
                type: "int",
                nullable: true);
        }
    }
}
