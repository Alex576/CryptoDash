using CryptoDashWeb.Data.DBModels;
using CryptoDashWeb.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;

namespace CryptoDashWeb.Data.DBContext
{
    public class CryptoDashContext : DbContext
    {
        public virtual DbSet<Tile> Tiles { get; set; }
        public virtual DbSet<Layout> Layouts { get; set; }
        public virtual DbSet<TileType> TileTypes { get; set; }
        public virtual DbSet<ObjectEntity> ObjectEntities { get; set; }
        public virtual DbSet<ClassEntity> ClassEntities { get; set; }
        public virtual DbSet<CoinHistory> CoinHistories { get; set; }
        public virtual DbSet<UserSetting> UserSettings { get; set; }

        public CryptoDashContext(DbContextOptions<CryptoDashContext> options)
            : base(options)
        {
        }

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

            modelBuilder.Entity<ObjectEntity>(entity =>
            {
                entity.Property(x => x.Id).HasIdentityOptions(1000);
                entity.HasIndex(x => x.Name);
            });
            modelBuilder.Entity<CoinHistory>(entity =>
            {
                entity.OwnsOne(x => x.HistoryData, x =>
                {
                    x.ToJson();
                    var dictionaryComparer = new ValueComparer<Dictionary<long, float>>(
                        (d1, d2) => d1 != null && d2 != null && d1.Count == d2.Count && d1.Except(d2).Any(),
                        d => d.Aggregate(0, (hash, item) => HashCode.Combine(hash, item.Key.GetHashCode(), item.Value.GetHashCode())),
                        d => new Dictionary<long, float>(d));

                    x.Property(p => p.MarketCaps)
                    .HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Dictionary<long, float>>(v) ?? new(), dictionaryComparer);
                    x.Property(p => p.Prices)
                    .HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Dictionary<long, float>>(v) ?? new(), dictionaryComparer);
                    x.Property(p => p.TotalVolumes)
                    .HasConversion(v => JsonConvert.SerializeObject(v), v => JsonConvert.DeserializeObject<Dictionary<long, float>>(v) ?? new(), dictionaryComparer);
                });
                //entity.Property(x => x.HistoryData).HasColumnName("history_data");
            });
            modelBuilder.Entity<UserSetting>(entity =>
            {
                entity.Property(x => x.DataJson).HasColumnType("text");
                entity.HasIndex(x => x.SettingKey);
            });
            FillClassCode(modelBuilder);
            FillTileTypeCode(modelBuilder);
            FillTileItemTable(modelBuilder);
        }

        private void FillClassCode(ModelBuilder builder)
        {
            var items = Enum.GetValues<ClassCode>().Select(x => new ClassEntity() { Id = (int)x, Name = x.ToString() });
            builder.Entity<ClassEntity>().HasData(items);
        }
        private void FillTileTypeCode(ModelBuilder builder)
        {
            var items = Enum.GetValues<TileTypeCode>().Select(x => new TileType() { Id = (int)x, Name = x.ToString() });
            builder.Entity<TileType>().HasData(items);
        }

        private void FillTileItemTable(ModelBuilder builder)
        {
            builder.Entity<Tile>().HasData(
                GetTile((int)TileCode.DashboardLayout, "Dashboard Layout", (int)ToolCode.Dashboard, (int)TileTypeCode.Layout, null, 0),
                GetTile((int)TileCode.DashboardFilters, "Dashboard Filters", null, (int)TileTypeCode.Filter, (int)TileCode.DashboardLayout, 1),
                GetTile((int)TileCode.DashboardDashboard, "Dashboard Dashboard", null, (int)TileTypeCode.Dashboard, (int)TileCode.DashboardLayout, 2)
                );

            Tile GetTile(int id, string name, int? tooLCode, int typeCode, int? parentId, int rank) => new Tile()
            {
                Id = id,
                Name = name,
                ToolCode = tooLCode,
                TypeCode = typeCode,
                ParentId = parentId,
                Rank = rank,
            };
        }
    }
}
