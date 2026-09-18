using Security.Core.Models;

namespace Security.Core.Services.Interfaces
{
    public interface ILoginService
    {
        Task<(UserModel? userModel, UserTokensModel? tokens)> Login(string login, string password);
        Task<(UserModel? userModel, UserTokensModel? tokens)> Register(string login, string password);
        Task Logout(int id);
    }
}