using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CryptoDashWeb.Data.DBModels;

public class ClassEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    [Required]

    public string Name { get; set; } = null!;

    public virtual ICollection<ObjectEntity> ObjectEntities { get; set; } = new List<ObjectEntity>();
}
