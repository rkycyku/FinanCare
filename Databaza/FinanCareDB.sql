IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'FinanCareDB')
    BEGIN
        CREATE DATABASE FinanCareDB
    END
    GO
    USE FinanCareDB
GO

IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AspNetRoleClaims_AspNetRoles_RoleId]') AND parent_object_id = OBJECT_ID(N'[dbo].[AspNetRoleClaims]'))
    ALTER TABLE [dbo].[AspNetRoleClaims] DROP CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetRoles_RoleId]') AND parent_object_id = OBJECT_ID(N'[dbo].[AspNetUserRoles]'))
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AspNetUserClaims_AspNetUsers_UserId]') AND parent_object_id = OBJECT_ID(N'[dbo].[AspNetUserClaims]'))
    ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AspNetUserLogins_AspNetUsers_UserId]') AND parent_object_id = OBJECT_ID(N'[dbo].[AspNetUserLogins]'))
    ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AspNetUserRoles_AspNetUsers_UserId]') AND parent_object_id = OBJECT_ID(N'[dbo].[AspNetUserRoles]'))
    ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_AspNetUserTokens_AspNetUsers_UserId]') AND parent_object_id = OBJECT_ID(N'[dbo].[AspNetUserTokens]'))
    ALTER TABLE [dbo].[AspNetUserTokens] DROP CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Perdoruesi_AspNetUsers]') AND parent_object_id = OBJECT_ID(N'[dbo].[Perdoruesi]'))
    ALTER TABLE [dbo].[Perdoruesi] DROP CONSTRAINT [FK_Perdoruesi_AspNetUsers];

IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Produkti_Kategoria]') AND parent_object_id = OBJECT_ID(N'[dbo].[Produkti]'))
    ALTER TABLE [dbo].[Produkti] DROP CONSTRAINT [FK_Produkti_Kategoria];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Produkti_Kompania]') AND parent_object_id = OBJECT_ID(N'[dbo].[Produkti]'))
    ALTER TABLE [dbo].[Produkti] DROP CONSTRAINT [FK_Produkti_Kompania];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_ContactForm_Perdoruesi]') AND parent_object_id = OBJECT_ID(N'[dbo].[ContactForm]'))
    ALTER TABLE [dbo].[ContactForm] DROP CONSTRAINT [FK_ContactForm_Perdoruesi];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Porosit_Klienti]') AND parent_object_id = OBJECT_ID(N'[dbo].[Porosit]'))
    ALTER TABLE [dbo].[Porosit] DROP CONSTRAINT [FK_Porosit_Klienti];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Regjistrimi_Perdoruesi]') AND parent_object_id = OBJECT_ID(N'[dbo].[RegjistrimiStokut]'))
    ALTER TABLE [dbo].[RegjistrimiStokut] DROP CONSTRAINT [FK_Regjistrimi_Perdoruesi];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Perdoruesi_TeDhenat]') AND parent_object_id = OBJECT_ID(N'[dbo].[TeDhenatPerdoruesit]'))
    ALTER TABLE [dbo].[TeDhenatPerdoruesit] DROP CONSTRAINT [FK_Perdoruesi_TeDhenat];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_TeDhenatPorosis_Porosia]') AND parent_object_id = OBJECT_ID(N'[dbo].[TeDhenatEPorosis]'))
    ALTER TABLE [dbo].[TeDhenatEPorosis] DROP CONSTRAINT [FK_TeDhenatPorosis_Porosia];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_KodiZbritjes_Produkti]') AND parent_object_id = OBJECT_ID(N'[dbo].[KodiZbritjes]'))
    ALTER TABLE [dbo].[KodiZbritjes] DROP CONSTRAINT [FK_KodiZbritjes_Produkti];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_StokuQmimiProduktit_Produkti_produktiID]') AND parent_object_id = OBJECT_ID(N'[dbo].[StokuQmimiProduktit]'))
    ALTER TABLE [dbo].[StokuQmimiProduktit] DROP CONSTRAINT [FK_StokuQmimiProduktit_Produkti_produktiID];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_TeDhenatPorosis_Produkti]') AND parent_object_id = OBJECT_ID(N'[dbo].[TeDhenatEPorosis]'))
    ALTER TABLE [dbo].[TeDhenatEPorosis] DROP CONSTRAINT [FK_TeDhenatPorosis_Produkti];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Produkti_TeDhenatRegjistrimit]') AND parent_object_id = OBJECT_ID(N'[dbo].[TeDhenatRegjistrimit]'))
    ALTER TABLE [dbo].[TeDhenatRegjistrimit] DROP CONSTRAINT [FK_Produkti_TeDhenatRegjistrimit];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_ZbritjaQmimitProduktit_Produkti_produktiID]') AND parent_object_id = OBJECT_ID(N'[dbo].[ZbritjaQmimitProduktit]'))
    ALTER TABLE [dbo].[ZbritjaQmimitProduktit] DROP CONSTRAINT [FK_ZbritjaQmimitProduktit_Produkti_produktiID];
    
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_RegjistrimiStokut_TeDhenatRegjistrimit]') AND parent_object_id = OBJECT_ID(N'[dbo].[TeDhenatRegjistrimit]'))
    ALTER TABLE [dbo].[TeDhenatRegjistrimit] DROP CONSTRAINT [FK_RegjistrimiStokut_TeDhenatRegjistrimit];
GO
ALTER TABLE [dbo].[AspNetUserTokens] DROP CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId];
ALTER TABLE [dbo].[Perdoruesi] DROP CONSTRAINT [FK_Perdoruesi_AspNetUsers];
ALTER TABLE [dbo].[AspNetUserClaims] DROP CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId];
ALTER TABLE [dbo].[AspNetUserLogins] DROP CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId];
ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId];
ALTER TABLE [dbo].[Porosit] DROP CONSTRAINT [FK_Porosia_Stafi];
ALTER TABLE [dbo].[KalkulimiIMallit] DROP CONSTRAINT [FK_Regjistrimi_Stafi];
ALTER TABLE [dbo].[TeDhenatPerdoruesit] DROP CONSTRAINT [FK_Perdoruesi_TeDhenat];
ALTER TABLE [dbo].[TeDhenatEPorosis] DROP CONSTRAINT [FK_TeDhenatPorosis_Porosia];
ALTER TABLE [dbo].[StokuQmimiProduktit] DROP CONSTRAINT [FK_StokuQmimiProduktit_Produkti_produktiID];
ALTER TABLE [dbo].[TeDhenatEPorosis] DROP CONSTRAINT [FK_TeDhenatPorosis_Produkti];
ALTER TABLE [dbo].[TeDhenatKalkulimit] DROP CONSTRAINT [FK_Produkti_TeDhenatRegjistrimit];
ALTER TABLE [dbo].[ZbritjaQmimitProduktit] DROP CONSTRAINT [FK_ZbritjaQmimitProduktit_Produkti_produktiID];
ALTER TABLE [dbo].[TeDhenatKalkulimit] DROP CONSTRAINT [FK_RegjistrimiStokut_TeDhenatRegjistrimit];
ALTER TABLE [dbo].[Porosit] DROP CONSTRAINT [FK_Porosit_Partneri];
ALTER TABLE [dbo].[Produkti] DROP CONSTRAINT [FK_Produkti_Partneri];
ALTER TABLE [dbo].[KalkulimiIMallit] DROP CONSTRAINT [FK_Kalkulimi_Partneri];
ALTER TABLE [dbo].[Produkti] DROP CONSTRAINT [FK_Produkti_NjesiaMatese];
ALTER TABLE [dbo].[Produkti] DROP CONSTRAINT [FK_Produkti_GrupiProduktit];
ALTER TABLE [dbo].[AspNetRoleClaims] DROP CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId];
ALTER TABLE [dbo].[AspNetUserRoles] DROP CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AspNetUserTokens]') AND type in (N'U'))
DROP TABLE [dbo].[AspNetUserTokens];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AspNetUsers]') AND type in (N'U'))
DROP TABLE [dbo].[AspNetUsers];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Perdoruesi]') AND type in (N'U'))
DROP TABLE [dbo].[Perdoruesi];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Porosit]') AND type in (N'U'))
DROP TABLE [dbo].[Porosit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Produkti]') AND type in (N'U'))
DROP TABLE [dbo].[Produkti];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[KalkulimiIMallit]') AND type in (N'U'))
DROP TABLE [dbo].[KalkulimiIMallit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[StokuQmimiProduktit]') AND type in (N'U'))
DROP TABLE [dbo].[StokuQmimiProduktit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TeDhenatBiznesit]') AND type in (N'U'))
DROP TABLE [dbo].[TeDhenatBiznesit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TeDhenatEPorosis]') AND type in (N'U'))
DROP TABLE [dbo].[TeDhenatEPorosis];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TeDhenatPerdoruesit]') AND type in (N'U'))
DROP TABLE [dbo].[TeDhenatPerdoruesit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TeDhenatKalkulimit]') AND type in (N'U'))
DROP TABLE [dbo].[TeDhenatKalkulimit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ZbritjaQmimitProduktit]') AND type in (N'U'))
DROP TABLE [dbo].[ZbritjaQmimitProduktit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[__EFMigrationsHistory]') AND type in (N'U'))
DROP TABLE [dbo].[__EFMigrationsHistory];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Partneri]') AND type in (N'U'))
DROP TABLE [dbo].[Partneri];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[NjesiaMatese]') AND type in (N'U'))
DROP TABLE [dbo].[NjesiaMatese];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[GrupiProduktit]') AND type in (N'U'))
DROP TABLE [dbo].[GrupiProduktit];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AspNetRoleClaims]') AND type in (N'U'))
DROP TABLE [dbo].[AspNetRoleClaims];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AspNetRoles]') AND type in (N'U'))
DROP TABLE [dbo].[AspNetRoles];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AspNetUserClaims]') AND type in (N'U'))
DROP TABLE [dbo].[AspNetUserClaims];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AspNetUserLogins]') AND type in (N'U'))
DROP TABLE [dbo].[AspNetUserLogins];
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[AspNetUserRoles]') AND type in (N'U'))
DROP TABLE [dbo].[AspNetUserRoles];
CREATE TABLE [dbo].[AspNetUserTokens] ( 
  [UserId] NVARCHAR(450) NOT NULL,
  [LoginProvider] NVARCHAR(450) NOT NULL,
  [Name] NVARCHAR(450) NOT NULL,
  [Value] NVARCHAR(MAX) NULL,
  CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([LoginProvider], [Name], [UserId])
);
CREATE TABLE [dbo].[AspNetUsers] ( 
  [Id] NVARCHAR(450) NOT NULL,
  [UserName] NVARCHAR(256) NULL,
  [NormalizedUserName] NVARCHAR(256) NULL,
  [Email] NVARCHAR(256) NULL,
  [NormalizedEmail] NVARCHAR(256) NULL,
  [EmailConfirmed] BIT NOT NULL,
  [PasswordHash] NVARCHAR(MAX) NULL,
  [SecurityStamp] NVARCHAR(MAX) NULL,
  [ConcurrencyStamp] NVARCHAR(MAX) NULL,
  [PhoneNumber] NVARCHAR(MAX) NULL,
  [PhoneNumberConfirmed] BIT NOT NULL,
  [TwoFactorEnabled] BIT NOT NULL,
  [LockoutEnd] DATETIMEOFFSET NULL,
  [LockoutEnabled] BIT NOT NULL,
  [AccessFailedCount] INT NOT NULL,
  CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);
CREATE TABLE [dbo].[Perdoruesi] ( 
  [userID] INT IDENTITY NOT NULL,
  [emri] VARCHAR(30) NULL,
  [mbiemri] VARCHAR(30) NULL,
  [email] VARCHAR(30) NULL,
  [username] VARCHAR(20) NULL,
  [AspNetUserID] NVARCHAR(450) NOT NULL,
  CONSTRAINT [PK__Perdorue__CB9A1CDFC4C4A0AA] PRIMARY KEY ([userID])
);
CREATE TABLE [dbo].[Porosit] ( 
  [idPorosia] INT IDENTITY NOT NULL,
  [totaliPorosis] DECIMAL(18,2) NULL,
  [dataPorosis] DATE NULL CONSTRAINT [DF__Porosit__dataPor__7FD5EEA5] DEFAULT (getdate()) ,
  [statusiPorosis] VARCHAR(30) NULL CONSTRAINT [DF__Porosit__statusi__00CA12DE] DEFAULT ('Ne Procesim') ,
  [IDPartneri] INT NULL,
  [totaliProdukteve] INT NULL CONSTRAINT [DF__Porosit__totaliP__654CE0F2] DEFAULT ((0)) ,
  [IDStafi] INT NULL,
  [Rabati] DECIMAL(5,2) NULL,
  [ExtraRabati] DECIMAL(5,2) NULL,
  [ExtraRabati2] DECIMAL(5,2) NULL,
  [LlojiPageses] NVARCHAR(6) NULL CONSTRAINT [DF__Porosit__LlojiPa__4D2A7347] DEFAULT ('Cash') ,
  [Pagesa] NVARCHAR(15) NULL CONSTRAINT [DF__Porosit__Pagesa__4E1E9780] DEFAULT ('Pa Paguar') ,
  CONSTRAINT [PK__Porosit__A9F27D2AB271ADFC] PRIMARY KEY ([idPorosia])
);
CREATE TABLE [dbo].[Produkti] ( 
  [produktiID] INT IDENTITY NOT NULL,
  [emriProduktit] TEXT NULL,
  [IDPartneri] INT NULL,
  [IDNjesiaMatese] INT NULL,
  [Barkodi] NVARCHAR(30) NULL,
  [KodiProduktit] NVARCHAR(20) NULL,
  [LlojiTVSH] INT NULL CONSTRAINT [DF__Produkti__LlojiT__65F62111] DEFAULT ((18)) ,
  [sasiaShumices] DECIMAL(8,2) NULL CONSTRAINT [DF__Produkti__sasiaS__66EA454A] DEFAULT ((1)) ,
  [IDGrupiProduktit] INT NULL,
  CONSTRAINT [PK__Produkti__76A3DFCF91A50347] PRIMARY KEY ([produktiID])
);
CREATE TABLE [dbo].[KalkulimiIMallit] ( 
  [idRegjistrimit] INT IDENTITY NOT NULL,
  [dataRegjistrimit] DATETIME NULL CONSTRAINT [DF__Regjistri__dataR__049AA3C2] DEFAULT (getdate()) ,
  [stafiID] INT NULL,
  [TotaliPaTVSH] DECIMAL(18,2) NULL,
  [TVSH] DECIMAL(18,2) NULL,
  [IDPartneri] INT NULL,
  [StatusiPageses] NVARCHAR(15) NULL CONSTRAINT [DF__Kalkulimi__Statu__54CB950F] DEFAULT ('E Paguar') ,
  [LlojiPageses] NVARCHAR(6) NULL CONSTRAINT [DF__Kalkulimi__Lloji__55BFB948] DEFAULT ('Cash') ,
  [LlojiKalkulimit] NVARCHAR(20) NULL CONSTRAINT [DF__Kalkulimi__Lloji__57A801BA] DEFAULT ('HYRJE') ,
  [NrFatures] NVARCHAR(40) NULL,
  [statusiKalkulimit] NVARCHAR(7) NULL CONSTRAINT [DF__Kalkulimi__statu__589C25F3] DEFAULT ('false') ,
  CONSTRAINT [PK_RegjistrimiStokut] PRIMARY KEY ([idRegjistrimit])
);
CREATE TABLE [dbo].[StokuQmimiProduktit] ( 
  [produktiID] INT NOT NULL,
  [qmimiBleres] DECIMAL(18,2) NULL CONSTRAINT [DF__StokuQmim__qmimi__0D2FE9C3] DEFAULT ((0)) ,
  [qmimiProduktit] DECIMAL(18,2) NULL CONSTRAINT [DF__StokuQmim__qmimi__0E240DFC] DEFAULT ((0)) ,
  [dataKrijimit] DATETIME NULL CONSTRAINT [DF__StokuQmim__dataK__0F183235] DEFAULT (getdate()) ,
  [dataPerditsimit] DATETIME NULL CONSTRAINT [DF__StokuQmim__dataP__100C566E] DEFAULT (getdate()) ,
  [sasiaNeStok] DECIMAL(18,2) NULL CONSTRAINT [DF__StokuQmim__sasia__5B78929E] DEFAULT ((0)) ,
  [qmimiMeShumic] DECIMAL(18,2) NULL CONSTRAINT [DF__StokuQmim__qmimi__67DE6983] DEFAULT ((0)) ,
  CONSTRAINT [PK_StokuProduktit] PRIMARY KEY ([produktiID])
);
CREATE TABLE [dbo].[TeDhenatBiznesit] ( 
  [IDTeDhenatBiznesit] INT NOT NULL,
  [EmriIBiznesit] NVARCHAR(250) NULL,
  [ShkurtesaEmritBiznesit] VARCHAR(7) NULL,
  [NUI] INT NULL,
  [NF] INT NULL,
  [NRTVSH] INT NULL,
  [Adresa] NVARCHAR(250) NULL,
  [NrKontaktit] NVARCHAR(20) NULL,
  [Email] NVARCHAR(250) NULL,
  [Logo] VARCHAR(40) NULL,
  CONSTRAINT [PK_TeDhenatBiznesit] PRIMARY KEY ([IDTeDhenatBiznesit])
);
CREATE TABLE [dbo].[TeDhenatEPorosis] ( 
  [idDetajet] INT IDENTITY NOT NULL,
  [rabati] DECIMAL(5,2) NULL,
  [sasiaPorositur] INT NULL,
  [idPorosia] INT NULL,
  [idProdukti] INT NULL,
  [qmimiProduktit] DECIMAL(18,2) NULL,
  CONSTRAINT [PK__TeDhenat__494F491F84D65D51] PRIMARY KEY ([idDetajet])
);
CREATE TABLE [dbo].[TeDhenatPerdoruesit] ( 
  [userID] INT NOT NULL,
  [nrKontaktit] VARCHAR(15) NULL,
  [qyteti] VARCHAR(20) NULL,
  [zipKodi] INT NULL,
  [adresa] VARCHAR(40) NULL,
  [shteti] VARCHAR(30) NULL,
  CONSTRAINT [PK_TeDhenatPerdoruesit] PRIMARY KEY ([userID])
);
CREATE TABLE [dbo].[TeDhenatKalkulimit] ( 
  [id] INT IDENTITY NOT NULL,
  [idRegjistrimit] INT NULL,
  [idProduktit] INT NULL,
  [sasiaStokut] DECIMAL(18,2) NULL,
  [qmimiBleres] DECIMAL(18,2) NULL,
  [qmimiShites] DECIMAL(18,2) NULL,
  [qmimiShitesMeShumic] DECIMAL(18,2) NULL,
  CONSTRAINT [PK_TeDhenatRegjistrimit] PRIMARY KEY ([id])
);
CREATE TABLE [dbo].[ZbritjaQmimitProduktit] ( 
  [produktiID] INT NOT NULL,
  [dataZbritjes] DATETIME NULL CONSTRAINT [DF__ZbritjaQm__dataZ__15C52FC4] DEFAULT (getdate()) ,
  [dataSkadimit] DATETIME NULL CONSTRAINT [DF__ZbritjaQm__dataS__16B953FD] DEFAULT (getdate()) ,
  [Rabati] DECIMAL(5,2) NULL,
  CONSTRAINT [PK_ZbritjaQmimitProduktit] PRIMARY KEY ([produktiID])
);
CREATE TABLE [dbo].[__EFMigrationsHistory] ( 
  [MigrationId] NVARCHAR(150) NOT NULL,
  [ProductVersion] NVARCHAR(32) NOT NULL,
  CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
);
CREATE TABLE [dbo].[Partneri] ( 
  [IDPartneri] INT IDENTITY NOT NULL,
  [EmriBiznesit] NVARCHAR(40) NULL,
  [NUI] NVARCHAR(12) NULL,
  [NRF] NVARCHAR(12) NULL,
  [TVSH] NVARCHAR(12) NULL,
  [Email] NVARCHAR(40) NULL,
  [Adresa] NVARCHAR(150) NULL,
  [NrKontaktit] NVARCHAR(16) NULL,
  [LlojiPartnerit] NVARCHAR(12) NULL CONSTRAINT [DF__Partneri__LlojiP__467D75B8] DEFAULT ('Bleres') ,
  [ShkurtesaPartnerit] NVARCHAR(10) NULL,
  CONSTRAINT [PK_Partneri] PRIMARY KEY ([IDPartneri])
);
CREATE TABLE [dbo].[NjesiaMatese] ( 
  [IDNjesiaMatese] INT IDENTITY NOT NULL,
  [NjesiaMatese] NVARCHAR(30) NULL,
  CONSTRAINT [PK_NjesiaMatese] PRIMARY KEY ([IDNjesiaMatese])
);
CREATE TABLE [dbo].[GrupiProduktit] ( 
  [IDGrupiProduktit] INT IDENTITY NOT NULL,
  [GrupiProduktit] NVARCHAR(30) NULL,
  CONSTRAINT [PK_GrupiProduktit] PRIMARY KEY ([IDGrupiProduktit])
);
CREATE TABLE [dbo].[AspNetRoleClaims] ( 
  [Id] INT IDENTITY NOT NULL,
  [RoleId] NVARCHAR(450) NOT NULL,
  [ClaimType] NVARCHAR(MAX) NULL,
  [ClaimValue] NVARCHAR(MAX) NULL,
  CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id])
);
CREATE TABLE [dbo].[AspNetRoles] ( 
  [Id] NVARCHAR(450) NOT NULL,
  [Name] NVARCHAR(256) NULL,
  [NormalizedName] NVARCHAR(256) NULL,
  [ConcurrencyStamp] NVARCHAR(MAX) NULL,
  CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);
CREATE TABLE [dbo].[AspNetUserClaims] ( 
  [Id] INT IDENTITY NOT NULL,
  [UserId] NVARCHAR(450) NOT NULL,
  [ClaimType] NVARCHAR(MAX) NULL,
  [ClaimValue] NVARCHAR(MAX) NULL,
  CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id])
);
CREATE TABLE [dbo].[AspNetUserLogins] ( 
  [LoginProvider] NVARCHAR(450) NOT NULL,
  [ProviderKey] NVARCHAR(450) NOT NULL,
  [ProviderDisplayName] NVARCHAR(MAX) NULL,
  [UserId] NVARCHAR(450) NOT NULL,
  CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey], [UserId])
);
CREATE TABLE [dbo].[AspNetUserRoles] ( 
  [UserId] NVARCHAR(450) NOT NULL,
  [RoleId] NVARCHAR(450) NOT NULL,
  CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([RoleId], [UserId])
);
CREATE INDEX [EmailIndex] 
ON [dbo].[AspNetUsers] (
  [NormalizedEmail] ASC
);
CREATE UNIQUE INDEX [UserNameIndex] 
ON [dbo].[AspNetUsers] (
  [NormalizedUserName] ASC
);
CREATE UNIQUE INDEX [UQ__Perdorue__F3DBC5728A6B6DAE] 
ON [dbo].[Perdoruesi] (
  [username] ASC
);
CREATE INDEX [IX_Porosit_IDPartneri] 
ON [dbo].[Porosit] (
  [IDPartneri] ASC
);
CREATE INDEX [IX_Produkti_IDNjesiaMatese] 
ON [dbo].[Produkti] (
  [IDNjesiaMatese] ASC
);
CREATE INDEX [IX_Produkti_IDPartneri] 
ON [dbo].[Produkti] (
  [IDPartneri] ASC
);
CREATE INDEX [IX_Produkti_IDGrupiProduktit] 
ON [dbo].[Produkti] (
  [IDGrupiProduktit] ASC
);
CREATE INDEX [IX_RegjistrimiStokut_stafiID] 
ON [dbo].[KalkulimiIMallit] (
  [stafiID] ASC
);
CREATE INDEX [IX_TeDhenatEPorosis_idPorosia] 
ON [dbo].[TeDhenatEPorosis] (
  [idPorosia] ASC
);
CREATE INDEX [IX_TeDhenatEPorosis_idProdukti] 
ON [dbo].[TeDhenatEPorosis] (
  [idProdukti] ASC
);
CREATE INDEX [IX_TeDhenatRegjistrimit_idProduktit] 
ON [dbo].[TeDhenatKalkulimit] (
  [idProduktit] ASC
);
CREATE INDEX [IX_TeDhenatRegjistrimit_idRegjistrimit] 
ON [dbo].[TeDhenatKalkulimit] (
  [idRegjistrimit] ASC
);
CREATE INDEX [IX_AspNetRoleClaims_RoleId] 
ON [dbo].[AspNetRoleClaims] (
  [RoleId] ASC
);
CREATE UNIQUE INDEX [RoleNameIndex] 
ON [dbo].[AspNetRoles] (
  [NormalizedName] ASC
);
CREATE INDEX [IX_AspNetUserClaims_UserId] 
ON [dbo].[AspNetUserClaims] (
  [UserId] ASC
);
CREATE INDEX [IX_AspNetUserLogins_UserId] 
ON [dbo].[AspNetUserLogins] (
  [UserId] ASC
);
CREATE INDEX [IX_AspNetUserRoles_RoleId] 
ON [dbo].[AspNetUserRoles] (
  [RoleId] ASC
);
TRUNCATE TABLE [dbo].[AspNetUserTokens];
TRUNCATE TABLE [dbo].[AspNetUsers];
TRUNCATE TABLE [dbo].[Perdoruesi];
TRUNCATE TABLE [dbo].[Porosit];
TRUNCATE TABLE [dbo].[Produkti];
TRUNCATE TABLE [dbo].[KalkulimiIMallit];
TRUNCATE TABLE [dbo].[StokuQmimiProduktit];
TRUNCATE TABLE [dbo].[TeDhenatBiznesit];
TRUNCATE TABLE [dbo].[TeDhenatEPorosis];
TRUNCATE TABLE [dbo].[TeDhenatPerdoruesit];
TRUNCATE TABLE [dbo].[TeDhenatKalkulimit];
TRUNCATE TABLE [dbo].[ZbritjaQmimitProduktit];
TRUNCATE TABLE [dbo].[__EFMigrationsHistory];
TRUNCATE TABLE [dbo].[Partneri];
TRUNCATE TABLE [dbo].[NjesiaMatese];
TRUNCATE TABLE [dbo].[GrupiProduktit];
TRUNCATE TABLE [dbo].[AspNetRoleClaims];
TRUNCATE TABLE [dbo].[AspNetRoles];
TRUNCATE TABLE [dbo].[AspNetUserClaims];
TRUNCATE TABLE [dbo].[AspNetUserLogins];
TRUNCATE TABLE [dbo].[AspNetUserRoles];
INSERT INTO [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [AccessFailedCount]) VALUES ('9d6b2651-641d-4c85-9154-99761863fc65', 'user', 'USER', 'user@techstore.com', 'USER@TECHSTORE.COM', 0, 'AQAAAAEAACcQAAAAEFvlpjPerR25vlxvKiV9GnWzzfQGEk9LCpEfnHG/yUyyaYXsRp/sN52ZWgKNbsq1JA==', '3VINW7OQ6CJ7CZE3737G4L6WGMKBHWPT', '241f5600-e4e1-4e08-b789-9b0fc9367502', '', 0, 0, 1, 0);
INSERT INTO [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [AccessFailedCount]) VALUES ('d2a7088f-a25e-4f3f-8488-b616eeaff928', 'menagjer', 'MENAGJER', 'menagjer@techstore.com', 'MENAGJER@TECHSTORE.COM', 0, 'AQAAAAEAACcQAAAAEP60Y+OpxVc3CPWS9NZu79pNu/KAAsxbrm8qTWpL9+ILK+Sd/3Pw4yLEas1N2TXL+g==', '2TO7IOMEDSKTLMHBALX52ICRC3HX3FNQ', '297b4ee1-133a-4ad2-8242-201592f7a43d', '', 0, 0, 1, 0);
INSERT INTO [dbo].[AspNetUsers] ([Id], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [AccessFailedCount]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', 'admin', 'ADMIN', 'admin@techstore.com', 'ADMIN@TECHSTORE.COM', 0, 'AQAAAAEAACcQAAAAEAy6t6f1jILbKXRyqzSZGrR4zq/Wl8G525tgzrBsqYIG4ksRH5HySRRlJrMtzvfTug==', 'RHCE5BDZYCGBDPAZQ74P3IWVFBNDWMEX', '5dd7b4ea-994f-43c2-bdfd-1bef310ebf29', '', 0, 0, 1, 0);
SET IDENTITY_INSERT [dbo].[Perdoruesi] ON;
INSERT INTO [dbo].[Perdoruesi] ([userID], [emri], [mbiemri], [email], [username], [AspNetUserID]) VALUES (1, 'Administrator', 'Administrator', 'admin@techstore.com', 'admin', 'f2bb7622-23ac-4c5f-8d71-00032b281e37');
INSERT INTO [dbo].[Perdoruesi] ([userID], [emri], [mbiemri], [email], [username], [AspNetUserID]) VALUES (2, 'User', 'User', 'user@techstore.com', 'user', '9d6b2651-641d-4c85-9154-99761863fc65');
INSERT INTO [dbo].[Perdoruesi] ([userID], [emri], [mbiemri], [email], [username], [AspNetUserID]) VALUES (3, 'Menagjer', 'Menagjer', 'menagjer@techstore.com', 'menagjer', 'd2a7088f-a25e-4f3f-8488-b616eeaff928');
SET IDENTITY_INSERT [dbo].[Perdoruesi] OFF;
SET IDENTITY_INSERT [dbo].[Porosit] ON;
SET IDENTITY_INSERT [dbo].[Porosit] OFF;
SET IDENTITY_INSERT [dbo].[Produkti] ON;
INSERT INTO [dbo].[Produkti] ([produktiID], [emriProduktit], [IDPartneri], [IDNjesiaMatese], [Barkodi], [KodiProduktit], [LlojiTVSH], [sasiaShumices]) VALUES (1, 'Milka', 2, 1, '123', 'ELKOS123', 18, 1);
INSERT INTO [dbo].[Produkti] ([produktiID], [emriProduktit], [IDPartneri], [IDNjesiaMatese], [Barkodi], [KodiProduktit], [LlojiTVSH], [sasiaShumices]) VALUES (2, 'Kinder Bueno', 2, 1, '1234', 'ELKOS124', 8, 1);
INSERT INTO [dbo].[Produkti] ([produktiID], [emriProduktit], [IDPartneri], [IDNjesiaMatese], [Barkodi], [KodiProduktit], [LlojiTVSH], [sasiaShumices], [IDGrupiProduktit]) VALUES (3, 'Manner Snacks 20gr', 2, 3, '9000331625632', 'MRD0001', 8, 12, 2);
SET IDENTITY_INSERT [dbo].[Produkti] OFF;
SET IDENTITY_INSERT [dbo].[KalkulimiIMallit] ON;
INSERT INTO [dbo].[KalkulimiIMallit] ([idRegjistrimit], [dataRegjistrimit], [stafiID], [TotaliPaTVSH], [TVSH], [IDPartneri], [StatusiPageses], [LlojiPageses], [LlojiKalkulimit], [NrFatures], [statusiKalkulimit]) VALUES (49, '2023-09-22T00:00:00.000Z', 1, 0, 0, 2, 'E Paguar', 'Cash', 'HYRJE', '123', 'false');
INSERT INTO [dbo].[KalkulimiIMallit] ([idRegjistrimit], [dataRegjistrimit], [stafiID], [TotaliPaTVSH], [TVSH], [IDPartneri], [StatusiPageses], [LlojiPageses], [LlojiKalkulimit], [NrFatures], [statusiKalkulimit]) VALUES (50, '2023-09-23T00:00:00.000Z', 1, 12, 15, 2, 'E Paguar', 'Cash', 'HYRJE', '12', 'true');
SET IDENTITY_INSERT [dbo].[KalkulimiIMallit] OFF;
INSERT INTO [dbo].[StokuQmimiProduktit] ([produktiID], [qmimiBleres], [qmimiProduktit], [dataKrijimit], [dataPerditsimit], [sasiaNeStok], [qmimiMeShumic]) VALUES (1, 12, 14.16, '2023-09-19T16:53:27.340Z', '2023-09-25T19:59:41.220Z', 38, 14.16);
INSERT INTO [dbo].[StokuQmimiProduktit] ([produktiID], [qmimiBleres], [qmimiProduktit], [dataKrijimit], [dataPerditsimit], [sasiaNeStok], [qmimiMeShumic]) VALUES (2, 123, 132.84, '2023-09-19T17:48:07.543Z', '2023-09-25T19:59:41.240Z', 600, 130);
INSERT INTO [dbo].[StokuQmimiProduktit] ([produktiID], [qmimiBleres], [qmimiProduktit], [dataKrijimit], [dataPerditsimit], [sasiaNeStok], [qmimiMeShumic]) VALUES (3, 0, 0, '2023-09-28T18:45:38.723Z', '2023-09-28T18:45:38.723Z', 0, 0);
INSERT INTO [dbo].[TeDhenatBiznesit] ([IDTeDhenatBiznesit], [NUI], [NF], [NRTVSH], [Logo]) VALUES (1, 0, 0, 0, 'PaLogo.png');
SET IDENTITY_INSERT [dbo].[TeDhenatEPorosis] ON;
SET IDENTITY_INSERT [dbo].[TeDhenatEPorosis] OFF;
INSERT INTO [dbo].[TeDhenatPerdoruesit] ([userID], [zipKodi]) VALUES (1, 0);
INSERT INTO [dbo].[TeDhenatPerdoruesit] ([userID], [zipKodi]) VALUES (2, 0);
INSERT INTO [dbo].[TeDhenatPerdoruesit] ([userID], [zipKodi]) VALUES (3, 0);
SET IDENTITY_INSERT [dbo].[TeDhenatKalkulimit] ON;
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (86, 49, 2, 12, 0.6, 0.75, 0.75);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (87, 49, 1, 24, 0.8, 0.99, 0.99);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (88, 49, 1, 1, 2, 2.36, 0);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (89, 49, 2, 1, 2, 2.16, 0);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (90, 49, 2, 2, 234, 252.72, 0);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (103, 50, 2, 12, 1, 1.08, 1);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (104, 50, 2, 12, 123, 132.84, 132.84);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (105, 50, 2, 12, 1, 2, 2);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (106, 50, 1, 1, 12, 14.16, 15);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (107, 50, 1, 12, 123, 145.14, 145.14);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (108, 50, 2, 12, 13, 14.04, 1);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (109, 50, 2, 12, 1, 2, 1.08);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (110, 50, 2, 123, 13, 14.04, 14.04);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (111, 50, 2, 123, 123, 132.84, 132.84);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (112, 50, 1, 12, 12, 14.16, 14.16);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (113, 50, 2, 123, 12, 12.96, 11);
INSERT INTO [dbo].[TeDhenatKalkulimit] ([id], [idRegjistrimit], [idProduktit], [sasiaStokut], [qmimiBleres], [qmimiShites], [qmimiShitesMeShumic]) VALUES (114, 50, 2, 123, 123, 132.84, 130);
SET IDENTITY_INSERT [dbo].[TeDhenatKalkulimit] OFF;
INSERT INTO [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20230519193547_initial', '7.0.5');
INSERT INTO [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20230519202124_test', '7.0.5');
INSERT INTO [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES ('20230521134726_vendosjaRoleve', '7.0.5');
SET IDENTITY_INSERT [dbo].[Partneri] ON;
INSERT INTO [dbo].[Partneri] ([IDPartneri], [EmriBiznesit], [NUI], [NRF], [TVSH], [Email], [Adresa], [NrKontaktit], [LlojiPartnerit], [ShkurtesaPartnerit]) VALUES (1, 'Supermarketi Besa', '810300575', '600043674', '330034372', 'r.kycyku.12@gmail.com', 'Agim Bajrami perball Xhamis Kaqanik', '044227789', 'B', 'SK');
INSERT INTO [dbo].[Partneri] ([IDPartneri], [EmriBiznesit], [NUI], [Adresa], [LlojiPartnerit], [ShkurtesaPartnerit]) VALUES (2, 'Elkos', '123', 'Ferizaj', 'F', 'ELKOS');
INSERT INTO [dbo].[Partneri] ([IDPartneri], [EmriBiznesit], [NUI], [NRF], [TVSH], [Email], [Adresa], [NrKontaktit], [LlojiPartnerit], [ShkurtesaPartnerit]) VALUES (3, 'Merdian', '123', '0', '0', '', 'asda', '123', 'F', 'MRD');
INSERT INTO [dbo].[Partneri] ([IDPartneri], [EmriBiznesit], [NUI], [NRF], [TVSH], [Email], [Adresa], [NrKontaktit], [LlojiPartnerit], [ShkurtesaPartnerit]) VALUES (4, 'Merdian', '123', '0', '0', '', 'asda', '123', 'F', 'MRD');
INSERT INTO [dbo].[Partneri] ([IDPartneri], [EmriBiznesit], [NUI], [NRF], [TVSH], [Email], [Adresa], [NrKontaktit], [LlojiPartnerit], [ShkurtesaPartnerit]) VALUES (5, 'TechStore SH.P.K.', '123', '123', '123', '123', '13', '123', 'B', 'TCHSTR');
SET IDENTITY_INSERT [dbo].[Partneri] OFF;
SET IDENTITY_INSERT [dbo].[NjesiaMatese] ON;
INSERT INTO [dbo].[NjesiaMatese] ([IDNjesiaMatese], [NjesiaMatese]) VALUES (1, 'Cope');
INSERT INTO [dbo].[NjesiaMatese] ([IDNjesiaMatese], [NjesiaMatese]) VALUES (3, 'KG');
SET IDENTITY_INSERT [dbo].[NjesiaMatese] OFF;
SET IDENTITY_INSERT [dbo].[GrupiProduktit] ON;
INSERT INTO [dbo].[GrupiProduktit] ([IDGrupiProduktit], [GrupiProduktit]) VALUES (1, 'Ushqimore');
INSERT INTO [dbo].[GrupiProduktit] ([IDGrupiProduktit], [GrupiProduktit]) VALUES (2, 'Higjena');
SET IDENTITY_INSERT [dbo].[GrupiProduktit] OFF;
SET IDENTITY_INSERT [dbo].[AspNetRoleClaims] ON;
SET IDENTITY_INSERT [dbo].[AspNetRoleClaims] OFF;
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES ('0267d4fd-5bac-4552-9930-8e528b2fec1b', 'Admin', 'ADMIN', 'bcb0a7f8-41b2-48ce-bf39-fbc24516012e');
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES ('1f54a8a5-6d88-4699-a816-fe4ceba1ec02', 'Dev', 'DEV', '05e79264-391f-4500-9b34-23aed2b36a7e');
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES ('679d19c9-c4f9-42f3-855f-1435d0f4a201', 'Faturist', 'FATURIST', 'ccafbdee-b37b-489a-8eb6-783d3db05b0d');
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES ('be4b8ef8-abf0-454c-852c-676cdab20e3b', 'User', 'USER', '264000ea-9d66-4686-b48b-e06165a906fc');
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES ('db3dd60d-a159-4f85-a9a5-d1444ee1013d', 'Menaxher', 'MENAXHER', '3e215a86-6eeb-48a6-90d9-fe12a7a70f28');
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES ('ea70e8ed-81a0-4cbf-8726-93ca6fe59a23', 'Arkatar', 'ARKATAR', '34436c94-0d46-46ac-a9ac-64f62ac579b4');
INSERT INTO [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES ('f138f8ab-7352-4b8c-96c5-568ec98b910b', 'Komercialist', 'KOMERCIALIST', '3c104869-00ed-45e2-aac0-c8deac19430e');
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] ON;
SET IDENTITY_INSERT [dbo].[AspNetUserClaims] OFF;
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', '0267d4fd-5bac-4552-9930-8e528b2fec1b');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', '1f54a8a5-6d88-4699-a816-fe4ceba1ec02');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', '679d19c9-c4f9-42f3-855f-1435d0f4a201');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('9d6b2651-641d-4c85-9154-99761863fc65', 'be4b8ef8-abf0-454c-852c-676cdab20e3b');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('d2a7088f-a25e-4f3f-8488-b616eeaff928', 'be4b8ef8-abf0-454c-852c-676cdab20e3b');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', 'be4b8ef8-abf0-454c-852c-676cdab20e3b');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('d2a7088f-a25e-4f3f-8488-b616eeaff928', 'db3dd60d-a159-4f85-a9a5-d1444ee1013d');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', 'db3dd60d-a159-4f85-a9a5-d1444ee1013d');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', 'ea70e8ed-81a0-4cbf-8726-93ca6fe59a23');
INSERT INTO [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES ('f2bb7622-23ac-4c5f-8d71-00032b281e37', 'f138f8ab-7352-4b8c-96c5-568ec98b910b');
ALTER TABLE [dbo].[AspNetUserTokens] ADD CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[Perdoruesi] ADD CONSTRAINT [FK_Perdoruesi_AspNetUsers] FOREIGN KEY ([AspNetUserID]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[Porosit] ADD CONSTRAINT [FK_Porosit_Partneri] FOREIGN KEY ([IDPartneri]) REFERENCES [dbo].[Partneri] ([IDPartneri]) ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE [dbo].[Porosit] ADD CONSTRAINT [FK_Porosia_Stafi] FOREIGN KEY ([IDStafi]) REFERENCES [dbo].[Perdoruesi] ([userID]) ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE [dbo].[Produkti] ADD CONSTRAINT [FK_Produkti_NjesiaMatese] FOREIGN KEY ([IDNjesiaMatese]) REFERENCES [dbo].[NjesiaMatese] ([IDNjesiaMatese]) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE [dbo].[Produkti] ADD CONSTRAINT [FK_Produkti_Partneri] FOREIGN KEY ([IDPartneri]) REFERENCES [dbo].[Partneri] ([IDPartneri]) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE [dbo].[Produkti] ADD CONSTRAINT [FK_Produkti_GrupiProduktit] FOREIGN KEY ([IDGrupiProduktit]) REFERENCES [dbo].[GrupiProduktit] ([IDGrupiProduktit]) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE [dbo].[KalkulimiIMallit] ADD CONSTRAINT [FK_Regjistrimi_Stafi] FOREIGN KEY ([stafiID]) REFERENCES [dbo].[Perdoruesi] ([userID]) ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE [dbo].[KalkulimiIMallit] ADD CONSTRAINT [FK_Kalkulimi_Partneri] FOREIGN KEY ([IDPartneri]) REFERENCES [dbo].[Partneri] ([IDPartneri]) ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE [dbo].[StokuQmimiProduktit] ADD CONSTRAINT [FK_StokuQmimiProduktit_Produkti_produktiID] FOREIGN KEY ([produktiID]) REFERENCES [dbo].[Produkti] ([produktiID]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[TeDhenatEPorosis] ADD CONSTRAINT [FK_TeDhenatPorosis_Porosia] FOREIGN KEY ([idPorosia]) REFERENCES [dbo].[Porosit] ([idPorosia]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[TeDhenatEPorosis] ADD CONSTRAINT [FK_TeDhenatPorosis_Produkti] FOREIGN KEY ([idProdukti]) REFERENCES [dbo].[Produkti] ([produktiID]) ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE [dbo].[TeDhenatPerdoruesit] ADD CONSTRAINT [FK_Perdoruesi_TeDhenat] FOREIGN KEY ([userID]) REFERENCES [dbo].[Perdoruesi] ([userID]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[TeDhenatKalkulimit] ADD CONSTRAINT [FK_Produkti_TeDhenatRegjistrimit] FOREIGN KEY ([idProduktit]) REFERENCES [dbo].[Produkti] ([produktiID]) ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE [dbo].[TeDhenatKalkulimit] ADD CONSTRAINT [FK_RegjistrimiStokut_TeDhenatRegjistrimit] FOREIGN KEY ([idRegjistrimit]) REFERENCES [dbo].[KalkulimiIMallit] ([idRegjistrimit]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[ZbritjaQmimitProduktit] ADD CONSTRAINT [FK_ZbritjaQmimitProduktit_Produkti_produktiID] FOREIGN KEY ([produktiID]) REFERENCES [dbo].[Produkti] ([produktiID]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[AspNetRoleClaims] ADD CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[AspNetUserClaims] ADD CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[AspNetUserLogins] ADD CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[AspNetUserRoles] ADD CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE [dbo].[AspNetUserRoles] ADD CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE ON UPDATE NO ACTION;
