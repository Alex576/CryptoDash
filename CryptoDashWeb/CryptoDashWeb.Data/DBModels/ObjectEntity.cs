using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CryptoDashWeb.Data.DBModels;

public class ObjectEntity
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]

    public int ClassCode { get; set; }
    [Required]

    public string Name { get; set; } = null!;
    [Required]

    public string DisplayName { get; set; } = null!;

    [ForeignKey(nameof(ClassCode))]
    public virtual ClassEntity ClassEntity { get; set; } = null!;
}
