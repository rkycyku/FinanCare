using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimeTekTeDhenatFaturaDheBankat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeDhenatFaturat_Faturat_IDRegjistrimit",
                table: "TeDhenatFaturat");

            migrationBuilder.DropColumn(
                name: "KodiBankes",
                table: "Bankat");

            migrationBuilder.AlterColumn<int>(
                name: "IDRegjistrimit",
                table: "TeDhenatFaturat",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TeDhenatFaturat_Faturat_IDRegjistrimit",
                table: "TeDhenatFaturat",
                column: "IDRegjistrimit",
                principalTable: "Faturat",
                principalColumn: "IDRegjistrimit",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TeDhenatFaturat_Faturat_IDRegjistrimit",
                table: "TeDhenatFaturat");

            migrationBuilder.AlterColumn<int>(
                name: "IDRegjistrimit",
                table: "TeDhenatFaturat",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "KodiBankes",
                table: "Bankat",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TeDhenatFaturat_Faturat_IDRegjistrimit",
                table: "TeDhenatFaturat",
                column: "IDRegjistrimit",
                principalTable: "Faturat",
                principalColumn: "IDRegjistrimit");
        }
    }
}
