using Security.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace Security.Data.DBModels;

public partial class User
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Email { get; set; } = null!;

    [Required]
    public string Name { get; set; } = null!;


    [Required]
    public string Password { get; set; } = null!;

    public UserOptions? OptionsJson { get; set; }

    public bool Active { get; set; }

    public DateTime? LastLogin { get; set; }

    public string? RefreshToken { get; set; }

    public virtual ICollection<Role> UsersRoles { get; set; } = new List<Role>();
}
