using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class VendosjaTeDhenaveBaze : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new object[,]
                {
                    {"0267d4fd-5bac-4552-9930-8e528b2fec1b", "Admin", "ADMIN", "bcb0a7f8-41b2-48ce-bf39-fbc24516012e"},
                    {"1f54a8a5-6d88-4699-a816-fe4ceba1ec02", "Dev", "DEV", "05e79264-391f-4500-9b34-23aed2b36a7e"},
                    {"679d19c9-c4f9-42f3-855f-1435d0f4a201", "Faturist", "FATURIST", "ccafbdee-b37b-489a-8eb6-783d3db05b0d"},
                    {"be4b8ef8-abf0-454c-852c-676cdab20e3b", "User", "USER", "264000ea-9d66-4686-b48b-e06165a906fc"},
                    {"db3dd60d-a159-4f85-a9a5-d1444ee1013d", "Menaxher", "MENAXHER", "3e215a86-6eeb-48a6-90d9-fe12a7a70f28"},
                    {"ea70e8ed-81a0-4cbf-8726-93ca6fe59a23", "Arkatar", "ARKATAR", "34436c94-0d46-46ac-a9ac-64f62ac579b4"},
                    {"f138f8ab-7352-4b8c-96c5-568ec98b910b", "Komercialist", "KOMERCIALIST", "3c104869-00ed-45e2-aac0-c8deac19430e"}
                });

            migrationBuilder.InsertData(
               table: "AspNetUsers",
               columns: new[]
               {
                    "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail",
                    "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp",
                    "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled",
                    "LockoutEnd", "LockoutEnabled", "AccessFailedCount"
               },
               values: new object[,]
               {
                    {
                        "9d6b2651-641d-4c85-9154-99761863fc65", "user", "USER", "user@financare.com", "USER@TECHSTORE.COM", false, "AQAAAAEAACcQAAAAEFvlpjPerR25vlxvKiV9GnWzzfQGEk9LCpEfnHG/yUyyaYXsRp/sN52ZWgKNbsq1JA==", "3VINW7OQ6CJ7CZE3737G4L6WGMKBHWPT", "241f5600-e4e1-4e08-b789-9b0fc9367502", "", false, false, null, true, 0,
                    },
                    {
                        "d2a7088f-a25e-4f3f-8488-b616eeaff928", "menagjer", "MENAGJER", "menagjer@financare.com", "MENAGJER@TECHSTORE.COM", false, "AQAAAAEAACcQAAAAEP60Y+OpxVc3CPWS9NZu79pNu/KAAsxbrm8qTWpL9+ILK+Sd/3Pw4yLEas1N2TXL+g==", "2TO7IOMEDSKTLMHBALX52ICRC3HX3FNQ", "297b4ee1-133a-4ad2-8242-201592f7a43d", "", false, false, null, true, 0,
                    },
                    {
                        "f2bb7622-23ac-4c5f-8d71-00032b281e37", "admin", "ADMIN", "admin@financare.com", "ADMIN@TECHSTORE.COM", false, "AQAAAAEAACcQAAAAEAy6t6f1jILbKXRyqzSZGrR4zq/Wl8G525tgzrBsqYIG4ksRH5HySRRlJrMtzvfTug==", "RHCE5BDZYCGBDPAZQ74P3IWVFBNDWMEX", "5dd7b4ea-994f-43c2-bdfd-1bef310ebf29", "", false, false, null, true, 0,
                    }
               });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[,]
                {
                    {"f2bb7622-23ac-4c5f-8d71-00032b281e37", "0267d4fd-5bac-4552-9930-8e528b2fec1b"},
                    {"f2bb7622-23ac-4c5f-8d71-00032b281e37", "1f54a8a5-6d88-4699-a816-fe4ceba1ec02"},
                    {"f2bb7622-23ac-4c5f-8d71-00032b281e37", "679d19c9-c4f9-42f3-855f-1435d0f4a201"},
                    {"9d6b2651-641d-4c85-9154-99761863fc65", "be4b8ef8-abf0-454c-852c-676cdab20e3b"},
                    {"d2a7088f-a25e-4f3f-8488-b616eeaff928", "be4b8ef8-abf0-454c-852c-676cdab20e3b"},
                    {"f2bb7622-23ac-4c5f-8d71-00032b281e37", "be4b8ef8-abf0-454c-852c-676cdab20e3b"},
                    {"d2a7088f-a25e-4f3f-8488-b616eeaff928", "db3dd60d-a159-4f85-a9a5-d1444ee1013d"},
                    {"f2bb7622-23ac-4c5f-8d71-00032b281e37", "db3dd60d-a159-4f85-a9a5-d1444ee1013d"},
                    {"f2bb7622-23ac-4c5f-8d71-00032b281e37", "ea70e8ed-81a0-4cbf-8726-93ca6fe59a23"},
                    {"f2bb7622-23ac-4c5f-8d71-00032b281e37", "f138f8ab-7352-4b8c-96c5-568ec98b910b"}
                });

            migrationBuilder.InsertData(
               table: "Perdoruesi",
               columns: new[] { "UserID", "Emri", "Mbiemri", "Email", "Username", "AspNetUserID" },
               values: new object[,]
               {
                    { 1, "Administrator", "Administrator", "admin@financare.com", "admin", "f2bb7622-23ac-4c5f-8d71-00032b281e37" },
                    { 2, "User", "User", "user@financare.com", "user", "9d6b2651-641d-4c85-9154-99761863fc65" },
                    { 3, "Menagjer", "Menagjer", "menagjer@financare.com", "menagjer", "d2a7088f-a25e-4f3f-8488-b616eeaff928" }
               });

            migrationBuilder.InsertData(
                table: "TeDhenatPerdoruesit",
                columns: new[] { "UserID", "NrKontaktit", "Qyteti", "ZipKodi", "Adresa", "Shteti" },
                values: new object[,]
                {
                    { 1, "38344111222", "Prishtine", "10000", "P.A.", "Kosove"},
                    { 2, "38344111222", "Prishtine", "10000", "P.A.", "Kosove"},
                    { 3, "38344111222", "Prishtine", "10000", "P.A.", "Kosove"}
                });
            
            migrationBuilder.InsertData(
                table: "TeDhenatBiznesit",
                columns: new[] { "IDTeDhenatBiznesit", "EmriIBiznesit", "ShkurtesaEmritBiznesit", "NUI", "NF", "NrTVSH", "Adresa", "NrKontaktit", "Email", "Logo" },
                values: new object[,]
                {
                    { 1, "FinanCare SH.P.K.", "FC", "112233445", "112233445", "112233445", "P.A., Prishtine, 10000 Kosove", "38344111222", "info@financare.com", "PaLogo.png"}
                });

            migrationBuilder.InsertData(
                table: "NjesiaMatese",
                columns: new[] { "EmriNjesiaMatese"},
                values: new object[,]
                {
                    { "Bidon"},
                    { "Copë"},
                    { "Kg"},
                    { "Gr"},
                    { "Komplet"},
                    { "Litër"},
                    { "Pako"},
                    { "Set"},
                    { "Shtek"},
                    { "Thes"},
                    { "Tubë"},
                });

            migrationBuilder.InsertData(
                table: "GrupiProduktit",
                columns: new[] { "GrupiIProduktit" },
                values: new object[,]
                {
                    { "Ushqimore"},
                    { "Plastika"},
                    { "Auto Kozmetik"},
                    { "Kozmetik"},
                    { "Higjen"},
                    { "Duhan"},
                    { "Bujqesore"},
                    { "Pije Alkolike"}
                });

            migrationBuilder.InsertData(
                table: "Partneri",
                columns: new[] { "EmriBiznesit", "NUI", "NRF", "TVSH", "Email", "Adresa", "NrKontaktit", "LlojiPartnerit", "ShkurtesaPartnerit" },
                values: new object[,]
                {
                    { "Bleres Qytetar", "112233445", "112233445", "112233445", "info@financare.com", "P.A., Prishtine, 10000 Kosove", "38344111222", "B", "BQ"},
                    { "Kthimi Mallit te Shitur", "112233445", "112233445", "112233445", "info@financare.com", "P.A., Prishtine, 10000 Kosove", "38344111222", "F", "KMSH"},
                    { "Asgjesim i Stokut", "112233445", "112233445", "112233445", "info@financare.com", "P.A., Prishtine, 10000 Kosove", "38344111222", "F", "AS"}
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
