using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CryptoDashWeb.Data.DBContext
{
    public class CryptoDashContext : DbContext
    {
        public virtual DbSet<Tile> TileItems { get; set; }
        public virtual DbSet<Layout> Layouts { get; set; }
        public virtual DbSet<TileType> TileTypes { get; set; }
        public CryptoDashContext(DbContextOptions<CryptoDashContext> options)
            : base(options)
        {
        }
        //public virtual DbSet<> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasDefaultSchema("dbo");

            modelBuilder.Entity<Tile>(entity =>
            {
                entity.HasOne(e => e.Parent)
                .WithMany(e => e.Children)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Layout>(entity =>
            {
                entity.Property(e => e.LayoutJson).HasColumnType("text");
            });
            FillTileTypeCode(modelBuilder);
            FillTileItemTable(modelBuilder);
        }

        private void FillTileTypeCode(ModelBuilder builder)
        {
            var items = Enum.GetValues<TileTypeCode>().Select(x => new TileType() { Id = (int)x, Name = x.ToString() });
            builder.Entity<TileType>().HasData(items);
        }

        private void FillTileItemTable(ModelBuilder builder)
        {
            builder.Entity<Tile>().HasData(
                GetTile((int)TileCode.DashboardLayout, "Dashboard Layout", (int)ToolCode.Dashboard, (int)TileTypeCode.Layout, null),
                GetTile((int)TileCode.DashboardFilters, "Dashboard Filters", null, (int)TileTypeCode.Filter, (int)TileCode.DashboardLayout),
                GetTile((int)TileCode.DashboardDashboard, "Dashboard Dashboard", null, (int)TileTypeCode.Dashboard, (int)TileCode.DashboardLayout)
                );

            Tile GetTile(int id, string name, int? tooLCode, int typeCode, int? parentId) => new Tile()
            {
                Id = id,
                Name = name,
                ToolCode = tooLCode,
                TypeCode = typeCode,
                ParentId = parentId
            };
        }
    }
}
