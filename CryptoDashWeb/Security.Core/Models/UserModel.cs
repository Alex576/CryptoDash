using Security.Data.DBModels;
using Security.Data.Models;

namespace Security.Core.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public UserOptions? OptionJson { get; set; }
        public DateTime? LastLogin { get; set; }

        public UserModel(string email, string name)
        {
            Name = name;
            Email = email;
        }

        public UserModel(User dbUser)
        {
            Id = dbUser.Id;
            Name = dbUser.Email;
            OptionJson = dbUser.OptionsJson;
            LastLogin = dbUser.LastLogin;
            Email = dbUser.Email;
        }

    }
}
