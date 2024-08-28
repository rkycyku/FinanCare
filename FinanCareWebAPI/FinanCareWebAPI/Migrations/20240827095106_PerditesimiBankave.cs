using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimiBankave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdresaBankes",
                table: "Bankat");

            migrationBuilder.DropColumn(
                name: "NumriLlogaris",
                table: "Bankat");

            migrationBuilder.RenameColumn(
                name: "Valuta",
                table: "Bankat",
                newName: "LokacioniBankes");

            migrationBuilder.CreateTable(
                name: "TeDhenatBankat",
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TeDhenatBankat");

            migrationBuilder.RenameColumn(
                name: "LokacioniBankes",
                table: "Bankat",
                newName: "Valuta");

            migrationBuilder.AddColumn<string>(
                name: "AdresaBankes",
                table: "Bankat",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumriLlogaris",
                table: "Bankat",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
