using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class VendosjaEEmailDomanNeTeDhenatBiznesit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailDomain",
                table: "TeDhenatBiznesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "TeDhenatBiznesit",
                keyColumn: "IDTeDhenatBiznesit",
                keyValue: 1, 
                column: "EmailDomain", 
                value: "financare.com");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailDomain",
                table: "TeDhenatBiznesit");
        }
    }
}
