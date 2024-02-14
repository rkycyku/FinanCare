using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class KrijimiIBankave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bankat",
                columns: table => new
                {
                    BankaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmriBankes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KodiBankes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NumriLlogaris = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdresaBankes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Valuta = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bankat", x => x.BankaID);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bankat");
        }
    }
}
