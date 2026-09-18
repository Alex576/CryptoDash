using Microsoft.EntityFrameworkCore;
using Security.Data.DBModels;

namespace Security.Data.DBContext;

public partial class SecurityContext : DbContext
{
    public SecurityContext(DbContextOptions<SecurityContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    //public virtual DbSet<UsersRole> UsersRoles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("sc");
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
        });

        //modelBuilder.Entity<Role>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("PK__Roles__3213E83F893F3287");

        //    entity.ToTable("Roles", "sc");

        //    entity.Property(e => e.Id)
        //        .HasDefaultValueSql("(NEXT VALUE FOR [sc].[SQ_Role])")
        //        .HasColumnName("id");
        //    entity.Property(e => e.Name)
        //        .HasMaxLength(255)
        //        .HasColumnName("name");
        //});

        //modelBuilder.Entity<User>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("PK__Users__3213E83F7F167340");

        //    entity.ToTable("Users", "sc");

        //    entity.Property(e => e.Id)
        //        .HasDefaultValueSql("(NEXT VALUE FOR [sc].[SQ_User])")
        //        .HasColumnName("id");
        //    entity.Property(e => e.Active)
        //        .HasDefaultValue(true)
        //        .HasColumnName("active");
        //    entity.Property(e => e.LastLogin)
        //        .HasColumnType("datetime")
        //        .HasColumnName("lastLogin");
        //    entity.Property(e => e.Name)
        //        .HasMaxLength(255)
        //        .HasColumnName("name");
        //    entity.Property(e => e.OptionsJson).HasColumnName("optionsJson");
        //    entity.Property(e => e.Password)
        //        .HasMaxLength(1000)
        //        .HasColumnName("password");
        //    entity.Property(e => e.RefreshToken)
        //        .HasMaxLength(1000)
        //        .HasColumnName("refreshToken");
        //});

        //modelBuilder.Entity<UsersRole>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("PK__Users_Ro__3213E83F228B87F6");

        //    entity.ToTable("Users_Roles", "sc");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.RoleId).HasColumnName("roleId");
        //    entity.Property(e => e.UserId).HasColumnName("userId");

        //    entity.HasOne(d => d.Role).WithMany(p => p.UsersRoles)
        //        .HasForeignKey(d => d.RoleId)
        //        .OnDelete(DeleteBehavior.ClientSetNull)
        //        .HasConstraintName("FK__Users_Rol__roleI__4316F928");

        //    entity.HasOne(d => d.User).WithMany(p => p.UsersRoles)
        //        .HasForeignKey(d => d.UserId)
        //        .OnDelete(DeleteBehavior.ClientSetNull)
        //        .HasConstraintName("FK__Users_Rol__userI__4222D4EF");
        //});
        //modelBuilder.HasSequence<int>("SQ_Role", "sc");
        //modelBuilder.HasSequence<int>("SQ_User", "sc");

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
