using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimiEmritBankaveEmriKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IDTeDhenatBankat",
                table: "LlogaritEBiznesit",
                newName: "IDLlogariaBankare");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IDLlogariaBankare",
                table: "LlogaritEBiznesit",
                newName: "IDTeDhenatBankat");
        }
    }
}
