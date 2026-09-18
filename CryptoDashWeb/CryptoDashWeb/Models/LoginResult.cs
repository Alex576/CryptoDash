namespace CryptoDashWeb.Models
{
    public class LoginResult
    {
        public int Id { get; set; }
        public string Email { get; set; }
        //public UserData User { get; set; }
        public string AccessToken { get; set; }
    }

    public class UserData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public string? OptionJson { get; set; }
    }
}
