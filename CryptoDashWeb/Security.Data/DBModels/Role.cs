using System.ComponentModel.DataAnnotations;

namespace Security.Data.DBModels;

public partial class Role
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    public virtual ICollection<User> UsersRoles { get; set; } = new List<User>();
}
