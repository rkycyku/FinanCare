using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class PerditesimiTeDhenatStafit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Banka",
                table: "TeDhenatPerdoruesit",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataFillimitKontrates",
                table: "TeDhenatPerdoruesit",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataMbarimitKontrates",
                table: "TeDhenatPerdoruesit",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Datelindja",
                table: "TeDhenatPerdoruesit",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmailPrivat",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EshtePuntorAktive",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Kualifikimi",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NrPersonal",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumriLlogarisBankare",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Paga",
                table: "TeDhenatPerdoruesit",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Profesioni",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Specializimi",
                table: "TeDhenatPerdoruesit",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Banka",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "DataFillimitKontrates",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "DataMbarimitKontrates",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "Datelindja",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "EmailPrivat",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "EshtePuntorAktive",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "Kualifikimi",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "NrPersonal",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "NumriLlogarisBankare",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "Paga",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "Profesioni",
                table: "TeDhenatPerdoruesit");

            migrationBuilder.DropColumn(
                name: "Specializimi",
                table: "TeDhenatPerdoruesit");
        }
    }
}
