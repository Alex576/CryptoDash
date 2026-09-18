using Microsoft.EntityFrameworkCore;
using Security.Data.DBModels;

namespace Security.Data.DBContext;

public partial class SecurityContext : DbContext
{
    partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Ignore(x => x.OptionsJson);
            entity.OwnsOne(
                o => o.OptionsJson,
                builder =>
                {
                    builder.ToJson();
                });
        });

    }
}
