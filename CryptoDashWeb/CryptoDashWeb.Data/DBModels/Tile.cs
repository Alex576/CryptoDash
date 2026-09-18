using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CryptoDashWeb.Data.DBModels
{
    public class Tile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        public int? ToolCode { get; set; }
        [Required]
        public int TypeCode { get; set; }

        [ForeignKey(nameof(TypeCode))]
        public virtual TileType TileType { get; set; } = null!;

        public int? ParentId { get; set; }

        [ForeignKey(nameof(ParentId))]
        public virtual Tile? Parent { get; set; }
        public virtual ICollection<Tile> Children { get; set; } = new List<Tile>();

        public virtual ICollection<Layout> Layouts { get; set; } = new List<Layout>();

    }
}
