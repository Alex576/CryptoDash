using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CryptoDashWeb.Data.DBModels;

public class Layout
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int TileId { get; set; }
    public string? LayoutJson { get; set; }


    [ForeignKey(nameof(TileId))]
    public virtual Tile Tile { get; set; } = null!;
}
