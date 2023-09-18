using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace FinanCareWebAPI.Models;

public partial class FinanCareDbContext : IdentityDbContext
{
    public FinanCareDbContext()
    {
    }

    public FinanCareDbContext(DbContextOptions<FinanCareDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<KalkulimiImallit> KalkulimiImallits { get; set; }

    public virtual DbSet<NjesiaMatese> NjesiaMateses { get; set; }

    public virtual DbSet<Partneri> Partneris { get; set; }

    public virtual DbSet<Perdoruesi> Perdoruesis { get; set; }

    public virtual DbSet<Porosit> Porosits { get; set; }

    public virtual DbSet<Produkti> Produktis { get; set; }

    public virtual DbSet<StokuQmimiProduktit> StokuQmimiProduktits { get; set; }

    public virtual DbSet<TeDhenatBiznesit> TeDhenatBiznesits { get; set; }

    public virtual DbSet<TeDhenatEporosi> TeDhenatEporoses { get; set; }

    public virtual DbSet<TeDhenatKalkulimit> TeDhenatKalkulimits { get; set; }

    public virtual DbSet<TeDhenatPerdoruesit> TeDhenatPerdoruesits { get; set; }

    public virtual DbSet<ZbritjaQmimitProduktit> ZbritjaQmimitProduktits { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<KalkulimiImallit>(entity =>
        {
            entity.HasKey(e => e.IdRegjistrimit).HasName("PK_RegjistrimiStokut");

            entity.ToTable("KalkulimiIMallit");

            entity.HasIndex(e => e.StafiId, "IX_RegjistrimiStokut_stafiID");

            entity.Property(e => e.IdRegjistrimit).HasColumnName("idRegjistrimit");
            entity.Property(e => e.DataRegjistrimit)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dataRegjistrimit");
            entity.Property(e => e.Idpartneri).HasColumnName("IDPartneri");
            entity.Property(e => e.LlojiPageses)
                .HasMaxLength(6)
                .HasDefaultValueSql("('Cash')");
            entity.Property(e => e.LlojiKalkulimit)
                .HasMaxLength(20)
                .HasDefaultValue("('HYRJE')");
            entity.Property(e => e.NrFatures)
                .HasMaxLength(40);
            entity.Property(e => e.StafiId).HasColumnName("stafiID");
            entity.Property(e => e.StatusiPageses)
                .HasMaxLength(15)
                .HasDefaultValueSql("('E Paguar')");
            entity.Property(e => e.TotaliPaTvsh)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TotaliPaTVSH");
            entity.Property(e => e.Tvsh)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("TVSH");

            entity.HasOne(d => d.IdpartneriNavigation).WithMany(p => p.KalkulimiImallits)
                .HasForeignKey(d => d.Idpartneri)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Kalkulimi_Partneri");

            entity.HasOne(d => d.Stafi).WithMany(p => p.KalkulimiImallits)
                .HasForeignKey(d => d.StafiId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Regjistrimi_Stafi");
        });

        modelBuilder.Entity<NjesiaMatese>(entity =>
        {
            entity.HasKey(e => e.IdnjesiaMatese);

            entity.ToTable("NjesiaMatese");

            entity.Property(e => e.IdnjesiaMatese).HasColumnName("IDNjesiaMatese");
            entity.Property(e => e.NjesiaMatese1)
                .HasMaxLength(30)
                .HasColumnName("NjesiaMatese");
        });

        modelBuilder.Entity<Partneri>(entity =>
        {
            entity.HasKey(e => e.Idpartneri);

            entity.ToTable("Partneri");

            entity.Property(e => e.Idpartneri).HasColumnName("IDPartneri");
            entity.Property(e => e.Adresa).HasMaxLength(150);
            entity.Property(e => e.Email).HasMaxLength(40);
            entity.Property(e => e.EmriBiznesit).HasMaxLength(40);
            entity.Property(e => e.LlojiPartnerit)
                .HasMaxLength(12)
                .HasDefaultValueSql("('Bleres')");
            entity.Property(e => e.NrKontaktit).HasMaxLength(16);
            entity.Property(e => e.Nrf)
                .HasMaxLength(12)
                .HasColumnName("NRF");
            entity.Property(e => e.Nui)
                .HasMaxLength(12)
                .HasColumnName("NUI");
            entity.Property(e => e.Tvsh)
                .HasMaxLength(12)
                .HasColumnName("TVSH");
        });

        modelBuilder.Entity<Perdoruesi>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Perdorue__CB9A1CDFC4C4A0AA");

            entity.ToTable("Perdoruesi");

            entity.HasIndex(e => e.Username, "UQ__Perdorue__F3DBC5728A6B6DAE").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.AspNetUserId)
                .HasMaxLength(450)
                .HasColumnName("AspNetUserID");
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Emri)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("emri");
            entity.Property(e => e.Mbiemri)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("mbiemri");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Porosit>(entity =>
        {
            entity.HasKey(e => e.IdPorosia).HasName("PK__Porosit__A9F27D2AB271ADFC");

            entity.ToTable("Porosit");

            entity.HasIndex(e => e.Idpartneri, "IX_Porosit_IDPartneri");

            entity.Property(e => e.IdPorosia).HasColumnName("idPorosia");
            entity.Property(e => e.DataPorosis)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date")
                .HasColumnName("dataPorosis");
            entity.Property(e => e.Idpartneri).HasColumnName("IDPartneri");
            entity.Property(e => e.Idstafi).HasColumnName("IDStafi");
            entity.Property(e => e.LlojiPageses)
                .HasMaxLength(6)
                .HasDefaultValueSql("('Cash')");
            entity.Property(e => e.Pagesa)
                .HasMaxLength(15)
                .HasDefaultValueSql("('Pa Paguar')");
            entity.Property(e => e.StatusiPorosis)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasDefaultValueSql("('Ne Procesim')")
                .HasColumnName("statusiPorosis");
            entity.Property(e => e.TotaliPorosis)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("totaliPorosis");
            entity.Property(e => e.TotaliProdukteve)
                .HasDefaultValueSql("((0))")
                .HasColumnName("totaliProdukteve");

            entity.HasOne(d => d.IdpartneriNavigation).WithMany(p => p.Porosits)
                .HasForeignKey(d => d.Idpartneri)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Porosit_Partneri");

            entity.HasOne(d => d.IdstafiNavigation).WithMany(p => p.Porosits)
                .HasForeignKey(d => d.Idstafi)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Porosia_Stafi");
        });

        modelBuilder.Entity<Produkti>(entity =>
        {
            entity.HasKey(e => e.ProduktiId).HasName("PK__Produkti__76A3DFCF91A50347");

            entity.ToTable("Produkti");

            entity.HasIndex(e => e.IdnjesiaMatese, "IX_Produkti_IDNjesiaMatese");

            entity.HasIndex(e => e.Idpartneri, "IX_Produkti_IDPartneri");

            entity.Property(e => e.ProduktiId).HasColumnName("produktiID");
            entity.Property(e => e.Barkodi).HasMaxLength(30);
            entity.Property(e => e.EmriProduktit)
                .HasColumnType("text")
                .HasColumnName("emriProduktit");
            entity.Property(e => e.IdnjesiaMatese).HasColumnName("IDNjesiaMatese");
            entity.Property(e => e.Idpartneri).HasColumnName("IDPartneri");
            entity.Property(e => e.KodiProduktit).HasMaxLength(20);
        });

        modelBuilder.Entity<StokuQmimiProduktit>(entity =>
        {
            entity.HasKey(e => e.ProduktiId).HasName("PK_StokuProduktit");

            entity.ToTable("StokuQmimiProduktit");

            entity.Property(e => e.ProduktiId)
                .ValueGeneratedNever()
                .HasColumnName("produktiID");
            entity.Property(e => e.DataKrijimit)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dataKrijimit");
            entity.Property(e => e.DataPerditsimit)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dataPerditsimit");
            entity.Property(e => e.QmimiBleres)
                .HasDefaultValueSql("((0))")
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("qmimiBleres");
            entity.Property(e => e.QmimiProduktit)
                .HasDefaultValueSql("((0))")
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("qmimiProduktit");
            entity.Property(e => e.SasiaNeStok)
                .HasDefaultValueSql("((0))")
                .HasColumnName("sasiaNeStok");

            entity.HasOne(d => d.Produkti).WithOne(p => p.StokuQmimiProduktit).HasForeignKey<StokuQmimiProduktit>(d => d.ProduktiId);
        });

        modelBuilder.Entity<TeDhenatBiznesit>(entity =>
        {
            entity.HasKey(e => e.IdteDhenatBiznesit);

            entity.ToTable("TeDhenatBiznesit");

            entity.Property(e => e.IdteDhenatBiznesit)
                .ValueGeneratedNever()
                .HasColumnName("IDTeDhenatBiznesit");
            entity.Property(e => e.Adresa).HasMaxLength(250);
            entity.Property(e => e.Email).HasMaxLength(250);
            entity.Property(e => e.EmriIbiznesit)
                .HasMaxLength(250)
                .HasColumnName("EmriIBiznesit");
            entity.Property(e => e.Logo)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Nf).HasColumnName("NF");
            entity.Property(e => e.NrKontaktit).HasMaxLength(20);
            entity.Property(e => e.Nrtvsh).HasColumnName("NRTVSH");
            entity.Property(e => e.Nui).HasColumnName("NUI");
            entity.Property(e => e.ShkurtesaEmritBiznesit)
                .HasMaxLength(7)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TeDhenatEporosi>(entity =>
        {
            entity.HasKey(e => e.IdDetajet).HasName("PK__TeDhenat__494F491F84D65D51");

            entity.ToTable("TeDhenatEPorosis");

            entity.HasIndex(e => e.IdPorosia, "IX_TeDhenatEPorosis_idPorosia");

            entity.HasIndex(e => e.IdProdukti, "IX_TeDhenatEPorosis_idProdukti");

            entity.Property(e => e.IdDetajet).HasColumnName("idDetajet");
            entity.Property(e => e.IdPorosia).HasColumnName("idPorosia");
            entity.Property(e => e.IdProdukti).HasColumnName("idProdukti");
            entity.Property(e => e.QmimiProduktit)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("qmimiProduktit");
            entity.Property(e => e.QmimiTotal)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("qmimiTotal");
            entity.Property(e => e.SasiaPorositur).HasColumnName("sasiaPorositur");

            entity.HasOne(d => d.IdPorosiaNavigation).WithMany(p => p.TeDhenatEporosis)
                .HasForeignKey(d => d.IdPorosia)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_TeDhenatPorosis_Porosia");

            entity.HasOne(d => d.IdProduktiNavigation).WithMany(p => p.TeDhenatEporosis)
                .HasForeignKey(d => d.IdProdukti)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_TeDhenatPorosis_Produkti");
        });

        modelBuilder.Entity<TeDhenatKalkulimit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_TeDhenatRegjistrimit");

            entity.ToTable("TeDhenatKalkulimit");

            entity.HasIndex(e => e.IdProduktit, "IX_TeDhenatRegjistrimit_idProduktit");

            entity.HasIndex(e => e.IdRegjistrimit, "IX_TeDhenatRegjistrimit_idRegjistrimit");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.IdProduktit).HasColumnName("idProduktit");
            entity.Property(e => e.IdRegjistrimit).HasColumnName("idRegjistrimit");
            entity.Property(e => e.QmimiBleres)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("qmimiBleres");
            entity.Property(e => e.QmimiShites)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("qmimiShites");
            entity.Property(e => e.SasiaStokut).HasColumnName("sasiaStokut");

            entity.HasOne(d => d.IdProduktitNavigation).WithMany(p => p.TeDhenatKalkulimits)
                .HasForeignKey(d => d.IdProduktit)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Produkti_TeDhenatRegjistrimit");

            entity.HasOne(d => d.IdRegjistrimitNavigation).WithMany(p => p.TeDhenatKalkulimits)
                .HasForeignKey(d => d.IdRegjistrimit)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_RegjistrimiStokut_TeDhenatRegjistrimit");
        });

        modelBuilder.Entity<TeDhenatPerdoruesit>(entity =>
        {
            entity
                .HasKey(e => e.UserId)
                .HasName("PK_TeDhenatPerdoruesit");
            entity.ToTable("TeDhenatPerdoruesit");

            entity.Property(e => e.Adresa)
                .HasMaxLength(40)
                .IsUnicode(false)
                .HasColumnName("adresa");
            entity.Property(e => e.NrKontaktit)
                .HasMaxLength(15)
                .IsUnicode(false)
                .HasColumnName("nrKontaktit");
            entity.Property(e => e.Qyteti)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("qyteti");
            entity.Property(e => e.Shteti)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("shteti");
            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.ZipKodi).HasColumnName("zipKodi");

            entity.HasOne(d => d.User).WithOne(p => p.TeDhenatPerdoruesit)
                .HasForeignKey<TeDhenatPerdoruesit>(d => d.UserId)
                .HasConstraintName("FK_Perdoruesi_TeDhenat");
        });

        modelBuilder.Entity<ZbritjaQmimitProduktit>(entity =>
        {
            entity.HasKey(e => e.ProduktiId);

            entity.ToTable("ZbritjaQmimitProduktit");

            entity.Property(e => e.ProduktiId)
                .ValueGeneratedNever()
                .HasColumnName("produktiID");
            entity.Property(e => e.DataSkadimit)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dataSkadimit");
            entity.Property(e => e.DataZbritjes)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("dataZbritjes");

            entity.HasOne(d => d.Produkti).WithOne(p => p.ZbritjaQmimitProduktit).HasForeignKey<ZbritjaQmimitProduktit>(d => d.ProduktiId);
        });

        modelBuilder
               .HasAnnotation("ProductVersion", "6.0.7")
               .HasAnnotation("Relational:MaxIdentifierLength", 128);

        SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

        modelBuilder.Entity<IdentityRole>(b =>
        {
            b.Property<string>("Id")
                .HasColumnType("nvarchar(450)");

            b.Property<string>("ConcurrencyStamp")
                .IsConcurrencyToken()
                .HasColumnType("nvarchar(max)");

            b.Property<string>("Name")
                .HasMaxLength(256)
                .HasColumnType("nvarchar(256)");

            b.Property<string>("NormalizedName")
                .HasMaxLength(256)
                .HasColumnType("nvarchar(256)");

            b.HasKey("Id");

            b.HasIndex("NormalizedName")
                .IsUnique()
                .HasDatabaseName("RoleNameIndex")
                .HasFilter("[NormalizedName] IS NOT NULL");

            b.ToTable("AspNetRoles", (string)null);
        });

        modelBuilder.Entity<IdentityRoleClaim<string>>(b =>
        {
            b.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int");

            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

            b.Property<string>("ClaimType")
                .HasColumnType("nvarchar(max)");

            b.Property<string>("ClaimValue")
                .HasColumnType("nvarchar(max)");

            b.Property<string>("RoleId")
                .IsRequired()
                .HasColumnType("nvarchar(450)");

            b.HasKey("Id");

            b.HasIndex("RoleId");

            b.ToTable("AspNetRoleClaims", (string)null);
        });

        modelBuilder.Entity<IdentityUser>(b =>
        {
            b.Property<string>("Id")
                .HasColumnType("nvarchar(450)");

            b.Property<int>("AccessFailedCount")
                .HasColumnType("int");

            b.Property<string>("ConcurrencyStamp")
                .IsConcurrencyToken()
                .HasColumnType("nvarchar(max)");

            b.Property<string>("Email")
                .HasMaxLength(256)
                .HasColumnType("nvarchar(256)");

            b.Property<bool>("EmailConfirmed")
                .HasColumnType("bit");

            b.Property<bool>("LockoutEnabled")
                .HasColumnType("bit");

            b.Property<DateTimeOffset?>("LockoutEnd")
                .HasColumnType("datetimeoffset");

            b.Property<string>("NormalizedEmail")
                .HasMaxLength(256)
                .HasColumnType("nvarchar(256)");

            b.Property<string>("NormalizedUserName")
                .HasMaxLength(256)
                .HasColumnType("nvarchar(256)");

            b.Property<string>("PasswordHash")
                .HasColumnType("nvarchar(max)");

            b.Property<string>("PhoneNumber")
                .HasColumnType("nvarchar(max)");

            b.Property<bool>("PhoneNumberConfirmed")
                .HasColumnType("bit");

            b.Property<string>("SecurityStamp")
                .HasColumnType("nvarchar(max)");

            b.Property<bool>("TwoFactorEnabled")
                .HasColumnType("bit");

            b.Property<string>("UserName")
                .HasMaxLength(256)
                .HasColumnType("nvarchar(256)");

            b.HasKey("Id");

            b.HasIndex("NormalizedEmail")
                .HasDatabaseName("EmailIndex");

            b.HasIndex("NormalizedUserName")
                .IsUnique()
                .HasDatabaseName("UserNameIndex")
                .HasFilter("[NormalizedUserName] IS NOT NULL");

            b.ToTable("AspNetUsers", (string)null);
        });

        modelBuilder.Entity<IdentityUserClaim<string>>(b =>
        {
            b.Property<int>("Id")
                .ValueGeneratedOnAdd()
                .HasColumnType("int");

            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

            b.Property<string>("ClaimType")
                .HasColumnType("nvarchar(max)");

            b.Property<string>("ClaimValue")
                .HasColumnType("nvarchar(max)");

            b.Property<string>("UserId")
                .IsRequired()
                .HasColumnType("nvarchar(450)");

            b.HasKey("Id");

            b.HasIndex("UserId");

            b.ToTable("AspNetUserClaims", (string)null);
        });

        modelBuilder.Entity<IdentityUserLogin<string>>(b =>
        {
            b.Property<string>("LoginProvider")
                .HasColumnType("nvarchar(450)");

            b.Property<string>("ProviderKey")
                .HasColumnType("nvarchar(450)");

            b.Property<string>("ProviderDisplayName")
                .HasColumnType("nvarchar(max)");

            b.Property<string>("UserId")
                .IsRequired()
                .HasColumnType("nvarchar(450)");

            b.HasKey("LoginProvider", "ProviderKey");

            b.HasIndex("UserId");

            b.ToTable("AspNetUserLogins", (string)null);
        });

        modelBuilder.Entity<IdentityUserRole<string>>(b =>
        {
            b.Property<string>("UserId")
                .HasColumnType("nvarchar(450)");

            b.Property<string>("RoleId")
                .HasColumnType("nvarchar(450)");

            b.HasKey("UserId", "RoleId");

            b.HasIndex("RoleId");

            b.ToTable("AspNetUserRoles", (string)null);
        });

        modelBuilder.Entity<IdentityUserToken<string>>(b =>
        {
            b.Property<string>("UserId")
                .HasColumnType("nvarchar(450)");

            b.Property<string>("LoginProvider")
                .HasColumnType("nvarchar(450)");

            b.Property<string>("Name")
                .HasColumnType("nvarchar(450)");

            b.Property<string>("Value")
                .HasColumnType("nvarchar(max)");

            b.HasKey("UserId", "LoginProvider", "Name");

            b.ToTable("AspNetUserTokens", (string)null);
        });

        modelBuilder.Entity<IdentityRoleClaim<string>>(b =>
        {
            b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                .WithMany()
                .HasForeignKey("RoleId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity<IdentityUserClaim<string>>(b =>
        {
            b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity<IdentityUserLogin<string>>(b =>
        {
            b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity<IdentityUserRole<string>>(b =>
        {
            b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                .WithMany()
                .HasForeignKey("RoleId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        modelBuilder.Entity<IdentityUserToken<string>>(b =>
        {
            b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                .WithMany()
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        });

        base.OnModelCreating(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
