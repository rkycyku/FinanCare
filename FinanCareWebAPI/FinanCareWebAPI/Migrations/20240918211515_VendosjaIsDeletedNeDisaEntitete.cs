using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class VendosjaIsDeletedNeDisaEntitete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "isDeleted",
                table: "Produkti",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "isDeleted",
                table: "Partneri",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "isDeleted",
                table: "NjesiaMatese",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "isDeleted",
                table: "GrupiProduktit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "isDeleted",
                table: "Bankat",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Produkti");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Partneri");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "NjesiaMatese");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "GrupiProduktit");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Bankat");
        }
    }
}
