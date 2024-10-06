using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinanCareWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Vendosjaetedhenavekryesorepersistemin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
    table: "AspNetRoles",
    columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
    values: new object[,]
    {
        { "514b7bb5-7733-4d1e-9920-c4556c87ad97", "Financa", "FINANCA", "a12358d2-d691-46b5-a400-45f4e6561a5a" },
        { "64e367f5-18d9-4e1e-b464-50c1b2f7ad37", "Mbeshtetje e Klientit", "MBESHTETJE E KLIENTIT", "db64a094-025e-43d2-b1ff-6ecebafe23d2" },
        { "66ac7eb5-abad-447e-81c6-2d333572c847", "Qmimore", "QMIMORE", "a33a7870-8f7a-4d66-9c95-b3fac891f785" },
        { "679d19c9-c4f9-42f3-855f-1435d0f4a201", "Faturist", "FATURIST", "ccafbdee-b37b-489a-8eb6-783d3db05b0d" },
        { "6fc1148e-60b4-495b-a5e0-6979dee73436", "Puntor i Thjeshte", "PUNTOR I THJESHTE", "acb37c93-91f5-40cb-8908-36761ecdc400" },
        { "730c0aed-158a-421e-9fe3-7354a4915b4c", "Burime Njerzore", "BURIME NJERZORE", "29cc6cdb-cd61-4ca4-b703-dd5a915a6cf0" },
        { "a75a93f5-b3a5-4215-b983-2fd6234d3c8e", "Komercialist", "KOMERCIALIST", "70f4442e-f2c7-4bb1-ae83-0f6b85b1030a" },
        { "a91804e4-cf30-44cf-8817-fac24f5faeae", "Kalkulant", "KALKULANT", "61f9183a-be56-4628-b365-9e275c2e961d" },
        { "be4b8ef8-abf0-454c-852c-676cdab20e3b", "User", "USER", "264000ea-9d66-4686-b48b-e06165a906fc" },
        { "db3dd60d-a159-4f85-a9a5-d1444ee1013d", "Menaxher", "MENAXHER", "3e215a86-6eeb-48a6-90d9-fe12a7a70f28" },
        { "ea70e8ed-81a0-4cbf-8726-93ca6fe59a23", "Arkatar", "ARKATAR", "34436c94-0d46-46ac-a9ac-64f62ac579b4" }
    });
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount" },
                values: new object[,]
                {
        { "1545403d-e285-4247-812d-2c7cd81c80f4", "arkatar.arkatar", "ARKATAR.ARKATAR", "arkatar.arkatar@financare.com", "ARKATAR.ARKATAR@FINANCARE.COM", false, "AQAAAAEAACcQAAAAENR/nFR3o0tT/SpbY54Co0WWoxWLv9Lzqsp/CGr9XdjZ/clq0QbQiiMZSR2zLbKYKQ==", "HZSEG5KQF5AIXLALZZQBGBCZJJJ7QC6I", "b49cbfdb-820c-4df2-a435-2d9e5a449bb8", "+38344123456", false, false, null, true, 0 },
        { "7553cfb4-093e-428c-ae2f-68aea8b8767a", "financa.financa", "FINANCA.FINANCA", "financa.financa@financare.com", "FINANCA.FINANCA@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEFtpleq07mtta7xasI6UD9vq6Y82J0GwYUnhzwLnGEJNEapjmUK4pOI2jeyyP0if1w==", "JFUF2AFOE3VCHXH4ECOGJSXIFTPSWPQZ", "2bf6aee1-e6de-4a89-9d51-0e0bcdfbfb8d", "+38344123456", false, false, null, true, 0 },
        { "8c3e98d7-f7cc-45c2-bf09-3bc3dfb89e5c", "puntor.thjeshte", "PUNTOR.THJESHTE", "puntor.thjeshte@financare.com", "PUNTOR.THJESHTE@FINANCARE.COM", false, "AQAAAAEAACcQAAAAELOnOPnFvOVJ0fzGbKdBj15kLvUgETtzgMHzKtnamff4n8pEUvRq2EAhxTbAkH6Y4w==", "V2IS4SMJQ2BK4JCRGY2CFHBNHJ5MYBO3", "4fbfc099-f066-4c91-8051-c4e74c67403f", "+38344123456", false, false, null, true, 0 },
        { "a62e8d51-48fa-44af-b70e-d9f3b01591e7", "menaxher.menaxher", "MENAXHER.MENAXHER", "menaxher.menaxher@financare.com", "MENAXHER.MENAXHER@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEM787no6o/qmE0NxPpA8q8fD5wdkJnU4+cWHcMwC6o5v0rgSUh7fIEDVTf43OOjQSg==", "ZFKAJS5CFYGKSYUSOGXEFPIGGIYPTVRL", "dd3dbde5-a09d-4762-88e5-746630538f25", "+38344123456", false, false, null, true, 0 },
        { "c8f9f05e-3d2f-407b-b082-f5405fd97d9c", "mbeshtetje.klientit", "MBESHTETJE.KLIENTIT", "mbeshtetje.klientit@financare.com", "MBESHTETJE.KLIENTIT@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEGvIHxztRzV2W5xNIGLnBIdb4kplt+pKEAtPwRI3+weuudHWYeymXISHENZfcdN7Tg==", "7E5QTAGIXY7PXCEQZ4VLBTUOHLHIJDOT", "20fdcec7-a7b4-4022-9d3c-0a9c9e914225", "+38344123456", false, false, null, true, 0 },
        { "d677de99-762e-430a-abee-0c48c6595b58", "burime.njerzore", "BURIME.NJERZORE", "burime.njerzore@financare.com", "BURIME.NJERZORE@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEBCQGgM8DcQ3RZY8F3L6VJToDyHzB0KM7ET/S/h5+n6AwzENNzorSIwKcW/OEmTZFw==", "YXNSR47VEH7WYWUDQYM3GXAIETXKGBZH", "dfff55b5-da42-43c9-88e6-55ae80841b7b", "+38344123456", false, false, null, true, 0 },
        { "d833b2ff-e681-4266-8c99-792c54a93ef1", "komercialist.komercialist", "KOMERCIALIST.KOMERCIALIST", "komercialist.komercialist@financare.com", "KOMERCIALIST.KOMERCIALIST@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEOC5hPEvjUF7ToxB6T+Nd8bYONKgXR3VhUo+OGHCHUyBmOT4LZZZkuZqlifRQc2Z2w==", "KWNR6BXX2MYNDZEQQICABNY6V2KGEISV", "ba2cc0b6-be99-4229-96f5-3589942b858b", "+38344123456", false, false, null, true, 0 },
        { "d8918bff-7926-456f-bec0-cf3356a62824", "qmimore.qmimore", "QMIMORE.QMIMORE", "qmimore.qmimore@financare.com", "QMIMORE.QMIMORE@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEJlYRvbOR+Wra3z7s0yxDLBSuI9wMLf5TKUIOk5BsBGjnnkgZhvVFX2Ui6jsH7wRGQ==", "2C6FP5XXUUF2MUML6UVH6FSHQ7AH2KUG", "afb80062-a616-48c2-89cf-76f42ebb0fe0", "+38344123456", false, false, null, true, 0 },
        { "e3a0fcb7-296a-4458-aad5-ef1143205642", "kalkulant.kalkulant", "KALKULANT.KALKULANT", "kalkulant.kalkulant@financare.com", "KALKULANT.KALKULANT@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEO5JlCd0RD33NUUMMt4GhizK3gCQkxj6ZZenZe4ljep1NGPt6plFO0MaXEzPFf9/rw==", "JGAPOQDNFFHO5IBNNSSAHFWCEJRQFQA4", "cdd454d6-6776-4ba6-a5e3-76e27bd363d3", "+38344123456", false, false, null, true, 0 },
        { "f6c341aa-79e4-42fb-bcd1-be031b7d8357", "faturist.faturist", "FATURIST.FATURIST", "faturist.faturist@financare.com", "FATURIST.FATURIST@FINANCARE.COM", false, "AQAAAAEAACcQAAAAEGC2cHyofurlLcCUwVQlLlwyrEn/NkS3MBhlYVA2XgRh1/n/SwMxXTethQHoGQW/0g==", "GYZYC76TVRDXGPQWIXWKX23IAYPCNKVM", "7b3dc7b0-9a5c-41a2-8bcd-078364773b8d", "+38344123456", false, false, null, true, 0 }
                });
            migrationBuilder.InsertData(
    table: "AspNetUserRoles",
    columns: new[] { "UserId", "RoleId" },
    values: new object[,]
    {
        { "7553cfb4-093e-428c-ae2f-68aea8b8767a", "514b7bb5-7733-4d1e-9920-c4556c87ad97" },
        { "c8f9f05e-3d2f-407b-b082-f5405fd97d9c", "64e367f5-18d9-4e1e-b464-50c1b2f7ad37" },
        { "d8918bff-7926-456f-bec0-cf3356a62824", "66ac7eb5-abad-447e-81c6-2d333572c847" },
        { "f6c341aa-79e4-42fb-bcd1-be031b7d8357", "679d19c9-c4f9-42f3-855f-1435d0f4a201" },
        { "8c3e98d7-f7cc-45c2-bf09-3bc3dfb89e5c", "6fc1148e-60b4-495b-a5e0-6979dee73436" },
        { "d677de99-762e-430a-abee-0c48c6595b58", "730c0aed-158a-421e-9fe3-7354a4915b4c" },
        { "d833b2ff-e681-4266-8c99-792c54a93ef1", "a75a93f5-b3a5-4215-b983-2fd6234d3c8e" },
        { "e3a0fcb7-296a-4458-aad5-ef1143205642", "a91804e4-cf30-44cf-8817-fac24f5faeae" },
        { "1545403d-e285-4247-812d-2c7cd81c80f4", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "7553cfb4-093e-428c-ae2f-68aea8b8767a", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "8c3e98d7-f7cc-45c2-bf09-3bc3dfb89e5c", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "a62e8d51-48fa-44af-b70e-d9f3b01591e7", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "c8f9f05e-3d2f-407b-b082-f5405fd97d9c", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "d677de99-762e-430a-abee-0c48c6595b58", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "d833b2ff-e681-4266-8c99-792c54a93ef1", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "d8918bff-7926-456f-bec0-cf3356a62824", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "e3a0fcb7-296a-4458-aad5-ef1143205642", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "f6c341aa-79e4-42fb-bcd1-be031b7d8357", "be4b8ef8-abf0-454c-852c-676cdab20e3b" },
        { "a62e8d51-48fa-44af-b70e-d9f3b01591e7", "db3dd60d-a159-4f85-a9a5-d1444ee1013d" },
        { "1545403d-e285-4247-812d-2c7cd81c80f4", "ea70e8ed-81a0-4cbf-8726-93ca6fe59a23" }
    });

            migrationBuilder.InsertData(
                table: "Perdoruesi",
                columns: new[] { "UserID", "Emri", "Mbiemri", "Email", "Username", "AspNetUserID" },
                values: new object[,]
                {
        { 1, "Financa", "Financa", "financa.financa@financare.com", "financa.financa", "7553cfb4-093e-428c-ae2f-68aea8b8767a" },
        { 2, "Mbeshtetje", "Klientit", "mbeshtetje.klientit@financare.com", "mbeshtetje.klientit", "c8f9f05e-3d2f-407b-b082-f5405fd97d9c" },
        { 3, "Qmimore", "Qmimore", "qmimore.qmimore@financare.com", "qmimore.qmimore", "d8918bff-7926-456f-bec0-cf3356a62824" },
        { 4, "Faturist", "Faturist", "faturist.faturist@financare.com", "faturist.faturist", "f6c341aa-79e4-42fb-bcd1-be031b7d8357" },
        { 5, "Puntor", "Thjeshte", "puntor.thjeshte@financare.com", "puntor.thjeshte", "8c3e98d7-f7cc-45c2-bf09-3bc3dfb89e5c" },
        { 6, "Burime", "Njerzore", "burime.njerzore@financare.com", "burime.njerzore", "d677de99-762e-430a-abee-0c48c6595b58" },
        { 7, "Komercialist", "Komercialist", "komercialist.komercialist@financare.com", "komercialist.komercialist", "d833b2ff-e681-4266-8c99-792c54a93ef1" },
        { 8, "Kalkulant", "Kalkulant", "kalkulant.kalkulant@financare.com", "kalkulant.kalkulant", "e3a0fcb7-296a-4458-aad5-ef1143205642" },
        { 9, "Menaxher", "Menaxher", "menaxher.menaxher@financare.com", "menaxher.menaxher", "a62e8d51-48fa-44af-b70e-d9f3b01591e7" },
        { 10, "Arkatar", "Arkatar", "arkatar.arkatar@financare.com", "arkatar.arkatar", "1545403d-e285-4247-812d-2c7cd81c80f4" }
                });
            migrationBuilder.InsertData(
    table: "Bankat",
    columns: new[] { "BankaID", "EmriBankes", "LokacioniBankes", "isDeleted" },
    values: new object[,]
    {
        { 1, "NLB Banka SH. A.", "Kombetare", "false" },
        { 2, "Raiffeisen Bank Kosovo", "Kombetare", "false" },
        { 3, "Banka për Biznes", "Kombetare", "false" },
        { 4, "Banka Ekonomike", "Kombetare", "false" },
        { 5, "ProCredit Bank", "Kombetare", "false" }
    });

            migrationBuilder.InsertData(
                table: "TeDhenatPerdoruesit",
                columns: new[] { "UserID", "NrKontaktit", "Adresa", "BankaID", "DataFillimitKontrates", "DataMbarimitKontrates", "Datelindja", "EmailPrivat", "EshtePuntorAktive", "Kualifikimi", "NrPersonal", "NumriLlogarisBankare", "Paga", "Profesioni", "Specializimi" },
                values: new object[,]
                {
        { 1, "+38344123456", "P.A.", 4, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 2, "+38344123456", "P.A.", 1, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 3, "+38344123456", "P.A.", 5, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 4, "+38344123456", "P.A.", 5, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 5, "+38344123456", "P.A.", 2, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 6, "+38344123456", "P.A.", 3, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 7, "+38344123456", "P.A.", 2, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 8, "+38344123456", "P.A.", 4, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 9, "+38344123456", "P.A.", 3, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." },
        { 10, "+38344123456", "P.A.", 3, new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), new DateTime(1900, 9, 1), "email@domain.com", "true", "P.K.", "1122334455", "1290012345678900", 99999.99, "P.P.", "P.S." }
                });

            migrationBuilder.InsertData(
    table: "GrupiProduktit",
    columns: new[] { "IDGrupiProduktit", "GrupiIProduktit", "isDeleted" },
    values: new object[,]
    {
        { 1, "Ushqimore", "false" },
        { 2, "Plastika", "false" },
        { 3, "Auto Kozmetik", "false" },
        { 4, "Kozmetik", "false" },
        { 5, "Higjen", "false" },
        { 6, "Duhan", "false" },
        { 7, "Bujqesore", "false" },
        { 8, "Pije Alkolike", "false" }
    });
            migrationBuilder.InsertData(
                table: "Kartelat",
                columns: new[] { "IDKartela", "KodiKartela", "LlojiKarteles", "Rabati", "StafiID", "PartneriID", "DataKrijimit" },
                values: new object[,]
                {
        { 1, "M000009000001", "Fshirje", null, 9, null, new DateTime(1900, 9, 1) }
                });
            migrationBuilder.InsertData(
    table: "LlogaritEBiznesit",
    columns: new[] { "IDLlogariaBankare", "NumriLlogaris", "AdresaBankes", "Valuta", "BankaID" },
    values: new object[,]
    {
        { 1, "1290012345678900", "P.A.", "Euro", 4 },
        { 2, "1290012345678900", "P.A.", "Dollar", 5 },
        { 3, "1290012345678900", "P.A.", "Franga Zvicerane", 2 }
    });
            migrationBuilder.InsertData(
                table: "NjesiaMatese",
                columns: new[] { "IDNjesiaMatese", "EmriNjesiaMatese", "isDeleted" },
                values: new object[,]
                {
        { 1, "Bidon", "false" },
        { 2, "Copë", "false" },
        { 3, "Kg", "false" },
        { 4, "Gr", "false" },
        { 5, "Komplet", "false" },
        { 6, "Litër", "false" },
        { 7, "Pako", "false" },
        { 8, "Set", "false" },
        { 9, "Shtek", "false" },
        { 10, "Thes", "false" }
                });
            migrationBuilder.InsertData(
                table: "Partneri",
                columns: new[] { "IDPartneri", "EmriBiznesit", "NUI", "NRF", "TVSH", "Email", "Adresa", "NrKontaktit", "LlojiPartnerit", "ShkurtesaPartnerit", "isDeleted" },
                values: new object[,]
                {
        { 1, "Bleres Qytetar", "112233445", "112233445", "112233445", "info@financare.com", "P.A., Prishtine, 10000 Kosove", "38344111222", "B", "BQ", "false" },
        { 2, "Kthimi Mallit te Shitur", "112233445", "112233445", "112233445", "info@financare.com", "P.A., Prishtine, 10000 Kosove", "38344111222", "F", "KMSH", "false" },
        { 3, "Asgjesim i Stokut", "112233445", "112233445", "112233445", "info@financare.com", "P.A., Prishtine, 10000 Kosove", "38344111222", "F", "AS", "false" }
                });
            migrationBuilder.InsertData(
    table: "TeDhenatBiznesit",
    columns: new[] { "IDTeDhenatBiznesit", "EmriIBiznesit", "ShkurtesaEmritBiznesit", "NUI", "NF", "NrTVSH", "Adresa", "NrKontaktit", "Email", "Logo", "EmailDomain" },
    values: new object[,]
    {
        { 1, "FinanCare SH.P.K.", "FC", 112233445, 112233445, 112233445, "P.A., Prishtine, 10000 Kosove", "38344111222", "info@financare.com", "3eab0d81e6ad4923ba72501e3db224db.png", "financare.com" }
    });


        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
